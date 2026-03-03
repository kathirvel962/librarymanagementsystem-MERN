$sourceDir = "D:\LibraryManagementSystemUsingMern\frontend\vite-project"
$destDir = "D:\LibraryManagementSystemUsingMern\frontend"

Write-Host "Restructuring frontend folder..." -ForegroundColor Green

# Step 1: Copy all files from vite-project to frontend
Write-Host "Copying files..."
Get-ChildItem -Path $sourceDir -Force | ForEach-Object {
    $dest = Join-Path $destDir $_.Name
    if ($_.PSIsContainer) {
        if (Test-Path $dest) {
            Remove-Item $dest -Recurse -Force
        }
    }
    Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
    Write-Host "  ✓ $($_.Name)"
}

# Step 2: Remove old vite-project folder
Write-Host "Removing vite-project folder..."
Remove-Item $sourceDir -Recurse -Force

# Step 3: Verify
Write-Host "`nVerification:" -ForegroundColor Cyan
if (Test-Path "$destDir\package.json") {
    Write-Host "✓ SUCCESS: package.json found at frontend root" -ForegroundColor Green
} else {
    Write-Host "✗ ERROR: package.json not found" -ForegroundColor Red
}
