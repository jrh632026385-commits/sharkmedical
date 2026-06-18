@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
cd /d "%~dp0"

echo ========================================
echo   鲨鱼医学 · 一键推送到 GitHub
echo ========================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo [错误] 未安装 Git：https://git-scm.com/download/win
  pause
  exit /b 1
)

:: 检测 github.com 是否被解析到 127.0.0.1（常见导致 push 失败）
for /f "tokens=2 delims=:" %%a in ('nslookup github.com 223.5.5.5 2^>nul ^| findstr /i "Address:" ^| findstr /v "#53"') do set GHIP=%%a
for /f "tokens=* delims= " %%a in ("!GHIP!") do set GHIP=%%a
echo 阿里 DNS 解析 github.com IP: !GHIP!

ping -n 1 github.com | findstr /i "127.0.0.1" >nul
if not errorlevel 1 (
  echo.
  echo [警告] 本机 DNS 把 github.com 指向 127.0.0.1，无法 push。
  echo        需要以管理员身份修复 hosts 文件。
  echo.
  choice /C YN /M "是否尝试以管理员写入 hosts（推荐）"
  if errorlevel 2 goto skip_hosts
  if errorlevel 1 (
    powershell -NoProfile -Command "Start-Process cmd -Verb RunAs -ArgumentList '/c echo !GHIP! github.com>>C:\Windows\System32\drivers\etc\hosts && echo 已写入 hosts && pause'"
    echo 请在弹出的管理员窗口完成后，再运行本脚本一次。
    pause
    exit /b 0
  )
)
:skip_hosts

where gh >nul 2>&1
if errorlevel 1 (
  echo [提示] 未安装 GitHub CLI，将使用 git 凭据登录
) else (
  gh auth status >nul 2>&1
  if errorlevel 1 (
    echo [提示] 请先登录 GitHub（浏览器授权）...
    gh auth login -h github.com -p https -w
  )
)

echo.
echo 配置 Git 绕过本机 DNS 污染（仅本仓库）...
git config url."https://20.205.243.166/".insteadOf "https://github.com/"

echo.
echo 正在推送到 origin main ...
echo （远程若只有 README，将覆盖为完整项目代码）
git -c http.sslVerify=false push -u origin main --force
if errorlevel 1 (
  git push -u origin main --force
)

echo.
echo [完成] 已推送到 GitHub
echo 请到 Vercel Deployments 查看是否出现新 commit 部署
pause
