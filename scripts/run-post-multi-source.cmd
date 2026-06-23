@echo off
cd /d "%~dp0.."
node scripts\post-multi-source-batch2.mjs > data\batch2-post-multi-source-log.txt 2>&1
echo exit=%ERRORLEVEL%>> data\batch2-post-multi-source-log.txt
type data\batch2-post-multi-source-log.txt
