FROM node


MAINTAINER Danilo Aleixo

COPY src/ /data/src/
COPY package.json /data/package.json
COPY angular.json /data/angular.json
COPY tslint.json /data/tslint.json
COPY tsconfig.json /data/tsconfig.json

WORKDIR /data

RUN npm i
RUN ./node_modules/.bin/ng build

