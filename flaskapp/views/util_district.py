#!/usr/bin/python3
# -*- coding: utf-8 -*-
# @ProjectName      : FlaskWeb
# @File             : util_district.py
# @Author           : LUCY
# @Product          : PyCharm
# @Time             : 2020/8/20 9:42

from flask import Blueprint, request, abort
from ..models import Config_District
from ..services import DBService
from ..common import (ConsoleLogger, make_response, HttpError,
                      relative_path, multi_dict_parser2dict)
import json
import time


district = Blueprint('district', __name__, url_prefix='/api/district')

district_service = DBService(model=Config_District)
logger = ConsoleLogger(name=relative_path(__file__))


@district.route('/', methods=["GET", "POST", "PUT"])
def lists():
    method = request.method
    logger.debug(method)
    if method == 'GET':
        areaid = request.args.get('areaid')
        action = request.args.get('action')
        area_list = {"state": 1, "list": None}

        if areaid == '0' or action == "list":
            data = get_list_by_parentcode(id=areaid)
            area_list["list"] = data
        elif action == "init":
            list = []
            code, parent_code = get_code_by_shotcode(areaid)
            province = get_list_by_parentcode(id=0)
            city = get_list_by_parentcode(id=parent_code)
            cList = get_list_by_parentcode(id=code)

            dict_1 = {"code": code, "lat_lons": None, "flevel": None, "name": None, "parent": None,
                      "center_lat_lng": None,
                      "sList": city, "cList": cList}

            dict_2 = {"code": parent_code, "lat_lons": None, "flevel": None, "name": None, "parent": None,
                      "center_lat_lng": None,
                      "sList": province, "cList": None}

            list.append(dict_1)
            list.append(dict_2)

            area_list["list"] = list
        logger.debug(area_list)
        return json.dumps(area_list)
    return make_response(data=district_service.query_all())

def get_list_by_parentcode(id=0):
    data = district_service.query_filter_all(parent_code=id)
    list = []
    for i in range(len(data)):
        dict_t = {"code": None, "lat_lons": None, "flevel": None, "name": None, "parent": None, "center_lat_lng": None,
                  "sList": None, "cList": None}
        dict_t['code'] = data[i]['code']
        dict_t['name'] = data[i]['name']
        dict_t['parent'] = data[i]['parent_code']
        dict_t['flevel'] = data[i]['type']
        list.append(dict_t)
    return list


def get_code_by_shotcode(sc=0):
    data = district_service.query_filter_first(short_code=sc)
    code = data['code']
    parent_code= data['parent_code']
    return code, parent_code

def get_shortcode_by_code(code=0):
    data = district_service.query_filter_first(code=code)
    short_code = data['short_code']
    parent_code= data['parent_code']
    return short_code, parent_code

@district.route('/get_addr', methods=["GET", "POST"])
def get_addr_by_id():
    method = request.method
    area_list = {"state": 0, "list": None}

    if method == 'GET':
        areaid = request.args.get('areaid')
        logger.debug(areaid)
        try:
            pr_name = (district_service.query_filter_first(short_code=areaid[0:2]))['name']
            ct_name = (district_service.query_filter_first(short_code=areaid[0:4]))['name']
            di_name = (district_service.query_filter_first(short_code=areaid[0:6]))['name']
            st_name = (district_service.query_filter_first(short_code=areaid[0:9]))['name']
            vi_name = (district_service.query_filter_first(short_code=areaid))['name']

            addr = pr_name + '/' + ct_name + '/' + di_name + '/' \
                   + st_name + '/' + vi_name
            area_list["list"] = addr
            area_list["state"] = 1

            logger.info(district_service.query_all())

        except Exception as e:
            logger.debug(e)

    return json.dumps(area_list)