@echo off
cd /d "%~dp0.."
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set WIKIMEDIA_HTTP_PROXY=http://127.0.0.1:7890
set MAX_GALLERY_IMAGES=20
set MIN_SCORE_OPENI=24
set MIN_SCORE_WIKI=14
set MIN_SCORE_RAD=18
set SUPPLEMENT_DISEASE_TIMEOUT_MS=360000
echo [%date% %time%] round2 supplement resume strict >> data\gallery-round2-log.txt
node scripts\supplement-batch2-multi-source.mjs --all --optimize --max 20 --under 20 --round2 --strict >> data\gallery-round2-log.txt 2>&1
echo exit=%ERRORLEVEL%>> data\gallery-round2-log.txt
if errorlevel 1 exit /b 1
node scripts\fix-gallery-registry-dups.mjs >> data\gallery-round2-log.txt 2>&1
node scripts\post-multi-source-batch2.mjs --all >> data\gallery-round2-log.txt 2>&1
node scripts\repair-duplicate-batch2.mjs --all --max 20 >> data\gallery-round2-log.txt 2>&1
node scripts\validate-batch2-galleries.mjs --all >> data\gallery-round2-log.txt 2>&1
echo [%date% %time%] round2 supplement done >> data\gallery-round2-log.txt
