#!/usr/bin/env bash

# --export will print the key/values from parameters.json according to the current branch
# --env will build the .env

set -e

PARAMETERS_FILE="config/parameters.json"
BRANCH=${CIRCLE_BRANCH:-stage}
FILE_INPUT="config/template.env"

echo_vars() {
  [[ "$*" == "--export" ]] && LINE_PREFIX="export " || LINE_PREFIX=""
  JQ_KEY_VALUE='keys[] as $k | "\($k)=\(.[$k])"'

  cat ${PARAMETERS_FILE} | jq -r ".${BRANCH} | ${JQ_KEY_VALUE}" | sed -e "s/^/${LINE_PREFIX}/"
}

if [[ "$*" == "--env" ]]
then
  eval `echo_vars`
  eval "echo \"$(< $FILE_INPUT)\""
else
  echo_vars
fi
