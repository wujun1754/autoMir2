
/*
 * @Author: 字节飞舞
 * @QQ: 175417739@qq.com
 * @Date: 2025-04-11 04:22:04
 * @Version: Auto.Js Pro
 * @Description: 
 */

auto.waitFor()// 等待无障碍服务开启
if (!floaty.checkPermission()) {
    toast("请开启悬浮窗权限！");
    floaty.requestPermission();
    exit();
}

// 配置类
let config = require("./common/config.js")
// 工具类
let utils = require("./common/utils.js")
// 公共储存对象
var commonStorage = storages.create("zjh336.cn" + config.commonScriptKey);
// 业务储存对象
var serviceStorage = storages.create("zjh336.cn" + config.serviceScriptKey);
let MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');
let ocr = new MLKitOCR();
let ocrPladderOCR = $ocr.create()
var tools = {
    悬浮球描述: (text) => {
        ui.run(() => {
            window.eventText.setText(text);
        });
    },
    人物移动: {
        右走一步: (duration) => {
            if (duration > 0) {
                let fbl = `${device.width}_${device.height}`;
                let p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gestures(
                    [0, duration, [p.x - dx1, p.y - dx1], [p.x + dx2, p.y + dx1]]
                );
            }
        },
        左走一步: (duration) => {
            if (duration > 0) {
                var fbl = `${device.width}_${device.height}`;
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gestures(
                    [0, duration, [p.x - dx1, p.y - dx1], [p.x - dx2, p.y + dx1]]
                );
            }
        },
        上走一步: (duration) => {
            if (duration > 0) {
                var fbl = `${device.width}_${device.height}`;
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gestures(
                    [0, duration, [p.x - dx1, p.y - dx1], [p.x + dx1, p.y - dx2]]
                );
            }
        },
        下走一步: (duration) => {
            if (duration > 0) {
                var fbl = `${device.width}_${device.height}`;
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gestures(
                    [0, duration, [p.x - dx1, p.y - dx1], [p.x + dx1, p.y + dx2]]
                );
            }
        },
        比奇安全区到小贩: (人物坐标) => {
            var 比奇小贩坐标 = config.zuobiao.比奇小贩坐标;
            if (比奇小贩坐标.x > 人物坐标.x) {
                tools.人物移动.右走一步((比奇小贩坐标.x - 人物坐标.x) * 1000)
                sleep(600)
            } else {
                tools.人物移动.左走一步((人物坐标.x - 比奇小贩坐标.x) * 1000)
                sleep(600)
            }
            if (比奇小贩坐标.y > 人物坐标.y) {
                tools.人物移动.下走一步((比奇小贩坐标.y - 人物坐标.y) * 1000)
                sleep(600)
            } else {
                tools.人物移动.上走一步((人物坐标.y - 比奇小贩坐标.y) * 1000)
                sleep(600)
            }
        },
        判断到达比奇小贩: () => {
            var 比奇小贩坐标 = config.zuobiao.比奇小贩坐标;
            var 人物坐标 = tools.人物坐标();
            var 当前地图 = tools.人物所在地图();
            if (当前地图 != null && 人物坐标 != null && 当前地图 == "比奇城" && Math.abs(人物坐标.x - 比奇小贩坐标.x) <= 2 && Math.abs(人物坐标.y - 比奇小贩坐标.y) <= 2) {
                return true;
            }
            else {
                return false;
            }
        },
        去比奇小贩Loop: () => {
            while (true) {
                var 人物坐标 = tools.人物坐标();
                var 当前地图 = tools.人物所在地图();
                if (人物坐标 != null && 当前地图 != null) {
                    var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
                    if (当前地图 == "比奇城" && 人物坐标.x > 安全区坐标范围.x1 - 30 && 人物坐标.x < 安全区坐标范围.x2 + 30 && 人物坐标.y > 安全区坐标范围.y1 - 30 && 人物坐标.y < 安全区坐标范围.y2 + 30) {
                        tools.人物移动.比奇安全区到小贩(人物坐标);
                        var 比奇小贩坐标 = config.zuobiao.比奇小贩坐标;
                        if (Math.abs(当前地图.x - 比奇小贩坐标.x) <= 2 && Math.abs(当前地图.y - 比奇小贩坐标.y) <= 2) {
                            toastLog("到达小贩NPC");
                            break;
                        }
                        else {
                            toastLog("未找到小贩NPC");
                        }
                        // var 比奇小贩NPC = tools.findImage("biqixiaofan.png");//这个图片不行，和比奇老兵会混淆
                        // if (比奇小贩NPC.status) {
                        //     toastLog("到达小贩NPC");
                        //     var x = 比奇小贩NPC.img.x + (比奇小贩NPC.size.w / 2) + random(-8, 8);
                        //     var y = 比奇小贩NPC.img.y + (比奇小贩NPC.size.h / 2) + random(-4, 4);
                        //     click(x, y)
                        //     break;
                        // }
                        // else{
                        //     toastLog("未找到比奇小贩NPC");
                        // }
                    }
                    else {
                        tools.人物移动.去比奇老兵Loop();
                    }

                }
                sleep(5000)
            }
        },
        去比奇老兵: () => {
            var 当前地图 = tools.人物所在地图();
            if (当前地图 == null || 当前地图 == "") {
                toastLog(`当前地图未知`);
                return false;
            }
            else {
                tools.打开大地图();
                sleep(1000);
            }
            var closeBtn = tools.findImage("closeBtn.png");
            if (closeBtn.status) {
                var fbl = `${device.width}_${device.height}`;
                var closeImg = closeBtn.img;
                if (当前地图 == "兽人古墓三层") {
                    var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第三层.兽人古墓二层;
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(1000);

                    r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓一层;
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(1000);

                    r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.比奇省;
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(1000);

                    r = config.zuobiao.比奇大地图偏移[fbl].比奇大城.比奇老兵;
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                }
                else if (当前地图 == "兽人古墓二层") {
                    var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓一层;
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(1000);

                    r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.比奇省;
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(1000);

                    r = config.zuobiao.比奇大地图偏移[fbl].比奇大城.比奇老兵;
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                }
                else if (当前地图 == "兽人古墓一层") {
                    var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.比奇省;
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(1000);

                    r = config.zuobiao.比奇大地图偏移[fbl].比奇大城.比奇老兵;
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                }
                else if (当前地图 == "比奇省" || 当前地图 == "比奇城" || 当前地图 == "银杏山谷" || 当前地图 == "边界村") {
                    var r = config.zuobiao.比奇大地图偏移[fbl].比奇大城.比奇老兵;
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                }
                else {
                    toastLog(`不支持${当前地图}回比奇老兵`);
                    return false;
                }
                sleep(1000);
                var result = true;
                while (result) {
                    result = tools.findImageClick("closeBtn.png");
                    sleep(666)
                }
            }
            else {
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去比奇老兵Loop: () => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 当前坐标 = tools.人物坐标();
            while (true) {
                var 当前地图 = null;
                try {
                    当前地图 = tools.人物所在地图();
                } catch (error) {
                    toastLog('获取当前地图失败')
                    continue;
                }
                if (当前地图 == null) {
                    toastLog('获取当前地图失败')
                    continue;
                }
                var 坐标 = null;
                try {
                    坐标 = tools.人物坐标();
                } catch (error) {
                    toastLog('获取人物坐标失败')
                    continue;
                }
                if (坐标 == null) {
                    toastLog('获取人物坐标失败')
                    continue;
                }
                var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
                if (坐标.x > 安全区坐标范围.x1 && 坐标.x < 安全区坐标范围.x2 && 坐标.y > 安全区坐标范围.y1 && 坐标.y < 安全区坐标范围.y2) {
                    sleep(3000);
                    break; //说明到了安全区
                }
                else {
                    if (坐标 != null && 当前坐标 != null && 坐标.x == 当前坐标.x && 坐标.y == 当前坐标.y) {
                        toastLog('开始跑图');
                        try {
                            tools.人物移动.去比奇老兵();
                        } catch (error) {
                            toastLog(error)
                        }
                    }
                    else {
                        当前坐标 = 坐标;
                    }
                }
                sleep(1000 * 5);
            }
            toastLog("到达目的地");
            return;

        },
        去比奇挂机图: (挂机地图) => {
            var 当前地图 = tools.人物所在地图();
            if (当前地图 == null || 当前地图 == "") {
                toastLog(`当前地图未知`);
                return false;
            }
            else {
                tools.打开大地图();
                sleep(1000);
            }
            var closeBtn = tools.findImage("closeBtn.png");
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                var fbl = `${device.width}_${device.height}`;
                if (当前地图 == "比奇省" || 当前地图 == "比奇城" || 当前地图 == "银杏山谷" || 当前地图 == "边界村") {
                    if (挂机地图 == "兽人古墓一层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].比奇大城.兽人古墓一层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);


                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)

                    }
                    else if (挂机地图 == "兽人古墓二层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].比奇大城.兽人古墓一层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.兽人古墓二层;
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                    }
                    else if (挂机地图 == "兽人古墓三层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].比奇大城.兽人古墓一层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.兽人古墓二层;
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y);
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓三层;
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y);
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第三层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                    }
                }
                else if (当前地图 == "兽人古墓一层") {
                    if (挂机地图 == "兽人古墓一层") {
                        toastLog("到达目的地");
                        return;
                    }
                    else if (挂机地图 == "兽人古墓二层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.兽人古墓二层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)

                    }
                    else if (挂机地图 == "兽人古墓三层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.兽人古墓二层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓三层;
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第三层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                    }
                }
                else if (当前地图 == "兽人古墓二层") {
                    if (挂机地图 == "兽人古墓一层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓一层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                    }
                    else if (挂机地图 == "兽人古墓二层") {
                        toastLog("到达目的地");
                        return;
                    }
                    else if (挂机地图 == "兽人古墓三层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓三层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第三层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                    }
                }
                else if (当前地图 == "兽人古墓三层") {
                    if (挂机地图 == "兽人古墓一层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第三层.兽人古墓二层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓一层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)

                    }
                    else if (挂机地图 == "兽人古墓二层") {
                        var r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.兽人古墓一层;
                        var x = closeImg.x + random(r.x[0], r.x[1]);
                        var y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                        sleep(1000);

                        r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.打怪点[0];
                        x = closeImg.x + random(r.x[0], r.x[1]);
                        y = closeImg.y + random(r.y[0], r.y[1]);
                        click(x, y)
                    }
                    else if (挂机地图 == "兽人古墓三层") {
                        toastLog("到达目的地");
                        return;
                    }
                }
                else {
                    toastLog(`${当前地图}识别失败或不支持`);
                    return false;
                }

                sleep(1000);
                var result = true;
                while (result) {
                    result = tools.findImageClick("closeBtn.png");
                    sleep(666)
                }
            }
            else {
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去比奇挂机图Loop: (挂机地图) => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 当前坐标 = tools.人物坐标();
            while (true) {
                var 当前地图 = null;
                try {
                    当前地图 = tools.人物所在地图();
                } catch (error) {
                    toastLog('获取当前地图失败')
                    continue;
                }
                var 坐标 = { x: 0, y: 0 }
                try {
                    坐标 = tools.人物坐标();
                } catch (error) {
                    toastLog('获取人物坐标失败')
                    continue;
                }
                if (当前地图 == null) {
                    toastLog('获取当前地图失败')
                    continue;
                }
                if (坐标 == null) {
                    toastLog('获取人物坐标失败')
                    continue;
                }
                if (当前地图 == 挂机地图) { //说明到目的地
                    break;
                }
                else {
                    if (坐标 != null && 当前坐标 != null && 坐标.x == 当前坐标.x && 坐标.y == 当前坐标.y) {
                        toastLog('重新跑图');
                        try {
                            tools.人物移动.去比奇挂机图(挂机地图);
                        } catch (error) {
                            toastLog('跑图异常')
                        }
                    }
                    else {
                        当前坐标 = 坐标;
                    }
                }
                sleep(1000 * 5);
            }
            toastLog("到达目的地");
            return;
        },
    },
    人物所在地图: () => {
        var fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.地点范围[fbl];
        var result = tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
        if (result != null && result.length == 1) {
            return result[0].text;
        }
        else {
            return null;
        }
    },
    人物坐标: () => {
        var fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.人物坐标范围[fbl];
        var result = tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
        if (result != null && result.length == 1) {
            try {
                let parts = result[0].text.split(":");
                return {
                    x: parseInt(parts[0]),
                    y: parseInt(parts[1])
                }
            } catch (error) {
                return null;
            }
        }
        else {
            return null;
        }
    },
    比奇卖物品Loop: () => {
        var result = null;
        var errCount = 0;
        tools.悬浮球描述("开始卖物品");
        while (true) {
            if (errCount >= 20) {
                return;
            }
            try {
                result = tools.比奇卖物品();
            } catch (e) {
                result = {
                    status: false,
                    err: "卖物品异常了" + e
                }
            }
            if (result.status) {
                tools.悬浮球描述("结束卖物品");
                break;
            }
            else {
                tools.悬浮球描述(result.err);
                errCount++;
                sleep(random(1500, 2000));
            }
        }
    },
    比奇卖物品: () => {
        var result = true;
        while (result) {
            result = tools.findImageClick("closeBtn2.png");
            sleep(500)
        }
        var r = tools.人物移动.判断到达比奇小贩();
        if (!r) {
            return {
                status: false,
                err: "人物未到达比奇"
            }
        }
        var { w, h } = tools.获取屏幕高宽();
        var fbl = `${device.width}_${device.height}`;
        var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
        click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
        tools.悬浮球描述("点击比奇小贩按钮");
        var tryCount = 0;
        while (true) {
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取出售物品按钮"
                }
            }
            sleep(1000);
            var result = tools.获取区域文字(0, 0, w / 2, h / 2, 60, 255, true, false);
            if (result != null && result.length > 0 && result.some(item => item.text === "出售物品")) {
                tools.悬浮球描述("检测到出售物品按钮")
                break;
            }
            else {
                tools.悬浮球描述("未检测到出售物品按钮（" + tryCount + "）")
            }
            tryCount++;
        }

        var 出售物品按钮 = config.zuobiao.比奇小贩面板.出售物品[fbl];
        click(random(出售物品按钮.x1, 出售物品按钮.x2), random(出售物品按钮.y1, 出售物品按钮.y2))
        tools.悬浮球描述("点击出售物品按钮");
        tryCount = 0;
        while (true) {
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取卖东西面板"
                }
            }
            sleep(1000);
            result = tools.获取区域文字(0, 0, w / 2, h / 2, 60, 255, true, false);
            if (result != null && result.length > 0 && result.some(item => item.text.indexOf("你想卖什么东西") >= 0)) {
                tools.悬浮球描述("检测到卖东西面板")
                break;
            }
            else {
                tools.悬浮球描述("未检测到卖东西面板（" + tryCount + "）")
            }
            tryCount++;
        }


        var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
        click(random(卖装备背包格子["整理按钮"].x1, 卖装备背包格子["整理按钮"].x2), random(卖装备背包格子["整理按钮"].y1, 卖装备背包格子["整理按钮"].y2))
        tools.悬浮球描述("点击装备整理按钮")
        sleep(random(2500, 3500));


        for (let index = 1; index <= 5; index++) {
            for (let index1 = 1; index1 <= 8; index1++) {
                tools.悬浮球描述(`开始出售${index}_${index1}格子`)
                var p = 卖装备背包格子[`${index}_${index1}`];
                var randomX = random(-5, 5);
                var randomY = random(-5, 5);
                click(p.x + randomX, p.y + randomY)
                sleep(random(1500, 2000));
                tools.悬浮球描述("送检YoLo分析是否极品")
                var img = captureScreen();
                var imgSmall = tools.截屏裁剪(img, 卖装备背包格子["1_1"].x, 卖装备背包格子["1_1"].y, w, 卖装备背包格子["最底部"]) //captureScreen();//
                //var savePath = `/sdcard/${index}_${index1}.png`;  // 保存路径可以自定义
                // let options = {
                //     threshold: 30
                // }
                // // 可利用工具箱生成点色数据进行测试
                // let result = images.findMultiColors(img, "#FF0000",[
                //     [-44, -17, "#EC0803"],
                // ], options);
                // toastLog(JSON.stringify(result));
                // 保存图片
                //images.save(img, savePath, "png");  // 保存为 PNG 格式
                //var text = ocr.detect(img);//utils.regionalAnalysisChart2(img,卖装备背包格子["1_1"].x,卖装备背包格子["1_1"].y,w,卖装备背包格子["最底部"],60,255,false,false,"区域识字测试代码");
                let r = ocrPladderOCR.detect(imgSmall);//utils.ocrGetContentStr(imgSmall);
                var allText = '';
                //var exists = r.some(item => item.text.indexOf"极品");
                if (r) {
                    r.forEach(item => {
                        allText += item.text;
                        //console.log(item.text, item.confidence);
                    });
                }
                toastLog(allText)
                utils.recycleNull(img);
                utils.recycleNull(imgSmall);
                toastLog("----------------------");
                sleep(1500)
            }
        }
        ocrPladderOCR.release();
        return {
            status: true,
            err: ""
        }
    },
    送检YoLo: (img, mode) => {
        //var img = images.read("/sdcard/screenshot.png");
        var base64Str = android.util.Base64.encodeToString(images.toBytes(img, "png"), 0);

        var url = "";
        if (mode == "jipin") {
            url = "http://183.249.84.44:9850/jipin"
        }
        else {
            return {
                status: false,
                err: "无匹配模型",
            }
        }
        var headers = {
            "Content-Type": "application/json"
        };
        var data = {
            image: base64Str
        };
        var response = http.postJson(url, data, { headers: headers, timeout: 10000 });
        if (response.statusCode == 200) {
            return {
                status: true,
                value: response.body.string(),
            }
        } else {
            return {
                status: false,
                err: "状态码:" + response.statusCode,
            }
        }

    },
    修理装备: () => {
        toastLog('尝试关闭所有窗口');
        var result = true;
        while (result) {
            result = tools.findImageClick("closeBtn.png");
            sleep(500)
        }
        sleep(1000);

        tools.jiaoSe();
        sleep(2000);

        result = tools.findImage("closeBtn.png");
        if (result.status) {
            toastLog('卸下头盔');
            tools.clickTou(result.img);
            sleep(1000);
            tools.findImageClick("xiexia.png")

            sleep(1000);
            toastLog('卸下项链');
            tools.clickXiangLian(result.img);
            sleep(1000);
            tools.findImageClick("xiexia.png")


            sleep(1000);
            toastLog('卸下武器');
            tools.clickWuQi(result.img);
            sleep(1000);
            tools.findImageClick("xiexia.png")

            sleep(1000);
            toastLog('卸下手镯1');
            tools.clickShouZhuo1(result.img);
            sleep(1000);
            tools.findImageClick("xiexia.png")


            sleep(1000);
            toastLog('卸下手镯2');
            tools.clickShouZhuo2(result.img);
            sleep(1000);
            tools.findImageClick("xiexia.png")

            sleep(1000);
            toastLog('卸下戒指1');
            tools.clickJieZhi1(result.img);
            sleep(1000);
            tools.findImageClick("xiexia.png")


            sleep(1000);
            toastLog('卸下戒指2');
            tools.clickJieZhi2(result.img);
            sleep(1000);
            tools.findImageClick("xiexia.png")
        }
        else {
            toastLog('未找到人物');
        }
    },
    打开大地图: () => {
        var result = true;
        while (result) {
            result = tools.findImageClick("closeBtn.png");
            sleep(666)
        }
        var fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.小地图范围[fbl];
        var x = random(p.x1 + 10, p.x2);
        var y = random(p.y1, p.y2);
        click(x, y);
    },
    shenqiCapture: () => {
        var result = false;
        try {
            images.stopScreenCapture()
            result = images.requestScreenCapture()
            // sleep(1000)
        } catch (error) {
            toast("请求截图错误");
            toastLog(error)
            exit();
        }
        if (result) {
            toastLog("申请截图成功");
        }
        else {
            toastLog("申请截图失败");
            exit();
        }
    },
    jiaoSe: () => {//点击角色坐标
        var fbl = `${device.width}_${device.height}`;
        var result = config.zuobiao.jiaoSeBtn[fbl]
        click(result.x, result.y)
    },
    clickTou: (closeImg) => {//点击人物头部
        var fbl = `${device.width}_${device.height}`;
        var tou = config.zuobiao.renWuTou[fbl];
        var x = closeImg.x + tou.x;
        var y = closeImg.y + tou.y;
        click(x, y)
    },
    clickXiangLian: (closeImg) => {//点击人物项链
        var fbl = `${device.width}_${device.height}`;
        var xianglian = config.zuobiao.renWuXiangLian[fbl];
        var x = closeImg.x + xianglian.x;
        var y = closeImg.y + xianglian.y;
        click(x, y)
    },
    clickWuQi: (closeImg) => {//点击人物武器
        var fbl = `${device.width}_${device.height}`;
        var wuqi = config.zuobiao.renWuWuQi[fbl];
        var x = closeImg.x + wuqi.x;
        var y = closeImg.y + wuqi.y;
        click(x, y)
    },
    clickShouZhuo1: (closeImg) => {//点击人物手镯1
        var fbl = `${device.width}_${device.height}`;
        var r = config.zuobiao.renWuShouZhuo1[fbl];
        var x = closeImg.x + r.x;
        var y = closeImg.y + r.y;
        click(x, y)
    },
    clickShouZhuo2: (closeImg) => {//点击人物手镯1
        var fbl = `${device.width}_${device.height}`;
        var r = config.zuobiao.renWuShouZhuo2[fbl];
        var x = closeImg.x + r.x;
        var y = closeImg.y + r.y;
        click(x, y)
    },
    clickJieZhi1: (closeImg) => {//点击人物戒指1
        var fbl = `${device.width}_${device.height}`;
        var r = config.zuobiao.renWuJieZhi1[fbl];
        var x = closeImg.x + r.x;
        var y = closeImg.y + r.y;
        click(x, y)
    },
    clickJieZhi2: (closeImg) => {//点击人物戒指2
        var fbl = `${device.width}_${device.height}`;
        var r = config.zuobiao.renWuJieZhi2[fbl];
        var x = closeImg.x + r.x;
        var y = closeImg.y + r.y;
        click(x, y)
    },
    findImage: (fileName) => {
        var w = device.width;
        var h = device.height;
        var exists = config.youxiaoFBL.some(item => item.w === w && item.h === h);
        if (exists) {
            //tools.shenqiCapture();
            var img = captureScreen();
            var targetImgPath = `./res/UI/${w}_${h}/${fileName}`;
            var targetImg = images.read(targetImgPath);
            var options = {
                threshold: 0.7
            };
            var imgSize = {
                w: targetImg.width,
                h: targetImg.height
            }
            var result = null;
            try {
                result = images.findImage(img, targetImg, options);
            } catch (e) {
                toastLog('findImage异常');
            }
            utils.recycleNull(img);
            utils.recycleNull(targetImg);
            if (result != null && (result.x > 0 || result.y > 0)) {
                return {
                    status: true,
                    img: result,
                    size: imgSize
                };
            }
            else {
                return {
                    status: false,
                    img: null,
                    err: '未找到对应的图片'
                }
            }
        }
        else {
            return {
                status: false,
                img: null,
                err: '不支持' + w + 'x' + h + '分辨率'
            }
        }
    },
    findImageClick: (fileName) => {
        var result = tools.findImage(fileName);
        if (result.status && result.img.x > 0 && result.img.y > 0) {
            var x = result.img.x + random(3, result.size.w);
            var y = result.img.y + random(3, result.size.h);
            click(x, y)
            return true
        }
        else {
            if (fileName != "closeBtn.png") {
                toastLog('找图失败' + fileName)
            }
            return false
        }
    },
    区域找图: (fileName, x1, y1, x2, y2) => {
        var w = device.width;
        var h = device.height;
        var exists = config.youxiaoFBL.some(item => item.w === w && item.h === h);
        if (exists) {
            var img = captureScreen();
            var targetImgPath = `./res/UI/${w}_${h}/${fileName}`;
            var targetImg = images.read(targetImgPath);
            var imgSize = {
                w: targetImg.width,
                h: targetImg.height
            }
            var result = null;
            try {
                result = utils.regionalFindImg2(img, targetImg, x1, y1, x2, y2, 60, 255, 0.7, false, false, "区域找图");
            } catch (e) {
                toastLog(fileName + '区域找图异常');
                toastLog(e)
            }
            utils.recycleNull(img);
            utils.recycleNull(targetImg);
            if (result != null && (result.x > 0 || result.y > 0)) {
                return {
                    status: true,
                    img: result,
                    size: imgSize
                };
            }
            else {
                return {
                    status: false,
                    img: null,
                    err: '未找到对应的图片'
                }
            }
        }
        else {
            return {
                status: false,
                img: null,
                err: '不支持' + w + 'x' + h + '分辨率'
            }
        }
    },
    找图并点击图片中心: (fileName) => {
        var result = tools.findImage(fileName);
        if (result.status && result.img.x > 0 && result.img.y > 0) {
            var x = result.img.x + (result.size.w / 2);
            var y = result.img.y + (result.size.h / 2);
            click(x, y)
            return true
        }
        else {
            toastLog('找图失败' + fileName)
            return false
        }
    },
    获取全屏文字: (img) => {
        //tools.shenqiCapture();
        if (img == null) {
            img = captureScreen();
        }
        var { w, h } = tools.获取屏幕高宽();
        var r = null;
        try {
            r = utils.regionalAnalysisChart3(img, 0, 0, w, h, 60, 255, false, false, "区域识字测试代码");
        } catch (e) {
            toastLog(e)
            r = null;
        }
        utils.recycleNull(img);
        return r;
    },
    获取区域文字: (x1, y1, x2, y2, param1, param2, isP1, isP2) => {
        //tools.shenqiCapture();
        var { w, h } = tools.获取屏幕高宽();
        if (x2 > w) {
            toastLog('x2不能超出屏幕宽度')
            return null;
        }
        if (y2 > h) {
            toastLog('y2不能超出屏幕高度')
            return null;
        }
        var img = captureScreen();
        var r = null;
        try {
            r = utils.regionalAnalysisChart3(img, x1, y1, x2, y2, param1, param2, isP1, isP2, "");
        } catch (e) {
            toastLog('y2不能超出屏幕高度')
            r = null;
        }
        utils.recycleNull(img);
        return r;
    },
    截屏裁剪: (img, x1, y1, x2, y2) => {
        if (img == null) {
            img = captureScreen();
        }
        let xy1 = utils.convertXY(x1, y1, "leftTop")
        let xy2 = utils.convertXY(x2, y2, "rightBottom")
        // 按照区域坐标裁剪大图
        var newImg = images.clip(img, xy1["x"], xy1["y"], xy2["x"] - xy1["x"], xy2["y"] - xy1["y"]);
        utils.recycleNull(img);
        return newImg;
    },
    判断是否存仓库: (text) => {
        if (text.indexOf('药') >= 0 || text.indexOf('符') >= 0 || text.indexOf('盔甲') >= 0 || text.indexOf('战衣') >= 0 || text.indexOf('长袍') >= 0 || text.indexOf('布衣') >= 0) {
            return false;
        }

    },
    获取屏幕高宽: () => {  // 获取当前屏幕方向
        let w, h;
        if (context.getResources().getConfiguration().orientation == 1) {
            // 竖屏
            w = device.width;
            h = device.height;
        } else {
            // 横屏
            w = device.height;
            h = device.width;
        }
        return { w, h };
    }
}

