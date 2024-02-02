FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY tsconfig.json tsconfig.json
COPY next.config.js next.config.js
COPY src src
COPY public public

RUN npm run build

CMD npm start