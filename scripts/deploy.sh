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

down_to_hell() {
    docker-compose down -v --remove-orphans
}

prepare_env() {
    __copy_env
    if [[ -z "${GITHUB_TOKEN}" ]]; then
        exit "GITHUB_TOKEN is required"
    else
        echo "GITHUB_TOKEN=${GITHUB_TOKEN}" >> ${ENV_FILE}
    fi
}

build() {
    docker-compose build --compress --parallel
}

up_to_heaven() {
    docker-compose up -d --renew-anon-volumes
}

when_its_all_over() {
    docker ps -a

    echo "✅ DONE"
}

down_to_hell
prepare_env
build
up_to_heaven
when_its_all_over
