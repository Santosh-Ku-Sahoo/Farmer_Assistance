Write-Host "===================================================" -ForegroundColor Green
Write-Host "  Starting AI Farmer Assistant (Backend + Frontend)" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green

$PSScriptRoot_Local = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "[1/2] Launching FastAPI Backend on http://localhost:8000 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot_Local\backend'; `$env:KMP_DUPLICATE_LIB_OK='TRUE'; python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload"

Write-Host "[2/2] Launching Vite Frontend on http://localhost:5173 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot_Local\frontend'; npm run dev"

Write-Host "`nBoth servers launched! Open http://localhost:5173 in your browser." -ForegroundColor Yellow
