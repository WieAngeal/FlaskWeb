#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/3/25 1:39
# @Author  : WieAngeal
# @File    : ycyl_hander.py
# @Software: PyCharm
from flask import Blueprint, flash, render_template
from ..common import (ConsoleLogger, make_response, HttpError,
                      relative_path, multi_dict_parser2dict)
from flask import request
from ..models import Hosinfo
from ..services import DBService
import ast

logger = ConsoleLogger(relative_path(__file__))
ycyl_service = DBService(model=Hosinfo)
ycyl = Blueprint('ycyl', __name__, url_prefix='/ycyl')


@ycyl.route('/', methods=["GET", "POST"])
def home():
    return render_template("ycyl.html")


@ycyl.route('/api/register', methods=["POST"])
def register():
    method = request.method
    if method == 'POST':
        data = request.form.get('data')
        hosinfo = ast.literal_eval(data)
        hosinfo['id'] = ycyl_service.max(Hosinfo.id) + 1
        obj = ycyl_service.save(Hosinfo(**hosinfo))
        # hosinfo = Hosinfo(id=4, district='gasnsu', hospital='landda',
        #                         conname='zhagdnguo', email='bia@126.com',
        #                         telphone='10873023', sysname='yuanschen')
        return make_response(data=obj.json())


@ycyl.route('/api/count', methods=["POST", "GET"])
def count():
    method = request.method
    if method == 'GET':
        max_num = ycyl_service.max(Hosinfo.id)
        return make_response(data=max_num)

