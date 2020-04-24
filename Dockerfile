FROM node:12

WORKDIR /ftp

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i

COPY . .

CMD npm start