@echo off
cd /d "%~dp0.."
node scripts\supplement-batch2-multi-source.mjs --max 6 > data\batch2-multi-source-log.txt 2>&1
echo exit=%ERRORLEVEL%>> data\batch2-multi-source-log.txt
