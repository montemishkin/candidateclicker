FROM node:4-wheezy

EXPOSE 8000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY build/ /usr/src/app/
COPY src/templates /usr/src/app/templates
COPY package.json /usr/src/app

RUN npm install --production

CMD ["node", "/usr/src/app/index.js", "8000"]
