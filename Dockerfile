FROM node:12.13-alpine AS base
MAINTAINER Igor Leahu

ARG DOCKER_WEB_PORT=8080
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/src/code
COPY package*.json ./

RUN apk add --no-cache git
RUN npm ci

COPY .env ./
COPY src ./src/

EXPOSE $DOCKER_WEB_PORT

CMD ["npm", "start"]
