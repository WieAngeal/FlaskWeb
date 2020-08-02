#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/7/29 1:39
# @Author  : WieAngeal
# @File    : auth.py
# @Software: PyCharm

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from flask import request, redirect, url_for
from ..services import UserService
from ..models import User
from ..common import (ConsoleLogger, relative_path, des3)
from flaskapp import app
import json, jsonify
import hashlib
import functools


logger = ConsoleLogger(relative_path(__file__))
user_service = UserService()

def generate_token(users):
    expiration = 3600
    s = Serializer(app.secret_key, expires_in=expiration) #expiration是过期时间
    token = s.dumps({'user': users['username'], 'tel': users['telphone'], 'pswd': users['password']}).decode('ascii')
    data = {'token': token}
    #redis save token
    obj = user_service.update(primary_key=users['id'], obj_dict=data)
    return token, expiration


def verify_auth_token(token):
    s = Serializer(app.secret_key)
    try:
        data = s.loads(token)
    except SignatureExpired:
        logger.error("SignatureExpired")
        return None
    except BadSignature:
        logger.error("BadSignature")
        return None

    user = user_service.query_filter_first(telphone=data['tel'])

    if check_password(user['password'], data['pswd']) is True:
        data = rep_json_data(code="Success", msg="登录成功", username=user['username'], telphone=user['telphone'],token=token)
    else:
        data = rep_json_data(code="Failed", msg="登录失败", telphone=user['telphone'])
    return  data


def login_verify(telphone, password, timecode):
    try:
        password = des3.des3_encrypt(des3.decrypt(timecode, password))
    except Exception as e:
        logger.error(e)

    if not all([telphone, password]):
        data = rep_json_data(code="Username OR Password is null", msg="用户名和密码不能为空", telphone=telphone)
        return json.dumps(data)

    try:
        users = user_service.query_filter_first(telphone=telphone)
        logger.info(users)
    except Exception as e:
        logger.error("login error：{}".format(e))
        data = rep_json_data(code="Query Failed", msg="获取信息失败", telphone=telphone)
        return json.dumps(data)

    if users is None or not (check_password(password, users['password']) is True):
        logger.error("用户名或密码错误")
        data = rep_json_data(code="error username or password", msg="用户名或密码错误！", telphone=telphone)
        return json.dumps(data)

    token = generate_token(users)

    if token:
        data = rep_json_data(code="Success", msg="获取token成功！", telphone=telphone, token=token)
    else:
        data = rep_json_data(code="Error", msg="获取token失败！", telphone=telphone)

    return json.dumps(data)

def check_password(password, passwd):
    if (password == passwd):
        return True
    else:
        return False


def rep_json_data(code=None, msg=None, username=None, telphone=None, token=None):
    data = {'code': code, 'msg': msg, 'username': username, 'telphone': telphone, 'token': token}
    return data


def wapper(func):
    @functools.wraps(func)  # 设置函数的元信息
    def inner(*args, **kwargs):
        logger.error(request.cookies.get('token'))
        status = verify_auth_token('token')

        if status is "Failed":
            return "Failed"
        return func(*args, **kwargs)
    return inner

def register_user(data):
    is_exist_tel = user_service.query_filter_first(telphone=data['telphone'])

    logger.error(data['timecode'])
    logger.error(data['password'])

    pwd = des3.decrypt(data['timecode'], data['password'])
    logger.error(pwd)

    if is_exist_tel is None:
        user_id = user_service.max(User.id)
        if (user_id is None):
            user_id = 0
        user_id = user_id + 1

        try:
            pwd = des3.des3_encrypt(pwd)
            obj = user_service.save(User(id=user_id,  username=data['username'], password=pwd, telphone=data['telphone']))
        except Exception as e:
            logger.error(e)
            data = rep_json_data(code="Register Failed", msg="注册失败")
            return data

        data = rep_json_data(code="Register Success", msg="注册成功")
        return data
    else:
        data = rep_json_data(code="telphone is existed", msg="手机号码已存在，请重新输入！")
        return data