// 初始化文字识别插件(必须初始化才生效)
utils.initOcr("谷歌")

// 开启调试模式 找图、找色、识字绘制效果
// commonStorage.put("debugModel", true)

// // 开启调试模式 绘制延时
// commonStorage.put("debugSleep", 500)
tools.shenqiCapture();
toast('字节飞舞科技')

var w = parseInt(device.width * 0.96);
var h = parseInt(device.height * 0.9);
var padding_left = parseInt((device.width - w) / 2)
var padding_top = parseInt((device.height - h) / 2);
let tabCount = 3;
let tabW = 0;
var isStart = false
var isShowConfig = false
var win = null;
let window = floaty.window(
    <frame padding="6" id="xuanFuPanel" w="wrap_content" h="wrap_content">
        <horizontal>
            <img id="img" src="@drawable/ic_android_black_48dp" w="16" h="16" marginRight="4" />
            <text id="cpuText" text="CPU: 0%" textSize="9sp" textColor="#000000" marginRight="6" marginTop="2" />
            <text id="memText" text="内存: 0MB" textSize="9sp" textColor="#000000" marginRight="6" marginTop="2" />
            <text id="eventText" text="事件: 空闲" textSize="9sp" textColor="#000000" marginTop="2" />
        </horizontal>
    </frame>
);
let lastDirection = context.getResources().getConfiguration().orientation;
ui.run(() => {
    win = floaty.rawWindow(
        <frame gravity="center" id="configFrame">
            <vertical w="{{w}}" h="{{h}}">
                <horizontal id="tabs" w="*">
                    <vertical id="tab1" gravity="center">
                        <text id="text1" text="选地图" textSize="14sp" textColor="#000000" paddingBottom="5" gravity="center" />
                        <View id="line1" h="2" bg="#ff0000" visibility="visible" />
                    </vertical>
                    <vertical id="tab2" gravity="center">
                        <text id="text2" text="配补给" textSize="14sp" textColor="#888888" paddingBottom="5" gravity="center" />
                        <View id="line2" h="2" bg="#ff0000" visibility="gone" />

                    </vertical>
                    <vertical id="tab3" gravity="center">
                        <text id="text3" text="配卖修" textSize="14sp" textColor="#888888" paddingBottom="5" gravity="center" />
                        <View id="line3" h="2" bg="#ff0000" visibility="gone" />
                    </vertical>
                </horizontal>
                <vertical id="content">
                    <vertical id="view1" visibility="visible" gravity="center">
                        <horizontal>
                            <text textColor="#000000" textSize="12sp">比奇挂机</text>
                            <spinner id="sp1" entries="兽人一层|兽人二层|兽人三层" />
                        </horizontal>
                        <horizontal>
                            <text textColor="#000000" textSize="12sp">盟重挂机</text>
                            <spinner id="sp2" entries="石墓一层|石墓二层|石墓三层|石墓四层|石墓五层" />
                        </horizontal>
                    </vertical>
                    <vertical id="view2" visibility="gone" gravity="center">
                        <text text="这是view2" textColor="#000000" textSize="18sp" />
                    </vertical>
                    <vertical id="view3" visibility="gone" gravity="center">
                        <text text="这是view3" textColor="#000000" textSize="18sp" />
                    </vertical>
                </vertical>
                <horizontal padding="16">
                    <button id="btnStart" text="启动" w="0" layout_weight="1" />
                    <button id="btnSave" text="保存" w="0" layout_weight="1" marginLeft="8" />
                    {/* <button id="btnClose" text="❌ 退出" w="0" layout_weight="1" marginLeft="8" /> */}
                    <button id="btnClose" text="退出" w="0" layout_weight="1" marginLeft="8" />
                </horizontal>
            </vertical>

        </frame>
    );
    win.tab1.setOnClickListener(() => switchTab(1));
    win.tab2.setOnClickListener(() => switchTab(2));
    win.tab3.setOnClickListener(() => switchTab(3));
    win.btnStart.click(() => {
        ui.run(() => {
            if (isStart) {
                isShowConfig = true
                isStart = false
                win.btnStart.text("启动")
                window.img.setBackgroundColor(colors.parseColor("#ffffff"));
            }
            else {
                isShowConfig = false
                isStart = true
                win.btnStart.text("暂停")
                win.setPosition(-10000, padding_top);
                window.img.setBackgroundColor(colors.parseColor("#03e298"));
            }
        })
    })
    win.btnClose.click(() => {
        isShowConfig = false
        win.setPosition(-10000, padding_top);
    });
    win.btnSave.click(() => {
        threads.start(function () {
            excuteAuto()
        });
        // images.showImage(img);
        // let MLKitOCR = $plugins.load("org.autojs.autojspro.plugin.mlkit.ocr");
        // let googleOcr = new MLKitOCR();
        // let resultMlk = googleOcr.detect(img);
        // let contentMlkArr = Object.values(resultMlk).map(item => item.text) || [];
        // utils.recycleNull(img);
        // toastLog(JSON.stringify(contentMlkArr));

    })
    win.sp2.setSelection(1); // 默认选中“石墓二层”
    win.setSize(w, h);
    win.setPosition(-10000, padding_top);
    win.setTouchable(true);    // 可交互


    // 设置悬浮窗圆角背景
    let gd = new android.graphics.drawable.GradientDrawable();
    gd.setCornerRadius(20); // 圆角半径 20dp（单位是 px）
    gd.setColor(android.graphics.Color.parseColor("#E5FFFFFF"));
    gd.setStroke(2, android.graphics.Color.parseColor("#81f900"));
    win.configFrame.setBackgroundDrawable(gd);

    gd = new android.graphics.drawable.GradientDrawable();
    gd.setCornerRadius(20); // 圆角半径 20dp（单位是 px）
    gd.setColor(android.graphics.Color.parseColor("#B2FFFFFF")); // 70% 不透明白
    gd.setStroke(2, android.graphics.Color.parseColor("#376b00"));

    window.xuanFuPanel.setBackgroundDrawable(gd);


});


