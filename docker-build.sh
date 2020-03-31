#!/usr/bin/env bash

cd ../
find flaskapp -name *.pyc|xargs rm -rf

cd -
docker build -t WieAngeal/flaskapp .
docker push WieAngeal/flaskapp