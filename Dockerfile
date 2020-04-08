FROM node:12.13-alpine AS base
LABEL maintainer="igor.leahu24@gmail.com"

ARG DOCKER_WEB_PORT=8080
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN ${GITHUB_TOKEN}

WORKDIR /usr/src/code
COPY package*.json ./
COPY .env ./
COPY src ./src/

RUN apk add --no-cache git=2.22.2-r0
RUN rm -rf /var/cache/apk/*

RUN npm ci

EXPOSE $DOCKER_WEB_PORT

CMD ["npm", "start"]
