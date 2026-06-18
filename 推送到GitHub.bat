@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   鲨鱼医学 · 推送到 GitHub（Vercel 第一步）
echo ========================================
echo.

where gh >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 GitHub CLI，请先安装：https://cli.github.com/
  pause
  exit /b 1
)

gh auth status >nul 2>&1
if errorlevel 1 (
  echo [提示] 尚未登录 GitHub，即将打开登录流程...
  echo        请选择：GitHub.com - HTTPS - 浏览器登录
  echo.
  gh auth login
  if errorlevel 1 (
    echo [错误] 登录失败
    pause
    exit /b 1
  )
)

set "REPO_NAME=shark-medical"
echo.
set /p REPO_NAME=仓库名称（直接回车使用 %REPO_NAME%）: 
if "%REPO_NAME%"=="" set "REPO_NAME=shark-medical"

echo.
echo 正在创建 GitHub 仓库并推送（公开）...
gh repo create "%REPO_NAME%" --public --source=. --remote=origin --push
if errorlevel 1 (
  echo.
  echo [提示] 若仓库已存在，可手动执行：
  echo   git remote add origin https://github.com/你的用户名/%REPO_NAME%.git
  echo   git push -u origin main
  pause
  exit /b 1
)

echo.
echo [完成] 代码已推送到 GitHub
gh repo view --web 2>nul
echo.
echo 下一步：打开 Vercel → Import 该仓库 → Redeploy
echo Output Directory 请设为 . （不是 public）
pause
