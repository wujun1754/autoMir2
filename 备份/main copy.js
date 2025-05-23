/*
 * @Author: 字节飞舞
 * @QQ: 175417739@qq.com
 * @Date: 2025-04-11 04:22:04
 * @Version: Auto.Js Pro
 * @Description: 
 */

auto.waitFor() // 等待无障碍服务开启
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
var 当前挂机顺序 = 0;
var 当前挂机地图 = "兽人古墓一层";
var 启动金币 = "未知"
var 上次坐标记录 = {
    x: 0,
    y: 0
}
var 挂机参数 = {
    持久零补给_衣服: true,
    持久零补给_武器: true,
}
const 总状态 = {
    检查装备: "检查装备",
    请求装备检查: "请求装备检查",
    回城补给: "回城补给",
    请求回城补给: "请求回城补给",
    程序暂停: "程序暂停",
    请求程序暂停: "请求程序暂停",
    挂机中: "挂机中",

};
const 挂机状态 = {
    未启动: "未启动",
    打怪中: "打怪中",
    找怪中: "找怪中",
    跑图选址: "跑图选址"
};
var 当前总状态 = "程序暂停";
var 当前挂机状态 = "未启动"
var tools = {
    常用操作: {
        打开角色: () => {
            var r = tools.findImageForWaitClick("jiaoseBtn.png", {
                maxTries: 10,
                interval: 666
            });
            return r;
        },
        打开背包: () => {
            var r = tools.findImageForWaitClick("beibaoBtn.png", {
                maxTries: 10,
                interval: 666
            });
            return r;
        },
        获取角色面板: () => {
            var r = tools.findImageForWaitClick("rewumianbanBtn.png", {
                maxTries: 10,
                interval: 666
            });
            return r;
        },
        点击角色面板_武器: (角色面板) => {
            var fbl = `${device.width}_${device.height}`;
            var 武器 = config.zuobiao.人物面板.武器[fbl];
            var x = 角色面板.x + 武器.x + random(-8, 8);
            var y = 角色面板.y + 武器.y + random(-5, 5);
            click(x, y)
            var 卸下按钮 = tools.findImageForWait("xiexia.png", {
                maxTries: 10,
                interval: 666
            });
            return 卸下按钮;
        },
        点击角色面板_衣服: (角色面板) => {
            var fbl = `${device.width}_${device.height}`;
            var 衣服 = config.zuobiao.人物面板.衣服[fbl];
            var x = 角色面板.x + 衣服.x + random(-8, 8);
            var y = 角色面板.y + 衣服.y + random(-5, 5);
            click(x, y)
            var 卸下按钮 = tools.findImageForWait("xiexia.png", {
                maxTries: 10,
                interval: 666
            });
            return 卸下按钮;
        },
        初始化挂机: () => {
            tools.常用操作.关闭所有窗口();
            var fbl = `${device.width}_${device.height}`;
            tools.悬浮球描述("初始化攻击面板");
            var r = null;
            while (true) {
                r = tools.常用操作.初始化攻击面板();
                if (r) {
                    break;
                } else {
                    sleep(random(1200, 1500))
                }
            }
            r = tools.常用操作.获取人物金币();
            if(r!=null){
                启动金币 = r;
            }
            // while(true){
            //     r = tools.findImage("youmoshiBtn.png");
            //     toastLog(r)
            //     var p = config.zuobiao.按钮集合[fbl].模式;
            //     if (!r.status) {
            //         click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]));
            //         sleep(random(333,666));
            //     }
            //     else{
            //         break;
            //     }
            // }
            tools.悬浮球描述("初始化完成");
        },
        初始化攻击面板: () => {
            var fbl = `${device.width}_${device.height}`;
            var r = tools.findImage("zuoguaiwuBtnTip0.png")
            var p = config.zuobiao.左攻击面板[fbl];
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }
    
            r = tools.findImage("zuoguaiwuBtnTip1.png")
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                return true;
            }
    
            r = tools.findImage("zuozuduiBtnTip0.png")
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                click(random(p.切换.x[0], p.切换.x[1]), random(p.切换.y[0], p.切换.y[1]));
                sleep(random(1500, 2000))
                click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }
    
            r = tools.findImage("zuozuduiBtnTip1.png")
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                click(random(p.切换.x[0], p.切换.x[1]), random(p.切换.y[0], p.切换.y[1]));
                sleep(random(1500, 2000))
                click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true
            }
    
            click(random(p.展开.x[0], p.展开.x[1]), random(p.展开.y[0], p.展开.y[1]));
            return false
            // var text = tools.获取区域文字(7, 35, 148, 200, 60, 255, false, false);
            // toastLog(text)
        },
        打开大地图: () => {
            tools.常用操作.关闭所有窗口();
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.小地图范围[fbl];
            var x = random(p.x1 + 10, p.x2);
            var y = random(p.y1, p.y2);
            click(x, y);
        },
        获取挂机坐标: () => {
            var r = null;
            var fbl = `${device.width}_${device.height}`;
            if (当前挂机地图 == "兽人古墓一层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.打怪点;
            } else if (当前挂机地图 == "兽人古墓二层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.打怪点;
            } else if (当前挂机地图 == "兽人古墓三层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第三层.打怪点;
            } else {
                return {
                    status: false,
                    err: "不支持" + 当前挂机地图 + "地图"
                }
            }
            return {
                status: true,
                result: r
            }
        },
        点击挂机坐标: () => {
            tools.悬浮球描述("开始跑图");
            tools.常用操作.打开大地图();
            var 人物坐标 = tools.常用操作.获取人物坐标();
            var 挂机坐标s = tools.常用操作.获取挂机坐标();
            if (!挂机坐标s.status) {
                return {
                    status: false,
                    err: 挂机坐标s.err
                }
            }
            var r = 挂机坐标s.result[当前挂机顺序];
            if (人物坐标 != null) {
                if (人物坐标.x >= r.坐标范围.x[0] && 人物坐标.x <= r.坐标范围.x[1] && 人物坐标.y >= r.坐标范围.y[0] && 人物坐标.y <= r.坐标范围.y[1]) {
                    当前挂机顺序++;
                    if (当前挂机顺序 >= 挂机坐标s.result.length) {
                        当前挂机顺序 = 0;
                    }
                    r = 挂机坐标s.result[当前挂机顺序];
                    tools.悬浮球描述("切换到第" + (当前挂机顺序 + 1) + "个挂机点");
                    toastLog("切换到第" + 当前挂机顺序 + "个挂机点");
                }
            }
            var closeImg = null;
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 666
            })
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                return {
                    status: false,
                    err: "获取大地图关闭按钮失败"
                }
            }
            var x = closeImg.x + random(r.x[0], r.x[1]);
            var y = closeImg.y + random(r.y[0], r.y[1]);
            toastLog(x + ":" + y)
            click(x, y)
            sleep(random(333, 666))
            tools.常用操作.关闭所有窗口();
            return {
                status: true,
                err: "已点击坐标"
            }
        },
        获取人物坐标: () => {
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
            } else {
                return null;
            }
        },
        人物所在地图: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.地点范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
            if (result != null && result.length == 1) {
                return result[0].text;
            } else {
                return result;
            }
        },
        获取人物金币: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.金币范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1-10, p.x2, p.y2, 60, 255, true, false);
            if (result != null && result.length == 1) {
                return result[0].text;
            } else {
                return null;
            }
        },
        检查背包是否满: () => {
            tools.常用操作.关闭所有窗口();
            tools.常用操作.打开背包();
            var r = tools.findImageForWait("beibaomianban.png", {
                maxTries: 10,
                interval: 666
            })        
            if(r.status){
                tools.findImageForWaitClick("beibaozhengliBtn.png", {
                    maxTries: 10,
                    interval: 666
                })
                sleep(666)
                var fbl = `${device.width}_${device.height}`;
                var p = config.zuobiao.背包格子于面板偏移量[fbl]["5_6"];
                var x = r.img.x + p.x + random(-8, 8);
                var y = r.img.y + p.y + random(-5, 5);
                click(x, y)
                r = tools.findImageForWait("beibaochuandaiBtn.png", {
                    maxTries: 6,
                    interval: 666
                })
                if(r.status){
                    toastLog("背包已满")
                    return true;
                }
                r = tools.findImageForWait("beibaoshiyongBtn.png", {
                    maxTries: 6,
                    interval: 666
                })
                if(r.status){
                    toastLog("背包已满")
                    return true;
                }
            }
            toastLog("背包未满")
            return false;
        },
        读取聊天框信息: () => {

        },
        获取装备持久: () => {
            var result = {
                武器: null,
                衣服: null
            };
            tools.常用操作.关闭所有窗口();
            var fbl = `${device.width}_${device.height}`;
            var 角色 = tools.常用操作.打开角色();
            if (!角色.status) return result
            var 角色面板 = tools.常用操作.获取角色面板();
            if (!角色面板.status) return result
            var 装备属性明细 = config.zuobiao.人物面板.装备属性明细[fbl];
            var 卸下按钮 = tools.常用操作.点击角色面板_武器(角色面板.img);
    
    
            //ocrPladderOCR = $ocr.create()
            if (卸下按钮.status) {
                var p = 卸下按钮.img;
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y, p.x, p.y + 装备属性明细.y);
                let r = ocrPladderOCR.detect(img);
                result.武器 = tools.常用操作.根据面板获取持久(r);
            }
    
            卸下按钮 = tools.常用操作.点击角色面板_衣服(角色面板.img);
            if (卸下按钮.status) {
                var p = 卸下按钮.img;
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y, p.x, p.y + 装备属性明细.y);
                let r = ocrPladderOCR.detect(img);
                result.衣服 = tools.常用操作.根据面板获取持久(r);
                //click(p.x - 10, p.y - 10);
            }
    
            tools.常用操作.关闭所有窗口(true);
    
            //ocrPladderOCR.release();
            return result;
        },
        根据面板获取持久: (result) => {
            if (result == null) return null;
            for (var i = 0; i < result.length; i++) {
                if (result[i].text.indexOf("重量") >= 0 || result[i].text.indexOf("持久") >= 0) {
                    let match = result[i].text.match(/(\d+)\s*\/\s*(\d+)/);
                    if (match) {
                        return {
                            剩持久: parseInt(match[1]),
                            满持久: parseInt(match[2])
                        };
                    } else {
                        return null;
                    }
                }
            }
        },
        判断是否需要补给:()=>{
            var r = tools.常用操作.获取装备持久();
            if (r && r.衣服 && r.衣服.剩持久 <= 0 && 挂机参数.持久零补给_衣服) {
                return true;
            } 
            if (r && r.武器 && r.武器.剩持久 <= 0 && 挂机参数.持久零补给_武器) {
                var isOk = tools.喝修复油();
                if (!isOk) {
                    return true;
                }
            } 
            var r1 = tools.常用操作.检查背包是否满();
            if(r1){
                return true;
            }
            return false;
           
        },
        点击分身:()=>{
            var r = tools.findImageForWaitClick("fenshenxiulianBtn.png", {
                maxTries: 6,
                interval: 666
            })
            if(!r.status){
                var fbl = `${device.width}_${device.height}`;
                var 左上箭头 = config.zuobiao.按钮集合[fbl].左上箭头;
                click(random(左上箭头.x[0],左上箭头.x[1]) ,random(左上箭头.y[0],左上箭头.y[1]))
                sleep(1200)
            }
            r = tools.findImageForWaitClick("fenshenxiulianBtn.png", {
                maxTries: 6,
                interval: 666
            })
            if(!r.status){
                return false;
            }
            
            //var dsdf =lingqujiangliBtn.png
        },
        关闭所有窗口: (isClick) => {
            if(isClick){
                var fbl = `${device.width}_${device.height}`;
                var 人物中心 = config.zuobiao.人物中心[fbl];
                click(人物中心.x + random(5,-5),人物中心.y + random(5,-5))
                sleep(333,666);
            }
            var result = true;
            while (result) {
                result = tools.findImageClick("closeBtn2.png");
                if (result) {
                    sleep(666)
                } else {
                    sleep(333)
                }
            }
        },
    },
    悬浮球描述: (text) => {
        ui.run(() => {
            window.eventText.setText(text);
        });
    },
    喝修复油: () => {
        var 背包按钮 = tools.常用操作.打开背包();
        if (背包按钮.status) {
            var 修复油 = tools.findImageForWaitClick("xiufuyou1.png", {
                maxTries: 10,
                interval: 666
            });
            if (修复油.status) {
                let fbl = `${device.width}_${device.height}`;
                if (修复油.img.y < config.zuobiao.药品格子面板[fbl].y1) {
                    tools.findImageForWaitClick("shiyongBtn.png", {
                        maxTries: 10,
                        interval: 666
                    });
                }
                return true;
            }
        }
        return false;
    },
    人物移动: {
        右走一步: (duration) => {
            if (duration > 0) {
                let fbl = `${device.width}_${device.height}`;
                let p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gestures(
                    [0, duration, [p.x - dx1, p.y - dx1],
                        [p.x + dx2, p.y + dx1]
                    ]
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
                    [0, duration, [p.x - dx1, p.y - dx1],
                        [p.x - dx2, p.y + dx1]
                    ]
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
                    [0, duration, [p.x - dx1, p.y - dx1],
                        [p.x + dx1, p.y - dx2]
                    ]
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
                    [0, duration, [p.x - dx1, p.y - dx1],
                        [p.x + dx1, p.y + dx2]
                    ]
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
            var 人物坐标 = tools.常用操作.获取人物坐标();
            var 当前地图 = tools.常用操作.人物所在地图();
            if (当前地图 != null && 人物坐标 != null && 当前地图 == "比奇城" && Math.abs(人物坐标.x - 比奇小贩坐标.x) <= 2 && Math.abs(人物坐标.y - 比奇小贩坐标.y) <= 2) {
                return true;
            } else {
                return false;
            }
        },
        去比奇小贩Loop: () => {
            while (true) {
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 当前地图 = tools.常用操作.人物所在地图();
                if (人物坐标 != null && 当前地图 != null) {
                    var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
                    if (当前地图 == "比奇城" && 人物坐标.x > 安全区坐标范围.x1 - 30 && 人物坐标.x < 安全区坐标范围.x2 + 30 && 人物坐标.y > 安全区坐标范围.y1 - 30 && 人物坐标.y < 安全区坐标范围.y2 + 30) {
                        tools.人物移动.比奇安全区到小贩(人物坐标);
                        var 比奇小贩坐标 = config.zuobiao.比奇小贩坐标;
                        人物坐标 = tools.常用操作.获取人物坐标();
                        if (人物坐标 != null && Math.abs(人物坐标.x - 比奇小贩坐标.x) <= 2 && Math.abs(人物坐标.y - 比奇小贩坐标.y) <= 2) {
                            toastLog("到达小贩NPC");
                            break;
                        } else {
                            toastLog("未找到小贩NPC");
                        }
                    } else {
                        tools.人物移动.去比奇老兵Loop();
                    }
                }
                else{
                    toastLog("人物坐标:"+JSON.stringify(人物坐标))
                }
                sleep(5000)
            }
        },
        去比奇老兵: () => {
            var 当前地图 = tools.常用操作.人物所在地图();
            if (当前地图 == null || 当前地图 == "") {
                toastLog(`当前地图未知`);
                return;
            } else {
                tools.常用操作.打开大地图();
            }
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                var fbl = `${device.width}_${device.height}`;
                var routes = config.地图路由[当前地图]["回比奇老兵"];
                var 大地图坐标 = config.zuobiao.比奇大地图偏移[fbl];
                for (var i = 0; i < routes.length; i++) {
                    var 路由 = routes[i];
                    var r = null;
                    路由.forEach((item) => {
                        r = (r == null ? 大地图坐标[item] : r[item]);
                    })
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(random(1200, 1666));
                }
                tools.常用操作.关闭所有窗口();
            } else {
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去比奇老兵Loop: () => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 历史坐标 = tools.常用操作.获取人物坐标();
            while (true) {
                var 当前地图 = tools.常用操作.人物所在地图();
                var 人物坐标 = tools.常用操作.获取人物坐标();
                if (当前地图 == null) {
                    toastLog('获取当前地图失败')
                    sleep(666)
                    continue;
                }
                if (人物坐标 == null) {
                    toastLog('获取人物坐标失败')
                    sleep(666)
                    continue;
                }
                var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
                if (人物坐标.x > 安全区坐标范围.x1 && 人物坐标.x < 安全区坐标范围.x2 && 人物坐标.y > 安全区坐标范围.y1 && 人物坐标.y < 安全区坐标范围.y2) {
                    sleep(3000);
                    break; //说明到了安全区
                } else {
                    if (人物坐标 != null && 历史坐标 != null && 人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y) {
                        toastLog('开始跑图');
                        try {
                            tools.人物移动.去比奇老兵();
                        } catch (error) {
                            toastLog(error)
                            sleep(666)
                        }
                    } else {
                        历史坐标 = 人物坐标;
                    }
                }
                sleep(1000 * 5);
            }
            toastLog("到达目的地");
            return;

        },
        去比奇挂机图: (挂机地图) => {
            var 当前地图 = tools.常用操作.人物所在地图();
            if (当前地图 == null || 当前地图 == "") {
                toastLog(`当前地图未知`);
                return false;
            } else {
                tools.常用操作.打开大地图();
                sleep(1000);
            }
            var closeBtn = tools.findImage("closeBtn.png");
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                var fbl = `${device.width}_${device.height}`;
                var routes = config.地图路由[当前地图][挂机地图];
                var 大地图坐标 = config.zuobiao.比奇大地图偏移[fbl];
                for (var i = 0; i < routes.length; i++) {
                    var 路由 = routes[i];
                    var r = null;
                    路由.forEach((item) => {
                        r = (r == null ? 大地图坐标[item] : r[item]);
                    })
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(random(1200, 1666));
                }
                tools.常用操作.关闭所有窗口();
            } else {
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去比奇挂机图Loop: (挂机地图) => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 当前坐标 = tools.常用操作.获取人物坐标();
            toastLog(当前坐标)
            while (true) {
                var 当前地图 = tools.常用操作.人物所在地图();
                var 坐标 = tools.常用操作.获取人物坐标();
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
                } else {
                    if (坐标 != null && 当前坐标 != null && 坐标.x == 当前坐标.x && 坐标.y == 当前坐标.y) {
                        toastLog('重新跑图');
                        try {
                            tools.人物移动.去比奇挂机图(挂机地图);
                        } catch (error) {
                            toastLog('跑图异常')
                        }
                    } else {
                        当前坐标 = 坐标;
                    }
                }
                sleep(1000 * 5);
            }
            toastLog("到达目的地");
            return;
        },
    },
    挂机地图打怪: () => {
        当前挂机状态 = 挂机状态.找怪中;
        let now = new Date();
        let minute = now.getMinutes(); // 分
        let second = now.getSeconds(); // 秒
        tools.悬浮球描述("找怪(" + minute + ":" + second + ")");
        var fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.左攻击面板[fbl];
        var p2 = config.zuobiao.锁定怪物标识范围[fbl];
        var 按钮集合 = config.zuobiao.按钮集合[fbl];
        var r = tools.findImage("zuoguaiwuBtn.png");
        var tryCount = 0;
        var isFind = false;
        if (r.status && r.img.x > 0 && r.img.y > 0) {
            click(random(p.选择怪物攻击.x[0], p.选择怪物攻击.x[1]), random(p.选择怪物攻击.y[0], p.选择怪物攻击.y[1]));
            r = tools.findImageAreaForWait("zhongjianguaiwuBtn.png", p2.x[0], p2.y[0], p2.x[1], p2.y[1], {
                maxTries: 6,
                interval: 500
            })
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                tools.悬浮球描述("攻击中");
                当前挂机状态 = 挂机状态.打怪中;
                click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                isFind = true;
            }
        }
        if (isFind) {
            var timeout = 1000 * 60;
            let start = new Date().getTime();
            while (true) {
                if (new Date().getTime() - start > timeout) {
                    tools.常用操作.点击挂机坐标();
                    sleep(1000 * 10);
                    break;
                }
                r = tools.findImageArea("zhongjianguaiwuBtn.png", p2.x[0], p2.y[0], p2.x[1], p2.y[1])
                if (r.status) {
                    tools.悬浮球描述("攻击中(" + parseInt((timeout - (new Date().getTime() - start)) / 1000) + ")");
                    sleep(random(333, 666));
                } else {
                    tools.开始拾取();
                    break;
                }
            }
        }
        //tools.悬浮球描述("("+minute+":"+second+")");
        return isFind;
    },
    开始拾取: () => {
        var tryCount = 0;
        var fbl = `${device.width}_${device.height}`;
        var 按钮集合 = config.zuobiao.按钮集合[fbl];
        var r = null;
        click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
        while (true) {
            if (tryCount >= 10) {
                click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
                break;
            }
            sleep(random(555, 666));
            r = tools.findImage("shiquzhongBtn.png", 0.9)
            if (r.status && r.img.x > 0 && r.img.y > 0) { } else {
                break;
            }
            tryCount++;
        }
    },
    比奇丢护身符: (起始坐标x, 起始坐标y, 时间戳, 检查x, 检查y) => {
        var tryCount = 0;
        var fbl = `${device.width}_${device.height}`;
        var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
        var {
            w,
            h
        } = tools.获取屏幕高宽();
        while (true) {
            if (tryCount >= 5) {
                return {
                    status: false,
                    err: "丢不掉"
                }
            }
            var x1 = tryCount == 0 ? 起始坐标x + random(-5, 5) : 检查x + random(-5, 5);
            var y1 = tryCount == 0 ? 起始坐标y + random(-5, 5) : 检查y + random(-5, 5);
            var x2 = random(config.zuobiao.比奇丢东西范围[fbl].x[0], config.zuobiao.比奇丢东西范围[fbl].x[1]);
            var y2 = random(config.zuobiao.比奇丢东西范围[fbl].y[0], config.zuobiao.比奇丢东西范围[fbl].y[1]);
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
                if (allText.indexOf("重量") < 0 || allText.indexOf("放入") < 0) {
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
    补给操作:{
        回比奇补给: () => {
            tools.人物移动.去比奇小贩Loop();
            tools.补给操作.卖物品Loop();
            tools.补给操作.修理装备Loop();
            tools.补给操作.买物品Loops([{
                name: "修复油",
                num: 5
            }]);
        },
        卖物品Loop:()=>{
            tools.悬浮球描述("开始卖物品");
            while (true) {
                var result = tools.补给操作.卖物品();
                if (result.status) {
                    tools.悬浮球描述("结束卖物品");
                    break;
                } else {
                    tools.悬浮球描述(result.err);
                }
            }
        },
        卖物品: () => {
            tools.常用操作.关闭所有窗口();
            var result = null;
            var {
                w,
                h
            } = tools.获取屏幕高宽();
            var fbl = `${device.width}_${device.height}`;
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
            click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
            var r = tools.findImageForWaitClick("chushouwupingBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if(!r.status){
                return {
                    status: false,
                    err: "未获取出售物品按钮"
                }
            }
            r = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 5,
                interval: 666
            });
            var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
            sleep(random(666, 888));
            var 第一格 = 卖装备背包格子[`1_1`];
            for (let index = 1; index <= 5; index++) {
                for (let index1 = 1; index1 <= 8; index1++) {
                    tools.悬浮球描述(`开始出售${index}_${index1}格子`)
                    var p = 卖装备背包格子[`${index}_${index1}`];
                    var randomX = random(-5, 5);
                    var randomY = random(-5, 5);
                    click(p.x + randomX, p.y + randomY)
                    r = tools.findImageForWait("beibaofangruBtn.png", {
                        maxTries: 10,
                        interval: 666
                    });
                    if(r.status){
                        var img = captureScreen();
                        var imgSmall = tools.截屏裁剪(img, 卖装备背包格子["1_1"].x, 卖装备背包格子["1_1"].y, w, 卖装备背包格子["最底部"]) //captureScreen();//
                        let r = ocrPladderOCR.detect(imgSmall); //utils.ocrGetContentStr(imgSmall);
                        var allText = '';
                        //var exists = r.some(item => item.text.indexOf"极品");
                        if (r) {
                            r.forEach(item => {
                                allText += item.text;
                            });
                            if (allText.indexOf("极品") >= 0 || allText.indexOf("护身符") >= 0) {
                                tools.悬浮球描述(`${index}_${index1}存仓库`)
                                tools.补给操作.存仓库(index, index1);
                                return {
                                    status: false,
                                    err: "重新卖装备"
                                }
                            }
                            else {
                                var is需存仓库装备 = false;
                                config.需存仓库装备.forEach(item => {
                                    if (allText.indexOf(item) >= 0) {
                                        is需存仓库装备 = true;
                                    }
                                })
                                if (is需存仓库装备) {
                                    tools.悬浮球描述(`${index}_${index1}发现需存仓库装备`)
                                    tools.补给操作.存仓库(index, index1);
                                    return {
                                        status: false,
                                        err: "重新卖装备"
                                    }
                                } 
                                else {
                                    r = tools.findImageForWaitClick("beibaofangruBtn.png", {
                                        maxTries: 10,
                                        interval: 666
                                    });
                                    sleep(random(666, 888));
                                    r = tools.findImageForWaitClick("OKBtn.png", {
                                        maxTries: 10,
                                        interval: 666
                                    });
                                }
                            }
                        }
                        utils.recycleNull(img);
                        utils.recycleNull(imgSmall);
                        }
                        else{
                            return {
                                status: true,
                                err: ""
                            } 
                        }
                    //sleep(random(888, 1288));
                    // tools.悬浮球描述("送检YoLo分析是否极品")
                   
                    //var savePath = `/sdcard/${index}_${index1}.png`;  // 保存路径可以自定义
                    // toastLog(JSON.stringify(result));
                    // 保存图片
                    //images.save(img, savePath, "png");  // 保存为 PNG 格式
                    //var text = ocr.detect(img);//utils.regionalAnalysisChart2(img,卖装备背包格子["1_1"].x,卖装备背包格子["1_1"].y,w,卖装备背包格子["最底部"],60,255,false,false,"区域识字测试代码");
                  
                    // toastLog("----------------------");
                    sleep(1500)
                }
            }
            return {
                status: true,
                err: ""
            }
        },
        买物品Loops: (物品s) => {
            let 物品集合 = 物品s.map((item, i) => {
                var 物品页码 = config.zuobiao.购买物品页码[item["name"]];
                return {
                    "名称": item["name"],
                    "数量": item["num"],
                    "页码": 物品页码.页码,
                    "顺序": 物品页码.顺序,
                    "是否下翻": 物品页码.是否下翻,
                };
            });
            for (var i = 0; i < 物品集合.length; i++) {
                var 物品对象 = 物品集合[i];
                tools.悬浮球描述("开始购买" + 物品对象["名称"] + "物品");
                tools.补给操作.买物品(物品对象)
            }
        },
        买物品: (物品对象) => {
            tools.常用操作.关闭所有窗口();
            var result = null;
            var {
                w,
                h
            } = tools.获取屏幕高宽();
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
                sleep(random(1500, 2000))
            }
            var p = 购买物品位置[物品对象.顺序.toString()];
            click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
            sleep(random(1000, 1500))
            if (物品对象["是否下翻"]) {
                tools.findImageClick("buyOkBtn.png");
                sleep(random(666, 888))
                p = 购买物品位置["1"];
                click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
                sleep(random(1500, 2000))
            }
            for (var i = 0; i < 物品对象["数量"]; i++) {
                tools.findImageClick("buyOkBtn.png");
                sleep(random(666, 888))
            }
        },
        存仓库: (index1, index2) => {
            tools.常用操作.关闭所有窗口();
            var {
                w,
                h
            } = tools.获取屏幕高宽();
            var fbl = `${device.width}_${device.height}`;
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
            click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2));
            var r = tools.findImageForWaitClick("baocunwupingBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if(!r.status){
                return {
                    status: false,
                    err: "尝试10次未获取到保管物品按钮"
                }
            }
            r = tools.findImageForWait("cangku_clear.png", {
                maxTries: 10,
                interval: 666
            });
            if(!r.status){
                return {
                    status: false,
                    err: "尝试10次未获取到保管物品按钮"
                }
            }
            tools.悬浮球描述(`开始保存${index1}_${index2}格子东西`)
            var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
            var 偏移量 = config.zuobiao.保存仓库包格子偏移量[fbl];
            var p = 卖装备背包格子[`${index1}_${index2}`];
            var randomX = random(-5, 5);
            var randomY = random(-5, 5);
            click(p.x + randomX + 偏移量.x, p.y + randomY + 偏移量.y)
            
            r = tools.findImageForWaitClick("beibaocunruBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if(r.status){
               存入仓库数量++;
            }
            else{
                 return {
                    status: false,
                    err: "尝试10次未获取到存入按钮"
                }
            }
        },
        修理装备Loop: () => {
            tools.悬浮球描述("修理装备中");
            tools.补给操作.卸下人物装备();
            tools.补给操作.修理装备();
            tools.补给操作.穿装备();
            tools.悬浮球描述("修理结束");
        },
        修理装备: () => {
            var result = true;
            var tryCount = 0;
            var {
                w,
                h
            } = tools.获取屏幕高宽();
            var fbl = `${device.width}_${device.height}`;
            var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
            
            tools.常用操作.关闭所有窗口();
            tools.常用操作.打开背包();
            sleep(333,666);
            tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 666
            })
            for (let index = 1; index <= 5; index++) {
                for (let index1 = 1; index1 <= 8; index1++) {
                    tools.常用操作.关闭所有窗口();
                    tools.悬浮球描述(`开始修理${index}_${index1}格子`);
                    click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
                    result = tools.findImageForWaitClick("putongxiuliBtn.png", {
                        maxTries: 10,
                        interval: 666
                    })
                    if(!result.status){
                        continue;
                    }
                    sleep(random(666,888));
                    var p = 卖装备背包格子[`${index}_${index1}`];
                    var randomX = random(-5, 5);
                    var randomY = random(-5, 5);
                    click(p.x + randomX, p.y + randomY)
                    sleep(random(333,666));
                    result = tools.findImageForWaitClick("beibaofangruBtn.png", {
                        maxTries: 6,
                        interval: 666
                    })
                    if(result.status){
                        tools.findImageForWaitClick("OKBtn.png", {
                            maxTries: 10,
                            interval: 666
                        })
                        sleep(random(333,666))
                    }
                    else{
                        return;
                    }
                }
            }
        },
        卸下人物装备: () => {
            tools.常用操作.关闭所有窗口();
            var result = tools.findImageForWaitClick("jiaoseBtn.png", {
                maxTries: 10,
                interval: 666
            })
            result = tools.findImageForWaitClick("rewumianbanBtn.png", {
                maxTries: 10,
                interval: 666
            })
            if (!result.status) {
                return {
                    status: false,
                    err: "尝试10次未获取人物面板"
                }
            } 
            var 装备面板 = result.img;
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
            var x = 装备面板.x + 头盔.x + random(-8, 8);
            var y = 装备面板.y + 头盔.y + random(-5, 5);
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
            
            sleep(random(333, 666));
    
            //卸下衣服
            x = 装备面板.x + 衣服.x + random(-5, 8);;
            y = 装备面板.y + 衣服.y + random(-5, 5);;
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
            sleep(random(333, 666));
    
    
            //卸下项链
            x = 装备面板.x + 项链.x + random(-5, 8);;
            y = 装备面板.y + 项链.y + random(-5, 5);;
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
            sleep(random(333, 666));
    
            //卸下武器
            x = 装备面板.x + 武器.x + random(-5, 8);;
            y = 装备面板.y + 武器.y + random(-10, 10);;
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
            sleep(random(333, 666));
    
            //卸下左手镯
            x = 装备面板.x + 手镯1.x + random(-5, 8);;
            y = 装备面板.y + 手镯1.y + random(-5, 5);;
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
            sleep(random(333, 666));
    
    
            //卸下右手镯
            x = 装备面板.x + 手镯2.x + random(-5, 8);;
            y = 装备面板.y + 手镯2.y + random(-5, 5);;
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
            sleep(random(333, 666));
    
            //卸下左戒指
            x = 装备面板.x + 戒指1.x + random(-5, 8);;
            y = 装备面板.y + 戒指1.y + random(-5, 5);;
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
            sleep(random(333, 666));
    
    
            //卸下右戒指
            x = 装备面板.x + 戒指2.x + random(-5, 8);;
            y = 装备面板.y + 戒指2.y + random(-5, 5);;
            click(x, y)
            tools.findImageForWaitClick("xiexia.png", {
                maxTries: 10,
                interval: 666
            })
        },
        穿装备: () => {
            tools.常用操作.关闭所有窗口();
            tools.常用操作.打开背包();
            tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 666
            })
            var result = tools.findImageForWait("beibaomianban.png", {
                maxTries: 10,
                interval: 666
            })        
            sleep(333,666);
            if(result.status){
                var fbl = `${device.width}_${device.height}`;
                var p = config.zuobiao.背包格子于面板偏移量[fbl];
                for (let index = 1; index <= 5; index++) {
                    for (let index1 = 1; index1 <= 8; index1++) {
                        tools.悬浮球描述("穿戴" + index + "_"+index1+"格");
                        var p1 = p[index+"_" + index1];
                        var x = result.img.x + p1.x + random(-8, 8);
                        var y = result.img.y + p1.y + random(-5, 5);
                        click(x, y)
                        var r = tools.findImageForWaitClick("beibaochuandaiBtn.png", {
                            maxTries: 6,
                            interval: 666
                        })
                        if(!r.status){
                            return
                        }
                        sleep(random(333, 666));
                    }
                }
            }
    
        },
    },
    送检YoLo: (img, mode) => {
        //var img = images.read("/sdcard/screenshot.png");
        var base64Str = android.util.Base64.encodeToString(images.toBytes(img, "png"), 0);

        var url = "";
        if (mode == "jipin") {
            url = "http://183.249.84.44:9850/jipin"
        } else {
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
        var response = http.postJson(url, data, {
            headers: headers,
            timeout: 10000
        });
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
        } else {
            toastLog("申请截图失败");
            exit();
        }
    },
    findImageForWaitClick: (fileName, options) => {
        var result = tools.findImageForWait(fileName, options);
        if (result.status && result.img.x > 0 && result.img.y > 0) {
            var x = result.img.x + result.size.w / 2 + random(-5, 5);
            var y = result.img.y + result.size.h / 2 + random(-5, 5);
            click(x, y)

        }
        return result;
    },
    findImageForWait: (fileName, options) => {
        // let {
        //     timeout = 1000 * 60,
        //     interval = 500,
        //     maxTries = 6,
        //     log = false
        // } = options;
        let timeout, interval, maxTries, log;
        if (options) {
            timeout = options.timeout !== undefined ? options.timeout : 1000 * 60;
            interval = options.interval !== undefined ? options.interval : 500;
            maxTries = options.maxTries !== undefined ? options.maxTries : 6;
            log = options.log !== undefined ? options.log : false;
        } else {
            timeout = 1000 * 60;
            interval = 500;
            maxTries = 6;
            log = false;
        }
        let start = new Date().getTime();
        let tryCount = 0;
        while (true) {
            sleep(interval);
            var msg = "";
            if (maxTries && tryCount >= maxTries) {
                msg = "超过最大尝试次数，未找到图像：" + fileName;
                if (log) toastLog(msg);
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
            if (new Date().getTime() - start > timeout) {
                msg = "超时未找到图像：" + fileName;
                if (log) log(msg);
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
            let result = tools.findImage(fileName);
            if (result.status) {
                tools.悬浮球描述("找图"+fileName+"成功("+(tryCount+1)+")");
                return result
            }
            else{
                tools.悬浮球描述("找图"+fileName+"失败("+(tryCount+1)+")");
            }

            tryCount++;
        }
    },
    findImageAreaForWait: (fileName, x1, y1, x2, y2, options) => {
        var w = device.width;
        var h = device.height;
        var exists = config.youxiaoFBL.some(item => item.w === w && item.h === h);
        if (!exists) {
            return {
                status: false,
                img: null,
                err: '不支持' + w + 'x' + h + '分辨率'
            }
        }
        // let {
        //     timeout = 1000 * 60,
        //     interval = 300,
        //     maxTries = 6,
        //     log = false
        // } = options;
        let timeout, interval, maxTries, log;
        if (options) {
            timeout = options.timeout !== undefined ? options.timeout : 1000 * 60;
            interval = options.interval !== undefined ? options.interval : 500;
            maxTries = options.maxTries !== undefined ? options.maxTries : 6;
            log = options.log !== undefined ? options.log : false;
        } else {
            timeout = 1000 * 60;
            interval = 500;
            maxTries = 6;
            log = false;
        }
        let start = new Date().getTime();
        let tryCount = 0;
        while (true) {
            sleep(interval);
            var msg = "";
            if (maxTries && tryCount >= maxTries) {
                msg = "超过最大尝试次数，未找到图像：" + fileName;
                if (log) toastLog(msg);
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
            if (new Date().getTime() - start > timeout) {
                msg = "超时未找到图像：" + fileName;
                if (log) log(msg);
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
            //let result = tools.findImage(fileName);
            var img = captureScreen();
            var targetImgPath = `./res/UI/${w}_${h}/${fileName}`;
            var targetImg = images.read(targetImgPath);
            var imgSize = {
                w: targetImg.width,
                h: targetImg.height
            }
            var r = utils.regionalFindImg2(img, targetImg, x1, y1, x2, y2, 60, 255, 0.7, false, false, "");
            utils.recycleNull(img);
            utils.recycleNull(targetImg);
            if (r != null && (r.x > 0 || r.y > 0)) {
                return {
                    status: true,
                    img: r,
                    size: imgSize
                };
            }
            tryCount++;
        }
    },
    findImage: (fileName, threshold) => {
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
            if (threshold && threshold > 0) {
                options.threshold = threshold;
            }
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
            } else {
                return {
                    status: false,
                    img: null,
                    err: '未找到对应的图片'
                }
            }
        } else {
            return {
                status: false,
                img: null,
                err: '不支持' + w + 'x' + h + '分辨率'
            }
        }
    },
    findImageArea(fileName, x1, y1, x2, y2) {
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
            var r = utils.regionalFindImg2(img, targetImg, x1, y1, x2, y2, 60, 255, 0.7, false, false, "");
            utils.recycleNull(img);
            utils.recycleNull(targetImg);
            if (r != null && (r.x > 0 || r.y > 0)) {
                return {
                    status: true,
                    img: r,
                    size: imgSize
                };
            } else {
                return {
                    status: false,
                    img: null,
                    err: '未找到对应的图片'
                }
            }
        } else {
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
            var x = result.img.x + result.size.w / 2 + random(-5, 5);
            var y = result.img.y + result.size.h / 2 + random(-5, 5);
            click(x, y)
            return true
        } else {
            if (fileName != "closeBtn.png" && fileName != "closeBtn2.png") {
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
            } else {
                return {
                    status: false,
                    img: null,
                    err: '未找到对应的图片'
                }
            }
        } else {
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
        } else {
            toastLog('找图失败' + fileName)
            return false
        }
    },
    获取全屏文字: (img) => {
        //tools.shenqiCapture();
        if (img == null) {
            img = captureScreen();
        }
        var {
            w,
            h
        } = tools.获取屏幕高宽();
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
        var {
            w,
            h
        } = tools.获取屏幕高宽();
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
        // var smallImg = tools.截屏裁剪(null, x1, y1, x2, y2);
        // toastLog(smallImg);
        try {
            //r = ocrPladderOCR.detect(smallImg);
            r = utils.regionalAnalysisChart3(img, x1, y1, x2, y2, param1, param2, isP1, isP2, "");
        } catch (e) {
            toastLog('获取异常')
            r = null;
        }
        utils.recycleNull(img);
        //utils.recycleNull(smallImg);
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
    点击游戏固定按钮: (btnName) => {
        var fbl = `${device.width}_${device.height}`;
        var 按钮 = config.zuobiao.按钮集合[fbl][btnName];
        click(random(按钮.x[0], 按钮.x[1]), random(按钮.y[0], 按钮.y[1]))
    },
    获取屏幕高宽: () => { // 获取当前屏幕方向
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
        return {
            w,
            h
        };
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
                             <radiogroup id="ditu1" orientation="horizontal" >
                                <radio checked="true"  textSize="12sp" id="radio1" text="骷髅洞"/>
                                <radio textSize="12sp" id="radio2" text="石墓阵"/>
                                <radio textSize="12sp" id="radio3" text="蜈蚣洞"/>
                                <radio textSize="12sp" id="radio4" text="僵尸洞"/>
                             </radiogroup>
                        </horizontal>
                         <horizontal>
                            <View id="line11" h="1" bg="#d5d5d5" visibility="visible" />
                          </horizontal>
                         <horizontal id="ditu1_1" visibility="visible">
                             <radiogroup orientation="vertical" gravity="center">
                                <radio textSize="12sp" id="radio11" text="兽人古墓一层"/>
                                <radio textSize="12sp" id="radio22" text="兽人古墓二层"/>
                                <radio textSize="12sp" id="radio33" text="兽人古墓三层"/>
                             </radiogroup>
                        </horizontal>
                        <horizontal id="ditu1_2" visibility="gone">
                             <radiogroup orientation="vertical" >
                                <radio textSize="12sp" id="radio111" text="石墓一层"/>
                                <radio textSize="12sp" id="radio222" text="石墓二层"/>
                                <radio textSize="12sp" id="radio333" text="石墓三层"/>
                                <radio textSize="12sp" id="radio444" text="石阵四层"/>
                                <radio textSize="12sp" id="radio555" text="石墓五层"/>
                             </radiogroup>
                        </horizontal>
                         <horizontal id="ditu1_3" visibility="gone">
                             <radiogroup orientation="vertical" >
                                <radio textSize="12sp" id="radio111" text="地牢一层东"/>
                                <radio textSize="12sp" id="radio222" text="地牢一层北1"/>
                                <radio textSize="12sp" id="radio222" text="黑暗地带"/>
                                <radio textSize="12sp" id="radio333" text="连接通道八"/>
                                <radio textSize="12sp" id="radio444" text="连接通道七"/>
                                <radio textSize="12sp" id="radio444" text="连接通道六"/>
                             </radiogroup>
                        </horizontal>
                         <horizontal id="ditu1_4" visibility="gone">
                             <radiogroup orientation="vertical" >
                                <radio textSize="12sp" id="radio111" text="地牢一层东"/>
                                <radio textSize="12sp" id="radio222" text="连接通道九"/>
                                <radio textSize="12sp" id="radio333" text="连接通道八"/>
                                <radio textSize="12sp" id="radio444" text="连接通道七"/>
                                <radio textSize="12sp" id="radio444" text="连接通道六"/>
                             </radiogroup>
                        </horizontal>
                    </vertical>
                    <vertical id="view2" visibility="gone" gravity="center">
                         <checkbox id="cbIsYinShen" text="超过3只怪隐藏"/>
                         <checkbox id="cbIsHuiChengYiFu" text="衣服持久0回程"/>
                         <checkbox id="cbIsHuiChengWuQi" text="武器持久0回程"/>
                         <checkbox id="cbIsFenShen" text="补给时点分身"/>
                         <horizontal>
                            <text text="补给蓝药中(包)" textSize="12sp" textColor="#888888" paddingBottom="5" />
                             <spinner id="lanYaoZhongBao" entries="0|2|4|6|8|10" />
                        </horizontal>
                        <vertical gravity="center">
                            <text text="补给蓝药中(个)" textSize="12sp" textColor="#000000" paddingBottom="5" gravity="center" />
                            <input id="lanYaoZhongGe" inputType="number" text="0" />
                        </vertical>
                         <vertical gravity="center">
                            <text text="补给红药中(包)" textSize="12sp" textColor="#000000" paddingBottom="5" gravity="center" />
                            <input id="hongYaoZhongBao" inputType="number" text="0" />
                        </vertical>
                        <vertical gravity="center">
                            <text text="补给红药中(个)" textSize="12sp" textColor="#000000" paddingBottom="5" gravity="center" />
                            <input id="hongYaoZhongGe" inputType="number" text="0" />
                        </vertical>
                         <vertical gravity="center">
                            <text text="随机传送(包)" textSize="12sp" textColor="#000000" paddingBottom="5" gravity="center" />
                            <input id="suiJiBao" inputType="number" text="0" />
                        </vertical>
                        <vertical gravity="center">
                            <text text="随机传送(个)" textSize="12sp" textColor="#000000" paddingBottom="5" gravity="center" />
                            <input id="suiJiGe" inputType="number" text="0" />
                        </vertical>
                        <vertical gravity="center">
                            <text text="修复油(瓶)" textSize="12sp" textColor="#000000" paddingBottom="5" gravity="center" />
                            <input id="xiuFuYou" inputType="number" text="0" />
                        </vertical>
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
    
    win.ditu1.setOnCheckedChangeListener((group, checkedId) => {
        let checkedRadio = win.ditu1.findViewById(checkedId);
        switch (checkedRadio) {
            case win.radio1:
                switchRadio1(1);
                //toastLog("单选框1被勾选");
                break;
            case win.radio2:
                switchRadio1(2);
                break;
            case win.radio3:
                switchRadio1(3);
                break;
             case win.radio4:
                switchRadio1(4);
                break;
        }
    });
    
    win.btnStart.click(() => {
        ui.run(() => {
            if (isStart) {
                isShowConfig = true
                isStart = false
                win.btnStart.text("启动")
                window.img.setBackgroundColor(colors.parseColor("#ffffff"));
            } else {
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
    win.setSize(w, h);
    win.setPosition(-10000, padding_top);
    win.setTouchable(true); // 可交互


    
    
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
    //获取人物金币
    
    
    tools.常用操作.初始化挂机();
    //tools.人物移动.去比奇挂机图Loop("兽人古墓一层");
    // var r = tools.findImage("xiufuyou1.png");
    // toastLog(r);

    // 启动挂机打怪;
    threads.start(function () {
        while (true) {
            if (当前总状态 == 总状态.挂机中) {
                var r = false;
                try {
                    r = tools.挂机地图打怪();
                } catch (e) {
                    toastLog("挂机地图打怪异常" + e)
                    sleep(1000);
                }
                if (r) {
                    continue;
                }


                var 人物坐标 = tools.常用操作.获取人物坐标();
                if (人物坐标 != null && 人物坐标.x > 0 && 人物坐标.y > 0) {
                    上次坐标记录 = 人物坐标;
                } else {
                    tools.人物移动.上走一步(random(1800, 2500))
                    tools.人物移动.左走一步(random(1800, 2500))
                }
                if ((上次坐标记录.x == 0 && 上次坐标记录.y == 0) || 人物坐标 == null || (人物坐标.x == 上次坐标记录.x && 人物坐标.y == 上次坐标记录.y)) {
                    try {
                        tools.常用操作.点击挂机坐标();
                    } catch (e) {
                        toastLog('点击挂机坐标异常')
                        sleep(1000);
                        continue;
                    }
                } 
                sleep(2.5 * 1000);

            } else {
                if (当前总状态 == 总状态.请求装备检查) {
                    当前总状态 = 总状态.检查装备;
                } else if (当前总状态 == 总状态.请求回城补给) {
                    当前总状态 = 总状态.回城补给;
                } else if (当前总状态 == 总状态.请求程序暂停) {
                    当前总状态 = 总状态.程序暂停;
                }
                sleep(1000);
                continue;
            }
        }
    });


    //检测装备
    threads.start(function () {
        while (true) {
            if (当前总状态 == 总状态.回城补给) {
                //toastLog(当前总状态)
                sleep(1000);
                continue;
            }
            当前总状态 = 总状态.请求装备检查;
            while (true) {
                sleep(666);
                if (当前总状态 == 总状态.检查装备) {
                    break;
                }
            }
            var r = tools.常用操作.判断是否需要补给();
            if (r) {
                当前总状态 = 总状态.回城补给;
                tools.悬浮球描述("回城补给");
                tools.补给操作.回比奇补给();
                tools.人物移动.去比奇挂机图Loop("兽人古墓一层");
                当前总状态 = 总状态.挂机中
            } else {
                tools.人物移动.去比奇挂机图Loop("兽人古墓一层");
                当前总状态 = 总状态.挂机中;
            }
            sleep(1000 * 60 * 15);
        }
    });

    //var img = captureScreen();

    //var result = tools.获取全屏文字();
    //var result = tools.获取区域文字(200, 100,1060,518, 60, 255, true, false);
    // var r = utils.regionalAnalysisChart3(img, 200, 100,1060,518, 60, 255, false, false, "区域识字测试代码");
    // toastLog(r)

    //  toastLog('------------')

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

}


function switchTab(index) {
    for (let i = 1; i <= 3; i++) {
        let isActive = i === index;
        win["text" + i].setTextColor(colors.parseColor(isActive ? "#000000" : "#888888"));
        win["line" + i].setVisibility(isActive ? 0 : 8); // 0:VISIBLE, 8:GONE
        win["view" + i].setVisibility(isActive ? 0 : 8);
    }
}

function switchRadio1(index) {
    for (let i = 1; i <= 4; i++) {
        let isActive = i === index;
        win["ditu1_"+i].setVisibility(isActive ? 0 : 8);
        // win["text" + i].setTextColor(colors.parseColor(isActive ? "#000000" : "#888888"));
        // win["line" + i].setVisibility(isActive ? 0 : 8); // 0:VISIBLE, 8:GONE
        // win["view" + i].setVisibility(isActive ? 0 : 8);
    }
}

// 更新悬浮窗位置
function updateWindowPosition(x) {
    let {
        w,
        h
    } = tools.获取屏幕高宽();

    // 自定义触发吸边的距离，默认是20像素
    let edgeMargin = 100;

    let windowWidth = window.getWidth();
    toastLog(h)
    let windowX = window.getX();
    let windowY = window.getY();
    let 偏移量 = 0;
    if(h==720){
        偏移量 = 50;
    }
    else {
        偏移量 = 100;
    }
    ui.run(() => window.setPosition(windowX, h - 偏移量));
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
let x = 0,
    y = 0;
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
    var {
        w,
        h
    } = tools.获取屏幕高宽();
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
        let memUsage = "内存: " + utils.getMemoryInfo() + " 仓库(" + 存入仓库数量 + ")  金币("+启动金币+")";
        let currentDirection = context.getResources().getConfiguration().orientation;
        // 在 UI 线程中更新浮窗文字
        ui.run(() => {
            window.cpuText.setText(cpuUsage);
            window.memText.setText(memUsage);
            // window.eventText.setText(当前总状态 +"_"+当前挂机状态);
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