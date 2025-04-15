
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


var tools = {
    人物移动: {
        右走一步: (duration) => {
            let fbl = `${device.width}_${device.height}`;
            let p = config.zuobiao.遥感中心位置[fbl];
            let dx1 = random(-5, 5);
            let dx2 = random(40, 70);
            // let duration = random(1000, 2000);
            gestures(
                [0, duration, [p.x - dx1, p.y - dx1], [p.x + dx2, p.y + dx1]]
            );
        },
        左走一步: (duration) => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.遥感中心位置[fbl];
            let dx1 = random(-5, 5);
            let dx2 = random(40, 70);
            gestures(
                [0, duration, [p.x - dx1, p.y - dx1], [p.x - dx2, p.y + dx1]]
            );
            //swipe(p.x, p.y, p.x - 25, p.y, 500)
        },
        上走一步: (duration) => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.遥感中心位置[fbl];
            let dx1 = random(-5, 5);
            let dx2 = random(40, 70);
            gestures(
                [0, duration, [p.x - dx1, p.y - dx1], [p.x + dx1, p.y - dx2]]
            );
            //swipe(p.x, p.y, p.x, p.y - 25, 500)
        },
        下走一步: (duration) => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.遥感中心位置[fbl];
            let dx1 = random(-5, 5);
            let dx2 = random(40, 70);
            gestures(
                [0, duration, [p.x - dx1, p.y - dx1], [p.x + dx1, p.y + dx2]]
            );
            //swipe(p.x, p.y, p.x, p.y + 25, 500)
        },
        比奇安全区到小贩: () => {
            var 当前坐标 = tools.人物坐标();
            var 比奇小贩坐标 = config.zuobiao.比奇小贩坐标;
            if (比奇小贩坐标.x > 当前坐标.x) {
                tools.人物移动.右走一步((比奇小贩坐标.x - 当前坐标.x) * 1000)
                sleep(600)
            } else {
                tools.人物移动.左走一步((当前坐标.x - 比奇小贩坐标.x) * 1000)
                sleep(600)
            }
            if (比奇小贩坐标.y > 当前坐标.y) {
                tools.人物移动.下走一步((比奇小贩坐标.y - 当前坐标.y) * 1000)
                sleep(600)
            } else {
                tools.人物移动.上走一步((当前坐标.y - 比奇小贩坐标.y) * 1000)
                sleep(600)
            }
        },
        去比奇老兵: (尝试次数) => {
            尝试次数 = 尝试次数 || 0;
            var 最大尝试次数 = 20;
            if (尝试次数 >= 最大尝试次数) {
                toastLog("多次尝试未移动，终止脚本避免死循环");
                return false;
            }
            var 当前地图 = tools.人物所在地图();
            if (当前地图 == null || 当前地图 == "") {
                toastLog(`当前地图未知`);
                return false;
            }
            else {
                tools.打开大地图();
                sleep(1000);
            }
            if (当前地图 == "兽人古墓三层") {
                tools.findImageClick("map-shourengumu2.png");
                sleep(1000);
                tools.findImageClick("map-shourengumu1.png");
                sleep(1000);
                tools.findImageClick("map-biqi.png");
                sleep(1000);
                tools.findImageClick("map-biqilaobing.png");
            }
            else if (当前地图 == "兽人古墓二层") {
                tools.findImageClick("map-shourengumu1.png");
                sleep(1000);
                tools.findImageClick("map-biqi.png");
                sleep(1000);
                tools.findImageClick("map-biqilaobing.png");
            }
            else if (当前地图 == "兽人古墓一层") {
                tools.findImageClick("map-biqi.png");
                sleep(1000);
                tools.findImageClick("map-biqilaobing.png");
            }
            else if (当前地图 == "比奇省" || 当前地图 == "比奇城" || 当前地图 == "银杏山谷" || 当前地图 == "边界村") {
                tools.findImageClick("map-biqilaobing.png");
            }
            else {
                toastLog(`不支持${当前地图}回比奇老兵`);
                return false;
            }
            var result = true;
            sleep(random(1000, 2000))
            while (result) {
                result = tools.findImageClick("closeBtn.png");
            }
            sleep(random(1000, 2000))
            var 当前坐标 = tools.人物坐标();
            var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
            while (true) {
                sleep(1000 * 5);
                var 坐标 = tools.人物坐标();
                if (坐标 != null && 坐标.x > 安全区坐标范围.x1 && 坐标.x < 安全区坐标范围.x2 && 坐标.y > 安全区坐标范围.y1 && 坐标.y < 安全区坐标范围.y2) { //说明到了安全区
                    break;
                }
                else {
                    if (坐标.x == 当前坐标.x && 坐标.y == 当前坐标.y) {
                        toastLog('目标未移动，递归');
                        tools.人物移动.去比奇老兵(尝试次数 + 1);
                        break;
                    }
                    else {
                        当前坐标 = 坐标;
                    }
                }
            }
            //tools.比奇安全区到小贩();
            toastLog("到达目的地");
            return true;
            // var 当前坐标 = tools.人物坐标();

        },
        去比奇挂机图Loop: (挂机地图) => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 当前坐标 = { x: 0, y: 0 } //tools.人物坐标();
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

                var result = true;
                while (result) {
                    result = tools.findImageClick("closeBtn.png");
                    sleep(1000)
                }
            }
            else {
                toastLog("未找到closeBtn");
                return;
            }
            return;
        }
    },
    人物所在地图: () => {
        var fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.地点范围[fbl];
        var result = tools.findAllText(p.x1, p.y1, p.x2, p.y2);
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
        var result = tools.findAllText(p.x1, p.y1, p.x2, p.y2);
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
            sleep(1000)
        }
        var fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.小地图范围[fbl];
        var x = random(p.x1 + 10, p.x2);
        var y = random(p.y1, p.y2);
        click(x, y);
    },
    shenqiCapture: () => {
        try {
            //images.stopScreenCapture()
            images.requestScreenCapture()
            sleep(1000)
        } catch (error) {
            toast("请求截图错误");
            toastLog(error)
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
            tools.shenqiCapture();
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
            var result = images.findImage(img, targetImg, options);


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
            var x = result.img.x + random(5, result.size.w);
            var y = result.img.y + random(5, result.size.h);
            click(x, y)
            // toastLog('找图成功')
            return true
        }
        else {
            toastLog('找图失败' + fileName)
            return false
        }
    },
    找图并点击图片中心: (fileName) => {
        var result = tools.findImage(fileName);
        if (result.status && result.img.x > 0 && result.img.y > 0) {
            var x = result.img.x + (result.size.w / 2);
            var y = result.img.y + (result.size.h / 2);
            click(x, y)
            // toastLog('找图成功')
            return true
        }
        else {
            toastLog('找图失败' + fileName)
            return false
        }
    },
    findText: () => {
        if (img == null) {
            img = captureScreen();
        }
        var { screenWidth, screenHeight } = tools.getScreenDimensions();
        return utils.regionalAnalysisChart3(img, 0, 0, screenWidth, screenHeight, 60, 255, false, false, "区域识字测试代码");
    },
    findAllText: (x1, y1, x2, y2) => {
        tools.shenqiCapture();
        var img = captureScreen();
        return utils.regionalAnalysisChart3(img, x1, y1, x2, y2, 60, 255, false, false, "区域识字测试代码");
    },
    getScreenDimensions: () => {  // 获取当前屏幕方向
        let screenWidth, screenHeight;
        if (context.getResources().getConfiguration().orientation == 1) {
            // 竖屏
            screenWidth = device.width;
            screenHeight = device.height;
        } else {
            // 横屏
            screenWidth = device.height;
            screenHeight = device.width;
        }
        return { screenWidth, screenHeight };
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

ui.run(() => {
    win = floaty.rawWindow(
        <frame id="configFrame" gravity="center">

            <vertical w="{{w}}" h="{{h}}" bg="#55eeeeee">
                <horizontal id="tabs" w="*" bg="#eeeeee">
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
                <vertical id="content" bg="#eeeeee">
                    <vertical id="view1" visibility="visible" gravity="center">
                        <horizontal>
                            <text textSize="16sp">比奇挂机</text>
                            <spinner id="sp1" entries="兽人一层|兽人二层|兽人三层" />
                        </horizontal>
                        <horizontal>
                            <text textSize="16sp">盟重挂机</text>
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
                    <button id="btnStart" text="🚀 启动" w="0" layout_weight="1" />
                    <button id="btnSave" text="💾 保存" w="0" layout_weight="1" marginLeft="8" />
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
});


function excuteAuto() {
    isShowConfig = false
    win.setPosition(-10000, padding_top);
    sleep(1500)

    tools.人物移动.去比奇挂机图Loop("兽人古墓三层");

    // tools.人物移动.去比奇挂机图();
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

let window = floaty.window(
    <frame w="24" h="24">
        <img id="img" src="@drawable/ic_android_black_48dp" bg="#ffffff" w="24" h="24" />
    </frame>
);

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
    let { screenWidth, screenHeight } = tools.getScreenDimensions();

    // 自定义触发吸边的距离，默认是20像素
    let edgeMargin = 100;

    // 获取悬浮窗当前位置
    let windowX = window.getX();
    let windowWidth = window.getWidth();
    let windowY = window.getY();

    // 如果悬浮窗靠近左边边缘，则吸附到左边
    if (windowX < edgeMargin) {
        ui.run(() => window.setPosition(-24, windowY)); // 只露出一半图标
    }
    // 如果悬浮窗靠近右边边缘，则吸附到右边
    else if (screenWidth - windowX < edgeMargin) {
        // 调整计算方式，使右边能够正确吸附，并露出一半
        ui.run(() => window.setPosition(screenWidth - 34, windowY));
    }
    // 否则恢复到原位置
    else {
        ui.run(() => window.setPosition(windowX, windowY));
    }
}
// 拖动逻辑 + 自动吸边
let x = 0, y = 0;
let windowX, windowY;
let downTime;

window.img.setOnTouchListener(function (view, event) {
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
setInterval(() => {
    updateWindowPosition();
}, 1000);



function showWinConfig() {
    var { screenWidth, screenHeight } = tools.getScreenDimensions();
    w = parseInt(screenWidth * 0.8);
    h = parseInt(screenHeight * 0.7);
    padding_left = parseInt(screenWidth * 0.1)
    padding_top = parseInt((screenHeight) * 0.15);
    tabW = parseInt((w / tabCount));
    win.setSize(w, h);
    win.setPosition(padding_left, padding_top);
    // win.setTouchable(true);    // 可交互
    win.tab1.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab2.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab3.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.btnStart.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.btnSave.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW - 30, -2));
    win.btnClose.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW - 30, -2));
}







var Intent = android.content.Intent;
var intent = new Intent(Intent.ACTION_MAIN);
intent.addCategory(Intent.CATEGORY_HOME);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
context.startActivity(intent);


setInterval(() => { }, 1000);

