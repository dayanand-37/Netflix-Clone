@echo off
echo ========================================
echo    Netflix Clone - Complete Setup
echo ========================================
echo.

echo [1/5] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b 1
)

echo.
echo [2/5] Creating uploads directory...
if not exist "uploads" mkdir uploads
if not exist "uploads\images" mkdir uploads\images

echo.
echo [3/5] Seeding database...
call npm run seed
if %errorlevel% neq 0 (
    echo Warning: Database seeding failed. Make sure MongoDB is running.
    echo Continuing anyway...
)

echo.
echo [4/5] Installing frontend dependencies...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo Warning: Frontend dependencies installation failed.
    echo Continuing anyway...
)

echo.
echo [5/5] Starting both servers...
echo.
echo ========================================
echo    Starting Netflix Clone...
echo ========================================
echo.
echo Backend will start on: http://localhost:5000
echo Frontend will start on: http://localhost:8000
echo.
echo Press Ctrl+C to stop both servers
echo.

start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "node serve.js"

echo.
echo ✅ Both servers are starting...
echo 🌐 Frontend: http://localhost:8000
echo 🔗 Backend API: http://localhost:5000/api
echo.
echo The application will open automatically in your browser.
timeout /t 2 /nobreak >nul
start http://localhost:8000

echo.
echo Press any key to stop all servers...
pause >nul

echo.
echo 🛑 Stopping servers...
taskkill /f /im node.exe >nul 2>&1
echo ✅ All servers stopped.
