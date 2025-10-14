@echo off
echo ========================================
echo   Platform Analyser - Complete Setup
echo ========================================
echo.
echo This script will help you complete the deployment!
echo.
echo Step 1: Testing Exports Locally
echo ================================
echo.
echo 1. Starting servers...
start cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak >nul
start cmd /k "cd frontend && npm run dev"
echo.
echo 2. Servers starting in separate windows...
echo    - Backend: http://localhost:5000
echo    - Frontend: http://localhost:3000
echo.
echo 3. Wait 10 seconds for servers to start, then:
timeout /t 10 /nobreak
echo.
echo 4. Opening browser...
start http://localhost:3000
echo.
echo ========================================
echo   TEST THE FOLLOWING:
echo ========================================
echo.
echo [ ] 1. Enter usernames and click "Analyze"
echo [ ] 2. Wait for analysis to complete
echo [ ] 3. Click "Export PDF" - should download PDF
echo [ ] 4. Click "Export Excel" - should download Excel
echo [ ] 5. Click "Share Link" - should show "Link copied!"
echo.
echo If all exports work, you're ready for Step 2!
echo.
echo ========================================
echo   Step 2: Push to GitHub
echo ========================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create new repository: "platform-analyser"
echo 3. Copy your GitHub username
echo.
set /p username="Enter your GitHub username: "
echo.
echo 4. Run these commands:
echo.
echo    git remote add origin https://github.com/%username%/platform-analyser.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo ========================================
echo   Step 3: Deploy (See DEPLOYMENT_GUIDE.md)
echo ========================================
echo.
echo After GitHub push:
echo 1. Deploy backend to Render.com
echo 2. Setup MongoDB Atlas
echo 3. Deploy frontend to Vercel
echo.
echo Full instructions in: DEPLOYMENT_GUIDE.md
echo.
pause
