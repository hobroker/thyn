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

__remote_find_port() {
    __remote_run_silent altum util free-port --silent --from ${1}  --to ${2}
}

__read_env() {
    grep "^${1}" ${ENV_FILE} | cut -d '=' -f 2-
}

__get_env_port() {
    local key=${1}
    local from=${2}
    local to=${3}

    # read variable from .env
    local value=$(__read_env ${key})

    if ! [[ -n "$value" ]] || ! [[ "$value" -eq "$value" ]] 2>/dev/null; then
        __remote_find_port ${from} ${to}
    else
        echo ${value}
    fi
}

__decrypt() {
    local in=${1}
    local out=${2}

    echo ${DECRYPTION_PASSWORD} | gpg --batch --passphrase-fd 0 -o ${out} -d ${in}
}

__decrypt_env() {
    local sub_env=${NODE_ENV}
    if [[ ${VERSION} != "master" ]]; then
        sub_env=development
    fi
    __decrypt .secrets/.env.${sub_env}.gpg ${ENV_FILE}
}

setup() {
    __decrypt .secrets/ssh_key.gpg key
    echo -e "Host ${SSH_HOST}\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
    chmod 600 key
    eval "$(ssh-agent -s)"
    ssh-add key
}

prepare() {
    docker-compose down
    __decrypt_env

    export DOCKER_WEB_PORT=`__get_env_port DOCKER_WEB_PORT 3000 4000`
    export DOCKER_MONGO_PORT=`__get_env_port DOCKER_MONGO_PORT 27017 28017`
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

setup
prepare
build
start
info
