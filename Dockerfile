#FROM docker.pkg.github.com/WieAngeal/mirrors/python36:alpine
FROM mysql:5.7.29

#设置免密登录
#ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

#将所需文件放到容器中
#COPY mysql_start.sh /mysql/mysql_start.sh
#COPY schema.sql /mysql/schema.sql
#COPY grant.sql /mysql/grant.sql

#设置容器启动时执行的命令
#CMD ["sh", "/mysql/mysql_start.sh"]


FROM python:3.7.3

MAINTAINER WieAngeal <392815095@qq.com>

WORKDIR /WorkCtyxy
ADD ./ /WorkCtyxy/FlaskWeb
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r /WorkCtyxy/FlaskWeb/requirements.txt


EXPOSE 5000
CMD ["python", "/WorkCtyxy/FlaskWeb/bootstrap_app.py"]
