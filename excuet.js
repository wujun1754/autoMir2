toastLog("初始化文件中...")
// 更新配置 https://lemeifenqi.com/api/api/downloadmir
let url = "http://183.249.91.105:8001/api/api/downloadmir"; // 替换为你的下载链接
let savePath = "/sdcard/Download/mir.zip";
let extractPath = "/sdcard/Download/";

// 下载 zip 文件
function downloadZip() {
    let res = http.get(url);
    if (res.statusCode == 200) {
        files.writeBytes(savePath, res.body.bytes());
        toastLog("下载完成");
        return true;
    } else {
        toastLog("下载失败：" + res.statusCode);
        return false;
    }
}

// 解压 zip 文件
function unzipFile(zipPath, outputDir) {
    importClass(java.io.File);
    importClass(java.util.zip.ZipFile);
    let zipFile = new ZipFile(zipPath);
    let entries = zipFile.entries();
    while (entries.hasMoreElements()) {
        let entry = entries.nextElement();
        let file = new File(outputDir, entry.getName());
        if (entry.isDirectory()) {
            file.mkdirs();
        } else {
            file.getParentFile().mkdirs();
            let input = zipFile.getInputStream(entry);
            let output = new java.io.FileOutputStream(file);
            let buffer = util.java.array('byte', 1024);
            let length;
            while ((length = input.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
            input.close();
            output.close();
        }
    }
    zipFile.close();
    toastLog("解压完成");
}

// 执行更新
if (downloadZip(url, savePath)) {
    unzipFile(savePath, extractPath);
    toastLog("运行新脚本中...");
    sleep(1000);
    engines.execScriptFile(extractPath + "main.js"); // 你主脚本的名称
    //exit();
}

