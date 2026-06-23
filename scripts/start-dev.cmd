@echo off
cd /d "%~dp0.."
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set WIKIMEDIA_HTTP_PROXY=http://127.0.0.1:7890
if not exist .env if exist data\local.env copy data\local.env .env >nul 2>&1
if not exist .env copy .env.example .env >nul 2>&1
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if not errorlevel 1 (
  echo.
  echo [提示] 端口 3000 已在监听，服务可能已在运行。
  echo 请直接在浏览器打开: http://localhost:3000/
  echo.
  pause
  exit /b 0
)
echo.
echo 鲨鱼医学 · 本地网站
echo   请先保持本窗口打开，再用浏览器访问:
echo   http://localhost:3000/
echo.
echo   不要直接双击 index.html（file:// 无法加载数据）
echo.
node server/index.js
if errorlevel 1 (
  echo.
  echo [错误] 服务未能启动，请把上方报错截图或复制发给我。
)
pause
