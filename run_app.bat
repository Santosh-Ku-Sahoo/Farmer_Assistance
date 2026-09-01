@echo off
title AI Farmer Assistant (କୃଷକ ସହାୟକ)
echo ========================================================
echo   Starting AI Farmer Assistant (FastAPI + Vite React)
echo ========================================================

echo [1/2] Launching FastAPI Backend on http://127.0.0.1:8000 ...
start "FastAPI Backend" cmd /k "cd backend && set KMP_DUPLICATE_LIB_OK=TRUE && C:\Users\asus\anaconda3\python.exe -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Launching Vite Frontend on http://localhost:5173 ...
start "Vite Dev Server" cmd /k "cd frontend && npm run dev -- --host 0.0.0.0 --port 5173"

echo.
echo ========================================================
echo   Both servers launched successfully!
echo   Web App URL: http://localhost:5173
echo   Backend API: http://127.0.0.1:8000/docs
echo ========================================================
