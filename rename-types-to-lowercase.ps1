Set-Location -Path "src/types"
Write-Host "🔄 Đang đổi tên file trong src/types thành chữ thường..."

Get-ChildItem -File | ForEach-Object {
    $oldName = $_.Name
    $newName = $oldName.ToLower()

    if ($oldName -ne $newName) {
        git mv $oldName $newName
        Write-Host "✅ Đổi: $oldName → $newName"
    }
}

Write-Host "✨ Hoàn tất! Giờ bạn có thể commit và push."
