#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author         : WieAngeal
# @File           : settings.py
# @Product        : PyCharm

import os

environ = os.environ
PROJECT_PATH = os.path.dirname(__file__)
TEMPLATE_FOLDER = os.path.join(PROJECT_PATH, "templates")
STATIC_FOLDER = os.path.join(PROJECT_PATH, "static")
DEBUG = True  # open debug /or hot restart

# ****** 工程日志配置
FLASK_LOG_DIR = os.path.join(PROJECT_PATH, "log")
FLASK_LOG_FILE = "flask.log"

# ****** 上传配置
UPLOAD_FOLDER = '/tmp/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'sql'}

# SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

# ****** MySQL 配置
SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}?charset=utf8'.format(
    user=environ.get('DB_USER', 'root'),
    password=environ.get('DB_PASS', '123456'),
    host=environ.get('DB_HOST', '127.0.0.1'),
    port=environ.get('DB_PORT', 3306),
    database=environ.get('DB_NAME', 'flask'))
SQLALCHEMY_TRACK_MODIFICATIONS = True  # 禁止警告
SQLALCHEMY_ECHO = False  # 是否打印
# SQLALCHEMY_POOL_SIZE = 15  # 数据库连接池的大小。默认是数据库引擎的默认值 （通常是 5）。
# SQLALCHEMY_POOL_TIMEOUT = 10  # 指定数据库连接池的超时时间。默认是 10。
# SQLALCHEMY_POOL_RECYCLE = 60 * 60 * 2  # 自动回收连接的秒数。
# SQLALCHEMY_MAX_OVERFLOW = 0  # 控制在连接池达到最大值后可以创建的连接数。
SQLALCHEMY_POOL_SIZE = 30  # 数据库连接池的大小。默认是数据库引擎的默认值 （通常是 5）。
SQLALCHEMY_POOL_TIMEOUT = 10  # 指定数据库连接池的超时时间。默认是 10。
SQLALCHEMY_POOL_RECYCLE = 60 * 60 * 2  # 自动回收连接的秒数。
SQLALCHEMY_MAX_OVERFLOW = 20  # 控制在连接池达到最大值后可以创建的连接数。

# ****** Celery 配置 celery.app.utils.py
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_BROKER_URL = 'redis://localhost:6379'

# ############################## flask project auto config ######################################
DOWNLOAD_FOLDER = '/tmp'
HOME_PATH = '/'

# ############################## flask start config ######################################
HOST = '0.0.0.0'
PORT = 5000


# ############################# flask email config #######################################
MAIL_DEBUG = False             # 开启debug，便于调试看信息
MAIL_SUPPRESS_SEND = False    # 发送邮件，为True则不发送
MAIL_SERVER = 'smtp.189.cn'   # 邮箱服务器
MAIL_PORT = 25               # 端口
MAIL_USE_SSL = False           # 重要，qq邮箱需要使用SSL
MAIL_USE_TLS = False          # 不需要使用TLS
MAIL_USERNAME = '18909460866@189.cn'  # 填邮箱
MAIL_PASSWORD = '3Wctyxy.cn'      # 填授权码 VCMQLHFVBHHGTQYG
FLASK_MAIL_SENDER = '章果<ctyxy_service@189.cn>'   #邮件发送方
FLASK_MAIL_SUBJECT_PREFIX = '[章果大数据]'     #邮件标题前缀
#MAIL_DEFAULT_SENDER = 'xxx@qq.com'  # 填邮箱，默认发送者**加粗样式**

MIME_TYPE = {
        '.xls':  'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.txt':  'text/plain',
        '.pdf':  'application/pdf',
        '.doc':  'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.ppt':  'application/vnd.ms-powerpoint',
        '.rar':  'application/rar',
        '.zip':  'application/zip',
        '.tar':  'application/x-tar',
        '.gz':   'application/x-gzip'
    }