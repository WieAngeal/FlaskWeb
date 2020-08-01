#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/7/29 1:39
# @Author  : WieAngeal
# @File    : login_hander.py
# @Software: PyCharm

from flask import Blueprint, request, redirect
from flask import url_for
from ..models import User
from ..services import UserService
from ..common import (ConsoleLogger, relative_path)
from flaskapp import app
import json, jsonify
import hashlib
import ast
from ..common import auth


logger = ConsoleLogger(relative_path(__file__))
user_service = UserService()
login = Blueprint('login', __name__, url_prefix='/api/login')

@login.route('/generate_token', methods=["GET", "POST"])
def create_token():
    method = request.method
    if method == 'POST':
        userdata = ast.literal_eval(request.form.get('data'))
        telphone = userdata['telphone']
        password = userdata['password']
        timecode = userdata['timecode']

        logger.error(userdata)

        if not all([telphone, password]):
            data = auth.rep_json_data(code="Username OR Password is null", msg="用户名和密码不能为空",telphone=telphone)
            return json.dumps(data)

        try:
            users = user_service.query_filter_first(telphone=telphone)
        except Exception as e:
            logger.error("login error：{}".format(e))
            data = auth.rep_json_data(code="Query Failed", msg="获取信息失败", telphone=telphone)
            return json.dumps(data)

        if users is None or not (auth.check_password(password, users['password']) == "Success"):
            logger.error("用户名或密码错误")
            data = auth.rep_json_data(code="error username or password", msg="用户名或密码错误！", telphone=telphone)
            return json.dumps(data)

        token = auth.generate_token(users)

        if token:
            data = auth.rep_json_data(code="Success", msg="获取token成功！", telphone=telphone, token=token)
            return json.dumps(data)
        else:
            data = auth.rep_json_data(code="Error", msg="获取token失败！", telphone=telphone)
            return json.load(data)


@login.route('/login_token', methods=['GET', 'POST'])
def token_verify():
    data = request.form.get('data')
    _token = json.loads(data)
    token = _token['_token'][0]
    rsp = auth.verify_auth_token(token)
    json_data = json.dumps(rsp)
    logger.error(json_data)
    return json_data


@login.route('/register', methods=['GET', 'POST'])
def register_user():
    data = json.loads(request.form.get('data'))
    json_data = json.dumps(auth.register_user(data))
    return json_data