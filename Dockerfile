#FROM docker.pkg.github.com/WieAngeal/mirrors/python36:alpine
MAINTAINER WieAngeal <392815095@qq.com>

WORKDIR /WorkCtyxy
ADD ./ /WorkCtyxy/FlaskWeb

RUN pip install -r /WorkCtyxy/FlaskWeb/requirements.txt

EXPOSE 5000
CMD ["python", "/WorkCtyxy/FlaskWeb/bootstrap_app.py"]
