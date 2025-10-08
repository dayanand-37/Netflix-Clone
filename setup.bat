@echo off
echo ========================================
echo    Netflix Clone - Setup Script
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b 1
)

echo.
echo [2/4] Creating uploads directory...
if not exist "uploads" mkdir uploads
if not exist "uploads\images" mkdir uploads\images

echo.
echo [3/4] Seeding database...
call npm run seed
if %errorlevel% neq 0 (
    echo Warning: Database seeding failed. Make sure MongoDB is running.
)

echo.
echo [4/4] Starting backend server...
echo.
echo ========================================
echo    Backend Server Starting...
echo ========================================
echo.
echo If you see any errors, make sure:
echo 1. MongoDB is installed and running
echo 2. Port 5000 is available
echo 3. All dependencies are installed
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
