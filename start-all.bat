@echo off
REM Start All - Launch Frontend and Backend Servers
REM This script starts both the frontend and backend development servers concurrently

echo.
echo ========================================
echo   Todo Fullstack Application Launcher
echo ========================================
echo.

REM Check if backend dependencies are installed
if not exist "backend\node_modules\" (
    echo [1/4] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
) else (
    echo [1/4] Backend dependencies OK
)

REM Check if frontend dependencies are installed
if not exist "frontend\node_modules\" (
    echo [2/4] Installing frontend dependencies...
    cd frontend
    call yarn install
    cd ..
) else (
    echo [2/4] Frontend dependencies OK
)

echo.
echo [3/4] Starting servers...
echo    - Backend:  http://localhost:3000
echo    - Frontend: http://localhost:5173
echo.
echo [4/4] Press Ctrl+C to stop all servers
echo.
echo ========================================
echo.

REM Start both servers in separate windows
start "Backend Server" cmd /k "cd backend && npm run dev"
start "Frontend Server" cmd /k "cd frontend && yarn dev"

echo.
echo Servers started in separate windows!
echo Close the terminal windows to stop the servers.
echo.
pause
