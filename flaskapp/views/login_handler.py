#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/7/29 1:39
# @Author  : WieAngeal
# @File    : login_hander.py
# @Software: PyCharm

from flask import Blueprint, request, redirect, render_template
from flask import url_for
from ..services import UserService
from ..common import (ConsoleLogger, relative_path)
from ..common.captcha import CaptchaTool
from flaskapp import app
import json, jsonify
import hashlib
import ast
from ..common import auth, auth_trd
import re, time
import requests

logger = ConsoleLogger(relative_path(__file__))
user_service = UserService()
login = Blueprint('login', __name__, url_prefix='/api/auth')

@login.route('/generate_token', methods=["GET", "POST"])
def create_token():
    method = request.method
    if method == 'POST':
        userdata = ast.literal_eval(request.form.get('data'))
        json_data = auth.login_verify(userdata['telphone'], userdata['password'], userdata['timecode'])
        logger.info(json_data)
        return json_data

@login.route('/login_token', methods=['GET', 'POST'])
def token_verify():
    data = request.form.get('data')
    _token = json.loads(data)
    token = _token['_token'][0]
    rsp = auth.verify_auth_token(token)
    json_data = json.dumps(rsp)
    logger.info(json_data)
    return json_data

@login.route('/register', methods=['GET', 'POST'])
def register_user():
    data = json.loads(request.form.get('data'))
    json_data = json.dumps(auth.register_user(data))
    return json_data


@login.route('/imgcode', methods=['GET', 'POST'])
def get_verify_code():
    method = request.method
    if method == 'GET':
        new_captcha = CaptchaTool()
        # 获取图形验证码
        img, code = new_captcha.get_verify_code()
        # 存入session
        #session["code"] = code

        #logger.error(img)
        logger.error(code)

        return img


@login.route('/wechat_code', methods=['GET', 'POST'])
def wechat_login():
    url = "https://login.weixin.qq.com/qrcode/oel9rit2RA=="
    json_data = json.dumps(url)
    logger.info(json_data)
    return json_data

