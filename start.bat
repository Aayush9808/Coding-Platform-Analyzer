@echo off
echo ============================================
echo   Starting Platform Analyser
echo ============================================
echo.

:: Check if MongoDB is running
echo [INFO] Checking MongoDB connection...
timeout /t 1 >nul

:: Start backend and frontend concurrently
echo [INFO] Starting Backend and Frontend servers...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop all servers
echo.

start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 >nul
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo [✓] Servers are starting...
echo [✓] Backend: http://localhost:5000
echo [✓] Frontend: http://localhost:3000
echo.
echo Check the opened terminal windows for logs.
echo.
pause
