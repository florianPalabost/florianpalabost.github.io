FROM node:10-alpine as node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm cache clean --force
RUN npm i @angular/cli -g
RUN npm install
COPY . /usr/src/app/
# RUN npm run build

# for dev
EXPOSE 4200
CMD npm run start

# for prod
# FROM nginx:stable-alpine
# COPY --from=node /usr/src/app/dist/portfolio /usr/share/nginx/html
