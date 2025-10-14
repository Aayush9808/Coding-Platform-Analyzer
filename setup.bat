@echo off
echo ============================================
echo   Platform Analyser - Quick Start Script
echo ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js found: 
node --version
echo.

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)

echo [✓] npm found:
npm --version
echo.

echo ============================================
echo   Step 1: Installing Root Dependencies
echo ============================================
echo.

call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Step 2: Installing Backend Dependencies
echo ============================================
echo.

cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)

:: Create .env if it doesn't exist
if not exist .env (
    echo [INFO] Creating backend .env file...
    copy .env.example .env >nul
    echo [✓] Backend .env created! Please edit it with your settings.
)

cd ..

echo.
echo ============================================
echo   Step 3: Installing Frontend Dependencies
echo ============================================
echo.

cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)

:: Create .env.local if it doesn't exist
if not exist .env.local (
    echo [INFO] Creating frontend .env.local file...
    copy .env.local.example .env.local >nul
    echo [✓] Frontend .env.local created!
)

cd ..

echo.
echo ============================================
echo   ✅ Installation Complete!
echo ============================================
echo.
echo Next Steps:
echo 1. Make sure MongoDB is running (port 27017)
echo 2. (Optional) Start Redis (port 6379)
echo 3. Edit backend/.env with your configuration
echo 4. Run 'npm run dev' to start both servers
echo.
echo Or run the servers separately:
echo   - Backend: cd backend ^&^& npm run dev
echo   - Frontend: cd frontend ^&^& npm run dev
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
