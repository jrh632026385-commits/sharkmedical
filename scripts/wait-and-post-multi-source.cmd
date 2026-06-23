@echo off
setlocal
cd /d "%~dp0.."
set LOG=data\batch2-multi-source-log.txt
echo [%date% %time%] waiting for multi-source supplement...
:wait
findstr /C:"multi-source supplement done" "%LOG%" >nul 2>&1 && goto done
findstr /C:"exit=" "%LOG%" >nul 2>&1 && goto done
timeout /t 30 /nobreak >nul
goto wait
:done
echo [%date% %time%] supplement finished, running post-multi-source...
call scripts\run-post-multi-source.cmd
echo [%date% %time%] all done