function excuteAuto() {
    isShowConfig = false
    win.setPosition(-10000, padding_top);
    sleep(2000);


    // 加载OCR插件，需要先在Auto.js Pro的插件商店中下载官方MLKitOCR插件


    // requestScreenCapture();

    // for (let i = 0; i < 1; i++) {
    //     let capture = captureScreen();

    //     // 检测截图文字并计算检测时间，首次检测的耗时比较长
    //     // 检测时间取决于图片大小、内容、文字数量
    //     let start = Date.now();
    //     let result = ocr.detect(capture);
    //     let end = Date.now();
    //     console.log(result);

    //     toastLog(`第${i + 1}次检测: ${end - start}ms`);
    //     sleep(3000);
    // }

    // ocr.release();

    // let img = captureScreen();
    // let MLKitOCR = $plugins.load("org.autojs.autojspro.plugin.mlkit.ocr");
    // let googleOcr = new MLKitOCR();
    // let resultMlk = googleOcr.detect(img);
    // let contentMlkArr = Object.values(resultMlk).map(item => item.text) || [];
    // utils.recycleNull(img);
    // toastLog(JSON.stringify(contentMlkArr));

    //var img = captureScreen();


    tools.比奇卖物品Loop();


    // var r =  tools.截屏裁剪返回Base64(0,0,100,100);
    // toastLog(r.length)
    // tools.人物移动.去比奇挂机图Loop("兽人古墓三层");
    //tools.人物移动.去比奇小贩Loop();
    //tools.比奇卖物品Loop();


    //toastLog(p)
    // // 可自行换个能找到的小图X\
    // let targetImgPath = "./res/UI/test.png"; 
    // let targetImg = images.load("http://192.168.1.7:9998/uploadPath/autoJsTools/863818023224810/system/imageHandler/allScreen.png");//images.read(targetImgPath);
    // let result = utils.grayThresholdFindImg2(img, targetImg, 60, 255, 0.7, false, false);
    // // let result1 = images.findImage(img, targetImg, options);
    // utils.recycleNull(img);
    // utils.recycleNull(targetImg);
    // toastLog(result);
    // toastLog(targetImg);
    //


    //找文字坐标
    // let result = utils.regionalAnalysisChartPosition2(img, 0, 0, size.w - 5, size.h, 60, 255, "删除角色", false, false);


    //这里只会显示所有文字(纯文字)
    //let result = utils.regionalAnalysisChart(img, 0, 0, size.w - 5, size.h, 60, 255, "Test");

    //这里会显示所有文字(包含坐标)
    // let result = utils.regionalAnalysisChart3(img, 0, 0, size.w - 5, size.h, 60, 255, false, false);
    // if (result != null && result.length > 0) {
    //     const has111 = arr.some(item => item.text === '您的通行证帐');
    //     for (let index = 0; index < result.length; index++) {

    //     }
    // }

    //utils.recycleNull(img);
    // if (result.x > 0 && result.y > 0) {
    //     click(result.x, result.y)
    // }
    //toastLog(JSON.stringify(result));

}


