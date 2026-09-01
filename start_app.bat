@echo off
echo ===================================================
echo   Starting AI Farmer Assistant (Backend + Frontend)
echo ===================================================

echo [1/2] Launching FastAPI Backend on http://localhost:8000 ...
start "Farmer Assistant Backend" cmd /k "cd /d %~dp0backend && set KMP_DUPLICATE_LIB_OK=TRUE && python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload"

echo [2/2] Launching Vite Frontend on http://localhost:5173 ...
start "Farmer Assistant Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers launched in separate windows!
echo Open http://localhost:5173 in your browser.
echo ===================================================
pause
