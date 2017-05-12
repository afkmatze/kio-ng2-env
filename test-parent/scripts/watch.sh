#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
PROJECT_ROOT="$(cd "$(dirname "${0}")/../.."; pwd)"

NODEMON_BIN="${PROJECT_ROOT}/node_modules/.bin/nodemon"
TEST_ROOT="${PROJECT_ROOT}/test-parent"

NPM_COMMAND=${1:-build}

function main() {
  cd "${TEST_ROOT}"
  $NODEMON_BIN -w ./ -w ./node_modules/kio-ng2-env -e ts --exec "npm run ${NPM_COMMAND}"
}

main