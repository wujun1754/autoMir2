@echo off
curl -H "deviceUUID:863818023224810" -H "devicePassword:" http://183.249.84.44:9998/device/startOnlineLog?deviceUUID=863818023224810^&maxLineCount=30
:monitor
powershell -Command "$filePath = 'C:\zxwAjUpload\autoJsTools\863818023224810\onlineLog.log'; $lastWriteTime = (Get-Item $filePath).LastWriteTime; while ($true) { $newWriteTime = (Get-Item $filePath).LastWriteTime; if ($newWriteTime -ne $lastWriteTime) { Clear-Host; Get-Content -Path $filePath -Tail 30 -Encoding UTF8; $lastWriteTime = $newWriteTime; } Start-Sleep -Seconds 1; }"
goto monitor