@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   鲨鱼医学 · 同步第二批疾病到线上
echo ========================================
echo.

echo [1/2] 推送代码到 GitHub（触发 Vercel 自动部署）...
git push origin main
if errorlevel 1 (
  echo.
  echo push 失败：请检查网络，或右键「一键推送GitHub.bat」重试
  echo.
  pause
  exit /b 1
)

echo.
echo 等待 Vercel 部署完成（约 1–3 分钟）后按任意键继续...
echo 可在 https://vercel.com/dashboard 查看 Deployments 状态
pause

echo.
echo [2/2] 将 data/site-data.json 写入线上 Redis（214 条疾病）...
echo 默认管理员账号见 .env 或 Vercel 环境变量 ADMIN_USERNAME / ADMIN_PASSWORD
echo.
set RESTORE_URL=https://shark-medical.vercel.app
call npm run restore-all
if errorlevel 1 (
  echo.
  echo 若未连接 Upstash Redis，可跳过此步：git push 后 Vercel 构建会读取仓库内 site-data.json
  echo.
)

echo.
echo 验证：
echo   前台 https://shark-medical.vercel.app/  应显示 214 种疾病
echo   后台 /admin/  筛选「第二批录入疾病」应见 164 条
echo.
pause
