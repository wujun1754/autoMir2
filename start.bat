@echo off
rem 可以在vscode中设置快捷键 详情见http://doc.zjh336.cn/#/integrate/hz_autojs_tools_box/help/65 
rem 【同步+运行】 ./start.bat
rem 【仅运行】 ./start.bat false
set isSyncProject=%1
if "%isSyncProject%"=="" set isSyncProject=true
curl -H "deviceUUID:863818023224810" -H "devicePassword:" http://192.168.1.3:9998/device/execStartWebProject?deviceUUID=863818023224810^&webScriptDirPath=863818023224810%%2Fmir^&isSyncProject=%isSyncProject%
