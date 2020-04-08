#!/usr/bin/env bash

set -e

NAME="thyn"
AUTHOR="hobroker"
ENV_FILE=".env"
TRAVIS_BRANCH=${TRAVIS_BRANCH}
NODE_ENV=${NODE_ENV}
DOCKER_HOST=${DOCKER_HOST}
GITHUB_TOKEN=${GITHUB_TOKEN}

export VERSION=${TRAVIS_BRANCH}
export COMPOSE_PROJECT_NAME="${NAME}_${VERSION}"

export TAG="${AUTHOR}/${NAME}"

if [[ ${VERSION} != "master" ]]; then
    export TAG="${AUTHOR}/${NAME}:${VERSION}"
fi

# reads the value of a key in .env
__read_env() {
    grep "^${1}" ${ENV_FILE} | cut -d '=' -f 2-
}

__copy_env() {
    cp "envs/${VERSION}${ENV_FILE}" ${ENV_FILE}
}

prepare() {
    docker-compose down
    __copy_env
    if [[ -z "${GITHUB_TOKEN}" ]]; then
        exit "GITHUB_TOKEN is required"
    else
        echo "GITHUB_TOKEN=${GITHUB_TOKEN}" >> ${ENV_FILE}
    fi
}

build() {
    ls -la src/util
    docker-compose build --compress --parallel
}

start() {
    docker-compose up -d --renew-anon-volumes
}

info() {
    docker ps -a

    echo "✅ DONE"
}

prepare
build
start
info
