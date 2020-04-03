#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/5 22:02
# @Author  : WieAngeal
# @File    : logger.py
# @Software: PyCharm
import logging
from logging.handlers import RotatingFileHandler
from concurrent_log_handler import ConcurrentRotatingFileHandler
import config
import os


FORMAT_STR = '%(asctime)s %(levelname)s {model} :: %(message)s'

def create_log_file():
    logdir = config.FLASK_LOG_DIR
    logfile = config.FLASK_LOG_FILE
	
    filename = logdir + '/' + logfile

    if not os.path.exists(logdir):
        os.makedirs(logdir)

    if not os.path.isfile(logdir + logfile):
        with open(filename, 'w') as fd:
            fd.close()
    return filename


class ConsoleLogger(object):
    """
    自定义logger
    examples:
        logger = ConsoleLogger('mode_name')
        logger.info("ok!")
    """

    def __new__(cls, name='%(module)s'):
        __format = '1 %(asctime)s %(levelname)s {model} %(filename)s(%(lineno)d) : %(message)s'.format(model=name)
        __logger = logging.getLogger(name)
        __logger.setLevel(logging.DEBUG)
        handler = logging.StreamHandler()
        formatter = logging.Formatter(__format)
        handler.setFormatter(formatter)
        __logger.addHandler(handler)

        # 日志写文件操作存在进程占用log失败的问题
        handler = ConcurrentRotatingFileHandler(create_log_file(), maxBytes=5 * 1024 * 1024, backupCount=10, encoding='utf-8')
        formatter = logging.Formatter('4 %(asctime)s %(levelname)s {model} %(filename)s(%(lineno)d) : %(message)s')
        handler.setFormatter(formatter)
        __logger.addHandler(handler)
        # __logger.setLevel(logging.INFO)

        return __logger


class LoggerFactory(object):
    @staticmethod
    def logger(name='%(module)s'):
        __format = '3 %(asctime)s %(levelname)s {model} %(filename)s(%(lineno)d) : %(message)s'.format(model=name)
        __logger = logging.getLogger(name)
        __logger.setLevel(logging.DEBUG)
        handler = logging.StreamHandler()
        formatter = logging.Formatter(__format)
        handler.setFormatter(formatter)
        __logger.addHandler(handler)

        handler = ConcurrentRotatingFileHandler(create_log_file(), maxBytes=5 * 1024 * 1024, backupCount=10, encoding='utf-8')
        formatter = logging.Formatter('4 %(asctime)s %(levelname)s {model} %(filename)s(%(lineno)d) : %(message)s')
        handler.setFormatter(formatter)
        __logger.addHandler(handler)

        return __logger
