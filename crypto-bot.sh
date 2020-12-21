#!/bin/sh

NODE=`which node`

run() {
  while true; do
    clear && $NODE modules/bot.js
    sleep 3
  done
}

UNAME=$( command -v uname)
case $( "${UNAME}" | tr '[:upper:]' '[:lower:]') in
  linux*)
    ABSPATH=$(readlink -f $0)
    ABSDIR=$(dirname $ABSPATH)
    cd $ABSDIR; run
    ;;
  darwin*)
    DIR="$(dirname "$(readlink -f "$0")")"
    cd $DIR; run
    ;;
esac
