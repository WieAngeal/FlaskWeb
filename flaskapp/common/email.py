#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time           : 2020-3-28 下午2:51
# @Author         : WieAngeal
# @File           : email.py
# @Product        : PyCharm
# @Docs           :
# @Source         :

from threading import Thread
from flask import current_app
from flask_mail import Message
from datetime import datetime
from flaskapp import mail
from ..common import (ConsoleLogger, relative_path)
import os


logger = ConsoleLogger(relative_path(__file__))

def send_async_email(app, msg):
    with app.app_context():
        logger.info("Email Send To " + str(msg.recipients) + " Start!!! Title : " + msg.subject)
        mail.send(msg)


def send_mail(title, to, cc=None, body=None, msg_html=None, attachfiles=None):
    app = current_app._get_current_object()
    msg = Message(subject=app.config['FLASK_MAIL_SUBJECT_PREFIX'] + title,
                  sender=app.config['FLASK_MAIL_SENDER'],
                  recipients=[to],
                  cc=cc
                  )
    # 邮件内容会以文本和html两种格式呈现，而你能看到哪种格式取决于你的邮件客户端。
    if (body is not None):
        msg.body = body
    if (msg_html is not None):
        msg.html = msg_html.format( time=datetime.utcnow)

    for att_file in attachfiles:
        file_name = os.path.basename(att_file)
        logger.debug(file_name)
        logger.debug(type(file_name))
        with current_app.open_resource(att_file) as fp:
            # file_name.encode("utf-8") 对文件名进行编码
            # current_app.config['MIME_TYPE'][os.path.splitext(file_name)[1]] 通过后缀名，获取MIME格式
            msg.attach(file_name.encode("utf-8"),
                       app.config['MIME_TYPE'][os.path.splitext(file_name)[1]],
                       fp.read())

    thread = Thread(target=send_async_email, args=[app, msg])
    thread.start()
    return thread