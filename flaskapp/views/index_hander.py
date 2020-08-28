#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/5 1:39
# @Author  : WieAngeal
# @File    : index_hander.py
# @Software: PyCharm
from flask import Blueprint, flash, render_template, Response, Request
from ..models import CtyxyDataShip
from ..services import DBService
from ..common import (ConsoleLogger, relative_path)
import json
from ..common import auth

logger = ConsoleLogger(relative_path(__file__))
ctyxy_service = DBService(model=CtyxyDataShip)
index = Blueprint('index', __name__)


@index.route('/', methods=["GET", "POST"])
def login():
    """
    使用flash来进行消息提示推送
    页面使用{{ get_flashed_messages()[0] }} 获取
    """
    flash("welcome !")

    return render_template("test.html")

@index.route('/register', methods=["GET", "POST"])
def register_user():
    """
    使用flash来进行消息提示推送
    页面使用{{ get_flashed_messages()[0] }} 获取
    """
    flash("welcome !")

    return render_template("register.html")

def Response_headers(content):
    resp = Response(content)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@index.route('/api/get_real_data', methods=["GET"])
def get_real_data():
    obj = ctyxy_service.query_filter_all(datatype='REAL')
    content = json.dumps(obj)
    resp = Response_headers(content)
    return resp

@index.route('/api/get_target_data', methods=["GET"])
def get_target_data():
    obj = ctyxy_service.query_filter_all(datatype='TARGET')
    content = json.dumps(obj)
    resp = Response_headers(content)
    return resp