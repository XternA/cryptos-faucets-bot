@echo off

cd "%~dp0"

:loop
cls && node modules\bot.js
timeout 3

goto loop