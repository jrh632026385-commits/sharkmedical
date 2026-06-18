@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo 正在打开图标导出页（从 icon.svg 按 1:1 导出 PNG）...
echo 在浏览器中点「一键下载全部 PNG」，将文件保存到 icons 文件夹。
echo.
start "" "%~dp0icons\make-icons.html"
pause
