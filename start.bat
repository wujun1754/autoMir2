@echo off
rem 可以在vscode中设置快捷键 详情见http://doc.zjh336.cn/#/integrate/hz_autojs_tools_box/help/65 
rem 【同步+运行】 ./start.bat
rem 【仅运行】 ./start.bat false
set isSyncProject=%1
if "%isSyncProject%"=="" set isSyncProject=true
curl -H "deviceUUID:86227478597773" -H "devicePassword:" http://183.249.84.44:9998/device/execStartWebProject?deviceUUID=86227478597773^&webScriptDirPath=86227478597773%%2Fmir^&isSyncProject=%isSyncProject%
