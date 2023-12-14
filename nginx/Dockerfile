FROM nginx:stable
EXPOSE 80

ENV APP_DIR="/usr/src/app"

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY config/nginx /etc/nginx/nginx.conf
COPY public/ $APP_DIR/static
