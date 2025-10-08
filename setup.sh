#!/bin/bash

echo "========================================"
echo "   Netflix Clone - Setup Script"
echo "========================================"
echo

echo "[1/4] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies!"
    exit 1
fi

echo
echo "[2/4] Creating uploads directory..."
mkdir -p uploads/images

echo
echo "[3/4] Seeding database..."
npm run seed
if [ $? -ne 0 ]; then
    echo "Warning: Database seeding failed. Make sure MongoDB is running."
fi

echo
echo "[4/4] Starting backend server..."
echo
echo "========================================"
echo "   Backend Server Starting..."
echo "========================================"
echo
echo "If you see any errors, make sure:"
echo "1. MongoDB is installed and running"
echo "2. Port 5000 is available"
echo "3. All dependencies are installed"
echo
echo "Press Ctrl+C to stop the server"
echo

npm start
