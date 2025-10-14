@echo off
echo Starting Platform Analyser...
echo.
echo Starting Python Backend...
start "Python Backend" cmd /k "cd /d %~dp0backend && python app.py"
timeout /t 3 /nobreak >nul
echo.
echo Starting Next.js Frontend...
start "Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
echo.
echo Both servers are starting...
echo Python Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit (servers will keep running in their own windows)
pause >nul