function switchTab(index) {
    for (let i = 1; i <= 3; i++) {
        let isActive = i === index;
        win["text" + i].setTextColor(colors.parseColor(isActive ? "#000000" : "#888888"));
        win["line" + i].setVisibility(isActive ? 0 : 8); // 0:VISIBLE, 8:GONE
        win["view" + i].setVisibility(isActive ? 0 : 8);
    }
}

// 更新悬浮窗位置
function updateWindowPosition() {
    let { w, h } = tools.获取屏幕高宽();

    // 自定义触发吸边的距离，默认是20像素
    let edgeMargin = 100;

    // 获取悬浮窗当前位置
    let windowX = window.getX();
    let windowWidth = window.getWidth();
    let windowY = window.getY();
    ui.run(() => window.setPosition(windowX, h - 250));
    // 如果悬浮窗靠近左边边缘，则吸附到左边
    // if (windowX < edgeMargin) {
    //     ui.run(() => window.setPosition(-24, h-50)); // 只露出一半图标
    // }
    // // 如果悬浮窗靠近右边边缘，则吸附到右边
    // // else if (screenWidth - windowX < edgeMargin) {
    // //     // 调整计算方式，使右边能够正确吸附，并露出一半
    // //     ui.run(() => window.setPosition(screenWidth - 34, screenHeight-30));
    // // }
    // // 否则恢复到原位置
    // else {
    //     ui.run(() => window.setPosition(windowX,  h-50));
    // }
}
// 拖动逻辑 + 自动吸边
let x = 0, y = 0;
let windowX, windowY;
let downTime;

