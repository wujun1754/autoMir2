
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
let 存入仓库数量 = 0;
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
        回比奇补给:()=>{
            tools.人物移动.去比奇小贩Loop();
            tools.比奇卖物品Loop();
            tools.修理装备Loop();
            tools.买物品Loops([
                {
                    name: "修复油",
                    num:1
                },
                {
                    name: "金创药小",
                    num:3
                },{
                    name: "护身符大",
                    num:2
                },
                {
                    name: "魔法药中包",
                    num:3
                }
            ]);
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
                        if (Math.abs(人物坐标.x - 比奇小贩坐标.x) <= 2 && Math.abs(人物坐标.y - 比奇小贩坐标.y) <= 2) {
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
            return result;
        }
    },
    初始化攻击面板:()=>{
       var text =  tools.获取区域文字(7,35,148,200,60,255,false,false);
       toastLog(text)
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
    比奇丢护身符:(起始坐标x,起始坐标y,时间戳,检查x,检查y)=>{
        var tryCount=0;
        var fbl = `${device.width}_${device.height}`;
        var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
        var { w, h } = tools.获取屏幕高宽();
        while(true){
            if(tryCount>=5){
                return {
                    status: false,
                    err: "丢不掉"
                }
            }               
            var x1 = tryCount==0?起始坐标x + random(-5, 5):检查x + random(-5, 5);
            var y1 = tryCount==0?起始坐标y + random(-5, 5):检查y + random(-5, 5);
            var x2 = random(config.zuobiao.比奇丢东西范围[fbl].x[0],config.zuobiao.比奇丢东西范围[fbl].x[1]);
            var y2 = random(config.zuobiao.比奇丢东西范围[fbl].y[0],config.zuobiao.比奇丢东西范围[fbl].y[1]);
            gesture(时间戳, [x1, y1], [x2, y2]);
            sleep(random(666, 999));
            var randomX = random(-5, 5);
            var randomY = random(-5, 5);
            click(检查x + randomX, 检查y + randomY)
            sleep(random(1200, 1500));
            var img = captureScreen();
            var imgSmall = tools.截屏裁剪(img, 卖装备背包格子["1_1"].x, 卖装备背包格子["1_1"].y, w, 卖装备背包格子["最底部"]) //captureScreen();//
            let r = ocrPladderOCR.detect(imgSmall);
            utils.recycleNull(img);
            utils.recycleNull(imgSmall);
            var allText = '';
            if (r) {
                r.forEach(item => {
                    allText += item.text;
                });
                if(allText.indexOf("重量")<0 || allText.indexOf("放入")<0){
                    return {
                        status: true,
                        err: ""
                    }
                }
            }
            tryCount++;
        }
        return {
            status: false,
            err: "丢不掉"
        }
    },
    比奇卖物品Loop: () => {
        var result = null;
        var errCount = 0;
        ocrPladderOCR = $ocr.create();
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
        ocrPladderOCR.release();
        
    },
    比奇卖物品: () => {
        tools.关闭所有窗口();
        var result = null;
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
            if (result != null && result.length > 0 && result.some(item => item.text.indexOf("什么东西") >= 0)) {
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
        var 第一格 = 卖装备背包格子[`1_1`];
        for (let index = 1; index <= 5; index++) {
            for (let index1 = 1; index1 <= 8; index1++) {
                tools.悬浮球描述(`开始出售${index}_${index1}格子`)
                var p = 卖装备背包格子[`${index}_${index1}`];
                var randomX = random(-5, 5);
                var randomY = random(-5, 5);
                click(p.x + randomX, p.y + randomY)
                sleep(random(1200, 1500));
                // tools.悬浮球描述("送检YoLo分析是否极品")
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
                    });
                    if(allText.indexOf("极品")>=0){
                        tools.悬浮球描述(`${index}_${index1}存仓库`)
                        tools.比奇存仓库(index,index1);
                        return {
                            status: false,
                            err: "重新卖装备"
                        }
                    }
                    else if(allText.indexOf("护身符")>=0){
                        r = tools.比奇丢护身符(p.x,p.y,random(666,1200),第一格.x,第一格.y);
                        if(!r.status){
                            tools.悬浮球描述(`丢弃失败,存仓库`)
                            tools.比奇存仓库("1","1");
                            return {
                                status: false,
                                err: "重新卖装备"
                            }
                        }
                        
                    }
                    else{
                        var is需存仓库装备 = false;
                        config.需存仓库装备.forEach(item=>{
                            if(allText.indexOf(item)>=0){
                                is需存仓库装备 = true;
                            }
                        })
                        if(is需存仓库装备){
                            tools.悬浮球描述(`${index}_${index1}发现需存仓库装备`)
                            tools.比奇存仓库(index,index1);
                            return {
                                status: false,
                                err: "重新卖装备"
                            }
                        }
                        else{
                            if(allText.indexOf("重量")<0 || allText.indexOf("放入")<0){
                                return {
                                    status: true,
                                    err: ""
                                }
                            }else{
                                tools.findImageClick("beibaofangruBtn.png");
                                sleep(random(1500,2000));
                                tools.findImageClick("OKBtn.png");
                                sleep(random(1500, 2000));
                            }
                        }
                    }
                }
                utils.recycleNull(img);
                utils.recycleNull(imgSmall);
                // toastLog("----------------------");
                sleep(1500)
            }
        }
        return {
            status: true,
            err: ""
        }
    },
    买物品Loops:(物品s)=>{
        let 物品集合 = 物品s.map((item, i) => {
            var 物品页码 = config.zuobiao.购买物品页码[item["name"]];
            return {
                "名称": item["name"], 
                "数量": item["num"], 
                "页码": 物品页码.页码,
                "顺序": 物品页码.顺序,
                "是否下翻":物品页码.是否下翻,
            };
        });
        for (var i = 0; i < 物品集合.length; i++) {
            var 物品对象 = 物品集合[i];
            tools.悬浮球描述("开始购买"+物品对象["名称"]+"物品");
            tools.买物品(物品对象)
        }
    },
    买物品: (物品对象) => {
        tools.关闭所有窗口();
        var result = null;
        var { w, h } = tools.获取屏幕高宽();
        var fbl = `${device.width}_${device.height}`;
        var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
        click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
        var tryCount = 0;
        while (true) {
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取购买物品按钮"
                }
            }
            sleep(1000);
            var result = tools.获取区域文字(0, 0, w / 2, h / 2, 60, 255, true, false);
            if (result != null && result.length > 0 && result.some(item => item.text === "购买物品")) {
                break;
            }
            tryCount++;
        }

        var 购买物品按钮 = config.zuobiao.比奇小贩面板.购买物品[fbl];
        click(random(购买物品按钮.x1, 购买物品按钮.x2), random(购买物品按钮.y1, 购买物品按钮.y2))
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
            if (result != null && result.length > 0 && result.some(item => item.text.indexOf("买什么") >= 0)) {
                break;
            }
            tryCount++;
        }
        
        var 购买物品位置 = config.zuobiao.购买物品位置[fbl];
        for (var i = 1; i < 物品对象["页码"]; i++) {
            tools.findImageClick("youjiantouBtn.png");
            sleep(random(1500,2000))
        }
        var p = 购买物品位置[物品对象.顺序.toString()];
        click(random(p.x[0],p.x[1]),random(p.y[0],p.y[1]))
        sleep(random(1000,1500))
        if(物品对象["是否下翻"]){
            tools.findImageClick("buyOkBtn.png");
            sleep(random(666,888))
            p = 购买物品位置["1"];
            click(random(p.x[0],p.x[1]),random(p.y[0],p.y[1]))
            sleep(random(1500,2000))
        }
        for (var i = 0; i < 物品对象["数量"]; i++) {
            tools.findImageClick("buyOkBtn.png");
            sleep(random(666,888))
        }
    },
    比奇存仓库:(index1,index2)=>{
        tools.关闭所有窗口();
        var r = tools.人物移动.判断到达比奇小贩();
        if (!r) {
            toastLog('人物未到达比奇')
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
                    err: "尝试10次未获取到保管物品按钮"
                }
            }
            sleep(1000);
            var result = tools.获取区域文字(0, 0, w / 2, h / 2, 60, 255, true, false);
            if (result != null && result.length > 0 && result.some(item => item.text === "保管物品")) {
                tools.悬浮球描述("检测到保管物品按钮")
                break;
            }
            else {
                tools.悬浮球描述("未检测到保管物品按钮（" + tryCount + "）")
            }
            tryCount++;
        }
        var 保存物品按钮 = config.zuobiao.比奇小贩面板.保存物品[fbl];
        click(random(保存物品按钮.x1, 保存物品按钮.x2), random(保存物品按钮.y1, 保存物品按钮.y2))
        tools.悬浮球描述("点击保管物品按钮");
        tryCount = 0;
        while (true) {
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取仓库面板"
                }
            }
            sleep(1000);
            result = tools.findImage("cangku_clear.png");
            
            if (result.status) {
                tools.悬浮球描述("检测到仓库面板")
                break;
            }
            else {
                tools.悬浮球描述("未检测到仓库面板（" + tryCount + "）")
            }
            tryCount++;
        }
        tools.悬浮球描述(`开始保存${index1}_${index2}格子东西`)
        var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
        var 偏移量 = config.zuobiao.保存仓库包格子偏移量[fbl];
        var p = 卖装备背包格子[`${index1}_${index2}`];
        var randomX = random(-5, 5);
        var randomY = random(-5, 5);
        click(p.x + randomX + 偏移量.x, p.y + randomY +偏移量.y)
        sleep(random(500,600))
        tryCount = 0;
        while(true){
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取存入按钮"
                }
            }
            result = tools.findImage("beibaocunruBtn.png");
            if (result.status && result.img.x > 0 && result.img.y > 0) {
                var x = result.img.x + random(10, result.size.w -5);
                var y = result.img.y + random(5, 20);
                click(x, y);
                tools.悬浮球描述(`已点击保存`)
                存入仓库数量++;
                return {
                    status: true,
                    err: ""
                }
            }
            else {
                 tools.悬浮球描述(`未找到存入按钮`)
            }
            tryCount++;
            sleep(random(1000,1500))
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
    修理装备Loop: () => {
        tools.悬浮球描述("正在修理装备");
        tools.关闭所有窗口();
        sleep(1000);
        var result = true;
        tools.findImageClick("jiaoseBtn.png");
        sleep(300);
        var tryCount = 0;
        while (true) {
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取人物面板"
                }
            }
            sleep(1000);
            result = tools.findImage("rewumianbanBtn.png");
            if (result.status) {
                tools.悬浮球描述("检测到人物面板")
                break;
            }
            else {
                tools.悬浮球描述("未检测到人物面板（" + tryCount + "）")
            }
            tryCount++;
        }
        tools.卸下人物装备(result.img);
        sleep(1000);
        tools.关闭所有窗口();
        sleep(1000);
        tools.findImageClick("beibaoBtn.png");
        sleep(1000);
        tools.findImageClick("beibaozhengliBtn.png");
        sleep(random(1000, 1500));
        for (var i = 1; i <= 8; i++) {
            tools.修理装备(i);
        }
        tools.关闭所有窗口();
        sleep(1000);
        tools.穿装备();
    },
    修理装备: (index) => {
        tools.关闭所有窗口();
        sleep(1000);
        var result = true;
        sleep(300);
        var tryCount = 0;
        var { w, h } = tools.获取屏幕高宽();
        var fbl = `${device.width}_${device.height}`;
        var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
        var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
        click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
        tools.悬浮球描述("点击比奇小贩按钮");
        var tryCount = 0;
        while (true) {
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取修理物品按钮"
                }
            }
            sleep(1000);
            var result = tools.获取区域文字(0, 0, w / 2, h / 2, 60, 255, true, false);
            if (result != null && result.length > 0 && result.some(item => item.text === "普通修理")) {
                tools.悬浮球描述("检测到修理物品按钮")
                break;
            }
            else {
                tools.悬浮球描述("未检测到修理物品按钮（" + tryCount + "）")
            }
            tryCount++;
        }

        var 普通修理按钮 = config.zuobiao.比奇小贩面板.普通修理[fbl];
        click(random(普通修理按钮.x1, 普通修理按钮.x2), random(普通修理按钮.y1, 普通修理按钮.y2))
        tools.悬浮球描述("点击普通修理按钮");
        tryCount = 0;
        while (true) {
            if (tryCount >= 10) {
                return {
                    status: false,
                    err: "尝试10次未获取修理装备面板"
                }
            }
            sleep(1000);
            result = tools.获取区域文字(0, 0, w / 2, h / 2, 60, 255, true, false);
            if (result != null && result.length > 0 && result.some(item => item.text.indexOf("修理") >= 0)) {
                tools.悬浮球描述("检测到修理装备面板")
                break;
            }
            else {
                toastLog(result)
                tools.悬浮球描述("未检测到修理装备面板（" + tryCount + "）")
            }
            tryCount++;
        }


     
        tools.悬浮球描述(`开始修理${index}格子`)
        var p = 卖装备背包格子[`1_${index}`];
        var randomX = random(-5, 5);
        var randomY = random(-5, 5);
        click(p.x + randomX, p.y + randomY)
        sleep(random(1500, 2000));
        tools.findImageClick("beibaofangruBtn.png");
        sleep(random(1500,2000));
        tools.findImageClick("OKBtn.png");
        sleep(random(1500,2000));
        
    },
    穿装备:()=>{
        tools.findImageClick("beibaoBtn.png");
        sleep(random(1500,2000));
        tools.findImageClick("beibaozhengliBtn.png");
        sleep(random(1500,2000));
        var result = tools.findImage("beibaomianban.png");
        var fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.背包格子于面板偏移量[fbl]
        for (var i = 1; i <= 8; i++) {
            tools.悬浮球描述("正在穿戴第"+i+"格装备");
            var p1 = p["1_"+i];
            var x = result.img.x + p1.x + random(-8,8);
            var y = result.img.y + p1.y + random(-5,5);
            click(x,y)
            sleep(random(1500,2000));
            tools.findImageClick("beibaochuandaiBtn.png");
            sleep(random(1500,2000));
        }
    },
    打开大地图: () => {
        tools.关闭所有窗口();
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
    卸下人物装备: (装备面板) => {//点击人物头部
        var fbl = `${device.width}_${device.height}`;
        var 头盔 = config.zuobiao.人物面板.头盔[fbl];
        var 衣服 = config.zuobiao.人物面板.衣服[fbl];
        var 项链 = config.zuobiao.人物面板.项链[fbl];
        var 武器 = config.zuobiao.人物面板.武器[fbl];
        var 手镯1 = config.zuobiao.人物面板.手镯1[fbl];
        var 手镯2 = config.zuobiao.人物面板.手镯2[fbl];
        var 戒指1 = config.zuobiao.人物面板.戒指1[fbl];
        var 戒指2 = config.zuobiao.人物面板.戒指2[fbl];
        //卸下头盔
        var x = 装备面板.x + 头盔.x + random(-8,8);
        var y = 装备面板.y + 头盔.y + random(-5,5);
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
        
        //卸下衣服
        x = 装备面板.x + 衣服.x + random(-5,8);;
        y = 装备面板.y + 衣服.y + random(-5,5);;
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
        
        
        //卸下项链
        x = 装备面板.x + 项链.x + random(-5,8);;
        y = 装备面板.y + 项链.y + random(-5,5);;
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
        
        //卸下项链
        // x = 装备面板.x + xianglian.x + random(-5,8);;
        // y = 装备面板.y + xianglian.y + random(-5,5);;
        // click(x, y)
        // sleep(random(1000,1500));
        // tools.findImageClick("xiexia.png")
        // sleep(random(1000,1500));
        
        //卸下武器
        x = 装备面板.x + 武器.x + random(-5,8);;
        y = 装备面板.y + 武器.y + random(-10,10);;
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
        
        //卸下左手镯
        x = 装备面板.x + 手镯1.x + random(-5,8);;
        y = 装备面板.y + 手镯1.y + random(-5,5);;
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
        
        
        //卸下右手镯
        x = 装备面板.x + 手镯2.x + random(-5,8);;
        y = 装备面板.y + 手镯2.y + random(-5,5);;
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
        
        //卸下左戒指
        x = 装备面板.x + 戒指1.x + random(-5,8);;
        y = 装备面板.y + 戒指1.y + random(-5,5);;
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
        
        
        //卸下右戒指
        x = 装备面板.x + 戒指2.x + random(-5,8);;
        y = 装备面板.y + 戒指2.y + random(-5,5);;
        click(x, y)
        sleep(random(1000,1500));
        tools.findImageClick("xiexia.png")
        sleep(random(1000,1500));
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
            var x = result.img.x + result.size.w/2 + random(-5,5);
            var y = result.img.y + result.size.h/2 + random(-5,5);
            click(x, y)
            return true
        }
        else {
            if (fileName != "closeBtn.png" && fileName != "closeBtn2.png") {
                toastLog('找图失败' + fileName)
            }
            return false
        }
    },
    关闭所有窗口:()=>{
        var result = true;
        var tryCount = 0;
        while (result) {
            if(tryCount>=10){
                return;
            }
            result = tools.findImageClick("closeBtn2.png");
            if(result){
                sleep(1200)
            }
            else{
                sleep(999)
            }
            tryCount++;
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
toast('技术支持:宁波字节飞舞科技')

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
    sleep(1500);
    
    tools.初始化攻击面板()
    //var img = captureScreen();
    
    //var result = tools.获取全屏文字();
    //var result = tools.获取区域文字(200, 100,1060,518, 60, 255, true, false);
    // var r = utils.regionalAnalysisChart3(img, 200, 100,1060,518, 60, 255, false, false, "区域识字测试代码");
    // toastLog(r)
    
    //  toastLog('------------')
    //var smallImg = tools.截屏裁剪(img,200, 100,1060,518);
    // ocrPladderOCR = $ocr.create();
    // r = ocrPladderOCR.detect(img);
    // toastLog(r)
    // ocrPladderOCR.release();
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
                //utils.ocrGetContentStr(imgSmall);
    // tools.人物移动.去比奇挂机图Loop("兽人古墓二层");
    //tools.比奇卖物品Loop();

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
    ui.run(() => window.setPosition(windowX, h - 85));
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
        let memUsage = "内存: " + utils.getMemoryInfo() +" 存入仓库("+存入仓库数量+")";
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

