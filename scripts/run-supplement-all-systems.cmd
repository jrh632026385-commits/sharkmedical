@echo off
cd /d "%~dp0.."
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set WIKIMEDIA_HTTP_PROXY=http://127.0.0.1:7890
set MAX_GALLERY_IMAGES=20
set ALLOW_UNLICENSED=1
set SUPPLEMENT_DISEASE_TIMEOUT_MS=360000
echo [%date% %time%] supplement-all-systems start >> data\gallery-supplement-all-log.txt
node scripts\supplement-batch2-multi-source.mjs --all --optimize --max 20 --under 20 --strict >> data\gallery-supplement-all-log.txt 2>&1
echo pass1 exit=%ERRORLEVEL%>> data\gallery-supplement-all-log.txt
if errorlevel 1 exit /b 1
node scripts\supplement-batch2-multi-source.mjs --all --optimize --max 20 --under 20 --round2 --strict >> data\gallery-supplement-all-log.txt 2>&1
echo pass2 exit=%ERRORLEVEL%>> data\gallery-supplement-all-log.txt
node scripts\prune-all-galleries.mjs >> data\gallery-supplement-all-log.txt 2>&1
node scripts\post-multi-source-batch2.mjs --all >> data\gallery-supplement-all-log.txt 2>&1
node scripts\repair-non-imaging-galleries.mjs --max 20 >> data\gallery-supplement-all-log.txt 2>&1
node scripts\repair-duplicate-batch2.mjs --all --max 20 >> data\gallery-supplement-all-log.txt 2>&1
node scripts\validate-batch2-galleries.mjs --all >> data\gallery-supplement-all-log.txt 2>&1
node scripts\generate-site-lite.mjs >> data\gallery-supplement-all-log.txt 2>&1
echo [%date% %time%] supplement-all-systems done >> data\gallery-supplement-all-log.txt
