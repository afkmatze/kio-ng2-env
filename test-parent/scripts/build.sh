#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
PROJECT_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"

PROJECT_BUILD="${PROJECT_ROOT}/build"

TS_CONFIG="${1:-./tsconfig.release.json}"

build_and_copy(){
  cd "${PROJECT_ROOT}"
  rm -rf "./browser"
  rm -rf "./node"
  rm -rf "./common"
  mkdir -p "${PROJECT_BUILD}"
  tsc -p "${TS_CONFIG}"
  mv ${PROJECT_BUILD}/* .
  rm -rf "${PROJECT_BUILD}"
}


build_and_copy