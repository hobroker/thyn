#!/usr/bin/env bash

set -e

PARAMETERS_FILE="config/parameters.json"
BRANCH=${CIRCLE_BRANCH:-stage}

[[ "$*" == "--export" ]] && LINE_PREFIX="export " || LINE_PREFIX=""

JQ_EXPORT='keys[] as $k | "\($k)=\(.[$k])"'

cat ${PARAMETERS_FILE} | jq -r ".${BRANCH} | ${JQ_EXPORT}" | sed -e "s/^/${LINE_PREFIX}/"
