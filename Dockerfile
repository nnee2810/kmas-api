FROM node:lts-alpine

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


CMD ["yarn", "start:prod"]