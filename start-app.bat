@echo off
echo Installing dependencies...
bun install

if errorlevel 1 (
    echo Installation failed! Exiting...
    pause
    exit /b 1
)

echo Checking if build is needed...
if not exist ".next" (
    echo No build found, building first...
    bun --bun run build
    
    if errorlevel 1 (
        echo Build failed! Exiting...
        pause
        exit /b 1
    )
)

echo Starting the application in separate window...
start "Exxon Server" cmd /k "bun --bun start"

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo Opening localhost:3000 in browser...
start "" "http://localhost:3000"

timeout /t 2 /nobreak >nul

echo Focusing on browser window...
powershell -command "Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.Interaction]::AppActivate((Get-Process | Where-Object {$_.MainWindowTitle -like '*localhost:3000*'}).Id)"

echo Application server is running in separate window! Close the server window to stop.
pause 