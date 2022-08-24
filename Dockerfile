# build stage
FROM node:18.7-alpine AS build

WORKDIR /service

COPY package*.json .

RUN yarn

COPY . .

RUN yarn build

# production stage
FROM node:18.7-alpine

WORKDIR /service

COPY --from=build /service/node_modules /node_modules
COPY --from=build /service/dist /dist
COPY /ssl /ssl
COPY .prod.env package.json /

CMD ["yarn", "start:prod"]