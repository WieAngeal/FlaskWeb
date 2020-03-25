#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/5 1:39
# @Author  : TOM.LEE
# @File    : ycyl_hander.py
# @Software: PyCharm
from flask import Blueprint, flash, render_template
from ..common import ConsoleLogger, relative_path
from flask import request
import json

logger = ConsoleLogger(relative_path(__file__))
ycyl = Blueprint('ycyl', __name__, url_prefix='/ycyl')


@ycyl.route('/', methods=["GET", "POST"])
def home():
    return render_template("ycyl.html")


@ycyl.route('/api/register', methods=["POST"])
def register():
    data = json.loads(request.form.get('data'))
    logger.info(data)
    logger.info(data['x'])

    return render_template("开通成功！")

