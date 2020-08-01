#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/7/31 10:39
# @Author  : WieAngeal
# @File    : auth.py
# @Software: PyCharm

from ..common import (ConsoleLogger, relative_path)
from Crypto.Cipher import DES3
from Crypto import Random
import base64
import binascii
import base64

logger = ConsoleLogger(relative_path(__file__))

DES_SECRET_KEY = '@A!*L&u(c%y_·'


key = DES_SECRET_KEY
mode = DES3.MODE_CBC

def add_to_24(value):
    while len(value) % 24 != 0:
        value += '\0'
    return str.encode(value)  # 返回bytes


def encrypt(key, text):
    # 待加密文本
    # 初始化加密器
    aes = DES3.new(add_to_24(key), DES3.MODE_ECB)
    #先进行aes加密
    encrypt_aes = aes.encrypt(add_to_24(text))
    #用base64转成字符串形式
    encrypted_text = str(base64.encodebytes(encrypt_aes), encoding='utf-8')  # 执行加密并转码返回bytes
    print(encrypted_text)
    return encrypted_text

def decrypt(key, text):
    # 密文
    # 初始化加密器
    des = DES3.new(add_to_24(key), DES3.MODE_ECB)
    #优先逆向解密base64成bytes
    base64_decrypted = base64.decodebytes(text.encode(encoding='utf-8'))
    #执行解密密并转码返回str
    decrypted_text = str(des.decrypt(base64_decrypted),encoding='utf-8').replace('\0','')

    return decrypted_text
