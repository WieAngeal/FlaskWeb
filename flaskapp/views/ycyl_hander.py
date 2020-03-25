#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/5 1:39
# @Author  : TOM.LEE
# @File    : ycyl_hander.py
# @Software: PyCharm
from flask import Blueprint, flash, render_template
from ..common import (ConsoleLogger, make_response, HttpError,
                      relative_path, multi_dict_parser2dict)
from flask import request
from ..models import Hosinfo
from ..services import DBService
import json

ycyl_service = DBService(model=Hosinfo)

logger = ConsoleLogger(relative_path(__file__))
ycyl = Blueprint('ycyl', __name__, url_prefix='/ycyl')


@ycyl.route('/', methods=["GET", "POST"])
def home():
    return render_template("ycyl.html")


@ycyl.route('/api/register', methods=["POST"])
def register():
    data = json.loads(request.form.get('data'))
    logger.info(data)
    logger.info(request.form)

    method = request.method
    if method == 'POST':
        obj = ycyl_service.save(Hosinfo(**multi_dict_parser2dict(request.form)))
        logger.info("DB: " + obj.json())
        return make_response(data=obj.json())

    return render_template("开通成功！")

