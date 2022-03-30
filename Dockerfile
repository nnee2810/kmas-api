FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .
RUN yarn build

CMD ["yarn", "start:prod"]