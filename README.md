# Flask Application

[![Build Status](https://api.travis-ci.org/tomoncle/flaskapp.svg?branch=master)][travis]

* Python Version: 3.7
* 拓展flask支持banner， 支持config.properties配置文件导入
* 模块化设计，支持数据库迁移
* 封装sqlalchemy数据库操作
* 自动转json
* 配置拦截器，异常自动解析(web请求返回错误页面，curl请求返回错误json)
* 拓展flask内置函数，支持环境变量
* 集成celery框架异步处理
* 支持docker构建，阿里云DockerHub自动更新GitHub代码构建
* flask jinja2模板示例
* swagger api文档配置
* 支持用户登录、注册过程中token认证机制
* 支持用户登录、注册时候前后端密码传输加密，DES3加密算法，mysql存储也是DES3加密算法
* 支持返回消息格式标准化方法，采用JSON数据格式
* 支持返回注册、登录时候采用验证码进行登录的机制
* 等等

## Others
* 数据库更新迁移
```bash
$ python manager.py db init
$ python manager.py db migrate
```

* Dockerfile 构建
```bash
$ ./docker-build.sh
```
* celery异步处理

* swagger配置


## Authors
* [章果](https://github.com/WieAngeal/FlaskWeb)
* 源码地址：https://github.com/WieAngeal/FlaskWeb

[travis]: https://travis-ci.org/tomoncle/flaskapp
