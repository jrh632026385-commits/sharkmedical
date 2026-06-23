@echo off
chcp 65001 >nul
cd /d "%~dp0"
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set WIKIMEDIA_HTTP_PROXY=http://127.0.0.1:7890
if not exist node_modules (
  echo 正在安装依赖...
  call npm install
  if errorlevel 1 goto fail
)
if not exist data\site-data.json (
  echo 正在从 index.html 导出初始数据...
  call npm run extract
  if errorlevel 1 goto fail
)
if not exist .env if exist data\local.env copy data\local.env .env >nul 2>&1
if not exist .env copy .env.example .env >nul 2>&1
netstat -ano | findstr /R /C:":3000 .*LISTENING" >nul 2>&1
if not errorlevel 1 (
  echo.
  echo [提示] 端口 3000 已在监听，服务可能已在运行。
  echo 请直接在浏览器打开: http://localhost:3000/
  echo 若仍打不开，请先关闭旧的服务窗口后再重新运行本脚本。
  echo.
  pause
  exit /b 0
)
echo.
echo 启动鲨鱼医学后台服务...
echo 前台: http://localhost:3000/
echo 后台: http://localhost:3000/admin/
echo.
echo [重要] 请保持本窗口打开；关闭窗口即停止服务。
echo.
call npm run dev
if errorlevel 1 goto fail
pause
exit /b 0

:fail
echo.
echo [错误] 服务未能启动，请把上方报错截图或复制发给我。
pause
exit /b 1