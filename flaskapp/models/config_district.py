#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/4 22:08
# @Author  : WieAngeal
# @File    : user.py
# @Software: PyCharm
from .base import DictModel
from flaskapp import db


class Config_District(db.Model, DictModel):
    __tablename__ = 'config_district'

    type = db.Column(db.String(1), unique=False, nullable=False)
    code = db.Column(db.String(12), unique=False, nullable=False, primary_key=True)
    name = db.Column(db.String(255), unique=False, nullable=False)
    parent_code = db.Column(db.String(12), unique=False, nullable=True)
    short_code = db.Column(db.String(12), unique=False, nullable=False)
    catalog = db.Column(db.String(255), unique=False, nullable=True)
    sub = db.Column(db.String(6), unique=False, nullable=True)

    def __init__(self, **kwargs):
        self.type = kwargs.pop('type', None)
        self.code = kwargs.pop('code', None)
        self.name = kwargs.pop('name', None)
        self.parent_code = kwargs.pop('parent_code', None)
        self.short_code = kwargs.pop('short_code', None)
        self.catalog = kwargs.pop('catalog', None)
        self.sub = kwargs.pop('sub', None)

    def __repr__(self):
        return '<Name %r>' % self.Name
