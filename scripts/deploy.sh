#!/usr/bin/env bash

set -e

NAME="llogger"
AUTHOR="hobroker"
ENV_FILE=".env"
TRAVIS_BRANCH=${TRAVIS_BRANCH}
SSH_HOST=${SSH_HOST}
SSH_USER=${SSH_USER}
DECRYPTION_PASSWORD=${DECRYPTION_PASSWORD}
NODE_ENV=${NODE_ENV}

export VERSION=${TRAVIS_BRANCH}
export DOCKER_HOST=tcp://${SSH_USER}@${SSH_HOST}:2376
export COMPOSE_PROJECT_NAME="${NAME}_${VERSION}"

export TAG="${AUTHOR}/${NAME}"

if [[ ${VERSION} != "master" ]]; then
    export TAG="${AUTHOR}/${NAME}:${VERSION}"
fi

__remote_run_silent() {
    ssh ${SSH_USER}@${SSH_HOST} ${@}
}

# reads the value of a key in .env
__read_env() {
    grep "^${1}" ${ENV_FILE} | cut -d '=' -f 2-
}

__copy_env() {
    cp "envs/${VERSION}${ENV_FILE}" ${ENV_FILE}
}

setup_ssh_key() {
    __decrypt .secrets/ssh_key.gpg key
    echo -e "Host ${SSH_HOST}\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
    chmod 600 key
    eval "$(ssh-agent -s)"
    ssh-add key
}

prepare() {
    docker-compose down
    __copy_env

    export DOCKER_WEB_PORT=`__read_env DOCKER_WEB_PORT`
    export DOCKER_MONGO_PORT=`__read_env DOCKER_MONGO_PORT`
}

build() {
    docker volume create --name=${NAME}-${VERSION}-volume
    docker-compose build --compress --parallel
}

start() {
    docker-compose up -d --renew-anon-volumes
}

info() {
    echo ""
    echo "✅"
    echo "✅ Server up on port: ${DOCKER_WEB_PORT}"
    echo "✅ MongoDB: mongodb://${SSH_HOST}:${DOCKER_MONGO_PORT}/castus-local"
    echo "✅ API: http://lucy.${AUTHOR}.com:${DOCKER_WEB_PORT}/"
    echo "✅"
}

setup_ssh_key
prepare
build
start
info
