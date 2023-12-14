FROM node:4-wheezy
EXPOSE 8000

ENV APP_DIR="/usr/src/app"

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY build/ $APP_DIR
COPY src/templates $APP_DIR/templates
COPY package.json $APP_DIR

RUN npm install --production

CMD node $APP_DIR/index.js 8000
