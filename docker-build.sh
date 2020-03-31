#!/usr/bin/env bash

cd ../
find FlaskWeb -name *.pyc|xargs rm -rf

cd -
docker build -t WieAngeal/FlaskWeb .
docker push WieAngeal/FlaskWeb