#FROM docker.pkg.github.com/WieAngeal/mirrors/python36:alpine
FROM mysql:5.7.29
FROM python:3.7.3

MAINTAINER WieAngeal <392815095@qq.com>

WORKDIR /WorkCtyxy
ADD ./ /WorkCtyxy/FlaskWeb
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
#RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r /WorkCtyxy/FlaskWeb/requirements.txt

RUN pip install -r /WorkCtyxy/FlaskWeb/requirements.txt


EXPOSE 5000
CMD ["python", "/WorkCtyxy/FlaskWeb/bootstrap_app.py"]
