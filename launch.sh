#!/bin/sh
FILE=$(realpath "${BASH_SOURCE[0]}")
DIR="$( cd "$( dirname "$FILE")" >/dev/null 2>&1 && pwd )"
cd "$DIR"
yarn app