window.xuanFuPanel.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            let dx = event.getRawX() - x;
            let dy = event.getRawY() - y;
            ui.run(() => window.setPosition(windowX + dx, windowY + dy)); // 使用ui.run()来保证UI更新在主线程中
            return true;
        case event.ACTION_UP:
            // 点击判断
            if (new Date().getTime() - downTime < 200) {
                if (!isShowConfig) {
                    isShowConfig = true
                    showWinConfig();
                } else {
                    toast('请勿重复')
                }
            }
            // 自动吸边
            updateWindowPosition();
            return true;
    }
    return false;
});

// 初始化时设置位置
updateWindowPosition();

// 监听屏幕方向变化并实时更新位置
device.wakeUp();
// setInterval(() => {
//     updateWindowPosition();
// }, 1000);



function showWinConfig() {
    var { w, h } = tools.获取屏幕高宽();
    var w_ = parseInt(w * 0.8);
    var h_ = parseInt(h * 0.7);
    padding_left = parseInt(w * 0.1)
    padding_top = parseInt((h) * 0.15);
    tabW = parseInt((w_ / tabCount));
    win.setSize(w_, h_);
    win.setPosition(padding_left, padding_top);
    // win.setTouchable(true);    // 可交互
    win.tab1.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab2.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab3.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.btnStart.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.btnSave.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW - 30, -2));
    win.btnClose.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW - 30, -2));
}





// 开一个线程周期性更新 UI
threads.start(function () {
    while (true) {
        // 获取动态数据（这里只是示例，你可以替换成真实的 CPU/内存/事件信息）
        let cpuUsage = "CPU: " + utils.getCpuPercentage();
        let memUsage = "内存: " + utils.getMemoryInfo();
        let currentDirection = context.getResources().getConfiguration().orientation;
        // 在 UI 线程中更新浮窗文字
        ui.run(() => {
            window.cpuText.setText(cpuUsage);
            window.memText.setText(memUsage);
            // window.eventText.setText(currentEvent);
        });
        if (currentDirection !== lastDirection) {
            lastDirection = currentDirection;
            updateWindowPosition()
        }
        sleep(1000 * 3); // 每秒更新一次
    }
});


// var Intent = android.content.Intent;
// var intent = new Intent(Intent.ACTION_MAIN);
// intent.addCategory(Intent.CATEGORY_HOME);
// intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
// context.startActivity(intent);


setInterval(() => { }, 1000);

