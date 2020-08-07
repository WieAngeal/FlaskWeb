#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/3/25 1:39
# @Author  : WieAngeal
# @File    : ycyl_hander.py
# @Software: PyCharm

from flask import Blueprint, flash, render_template, session, redirect, request
from ..common import (ConsoleLogger, make_response, HttpError,
                      relative_path, multi_dict_parser2dict)
from flask import request
from ..models import Hosinfo
from ..services import DBService
from ..common import email, auth
import ast
from flask_login import login_required


logger = ConsoleLogger(relative_path(__file__))
ycyl_service = DBService(model=Hosinfo)
ycyl = Blueprint('ycyl', __name__, url_prefix='/ycyl')

@ycyl.route('/', methods=["GET", "POST"])
@login_required
def home():
    token = request.args.get('token')
    user = auth.verify_auth_token(token)['username']
    return render_template("ctyxy.html", user=user)


@ycyl.route('/api/register', methods=["POST"])
def register():
    method = request.method
    if method == 'POST':
        data = request.form.get('data')
        hosinfo = ast.literal_eval(data)

        Attachments = ['工作日报记录表.xlsx']
        email.send_mail(title='第一份flask_email测试邮件',
                        to='17693186908@126.com',
                        msg_html='''<h2>这是我的个人博客</h2>
                                    <hr />
                                    <h3>东风破</h3>
                                    <h5><font color="blue" size="18px">周杰伦</font></h5>
                                    <p>一盏离愁 孤灯伫立在窗口</p>
                                    <p>我在门后 假装你人还没走</p>
                                    <p>旧地如重游月 圆更寂寞
                                    <p>夜半清醒的烛火 不忍苛责我</p>''',
                        attachfiles=None
                        )

        id = ycyl_service.max(Hosinfo.id)
        if (id is None):
            id = 0
        hosinfo['id'] = id + 1
        obj = ycyl_service.save(Hosinfo(**hosinfo))

        return make_response(data=obj.json())


@ycyl.route('/api/count', methods=["POST", "GET"])
def count():
    method = request.method
    if method == 'GET':
        max_num = ycyl_service.max(Hosinfo.id)
        return make_response(data=max_num, e="查询总数成功。")

