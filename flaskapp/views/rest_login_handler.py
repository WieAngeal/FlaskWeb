#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time           : 18-3-28 下午3:30
# @Author         : WieAngeal
# @File           : login_handler.py
# @Product        : PyCharm
# @Docs           : 
# @Source         : 
from flask import Blueprint, render_template, request, flash

from ..common import ConsoleLogger, relative_path


login = Blueprint('login', __name__)

logger = ConsoleLogger(relative_path(__file__))

@login.route('/login', methods=["POST"])
def login_func():
    form = request.form
    username = form.get('username')
    password = form.get('password')

    if not username:
        flash(u"username 不能为空！")
        return render_template("index.html")

    if not password:
        flash(u"password 不能为空！")
        return render_template("index.html", user=username)

    if username == 'admin' and password == 'admin':
        flash("login success!")
        logger.info('into login_func ')
        return render_template("index.html", users=['jack', 'tom', 'jenny'])
    else:
        flash("username or password is error!")
        return render_template("index.html")
