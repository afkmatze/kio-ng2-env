#!/usr/bin/env bash

SCRIPT_PATH="$(dirname "${0}")"
SCRIPT_FILE="$(basename "${0}")"
BIN_DIR="$(cd "$(dirname "${0}")/../.bin"; pwd)"


${BIN_DIR}/kio-env-build-inc