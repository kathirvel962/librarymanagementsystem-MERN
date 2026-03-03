# PowerShell script to restructure frontend folder
# This moves vite-project content to frontend root

$sourceDir = "D:\LibraryManagementSystemUsingMern\frontend\vite-project"
$destDir = "D:\LibraryManagementSystemUsingMern\frontend"
$backupDir = "D:\LibraryManagementSystemUsingMern\frontend-backup"

Write-Host "Step 1: Creating backup..." -ForegroundColor Green
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}
Copy-Item "$destDir\package-lock.json" "$backupDir\" -Force 2>$null

Write-Host "Step 2: Moving vite-project contents to frontend root..." -ForegroundColor Green
$items = Get-ChildItem -Path $sourceDir -Force
foreach ($item in $items) {
    $dest = Join-Path $destDir $item.Name
    
    if ($item.PSIsContainer) {
        if (Test-Path $dest) {
            Remove-Item $dest -Recurse -Force
        }
        Copy-Item -Path $item.FullName -Destination $destDir -Recurse -Force
    } else {
        Copy-Item -Path $item.FullName -Destination $dest -Force
    }
    Write-Host "  ✓ Copied: $($item.Name)"
}

Write-Host "Step 3: Removing old vite-project folder..." -ForegroundColor Green
Remove-Item $sourceDir -Recurse -Force
Write-Host "  ✓ Deleted: vite-project"

Write-Host "Step 4: Verifying package.json..." -ForegroundColor Green
if (Test-Path "$destDir\package.json") {
    Write-Host "  ✓ SUCCESS: package.json found at frontend root!" -ForegroundColor Cyan
    Get-Content "$destDir\package.json" | ConvertFrom-Json | Select-Object -Property name, version, description | Write-Host
} else {
    Write-Host "  ✗ FAILED: package.json not found" -ForegroundColor Red
}

Write-Host "`nRestructuring complete!" -ForegroundColor Green
Write-Host "New structure:`n  frontend/`n  ├── package.json`n  ├── vite.config.js`n  ├── src/`n  ├── public/`n  ├── dist/`n  └── ..."
