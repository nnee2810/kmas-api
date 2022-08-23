# build stage
FROM 18.7-alpine AS build

WORKDIR /service

COPY package*.json .

RUN yarn

COPY . .

RUN yarn build

# run stage
FROM build

WORKDIR /service

COPY --from=build /service/dist /dist
COPY .env /ssl ./

CMD ["yarn", "start:prod"]