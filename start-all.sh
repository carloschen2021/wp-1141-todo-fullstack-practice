#!/bin/bash

# Start All - Launch Frontend and Backend Servers
# This script starts both the frontend and backend development servers concurrently

echo "🚀 Starting Todo Fullstack Application..."
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && yarn install && cd ..
fi

echo ""
echo "✅ Dependencies ready!"
echo ""
echo "🔧 Starting servers..."
echo "   - Backend: http://localhost:3000"
echo "   - Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Start both servers concurrently
# Using trap to ensure both processes are killed when script exits
trap 'kill $(jobs -p) 2>/dev/null' EXIT

# Start backend server in background
cd backend && npm run dev &
BACKEND_PID=$!

# Start frontend server in background
cd frontend && yarn dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
