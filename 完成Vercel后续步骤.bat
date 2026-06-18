@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   鲨鱼医学 · 完成 Vercel 后续步骤
echo ========================================
echo.

echo [1/3] 推送最新代码到 GitHub ...
git push origin main
if errorlevel 1 (
  echo.
  echo push 失败时：右键「一键推送GitHub.bat」以管理员身份运行
  echo.
) else (
  echo push 成功
)

echo.
echo [2/3] 请在浏览器完成 Vercel 连接 GitHub：
echo   1. 登录 vercel.com
echo   2. 打开项目 shark-medical
echo   3. Settings -^> Git -^> Connect Git Repository
echo   4. 选择 jrh632026385-commits/sharkmedical
echo   5. General 里 Output Directory 设为 .
echo   6. Deployments 等待新部署 Ready
echo.

start https://vercel.com/dashboard
start https://github.com/jrh632026385-commits/sharkmedical/commits/main

echo [3/3] 部署完成后验证：
echo   https://shark-medical.vercel.app/api/auth/status
echo   应含 "build":"session-v2"
echo.
echo   然后无痕打开 /admin/ 用管理员账号登录并保存疾病
echo.
pause
