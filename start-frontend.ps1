# PowerShell script to start the frontend server
Write-Host "✨ Starting Statify Frontend Server..." -ForegroundColor Magenta
Set-Location -Path "$PSScriptRoot\frontend"
npm run dev

