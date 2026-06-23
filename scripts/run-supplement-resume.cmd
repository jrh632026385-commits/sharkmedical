@echo off
cd /d "%~dp0.."
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set WIKIMEDIA_HTTP_PROXY=http://127.0.0.1:7890
set MAX_GALLERY_IMAGES=20
set SUPPLEMENT_DISEASE_TIMEOUT_MS=360000
rem 原任务第 349/1125 项：dig-paralytic-ileus（麻痹性肠梗阻）
set FROM_TYPE=%~1
if "%FROM_TYPE%"=="" set FROM_TYPE=dig-paralytic-ileus
set SUPPLEMENT_BATCH_OFFSET=348
set SUPPLEMENT_BATCH_TOTAL=1125
echo [%date% %time%] supplement-resume from=%FROM_TYPE% batch-offset=348 batch-total=1125 start >> data\gallery-supplement-all-log.txt
node scripts\supplement-batch2-multi-source.mjs --all --optimize --max 20 --under 20 --from-type %FROM_TYPE% >> data\gallery-supplement-all-log.txt 2>&1
echo resume pass1 exit=%ERRORLEVEL%>> data\gallery-supplement-all-log.txt
if errorlevel 1 exit /b 1
node scripts\supplement-batch2-multi-source.mjs --all --optimize --max 20 --under 20 --round2 --strict >> data\gallery-supplement-all-log.txt 2>&1
echo resume pass2 exit=%ERRORLEVEL%>> data\gallery-supplement-all-log.txt
node scripts\post-multi-source-batch2.mjs --all >> data\gallery-supplement-all-log.txt 2>&1
node scripts\repair-non-imaging-galleries.mjs --max 20 >> data\gallery-supplement-all-log.txt 2>&1
node scripts\repair-duplicate-batch2.mjs --all --max 20 >> data\gallery-supplement-all-log.txt 2>&1
node scripts\validate-batch2-galleries.mjs --all >> data\gallery-supplement-all-log.txt 2>&1
node scripts\generate-site-lite.mjs >> data\gallery-supplement-all-log.txt 2>&1
echo [%date% %time%] supplement-resume done >> data\gallery-supplement-all-log.txt
