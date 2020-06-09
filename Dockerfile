FROM node:12.13-alpine AS base
LABEL maintainer="igor.leahu24@gmail.com"

ARG DOCKER_WEB_PORT=8080
ENV NODE_ENV production

WORKDIR /usr/src/code
COPY package*.json ./

RUN apk add --no-cache git
RUN rm -rf /var/cache/apk/*

RUN npm ci

COPY src ./src/

EXPOSE $DOCKER_WEB_PORT

CMD ["npm", "start"]
