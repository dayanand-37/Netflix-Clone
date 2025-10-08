#!/bin/bash

echo "========================================"
echo "   Netflix Clone - Complete Setup"
echo "========================================"
echo

echo "[1/5] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies!"
    exit 1
fi

echo
echo "[2/5] Creating uploads directory..."
mkdir -p uploads/images

echo
echo "[3/5] Seeding database..."
npm run seed
if [ $? -ne 0 ]; then
    echo "Warning: Database seeding failed. Make sure MongoDB is running."
    echo "Continuing anyway..."
fi

echo
echo "[4/5] Installing frontend dependencies..."
cd ..
npm install
if [ $? -ne 0 ]; then
    echo "Warning: Frontend dependencies installation failed."
    echo "Continuing anyway..."
fi

echo
echo "[5/5] Starting both servers..."
echo
echo "========================================"
echo "   Starting Netflix Clone..."
echo "========================================"
echo
echo "Backend will start on: http://localhost:5000"
echo "Frontend will start on: http://localhost:8000"
echo
echo "Press Ctrl+C to stop both servers"
echo

# Start backend in background
cd backend
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
cd ..
node serve.js &
FRONTEND_PID=$!

echo
echo "✅ Both servers are starting..."
echo "🌐 Frontend: http://localhost:8000"
echo "🔗 Backend API: http://localhost:5000/api"
echo
echo "The application will open automatically in your browser."

# Open browser (works on most systems)
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:8000
elif command -v open > /dev/null; then
    open http://localhost:8000
fi

# Wait for user to stop
echo
echo "Press Ctrl+C to stop all servers..."
trap 'echo "🛑 Stopping servers..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo "✅ All servers stopped."; exit 0' INT

# Keep script running
wait
