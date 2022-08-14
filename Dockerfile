FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .
RUN yarn build

FROM nginx:stable-alpine

CMD ["yarn", "start:prod"]