#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/5 1:39
# @Author  : TOM.LEE
# @File    : index_hander.py
# @Software: PyCharm
from flask import Blueprint, flash, render_template
from ..models import CtyxyDataShip
from ..services import DBService

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

    obj = ctyxy_service.query_filter_all()

    return render_template("ctyxy.html")
