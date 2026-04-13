@echo off
REM Quick GitHub Setup for EventHub

echo.
echo ========================================
echo  EventHub - GitHub Setup Guide
echo ========================================
echo.

REM Check if Git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Git not found. Please install from: https://git-scm.com/download/win
    echo.
    echo After installing Git, run these commands in PowerShell:
    echo.
    echo $env:GITHUB_TOKEN = "your_github_personal_access_token"
    echo node push-to-github.js
    echo.
    echo OR use Git directly:
    pause
) else (
    echo [√] Git is installed
    echo.
    echo Running: git init
    git init
    echo.
    echo Running: git add .
    git add .
    echo.
    echo Running: git commit -m "Initial commit: EventHub - Event Management System"
    git commit -m "Initial commit: EventHub - Event Management System"
    echo.
    echo Running: git remote add origin https://github.com/chandra372/eventhub.git
    git remote add origin https://github.com/chandra372/eventhub.git 2>nul
    echo.
    echo Running: git push -u origin main
    git push -u origin main
    echo.
    echo [√] Done! Your repository is now pushed to GitHub
    echo.
)

pause
