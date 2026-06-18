@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist node_modules (
  echo 正在安装依赖...
  call npm install
)
if not exist data\site-data.json (
  echo 正在从 index.html 导出初始数据...
  call npm run extract
)
if not exist .env copy .env.example .env
echo.
echo 启动鲨鱼医学后台服务...
echo 前台: http://localhost:3000/
echo 后台: http://localhost:3000/admin/
echo.
call npm run dev
