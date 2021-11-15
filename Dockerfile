FROM node:14-alpine

ENV APP_DIR=/app

COPY package.json $APP_DIR/package.json

RUN npm install

RUN cd $APP_DIR

COPY . $APP_DIR

WORKDIR $APP_DIR