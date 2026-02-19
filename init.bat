@echo off
echo Starting development server...
echo.

cd /d "%~dp0"

if not exist "package.json" (
    echo package.json not found. Please run npm install first.
    pause
    exit /b 1
)

echo Running npm run dev...
npm run dev
