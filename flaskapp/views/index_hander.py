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

logger = ConsoleLogger(relative_path(__file__))
ctyxy_service = DBService(model=CtyxyDataShip)
index = Blueprint('index', __name__)


@index.route('/', methods=["GET", "POST"])
def home():
    """
    使用flash来进行消息提示推送
    页面使用{{ get_flashed_messages()[0] }} 获取
    """
    flash("welcome !")

    """
    """

    import requests

    username = 'C001R023H038D001U001'
    password = '3wCTyxy.cn'
    loginurl = 'http://140.249.21.249:9991/successlogin'

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.8.1000 Chrome/30.0.1599.101 Safari/537.36',
        'Referer': 'http://140.249.21.249:9991/successlogin',
        'Content-Type': 'text/html'
    }

    postUrl = "https://passport.mafengwo.cn/login/"
    llurl = 'http://140.249.21.249:9991/dp/index'

    postData = {
        "passport": username,
        "password": password,
    }

    responseRes = requests.post(loginurl, data=postData, headers=headers)
    logger.error(responseRes)
    resp = requests.get(llurl)
    
    """
    """

    return render_template("ctyxy.html")

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