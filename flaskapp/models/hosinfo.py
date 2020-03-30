#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/4 22:08
# @Author  : WieAngeal
# @File    : user.py
# @Software: PyCharm
from .base import DictModel
from flaskapp import db


class Hosinfo(db.Model, DictModel):
    __tablename__ = 't_Hosinfo'

    #省份， 医院名称，  电话，姓名，邮箱， 业务系统

    id = db.Column(db.Integer, primary_key=True)
    district = db.Column(db.String(10), unique=False, nullable=True)
    hospital = db.Column(db.String(30), unique=False, nullable=True)
    telphone = db.Column(db.String(20), unique=False, nullable=True)
    conname = db.Column(db.String(10), unique=False, nullable=True)
    email = db.Column(db.String(50), unique=False, nullable=True)
    sysname = db.Column(db.String(50), unique=False, nullable=True)

    def __init__(self, **kwargs):
        self.id = kwargs.pop('id', None)
        self.district = kwargs.pop('district', None)
        self.hospital = kwargs.pop('hospital', None)
        self.conname = kwargs.pop('conname', None)
        self.email = kwargs.pop('email', None)
        self.telphone = kwargs.pop('telphone', None)
        self.sysname = kwargs.pop('sysname', None)

    def __repr__(self):
        return '<Hospital %r>' % self.hospital

        # def json(self, lazy=False, ignore='clazz_id', deep=1):
        #     return super(User,self).json(ignore=ignore)
