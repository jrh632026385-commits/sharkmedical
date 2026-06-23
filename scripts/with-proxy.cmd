@echo off
rem 为 Node 脚本注入本地 HTTP 代理（Clash 默认 7890）
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=http://127.0.0.1:7890
set WIKIMEDIA_HTTP_PROXY=http://127.0.0.1:7890
%*
