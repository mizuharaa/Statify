# PowerShell script to start the backend server
Write-Host "🎵 Starting Statify Backend Server..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend"
npm start

