#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
PROJECT_ROOT="$(cd "$(dirname "${0}")/.."; pwd)"
PROJECT_NAME="$(basename "${PROJECT_ROOT}")"

PARENT_MODULE_ROOT="$(cd "${PROJECT_ROOT}/../.."; pwd)"

NODE_MODULES="${PARENT_MODULE_ROOT}/node_modules"

if [[ ! -d "${NODE_MODULES}" ]]; then
  NODE_MODULES="${PROJECT_ROOT}/node_modules"
fi

HOOKS_DIR="${NODE_MODULES}/.hooks"
PROJECT_HOOKS="${PROJECT_ROOT}/hooks"

if [[ ! -d "${HOOKS_DIR}" ]]; then
  mkdir -p "${HOOKS_DIR}"
fi


function install_hooks() {
  cd "${HOOKS_DIR}"
  echo scp "${PROJECT_HOOKS}/prebuild.sh" "${HOOKS_DIR}/prebuild"
  scp "${PROJECT_HOOKS}/prebuild.sh" "${HOOKS_DIR}/prebuild"
  chmod +x ./prebuild
}

echo "post install at pwd $(pwd)"
echo "rel dir ${PROJECT_ROOT}"

#install_hooks

