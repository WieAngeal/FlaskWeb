#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/4 22:08
# @Author  : WieAngeal
# @File    : user.py
# @Software: PyCharm
from .base import DictModel
from flaskapp import db


class CtyxyDataShip(db.Model, DictModel):
    __tablename__ = 't_CtyxyDataShip'

    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.String(20), unique=False, nullable=True)
    datatype = db.Column(db.String(10), unique=False, nullable=True)
    sxzz_num = db.Column(db.String(20), unique=False, nullable=True)
    sxzz_used = db.Column(db.String(20), unique=False, nullable=True)
    yxy_diagnum = db.Column(db.String(20), unique=False, nullable=True)
    yxy_callnum = db.Column(db.String(20), unique=False, nullable=True)
    yxy_film = db.Column(db.String(20), unique=False, nullable=True)
    yxy_uv = db.Column(db.String(20), unique=False, nullable=True)
    yxy_pv = db.Column(db.String(20), unique=False, nullable=True)
    yxy_daypv = db.Column(db.String(20), unique=False, nullable=True)
    yxy_ainum = db.Column(db.String(20), unique=False, nullable=True)
    yxy_oss = db.Column(db.String(20), unique=False, nullable=True)
    fjzl_hospital = db.Column(db.String(20), unique=False, nullable=True)
    yxy_aihospital = db.Column(db.String(20), unique=False, nullable=True)
    yxy_hospital = db.Column(db.String(20), unique=False, nullable=True)

    def __init__(self, **kwargs):
        self.id = kwargs.pop('id', None)
        self.month = kwargs.pop('month', None)
        self.datatype = kwargs.pop('datatype', None)
        self.sxzz_num = kwargs.pop('sxzz_num', None)
        self.sxzz_used = kwargs.pop('sxzz_used', None)
        self.yxy_diagnum = kwargs.pop('yxy_diagnum', None)
        self.yxy_callnum = kwargs.pop('yxy_callnum', None)
        self.yxy_film = kwargs.pop('yxy_film', None)
        self.yxy_uv = kwargs.pop('yxy_uv', None)
        self.yxy_pv = kwargs.pop('yxy_pv', None)
        self.yxy_daypv = kwargs.pop('yxy_daypv', None)
        self.yxy_ainum = kwargs.pop('yxy_ainum', None)
        self.yxy_oss = kwargs.pop('yxy_oss', None)
        self.fjzl_hospital = kwargs.pop('fjzl_hospital', None)
        self.yxy_aihospital = kwargs.pop('yxy_aihospital', None)
        self.yxy_hospital = kwargs.pop('yxy_hospital', None)
        self.yxy_film = kwargs.pop('yxy_hospital', None)
        self.yxy_film = kwargs.pop('yxy_film', None)


    def __repr__(self):
        return '<Month %r>' % self.month

        # def json(self, lazy=False, ignore='clazz_id', deep=1):
        #     return super(User,self).json(ignore=ignore)
