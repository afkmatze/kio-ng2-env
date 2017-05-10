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

function list_hook_files() {
  cd "${PROJECT_HOOKS}"
  find . -d 1 -name *.js
}

function install_hooks() {
  cd "${HOOKS_DIR}"
  for hook_script in $(list_hook_files); do
    local hook_name=$(basename "${hook_script}" .js)
    printf 'install "%s" hook\n' "${hook_name}"
    ln -s "../${PROJECT_NAME}/hooks/${hook_script}" "${hook_name}"
  done
}

echo "post install at pwd $(pwd)"
echo "rel dir ${PROJECT_ROOT}"

install_hooks

