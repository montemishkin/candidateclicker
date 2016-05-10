FROM nginx:stable
EXPOSE 80

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY config/nginx /etc/nginx/nginx.conf
COPY public/ /usr/src/app/static
