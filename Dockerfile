FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .
RUN yarn build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["yarn", "start:prod"]