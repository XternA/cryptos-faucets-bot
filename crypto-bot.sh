#!/bin/sh

ABSPATH=$(readlink -f $0)
ABSDIR=$(dirname $ABSPATH)

cd $ABSDIR

while true; do
    clear && node modules/bot.js
    sleep 3
done
