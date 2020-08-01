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
from ..common import (ConsoleLogger, relative_path, pydes)
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

    status = check_password(user['password'], data['pswd'])
    if status == "Success":
        data = rep_json_data(code=status, msg="登录成功", username=user['username'], telphone=user['telphone'],token=token)
    else:
        data = rep_json_data(code=status, msg="登录失败", telphone=user['telphone'])
    return  data

def check_password(password, passwd):
    if (password == passwd):
        return 'Success'
    else:
        return 'Failed'

def create_md5_password(passwd):
    # 创建md5对象
    m = hashlib.md5()
    b = passwd.encode(encoding='utf-8')
    m.update(b)
    passwd_md5 = m.hexdigest()
    logger.error(passwd_md5)
    return passwd_md5

def rep_json_data(code=None, msg=None, username=None, telphone=None, token=None):
    data = {'code': code, 'msg': msg, 'username': username, 'telphone': telphone, 'token': token}
    return data


def wapper(func):
    @functools.wraps(func)  # 设置函数的元信息
    def inner(*args, **kwargs):
        logger.error(request.cookies.get('token'))
        status = auth.verify_auth_token('token')

        if status is "Failed":
            return "Failed"
        return func(*args, **kwargs)
    return inner

def register_user(data):
    is_exist_tel = user_service.query_filter_first(telphone=data['telphone'])

    logger.error(data['timecode'])
    logger.error(data['password'])

    pwd = pydes.decrypt(data['timecode'], data['password'])
    logger.error(pwd)

    if is_exist_tel is None:
        user_id = user_service.max(User.id)
        if (user_id is None):
            user_id = 0
        user_id = user_id + 1

        try:
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

