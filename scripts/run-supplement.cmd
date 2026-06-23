@echo off
cd /d "%~dp0.."
node scripts\supplement-batch2-galleries-online.mjs > data\batch2-supplement-log.txt 2>&1
echo exit=%ERRORLEVEL%>> data\batch2-supplement-log.txt
