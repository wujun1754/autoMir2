/*
 * @Author: 字节飞舞
 * @QQ: 175417739@qq.com
 * @Date: 2025-04-11 04:22:04
 * @Version: Auto.Js Pro
 * @Description: 
 */
importClass(android.view.Surface);
auto.waitFor() // 等待无障碍服务开启
if (!floaty.checkPermission()) {
    toast("请开启悬浮窗权限！");
    floaty.requestPermission();
    exit();
}
let 项目路径 = "/sdcard/Download/";
// 配置类
let config = require("./common/config.js")
// 工具类
let utils = require("./common/utils.js")
// 公共储存对象
var commonStorage = storages.create("zijiefeiwu.cn");
let MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');
let ocr = new MLKitOCR();
let ocrPladderOCR = $ocr.create()
let 存入仓库数量 = 0;
var 挂机点跑图顺序 = 0;
var 上次挂机跑图坐标 = null;
var 上次挂机跑图坐标截图 = null;
var 启动金币 = "未知"
var 挂机参数 = {
    ditu1: "radio1",
    ditu1_1: "radio1_1",
    购买物品: [{
        name: "魔法药中包",
        num: 0,
    },
    {
        name: "魔法药中个",
        num: 4,
    },
    {
        name: "金创药中个",
        num: 0,
    },
    {
        name: "金创药中包",
        num: 0,
    },
    {
        name: "随机包",
        num: 0,
    },
    {
        name: "随机",
        num: 2,
    },
    {
        name: "地牢",
        num: 0,
    },
    {
        name: "修复油",
        num: 2,
    },
    {
        name: "护身符大",
        num: 1
    },
    ],
    衣服持久0回程: 1,
    武器持久0回程: 1,
    补给时点分身: 1,
    召唤骷髅: 1,
    召唤神兽: 0,
    沿途打怪: 0,
    地牢回城: 0,
    装备实际未满下线: 1,
    一波怪物死亡拾取: 0,
    首次用符攻击: 0,
    只打满血怪: 1,
    拾取时长: 10,
    挂机地图: "",
    挂机城市: ""
}
var 挂机坐标错误次数 = 0;
var 挂机坐标点跑图次数 = 0;
var 开启强行补给 = false;
const 总状态 = {
    未启动: "未启动",
    已启动: "已启动",
    检查装备: "检查装备",
    请求装备检查: "请求装备检查",
    回城补给: "回城补给",
    请求回城补给: "请求回城补给",
    程序暂停: "程序暂停",
    请求程序暂停: "请求程序暂停",
    挂机中: "挂机中",
    重启中: "重启中"

};
var 当前总状态 = 总状态.未启动;
var 启动时间 = new Date().getTime();
let 是否载加过金币 = false;
let lastDirection = context.getResources().getConfiguration().orientation;
var w = parseInt(device.width * 0.96);
var h = parseInt(device.height * 0.9);
var padding_left = parseInt((device.width - w) / 2)
var padding_top = parseInt((device.height - h) / 2);
let tabCount = 3;
let tabW = 0;
var isStart = false
var isShowConfig = false
let windowCommon = floaty.window(
    <frame padding="2" id="xuanFuCommon" bg="#000000">
        <horizontal>
            <text id="commonText" text="" textSize="8sp" textColor="#ffffff" />
        </horizontal>
    </frame>
);
let window = floaty.window(
    <frame padding="2" id="xuanFuPanel" w="wrap_content" h="wrap_content">
        <horizontal>
            <text id="bbText" text="v:1.35" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="cpuText" text="CPU" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="memText" text="内存" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="startText" text="" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="cangkuText" text="仓库(0)" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="jingbiText" text="金币(未知)" textSize="8sp" textColor="#ffffff" marginRight="3" />
        </horizontal>
    </frame>
);
var win = floaty.rawWindow(
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
                    <text id="text3" text="游戏说明" textSize="14sp" textColor="#888888" paddingBottom="5" gravity="center" />
                    <View id="line3" h="2" bg="#ff0000" visibility="gone" />
                </vertical>
            </horizontal>
            <vertical id="content" padding="8">
                <vertical id="view1" visibility="visible" gravity="center">
                    <horizontal>
                        <radiogroup id="ditu1" orientation="horizontal" >
                            <radio textSize="10sp" id="radio1" text="骷髅洞" />
                            <radio textSize="10sp" id="radio2" text="石墓阵" />
                            <radio textSize="10sp" id="radio3" text="蜈蚣洞" />
                            <radio textSize="10sp" id="radio4" text="僵尸洞" />
                            <radio textSize="10sp" id="radio5" text="其他" />
                        </radiogroup>
                    </horizontal>
                    <horizontal>
                        <View id="line11" h="1" bg="#d5d5d5" visibility="visible" />
                    </horizontal>
                    <horizontal id="ditu1_1" visibility="visible">
                        <radiogroup id="group1_1" orientation="vertical" gravity="center">
                            <radio textSize="10sp" id="radio1_1" text="兽人古墓一层" />
                            <radio textSize="10sp" id="radio1_2" text="兽人古墓二层" />
                            <radio textSize="10sp" id="radio1_3" text="兽人古墓三层" />
                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_2" visibility="gone">
                        <radiogroup id="group1_2" orientation="vertical" >
                            <radio textSize="10sp" id="radio2_1" text="石墓一层" />
                            <radio textSize="10sp" id="radio2_2" text="石墓三层" />
                            <radio textSize="10sp" id="radio2_3" text="石墓五层" />
                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_3" visibility="gone">
                        <radiogroup id="group1_3" orientation="vertical" >
                            <radio textSize="10sp" id="radio3_1" text="地牢一层东" />
                            <radio textSize="10sp" id="radio3_2" text="地牢一层北1" />
                            <radio textSize="10sp" id="radio3_3" text="黑暗地带" />
                            <radio textSize="10sp" id="radio3_4" text="连接通道八" />
                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_4" visibility="gone">
                        <radiogroup orientation="vertical" >
                            <text text="未开通" textSize="10sp" textColor="#000000" />
                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_5" visibility="gone">
                        <radiogroup id="group1_5" orientation="vertical" >
                            <radio textSize="10sp" id="radio5_1" text="连接通道1" />
                        </radiogroup>
                    </horizontal>
                </vertical>
                <vertical id="view2" visibility="gone" gravity="center">
                    <horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中蓝/包" textSize="10sp" textColor="#000000" />
                            <input id="t_lanYaoZhongBao" focusable="true" w="30sp" text="0" />
                        </horizontal>

                        <horizontal paddingLeft="6sp">
                            <text text="中蓝/个" textSize="10sp" textColor="#000000" />
                            <input id="t_lanYaoZhongGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中红/包" textSize="10sp" textColor="#000000" />
                            <input id="t_hongYaoZhongBao" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中红(个)" textSize="10sp" textColor="#000000" />
                            <input id="t_hongYaoZhongGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="拾取时长" textSize="10sp" textColor="#000000" />
                            <input id="t_shiQuShiChang" inputType="number" w="45sp" text="0" />秒
                        </horizontal>
                    </horizontal>

                    <horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="随机/包" textSize="10sp" textColor="#000000" />
                            <input id="t_suiJiBao" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="随机/个" textSize="10sp" textColor="#000000" />
                            <input id="t_suiJiGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="地牢/个" textSize="10sp" textColor="#000000" />
                            <input id="t_diLaoGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="修复油" textSize="10sp" textColor="#000000" />
                            <input id="t_xiuFuYou" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="护身符/大" textSize="10sp" textColor="#000000" />
                            <input id="t_hushenhu" inputType="number" w="30sp" text="0" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsHuiChengYiFu" text="衣服持久0回程" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbIsHuiChengWuQi" text="武器持久0回程" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsDiLao" text="使用地牢回城" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsFenShen" text="补给时点分身" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbIsYinShen" text="超过5只怪隐身" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbZhaoHuanKuLou" text="召唤骷髅" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbZhaoShenShou" text="召唤神兽" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbYanTuDaGuai" text="沿途打怪" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbManXue" text="只打满血怪" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbShiJiWeiManXiaXian" text="装备实际未满下线" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsYiBoSiWangSiQu" text="一波怪死拾取" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsFuGongJi" text="首次用符攻击" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                </vertical>
                <vertical id="view3" visibility="gone" gravity="center">
                    <text textSize="12sp" text="内部学习学习交流软件，禁止拿来打金获利" textColor="#000000" />
                    <text textSize="12sp" paddingTop="5" text="技术支持：宁波字节飞舞软件科技" textColor="#000000" />
                    <text textSize="12sp" paddingTop="5" text="联系人：15070347799" textColor="#000000" />
                </vertical>
            </vertical>
            <horizontal padding="16">
                <text id="t_BuJi" textSize="12sp" text="回城补给" textColor="#012ed1" />
            </horizontal>
            <horizontal padding="16">
                <button id="btnStart" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="启动" />
                <button id="btnSave" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="保存" />
                <button id="btnSetFouse" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="焦点" />
                <button id="btnReset" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="重启" />
                <button id="btnClose" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="关闭" />
            </horizontal>

        </vertical>

    </frame>
);


var tools = {
    初始化参数: () => {
        if (commonStorage.contains("peizhi")) {
            var str = commonStorage.get("peizhi");
            挂机参数 = JSON.parse(str);
        }
        if (挂机参数.拾取时长 == null || 挂机参数.拾取时长 <= 0) {
            挂机参数.拾取时长 = 10;
        }
        win[挂机参数.ditu1].setChecked(true);
        win[挂机参数.ditu1_1].setChecked(true);


        win.t_lanYaoZhongBao.setText(挂机参数.购买物品.find(item => {
            return item.name == "魔法药中包"
        }).num.toString())
        win.t_lanYaoZhongBao.setText(挂机参数.购买物品.find(item => {
            return item.name == "魔法药中包"
        }).num.toString());
        win.t_lanYaoZhongGe.setText(挂机参数.购买物品.find(item => {
            return item.name == "魔法药中个"
        }).num.toString());
        win.t_hongYaoZhongBao.setText(挂机参数.购买物品.find(item => {
            return item.name == "金创药中包"
        }).num.toString());
        win.t_hongYaoZhongGe.setText(挂机参数.购买物品.find(item => {
            return item.name == "金创药中个"
        }).num.toString());
        win.t_suiJiBao.setText(挂机参数.购买物品.find(item => {
            return item.name == "随机包"
        }).num.toString());
        win.t_suiJiGe.setText(挂机参数.购买物品.find(item => {
            return item.name == "随机"
        }).num.toString());
        win.t_diLaoGe.setText(挂机参数.购买物品.find(item => {
            return item.name == "地牢"
        }).num.toString());
        win.t_xiuFuYou.setText(挂机参数.购买物品.find(item => {
            return item.name == "修复油"
        }).num.toString());
        win.t_hushenhu.setText(挂机参数.购买物品.find(item => {
            return item.name == "护身符大"
        }).num.toString());
        win.t_shiQuShiChang.setText(挂机参数.拾取时长.toString());


        // win..setText(挂机参数.购买物品.find(item => item.name == "").num);   
        // win..setText(挂机参数.购买物品.find(item => item.name == "").num);    
        // win..setText(挂机参数.购买物品.find(item => item.name == "").num);  
        // win..setText(挂机参数.购买物品.find(item => item.name == "").num);  
        // win..setText(挂机参数.购买物品.find(item => item.name == "").num);  
        // win..setText(挂机参数.购买物品.find(item => item.name == "").num);    
        // win..setText(挂机参数.购买物品.find(item => item.name == "").num);    
        if (挂机参数.衣服持久0回程 == 1 || 挂机参数.衣服持久0回程 == "1") {
            win.cbIsHuiChengYiFu.setChecked(true);
        }
        if (挂机参数.武器持久0回程 == 1 || 挂机参数.武器持久0回程 == "1") {
            win.cbIsHuiChengWuQi.setChecked(true);
        }
        if (挂机参数.补给时点分身 == 1 || 挂机参数.补给时点分身 == "1") {
            win.cbIsFenShen.setChecked(true);
        }
        if (挂机参数.召唤骷髅 == 1 || 挂机参数.召唤骷髅 == "1") {
            win.cbZhaoHuanKuLou.setChecked(true);
        }
        if (挂机参数.召唤神兽 == 1 || 挂机参数.召唤神兽 == "1") {
            win.cbZhaoShenShou.setChecked(true);
        }
        if (挂机参数.沿途打怪 == 1 || 挂机参数.沿途打怪 == "1") {
            win.cbYanTuDaGuai.setChecked(true);
        }
        if (挂机参数.地牢回城 == 1 || 挂机参数.地牢回城 == "1") {
            win.cbIsDiLao.setChecked(true);
        }
        if (挂机参数.装备实际未满下线 == 1 || 挂机参数.装备实际未满下线 == "1") {
            win.cbShiJiWeiManXiaXian.setChecked(true);
        }
        if (挂机参数.一波怪物死亡拾取 == 1 || 挂机参数.一波怪物死亡拾取 == "1") {
            win.cbIsYiBoSiWangSiQu.setChecked(true);
        }
        if (挂机参数.首次用符攻击 == 1 || 挂机参数.首次用符攻击 == "1") {
            win.cbIsFuGongJi.setChecked(true);
        }
        if (挂机参数.只打满血怪 == 1 || 挂机参数.只打满血怪 == "1") {
            win.cbManXue.setChecked(true);
        }
    },
    常用操作: {
        截图当前坐标: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.人物坐标范围[fbl];
            return tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
        },
        打开角色: () => {
            var r = tools.findImageForWaitClick("jiaoseBtn.png", {
                maxTries: 10,
                interval: 333
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
        小退并登录: () => {
            var r = tools.findImageForWaitClick("yijianxiaoTuiBtn.png", {
                maxTries: 3,
                interval: 666
            });
            var isok = false;
            if (r.status) {
                var tryCount = 0;
                tools.悬浮球描述("已小退等待5秒点开始");
                sleep(5000);
                while (true) {
                    if (tryCount >= 10) {
                        return;
                    }
                    r = tools.findImageForWaitClick("kaishiyouxi.png", {
                        maxTries: 5,
                        interval: 1000
                    });
                    tools.悬浮球描述("已点开始等待开门");
                    if (r.status) {
                        r = tools.findImageForWait("yijianxiaoTuiBtn.png", {
                            maxTries: 10,
                            interval: 1200
                        });
                    }
                    if (r.status) {
                        isok = true;
                        break;
                    }
                    tryCount++;
                }
            }
            if (isok) {
                tools.悬浮球描述("重启成功");
                tools.去挂机图打怪();
            }
            return r;
        },
        点击召唤骷髅: () => {
            var r = tools.findImageForWaitClick("zhaohuankulouBtn.png", {
                maxTries: 5,
                interval: 666
            });
            return r;
        },
        点击召唤神兽: () => {
            var r = tools.findImageForWaitClick("zhaohuanshenshouBtn.png", {
                maxTries: 5,
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
            var 武器 = config.zuobiao.人物面板[fbl].武器;
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
            var 衣服 = config.zuobiao.人物面板[fbl].衣服;
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
            r = tools.findImageForWait("fenshenxiulianBtn.png", {
                maxTries: 3,
                interval: 333
            })
            if (r.status) {
                var 左上箭头 = config.zuobiao.按钮集合[fbl].左上箭头;
                click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));
            }
            tools.常用操作.初始化操作模式();
            if (挂机参数.召唤骷髅 == 1 || 挂机参数.召唤骷髅 == "1") {
                tools.常用操作.点击召唤骷髅();
            }
            if (挂机参数.召唤神兽 == 1 || 挂机参数.召唤神兽 == "1") {
                tools.常用操作.点击召唤神兽();
            }
            tools.常用操作.关闭所有窗口();
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
        初始化操作模式: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.按钮集合[fbl].模式;
            var s = p.找色;
            var tryCount = 0;
            while (true) {
                if (tryCount >= 10) {
                    break;
                }
                var img = captureScreen();
                var r = images.findMultiColors(img, s[0].color, [[s[1].x, s[1].y, s[1].color], [s[2].x, s[2].y, s[2].color], [s[3].x, s[3].y, s[3].color]]);
                utils.recycleNull(img);
                if (r != null) {
                    break;
                }
                else {
                    click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]));
                    sleep(random(666, 999));
                }
                tryCount++;
            }
        },
        打开大地图: () => {
            tools.常用操作.关闭所有窗口();
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.小地图范围[fbl];
            var x = random(p.x1, p.x2);
            var y = random(p.y1, p.y2);
            click(x, y);
        },
        获取挂机坐标: () => {
            var r = null;
            var fbl = `${device.width}_${device.height}`;
            if (挂机参数.挂机地图 == "兽人古墓一层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第一层.打怪点;
            } else if (挂机参数.挂机地图 == "兽人古墓二层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第二层.打怪点;
            } else if (挂机参数.挂机地图 == "兽人古墓三层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓.第三层.打怪点;
            } else if (挂机参数.挂机地图 == "地牢一层东") {
                r = config.zuobiao.盟重大地图偏移[fbl].地牢一层东.打怪点;
            } else if (挂机参数.挂机地图 == "地牢一层北1") {
                r = config.zuobiao.盟重大地图偏移[fbl].地牢一层北1.打怪点;
            } else {
                toastLog("不支持" + 挂机参数.挂机地图 + "地图")
                return {
                    status: false,
                    err: "不支持" + 挂机参数.挂机地图 + "地图"
                }
            }
            return {
                status: true,
                result: r
            }
        },
        点击挂机坐标_2: (是否强制跑图) => {
            tools.悬浮球描述("开始跑图(" + new Date().getSeconds() + ")");
            var 人物坐标 = tools.常用操作.获取人物坐标();
            var 挂机坐标s = tools.常用操作.获取挂机坐标();
            if (!挂机坐标s.status) {
                return
            }
            if (!是否强制跑图 && 人物坐标 != null && 上次挂机跑图坐标 != null && (人物坐标.x != 上次挂机跑图坐标.x || 人物坐标.y != 上次挂机跑图坐标.y)) {
                上次挂机跑图坐标 = 人物坐标;
                return;
            }
            tools.常用操作.打开大地图();
            var r = 挂机坐标s.result[挂机点跑图顺序];
            var msg = "";
            if (人物坐标 == null) {
                挂机坐标错误次数++;
                if (挂机坐标错误次数 >= 10) {
                    挂机点跑图顺序++;
                    挂机坐标错误次数 = 0;
                }
                msg = "坐标错误(" + 挂机坐标错误次数 + "),跑第(" + (挂机点跑图顺序 + 1) + ")挂点" + JSON.stringify(人物坐标)
            }
            else if (人物坐标.x >= r.坐标范围.x[0] && 人物坐标.x <= r.坐标范围.x[1] && 人物坐标.y >= r.坐标范围.y[0] && 人物坐标.y <= r.坐标范围.y[1]) {
                挂机坐标错误次数 = 0;
                挂机点跑图顺序++;
                msg = "到达挂点,切第(" + (挂机点跑图顺序 + 1) + ")挂点"
            }
            else {
                挂机坐标错误次数 = 0;
                msg = "继续第(" + (挂机点跑图顺序 + 1) + ")挂点"
            }
            if (挂机点跑图顺序 >= 挂机坐标s.result.length) {
                挂机点跑图顺序 = 0;
            }
            if (人物坐标 != null) {
                上次挂机跑图坐标 = 人物坐标;
            }
            r = 挂机坐标s.result[挂机点跑图顺序];
            tools.悬浮球描述(msg);
            //toastLog(msg);
            var closeImg = null;
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 333
            })
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                return;
            }
            var x = closeImg.x + random(r.x[0], r.x[1]);
            var y = closeImg.y + random(r.y[0], r.y[1]);
            //toastLog(x + ":" + y)
            click(x, y)
            sleep(random(333, 666))
            tools.常用操作.关闭所有窗口();
        },
        点击挂机坐标: (是否强制跑图) => {
            var 是否跑图 = false;
            if (是否强制跑图) {
                是否跑图 = true;
            }
            else if (上次挂机跑图坐标截图 == null) {
                是否跑图 = true;
                上次挂机跑图坐标截图 = tools.常用操作.截图当前坐标();
            }
            else {
                var 当前坐标截图 = tools.常用操作.截图当前坐标();
                var r = tools.isSimilarImage(当前坐标截图, 上次挂机跑图坐标截图, 10, 5)
                if (r) {
                    utils.recycleNull(当前坐标截图);
                    是否跑图 = true;
                }
                else {
                    utils.recycleNull(上次挂机跑图坐标截图);
                    上次挂机跑图坐标截图 = 当前坐标截图;
                }
            }
            var 挂机坐标s = tools.常用操作.获取挂机坐标();
            if (!挂机坐标s.status) {
                return
            }
            if (!是否跑图) {
                return;
            }
            tools.悬浮球描述("开始跑图(" + new Date().getSeconds() + ")");
            tools.常用操作.打开大地图();
            var r = 挂机坐标s.result[挂机点跑图顺序];
            var msg = "";
            if (挂机坐标点跑图次数 >= r.坐标范围.点击次数) {
                挂机坐标点跑图次数 = 0;
                挂机点跑图顺序++;
                msg = "切第(" + (挂机点跑图顺序) + ")挂点"
            }
            else {
                挂机坐标点跑图次数++;
                msg = "继续跑(" + (挂机点跑图顺序 + 1) + ")挂点"
            }
            if (挂机点跑图顺序 >= 挂机坐标s.result.length) {
                挂机点跑图顺序 = 0;
            }
            tools.悬浮球描述(msg);
            var closeImg = null;
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 333
            })
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                return;
            }
            var x = closeImg.x + random(r.x[0], r.x[1]);
            var y = closeImg.y + random(r.y[0], r.y[1]);
            click(x, y)
            sleep(666)
            tools.常用操作.关闭所有窗口();
        },
        获取人物坐标: () => { //注意这个截图不能太小了，否则会造成识别失败
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.人物坐标范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
            //toastLog(JSON.stringify(result))
            //tools.悬浮球描述(JSON.stringify(result));
            if (result != null && result.length > 0) {
                let parts = null;
                try {
                    parts = result[0].text.split(":");
                } catch (error) {
                    return null;
                }
                if (parts.length == 2 && parts[0] > 0 && parts[1] > 0) {
                    return {
                        x: parseInt(parts[0]),
                        y: parseInt(parts[1])
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        获取人物地图: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.地点范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
            if (result != null && result.length > 0) {
                return tools.处理地图错别字(result[0].text);
            } else {
                return result;
            }
        },
        获取人物金币: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.金币范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1 - 10, p.x2, p.y2, 60, 255, true, false);
            if (result != null && result.length == 1) {
                return result[0].text;
            } else {
                return null;
            }
        },
        检查背包是否有东西: (格子) => {
            tools.常用操作.关闭所有窗口();
            tools.常用操作.打开背包();
            var r = tools.findImageForWait("beibaomianban.png", {
                maxTries: 6,
                interval: 666
            })
            if (r.status) {
                sleep(666);
                tools.findImageForWaitClick("beibaozhengliBtn.png", {
                    maxTries: 6,
                    interval: 666
                })
                sleep(666);
                var fbl = `${device.width}_${device.height}`;
                var p = config.zuobiao.背包格子于面板偏移量[fbl][格子];
                var x = r.img.x + p.x + random(-8, 8);
                var y = r.img.y + p.y + random(-5, 5);
                click(x, y)
                sleep(666);
                r = tools.findImageForWait("beibaochuandaiBtn.png", {
                    maxTries: 3,
                    interval: 333
                })
                if (r.status) {
                    return true;
                }
                r = tools.findImageForWait("beibaoshiyongBtn.png", {
                    maxTries: 3,
                    interval: 333
                })
                if (r.status) {
                    return true;
                }
            }
            return false;
        },
        读取聊天框信息: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.聊天框面板[fbl];
            return tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
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
            var 装备属性明细 = config.zuobiao.人物面板[fbl].装备属性明细;
            var 卸下按钮 = tools.常用操作.点击角色面板_武器(角色面板.img);


            //ocrPladderOCR = $ocr.create()
            if (卸下按钮.status) {
                var p = 卸下按钮.img;
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y, p.x, p.y + 装备属性明细.y);
                sleep(666);
                let r = ocrPladderOCR.detect(img);
                result.武器 = tools.常用操作.根据面板获取持久(r);
                tools.悬浮球描述(JSON.stringify(result.武器));
            }

            卸下按钮 = tools.常用操作.点击角色面板_衣服(角色面板.img);
            if (卸下按钮.status) {
                var p = 卸下按钮.img;
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y, p.x, p.y + 装备属性明细.y);
                sleep(666);
                let r = ocrPladderOCR.detect(img);
                result.衣服 = tools.常用操作.根据面板获取持久(r);
                tools.悬浮球描述(JSON.stringify(result.衣服));
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
        检测宝宝: () => {
            var r = tools.findImageForWait("chongwuBtn.png", {
                maxTries: 6,
                interval: 333
            })
            var isExist = false;
            if (r.status) {
                for (var i = 0; i < 10; i++) {
                    r = tools.findImageClick("chongwuBtn.png");
                    sleep(2000)
                    r = tools.常用操作.读取聊天框信息();
                    tools.悬浮球描述(JSON.stringify(r));
                    log(JSON.stringify(r))

                    // sleep(1000)
                    // // r = tools.findImageForWait("baobaogongji.png", {
                    // //     maxTries: 3,
                    // //     interval: 333
                    // // })
                    // r = tools.findImage("baobaogongji.png",0.8)
                    // if(r.status){
                    //     isExist = true;
                    //     break;
                    // }
                }
            }
        },
        判断是否需要补给: () => {
            var 人物所在 = tools.常用操作.获取人物地图();
            //tools.悬浮球描述(人物所在);
            if (人物所在 == "比奇城" || 人物所在 == "土城") {
                return true;
            }
            var r = tools.常用操作.获取装备持久();
            if (挂机参数.衣服持久0回程 == 1 || 挂机参数.衣服持久0回程 == "1") {
                if (r && r.衣服 && r.衣服.剩持久 <= 2) {
                    return true;
                }
            }
            if (r && r.武器 && (r.武器.满持久 - r.武器.剩持久) >= 5) {
                var isOk = tools.喝修复油();
                if (!isOk) {
                    if ((挂机参数.武器持久0回程 == 1 || 挂机参数.武器持久0回程 == "1") && r.武器.剩持久 <= 2) {
                        toastLog("武器持久=" + r.武器.剩持久 + "回城")
                        return true;
                    }
                }
            }
            var r1 = tools.常用操作.检查背包是否有东西("5_7");
            if (r1) {
                return true;
            }
            tools.常用操作.关闭所有窗口();
            return false;

        },
        点击人物: () => {
            var fbl = `${device.width}_${device.height}`;
            var 人物中心 = config.zuobiao.人物中心[fbl];
            click(人物中心.x + random(5, -5), 人物中心.y + random(5, -5))
        },
        关闭所有窗口: (isClick) => {
            if (isClick) {
                tools.常用操作.点击人物();
                sleep(333, 666);
            }
            var result = true;
            var tyrCount = 0;
            while (result) {
                if (tyrCount >= 10) {
                    break;
                }
                result = tools.findImageClick("closeBtn2.png", 0.9);
                sleep(999)
                tyrCount++;
            }
        },
    },
    处理地图错别字: (text) => {
        if (text) {
            text = text.replace("吉", "古");
        }
        if (text.indexOf("灯笼屋") >= 0) {
            text = "铁灯笼屋"
        }
        else if (text.indexOf("比奇城") >= 0) {
            text = "比奇城"
        }
        else if (text.indexOf("土城") >= 0) {
            text = "土城"
        }
        else if (text.indexOf("阴") >= 0 && text.indexOf("森") >= 0 && text.indexOf("石") >= 0 && text.indexOf("屋") >= 0) {
            text = "阴森石屋"
        }
        else if (text.indexOf("地牢") >= 0 && text.indexOf("一") >= 0 && text.indexOf("东") >= 0) {
            text = "地牢一层东"
        }
        return text;
    },
    点击分身: () => {
        if (挂机参数.补给时点分身 == 1 || 挂机参数.补给时点分身 == "1") {
            tools.常用操作.关闭所有窗口();
            var fbl = `${device.width}_${device.height}`;
            var 左上箭头 = config.zuobiao.按钮集合[fbl].左上箭头;
            var 分身派遣 = config.zuobiao.按钮集合[fbl].分身派遣;
            var 分身派遣2 = config.zuobiao.按钮集合[fbl].分身派遣2;
            var r = tools.findImageForWaitClick("fenshenxiulianBtn.png", {
                maxTries: 10,
                interval: 333
            })
            if (!r.status) {
                click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));
                sleep(random(666, 888));
                r = tools.findImageForWaitClick("fenshenxiulianBtn.png", {
                    maxTries: 10,
                    interval: 333
                })
            }
            if (!r.status) {
                tools.悬浮球描述("未找到分身修炼按钮")
                toastLog("未找到分身修炼按钮");
                return false;
            }
            r = tools.findImageForWaitClick("lingqujiangliBtn.png", {
                maxTries: 10,
                interval: 333
            })
            sleep(random(666, 999));

            var 模式 = -1;
            r = tools.findImageForWait("fenshenxiulianbar.png", {
                maxTries: 10,
                interval: 333
            })
            if (r.status) {
                模式 = 1;
            }
            else {
                r = tools.findImageForWait("fenshenxiulianbar2.png", {
                    maxTries: 10,
                    interval: 333
                })
                if (r.status) {
                    模式 = 2;
                }
            }
            if (模式 == 1) {
                click(random(分身派遣.x[0], 分身派遣.x[1]), random(分身派遣.y[0], 分身派遣.y[1]));
            }
            else if (模式 == 2) {
                click(random(分身派遣2.x[0], 分身派遣2.x[1]), random(分身派遣2.y[0], 分身派遣2.y[1]));
            }
            else {
                tools.悬浮球描述("未找到分身修炼Bar")
                toastLog("未找到分身修炼Bar");
                return false;
            }


            r = tools.findImageForWaitClick("quedingxiulianBtn.png", {
                maxTries: 10,
                interval: 333
            })
            if (!r.status) {
                tools.悬浮球描述("未找到分身修炼确定按钮")
                toastLog("未找到分身修炼确定按钮");
                return false;
            }
            while (true) {
                r = tools.findImageForWaitClick("fenshenjiashiBtn.png", {
                    maxTries: 10,
                    interval: 333
                })

                if (r.status) {
                    r = tools.findImageForWaitClick("fenshenquedingjiashiBtn.png", {
                        maxTries: 10,
                        interval: 333
                    })
                    if (!r.status) {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            return true;
        }
    },
    去挂机图打怪: () => {
        var 挂机地图 = 挂机参数.挂机地图;
        tools.人物移动.去挂机地图Loop();
        tools.常用操作.初始化挂机();
        当前总状态 = 总状态.挂机中;
    },
    悬浮球描述: (text) => {
        ui.run(() => {
            windowCommon.commonText.setText(text);
        });
    },
    喝修复油: () => {
        var 背包按钮 = tools.常用操作.打开背包();
        if (背包按钮.status) {
            var 修复油 = tools.findImageForWaitClick("xiufuyou1.png", {
                maxTries: 3,
                interval: 333
            });
            if (修复油.status) {
                let fbl = `${device.width}_${device.height}`;
                if (修复油.img.y < config.zuobiao.药品格子面板[fbl].y1) {
                    tools.findImageForWaitClick("shiyongBtn.png", {
                        maxTries: 6,
                        interval: 333
                    });
                }
                return true;
            }
        }
        return false;
    },
    人物移动: {
        使用地牢: () => {
            tools.常用操作.关闭所有窗口();
            tools.常用操作.打开背包();
            let fbl = `${device.width}_${device.height}`;
            var 地牢 = config.找色[fbl].地牢;
            var img = captureScreen();
            var r = images.findMultiColors(img, 地牢[0].color, [[地牢[1].x, 地牢[1].y, 地牢[1].color], [地牢[2].x, 地牢[2].y, 地牢[2].color]]);
            utils.recycleNull(img);
            return r;
        },
        随机走一步: (duration) => {
            if (duration == null || duration <= 0) {
                duration = 666;
            }
            var r = random(1, 4);

            switch (r) {
                case 1:
                    tools.人物移动.右走一步(duration);
                    break;
                case 2:
                    tools.人物移动.左走一步(duration);
                    break;
                case 3:
                    tools.人物移动.上走一步(duration);
                    break;
                case 4:
                    tools.人物移动.下走一步(duration);
                    break;
            }
        },
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
        盟重安全区到小贩: (人物坐标) => {
            var 小贩坐标 = config.zuobiao.盟重小贩坐标;
            if (小贩坐标.x > 人物坐标.x) {
                tools.人物移动.右走一步((小贩坐标.x - 人物坐标.x) * 1000)
                sleep(600)
            } else {
                tools.人物移动.左走一步((人物坐标.x - 小贩坐标.x) * 1000)
                sleep(600)
            }
            if (小贩坐标.y > 人物坐标.y) {
                tools.人物移动.下走一步((小贩坐标.y - 人物坐标.y) * 1000)
                sleep(600)
            } else {
                tools.人物移动.上走一步((人物坐标.y - 小贩坐标.y) * 1000)
                sleep(600)
            }
        },
        判断到达比奇小贩: () => {
            var 比奇小贩坐标 = config.zuobiao.比奇小贩坐标;
            var 人物坐标 = tools.常用操作.获取人物坐标();
            var 当前地图 = tools.常用操作.获取人物地图();
            if (当前地图 != null && 人物坐标 != null && 当前地图 == "比奇城" && Math.abs(人物坐标.x - 比奇小贩坐标.x) <= 2 && Math.abs(人物坐标.y - 比奇小贩坐标.y) <= 2) {
                return true;
            } else {
                return false;
            }
        },
        去盟重小贩Loop: () => {
            while (isStart) {
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 当前地图 = tools.常用操作.获取人物地图();
                var 安全区坐标范围 = config.zuobiao.盟重安全区坐标范围;
                if (人物坐标 != null && 当前地图 != null && 当前地图 == "土城" && 人物坐标.x > 安全区坐标范围.x1 - 15 && 人物坐标.x < 安全区坐标范围.x2 + 15 && 人物坐标.y > 安全区坐标范围.y1 - 15 && 人物坐标.y < 安全区坐标范围.y2 + 15) {
                    tools.人物移动.盟重安全区到小贩(人物坐标);
                    var 盟重小贩坐标 = config.zuobiao.盟重小贩坐标;
                    人物坐标 = tools.常用操作.获取人物坐标();
                    if (人物坐标 != null && Math.abs(人物坐标.x - 盟重小贩坐标.x) <= 1 && Math.abs(人物坐标.y - 盟重小贩坐标.y) <= 1) {
                        toastLog("到达小贩NPC");
                        break;
                    } else {
                        toastLog("未找到小贩NPC");
                    }
                } else {
                    tools.人物移动.去盟重老兵Loop();
                }
                // if (人物坐标 != null && 当前地图 != null) {

                // }
                // else {
                //     toastLog("人物坐标:" + JSON.stringify(人物坐标))
                // }
                sleep(5000)
            }
        },
        去比奇小贩Loop: () => {
            while (isStart) {
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 当前地图 = tools.常用操作.获取人物地图();
                if (人物坐标 != null && 当前地图 != null) {
                    var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
                    if (当前地图 == "比奇城" && 人物坐标.x > 安全区坐标范围.x1 - 15 && 人物坐标.x < 安全区坐标范围.x2 + 15 && 人物坐标.y > 安全区坐标范围.y1 - 15 && 人物坐标.y < 安全区坐标范围.y2 + 15) {
                        tools.人物移动.比奇安全区到小贩(人物坐标);
                        var 比奇小贩坐标 = config.zuobiao.比奇小贩坐标;
                        人物坐标 = tools.常用操作.获取人物坐标();
                        if (人物坐标 != null && Math.abs(人物坐标.x - 比奇小贩坐标.x) <= 2 && Math.abs(人物坐标.y - 比奇小贩坐标.y) <= 2) {
                            toastLog("到达小贩NPC");
                            break;
                        } else {
                            toastLog("未找到小贩NPC");
                        }
                    }
                }
                tools.人物移动.去比奇老兵Loop();
                sleep(5000)
            }
        },
        去比奇老兵: () => {
            var 当前地图 = tools.常用操作.获取人物地图();
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
                sleep(random(1200, 1666));
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
            var tryCount = 0;
            while (isStart) {
                var 当前地图 = tools.常用操作.获取人物地图();
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
                if (人物坐标 != null && 当前地图 == "比奇城" && 人物坐标.x >= 安全区坐标范围.x1 - 5 && 人物坐标.x <= 安全区坐标范围.x2 + 5 && 人物坐标.y >= 安全区坐标范围.y1 - 5 && 人物坐标.y <= 安全区坐标范围.y2 + 5) {
                    sleep(3000);
                    break; //说明到了安全区
                }
                if (人物坐标 == null && tryCount < 5) {
                    tryCount++;

                    sleep(1000 * 3);
                    continue;
                }
                if (tryCount >= 5) {
                    tools.人物移动.随机走一步(random(1500,2500));
                    sleep(1000 * 2);
                }
                if (tryCount >= 5 || 历史坐标 == null || (人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y)) {
                    toastLog('开始跑图(去比奇老兵)');
                    try {
                        tools.人物移动.去比奇老兵();
                    } catch (error) {
                        toastLog(error)
                        sleep(666)
                    }
                    tryCount = 0;
                }
                if (人物坐标 != null) {
                    历史坐标 = 人物坐标;
                }
                sleep(1000 * 5);
            }
            toastLog("到达目的地");
            return;

        },
        去盟重老兵: () => {
            var 当前地图 = tools.常用操作.获取人物地图();
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
                var routes = config.地图路由[当前地图]["回盟重老兵"];
                var 大地图坐标 = config.zuobiao.盟重大地图偏移[fbl];
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
                sleep(random(1200, 1666));
                tools.常用操作.关闭所有窗口();
            } else {
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去盟重老兵Loop: () => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 历史坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            while (isStart) {
                var 当前地图 = tools.常用操作.获取人物地图();
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 安全区坐标范围 = config.zuobiao.盟重安全区坐标范围;

                tools.悬浮球描述("人物坐标:" + JSON.stringify(人物坐标));
                if (人物坐标 != null && 当前地图 == "土城" && 人物坐标.x >= 安全区坐标范围.x1 - 5 && 人物坐标.x <= 安全区坐标范围.x2 + 5 && 人物坐标.y >= 安全区坐标范围.y1 - 5 && 人物坐标.y <= 安全区坐标范围.y2 + 5) {
                    sleep(3000);
                    break; //说明到了安全区
                }
                if (人物坐标 == null && tryCount < 5) {
                    tryCount++;
                    sleep(1000 * 3);
                    continue;
                }
                if (tryCount >= 5) {
                    tools.人物移动.随机走一步(random(1500,2500));
                    sleep(1000 * 2);
                }
                if (tryCount >= 5 || 历史坐标 == null || (人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y)) {
                    toastLog('开始跑图(去盟重老兵)');
                    try {
                        tools.人物移动.去盟重老兵();
                    } catch (error) {
                        toastLog(error)
                        sleep(666)
                    }
                    tryCount = 0;
                }
                if (人物坐标 != null) {
                    历史坐标 = 人物坐标;
                }
                sleep(1000 * 5);
            }
            toastLog("到达目的地");
            return;

        },
        去挂机地图: (挂机地图) => {
            var 当前地图 = tools.常用操作.获取人物地图();
            //toastLog(挂机地图)
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
                toastLog(当前地图 + ":" + 挂机地图)
                var routes = config.地图路由[当前地图][挂机地图];
                // utils.toast(挂机地图)
                // toastLog(JSON.stringify(routes))
                //toastLog(routes);
                var 大地图坐标 = null;
                if (挂机参数.挂机城市 == "比奇") {
                    大地图坐标 = config.zuobiao.比奇大地图偏移[fbl];
                } else if (挂机参数.挂机城市 == "盟重") {
                    大地图坐标 = config.zuobiao.盟重大地图偏移[fbl];
                }
                for (var i = 0; i < routes.length; i++) {
                    var 路由 = routes[i];
                    var r = null;
                    路由.forEach((item) => {
                        r = (r == null ? 大地图坐标[item] : r[item]);
                    })
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(random(1200, 1600));
                }
                sleep(random(1200, 1666));
                tools.常用操作.关闭所有窗口();
            } else {
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去挂机地图Loop: () => {
            tools.悬浮球描述("开始去挂机地图")
            挂机地图 = 挂机参数.挂机地图;
            var 当前坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            while (isStart) {
                var 当前地图 = tools.常用操作.获取人物地图();
                if (当前地图 == 挂机地图) { //说明到目的地
                    break;
                }
                else {
                    //var routes = config.地图路由[当前地图][挂机地图];
                    var 坐标 = tools.常用操作.获取人物坐标();
                    if (坐标 == null && tryCount < 10) {
                        tools.悬浮球描述("坐标获取失败(" + tryCount + ")")
                        tryCount++;
                        sleep(1000 * 3);
                        continue;
                    }
                    if (tryCount >= 10 || 当前坐标 == null || (坐标.x == 当前坐标.x && 坐标.y == 当前坐标.y)) {
                        toastLog('开始跑图(挂机Loop)');
                        try {
                            tools.人物移动.去挂机地图(挂机地图);
                        } catch (error) {
                            toastLog('跑图异常' + error)
                        }
                        tryCount = 0;
                    }
                    if (坐标 != null) {
                        当前坐标 = 坐标;
                    }
                }
                sleep(1000 * 5);
            }
            tools.常用操作.点击人物();
            sleep(random(666, 999));
            toastLog("到达目的地");
            return;
        },
        盟重去地下秘密通道: () => {
            tools.常用操作.关闭所有窗口();
            tools.悬浮球描述("开始去地下秘密通道");
            var 挂机地图 = 挂机参数.挂机地图;
            var 历史坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            var 跑图次数 = 1;
            while (true) {
                //while (isStart) {
                var r = tools.findImage("midaoshizheshangfang.png");
                if (r.status) {
                    //04-29 16:57:51.875/D: {"status":true,"img":"{\"x\":360.0,\"y\":160.0}","size":{"w":151,"h":152}}
                    tools.悬浮球描述("到达密道使者周边");
                    while (true) {
                        sleep(2500);
                        var x = r.img.x + r.size.w / 2 + random(-5, 5);
                        var y = r.img.y + r.size.h + 58 + random(-5, 5);
                        click(x, y);
                        sleep(random(666, 999));
                        var r = tools.findImageForWaitClick("midaoduihuaBtn.png", {
                            maxTries: 10,
                            interval: 666
                        });
                        if (!r.status) {
                            continue;
                        }
                        sleep(random(666, 999));
                        r = tools.findImageForWaitClick("midaotongdaoyidongBtn.png", {
                            maxTries: 10,
                            interval: 666
                        });
                        if (!r.status) {
                            continue;
                        }
                        sleep(random(666, 999));
                        r = tools.findImageForWaitClick("midaoyidongBtn.png", {
                            maxTries: 10,
                            interval: 666
                        });
                        if (!r.status) {
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                    break;
                }
                else {
                    var 坐标 = tools.常用操作.获取人物坐标();
                    if (坐标 == null && tryCount < 3) {
                        tryCount++;
                        tools.悬浮球描述("坐标失败(" + tryCount + ")")
                        sleep(1000 * 3);
                        continue;
                    }
                    if (tryCount >= 3 || 坐标 == null || (坐标.x == 历史坐标.x && 坐标.y == 历史坐标.y)) {
                        tools.悬浮球描述("开始跑图(连接通道)");
                        try {
                            tools.人物移动.去挂机地图("武馆教头");
                        } catch (error) {
                            toastLog('跑图异常' + error)
                        }
                        tryCount = 0;
                    }
                    else {
                        tools.悬浮球描述("跑图中(" + 跑图次数 + ")");
                    }
                    if (坐标 != null) {
                        历史坐标 = 坐标;
                    }
                }
                sleep(1000 * 5);
            }
            return;
        },
        去地下秘密通道下一层: () => {
            tools.常用操作.关闭所有窗口();
            tools.悬浮球描述("开始去下一层");
            var 挂机地图 = 挂机参数.挂机地图;
            var fbl = `${device.width}_${device.height}`;
            var 历史坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            var 跑图次数 = 1;
            var 入口偏移 = config.zuobiao.地下秘密通道入口偏移[fbl];
            var closeImg = null;
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 333
            })
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                return false;
            }

            // sleep(random(333, 666))
            // tools.常用操作.关闭所有窗口();
            while (true) {
                //while (isStart) {
                var x = closeImg.x + 入口偏移.x + random(-3, 3);
                var y = closeImg.y + 入口偏移.y + random(-3, 3);
                click(x, y)
                var 当前地图 = tools.常用操作.获取人物地图();
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
                if (人物坐标 != null && 当前地图 == "比奇城" && 人物坐标.x >= 安全区坐标范围.x1 - 5 && 人物坐标.x <= 安全区坐标范围.x2 + 5 && 人物坐标.y >= 安全区坐标范围.y1 - 5 && 人物坐标.y <= 安全区坐标范围.y2 + 5) {
                    sleep(3000);
                    break; //说明到了安全区
                }
                if (人物坐标 == null && tryCount < 10) {
                    tryCount++;
                    sleep(1000 * 5);
                    continue;
                }
                if (tryCount >= 10 || 历史坐标 == null || (人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y)) {
                    toastLog('开始跑图(去比奇老兵)');
                    try {
                        tools.人物移动.去比奇老兵();
                    } catch (error) {
                        toastLog(error)
                        sleep(666)
                    }
                    tryCount = 0;
                }
                if (人物坐标 != null) {
                    历史坐标 = 人物坐标;
                }
                sleep(1000 * 5);
            }
            return;
        }
    },
    找满血怪: () => {
        let fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.左攻击面板[fbl].怪物集合;
        var img = captureScreen();
        var r = images.findMultiColors(img, p.找色[0].color, [[p.找色[1].x, p.找色[1].y, p.找色[1].color]], {
            region: [p.x[0], p.y[0], p.x[1] - p.x[0], p.y[1] - p.y[0]],
            threshold: 25
        });
        utils.recycleNull(img);
        return r;
    },
    寻找打怪: (直接攻击) => {
        tools.悬浮球描述("找怪(" + new Date().getSeconds() + ")");
        var fbl = `${device.width}_${device.height}`;
        var p2 = config.zuobiao.锁定怪物标识范围[fbl];
        var 按钮集合 = config.zuobiao.按钮集合[fbl];
        var 怪物集合 = config.zuobiao.左攻击面板[fbl].怪物集合;
        var isFind = false;
        var isShiQu = false;
        var r = null;
        // if (直接攻击) {
        //     click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
        // }
        if (挂机参数.只打满血怪 == 1 || 挂机参数.只打满血怪 == "1") {
            r = tools.找满血怪();
            if (r && (r.x > 0 || r.y > 0)) {
                click(r.x + random(5, 30), r.y + random(-3, 3))
                isFind = true;
            }
        }
        else {
            r = tools.findImageAreaClick("zuoguaiwuBtn.png", 怪物集合.x[0], 怪物集合.y[0], 怪物集合.x[1], 怪物集合.y[1]);
            if (r) {
                isFind = true;
            }
        }
        //if (直接攻击 || isFind) {
        if (isFind) {
            tools.悬浮球描述("攻击中");
            if (挂机参数.首次用符攻击 == 1) {
                longClick(random(按钮集合.打符.x[0], 按钮集合.打符.x[1]), random(按钮集合.打符.y[0], 按钮集合.打符.y[1]));
                sleep(1000);
            }

            click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
            r = tools.findImageAreaForWait("zhongjianguaiwuBtn.png", p2.x[0], p2.y[0], p2.x[1], p2.y[1], {
                maxTries: 5,
                interval: 200
            })
            if (r.status) {
                isShiQu = true;
            }
            else {
                tools.悬浮球描述("锁定失败");
            }
        }
        if (isShiQu) {
            var timeout = 1000 * 60;
            var 随机走动时间戳 = 1000 * 5;
            var 上一次走动 = new Date().getTime();
            let start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (new Date().getTime() - start > timeout) {
                    tools.常用操作.点击挂机坐标(true);
                    sleep(1000 * 10);
                    break;
                }
                r = tools.findImageArea("zhongjianguaiwuBtn.png", p2.x[0], p2.y[0], p2.x[1], p2.y[1])
                if (r.status) {
                    if (new Date().getTime() - 上一次走动 >= 随机走动时间戳) {
                        //tools.人物移动.随机走一步();
                        click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                        上一次走动 = new Date().getTime();
                    }
                    tools.悬浮球描述("攻击中(" + parseInt((timeout - (时间戳)) / 1000) + ")");
                    sleep(333);
                } else {
                    if (挂机参数.一波怪物死亡拾取 == 0) {
                        tools.开始拾取();
                    }
                    break;
                }
            }
        }
        //tools.悬浮球描述("("+minute+":"+second+")");
        return isFind;
    },
    开始拾取: () => {
        //var tryCount = 0;
        var fbl = `${device.width}_${device.height}`;
        var 按钮集合 = config.zuobiao.按钮集合[fbl];
        var r = null;
        click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
        let start = new Date().getTime();
        while (true) {
            if (new Date().getTime() - start > (挂机参数.拾取时长 * 1000)) {
                click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
                break;
            }
            // if (tryCount >= 挂机参数.拾取时长) {
            //     click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
            //     break;
            // }
            sleep(666);
            r = tools.findImage("shiquzhongBtn.png", 0.9)
            if (!r.status) {
                break;
            }
            tools.悬浮球描述("拾取中(" + parseInt(((挂机参数.拾取时长 * 1000) - (new Date().getTime() - start)) / 1000) + ")");
            //tools.悬浮球描述("拾取中(" + (挂机参数.拾取时长 - tryCount) + ")")
            //tryCount++;
        }
        if (挂机参数.装备实际未满下线 == 1) {
            r = tools.常用操作.读取聊天框信息();
            var 聊天框内容 = ""
            if (r) {
                for (var i = 0; i < r.length; i++) {
                    聊天框内容 += r[i].text;
                }
            }
            if (聊天框内容.indexOf("已满") >= 0 || 聊天框内容.indexOf("己满") >= 0) {
                toastLog(聊天框内容)
                var r1 = tools.常用操作.检查背包是否有东西("5_7");
                if (r1) {
                    tools.回城补给在挂机();
                } else {
                    tools.常用操作.小退并登录();
                }
            }
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
    回城补给在挂机: () => {
        tools.补给操作.回城补给();
        tools.去挂机图打怪(挂机参数.挂机城市);
    },
    补给操作: {
        回城补给: () => {
            tools.悬浮球描述("回城补给");
            当前总状态 = 总状态.回城补给;
            if (挂机参数.挂机城市 == "比奇") {
                tools.人物移动.去比奇小贩Loop();
            } else if (挂机参数.挂机城市 == "盟重") {
                tools.人物移动.去盟重小贩Loop();
            }
            if (isStart) {
                tools.点击分身();
            }
            if (isStart) {
                tools.补给操作.卖物品Loop();
            }
            if (isStart) {
                tools.补给操作.修理装备Loop();
            }
            if (isStart) {
                tools.补给操作.买物品Loops();
            }
            tools.悬浮球描述("补给完成");
        },
        卖物品Loop: () => {
            tools.悬浮球描述("开始卖物品");
            while (isStart) {
                var result = tools.补给操作.卖物品();
                if (result.status) {
                    tools.悬浮球描述("结束卖物品");
                    break;
                } else {
                    tools.悬浮球描述(result.err);
                    sleep(1000)
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
            if (!r.status) {
                return {
                    status: false,
                    err: "未获取出售物品按钮"
                }
            }
            sleep(777);
            r = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 333
            });
            if (!r.status) {
                return {
                    status: false,
                    err: "未获取到整理按钮"
                }
            }
            var 卖装备背包格子 = config.zuobiao.卖装备背包格子[fbl];
            var 第一格 = 卖装备背包格子[`1_1`];
            for (let index = 1; index <= 5; index++) {
                for (let index1 = 1; index1 <= 8; index1++) {
                    sleep(random(1288, 1588))
                    tools.悬浮球描述(`开始出售${index}_${index1}格子`)
                    var p = 卖装备背包格子[`${index}_${index1}`];
                    var randomX = random(-5, 5);
                    var randomY = random(-5, 5);
                    click(p.x + randomX, p.y + randomY)
                    r = tools.findImageForWait("beibaofangruBtn.png", {
                        maxTries: 10,
                        interval: 333
                    });
                    if (r.status) {
                        var img = captureScreen();
                        var imgSmall = tools.截屏裁剪(img, 卖装备背包格子["1_1"].x, 卖装备背包格子["1_1"].y, w, 卖装备背包格子["最底部"]) //captureScreen();//
                        let r = ocrPladderOCR.detect(imgSmall); //utils.ocrGetContentStr(imgSmall);
                        var allText = '';
                        //var exists = r.some(item => item.text.indexOf"极品");
                        if (r) {
                            r.forEach(item => {
                                allText += item.text;
                            });
                            tools.悬浮球描述(allText);
                            if (allText.indexOf("极品") >= 0 || allText.indexOf("护身符") >= 0) {
                                tools.悬浮球描述(`${index}_${index1}存仓库`)
                                tools.补给操作.存仓库(index, index1);
                                return {
                                    status: false,
                                    err: "重新卖装备"
                                }
                            } else {
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
                                } else {
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
                    } else {
                        if (tools.常用操作.检查背包是否有东西("1_1")) {
                            return {
                                status: false,
                                err: "依然有东西存在，继续卖"
                            }
                        }
                        else {
                            return {
                                status: true,
                                err: ""
                            }
                        }
                    }
                }
            }
            return {
                status: true,
                err: ""
            }
        },
        买物品Loops: () => {
            let 物品集合 = 挂机参数.购买物品.filter(item => parseInt(item.num) > 0).map((item, i) => {
                var 物品页码 = config.zuobiao.购买物品页码[item["name"]];
                return {
                    "名称": item["name"],
                    "数量": item["num"],
                    "页码": 物品页码.页码,
                    "顺序": 物品页码.顺序,
                    "是否下翻": 物品页码.是否下翻,
                };
            });
            if (物品集合 != null && 物品集合.length > 0) {
                for (var i = 0; i < 物品集合.length; i++) {
                    if (isStart) {
                        var 物品对象 = 物品集合[i];
                        tools.悬浮球描述("开始购买" + JSON.stringify(物品对象));
                        tools.补给操作.买物品(物品对象)
                        sleep(random(2000, 3000));
                    }
                }
            }
            tools.悬浮球描述("购买物品结束");
        },
        买物品: (物品对象) => {
            tools.常用操作.关闭所有窗口();
            var fbl = `${device.width}_${device.height}`;
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
            click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
            var r = tools.findImageForWaitClick("goumaiwupingBtn.png", {
                maxTries: 6,
                interval: 666
            });
            sleep(random(666, 888));
            if (!r.status) {
                return {
                    status: false,
                    err: "尝试6次未获取购买物品按钮"
                }
            }
            var 购买物品位置 = config.zuobiao.购买物品位置[fbl];
            for (var i = 1; i < 物品对象["页码"]; i++) {
                r = tools.findImageForWaitClick("youjiantouBtn.png", {
                    maxTries: 6,
                    interval: 666
                });
                if (r.status) {
                    sleep(random(666, 888))
                }
                else {
                    return {
                        status: false,
                        err: "未找到youjiantouBtn.png"
                    }
                }

            }
            var p = 购买物品位置[物品对象.顺序.toString()];
            click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
            sleep(random(666, 888))
            if (物品对象["是否下翻"]) {
                //buygoumaiBtn.png     buychakanBtn.png
                r = tools.findImageForWaitClick("buychakanBtn.png", {
                    maxTries: 6,
                    interval: 666
                });
                if (r.status) {
                    sleep(random(666, 888))
                    p = 购买物品位置["1"];
                    click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
                    sleep(random(666, 888))
                }
                else {
                    return {
                        status: false,
                        err: "未找到buychakanBtn.png"
                    }
                }
            }
            for (var i = 0; i < 物品对象["数量"]; i++) {
                if (isStart) {
                    tools.悬浮球描述("购买数" + (i + 1));
                    tools.findImageClick("buygoumaiBtn.png");
                    sleep(random(888, 1288))
                }
            }
        },
        存仓库: (index1, index2) => {
            tools.常用操作.关闭所有窗口();
            var fbl = `${device.width}_${device.height}`;
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
            sleep(random(666, 999));
            click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2));
            sleep(random(666, 999));
            var r = tools.findImageForWaitClick("baocunwupingBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (!r.status) {
                return {
                    status: false,
                    err: "尝试10次未获取到保管物品按钮"
                }
            }
            r = tools.findImageForWait("cangku_clear.png", {
                maxTries: 10,
                interval: 666
            });
            if (!r.status) {
                return {
                    status: false,
                    err: "尝试10次未获取到保管物品按钮"
                }
            }
            tools.悬浮球描述(`开始保存${index1}_${index2}格子东西`)
            r = tools.findImageForWait("beibaomianban.png", {
                maxTries: 6,
                interval: 666
            })
            if (!r.status) {
                return {
                    status: false,
                    err: "未找到beibaomianban"
                }
            }
            var p = config.zuobiao.背包格子于面板偏移量[fbl][`${index1}_${index2}`];
            var x = r.img.x + p.x + random(-8, 8);
            var y = r.img.y + p.y + random(-5, 5);
            click(x, y)
            r = tools.findImageForWaitClick("beibaocunruBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (r.status) {
                存入仓库数量++;
            } else {
                return {
                    status: false,
                    err: "尝试10次未获取到存入按钮"
                }
            }
        },
        修理装备Loop: () => {
            tools.悬浮球描述("修理装备中");
            if (isStart) {
                tools.补给操作.卸下人物装备();
            }
            if (isStart) {
                tools.补给操作.修理装备();
            }
            if (isStart) {
                tools.补给操作.穿装备();
            }
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
            sleep(333, 666);
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
                    if (!result.status) {
                        continue;
                    }
                    sleep(random(666, 888));
                    var p = 卖装备背包格子[`${index}_${index1}`];
                    var randomX = random(-5, 5);
                    var randomY = random(-5, 5);
                    click(p.x + randomX, p.y + randomY)
                    sleep(random(333, 666));
                    result = tools.findImageForWaitClick("beibaofangruBtn.png", {
                        maxTries: 6,
                        interval: 666
                    })
                    if (result.status) {
                        tools.findImageForWaitClick("OKBtn.png", {
                            maxTries: 10,
                            interval: 666
                        })
                        sleep(random(333, 666))
                    } else {
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
            var 头盔 = config.zuobiao.人物面板[fbl].头盔;
            var 衣服 = config.zuobiao.人物面板[fbl].衣服;
            var 项链 = config.zuobiao.人物面板[fbl].项链;
            var 武器 = config.zuobiao.人物面板[fbl].武器;
            var 手镯1 = config.zuobiao.人物面板[fbl].手镯1;
            var 手镯2 = config.zuobiao.人物面板[fbl].手镯2;
            var 戒指1 = config.zuobiao.人物面板[fbl].戒指1;
            var 戒指2 = config.zuobiao.人物面板[fbl].戒指2;
            var 护身符 = config.zuobiao.人物面板[fbl].护身符;
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
            sleep(random(333, 666));


            //卸下护身符
            x = 装备面板.x + 护身符.x + random(-5, 8);;
            y = 装备面板.y + 护身符.y + random(-5, 5);;
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
            sleep(333, 666);
            if (result.status) {
                var fbl = `${device.width}_${device.height}`;
                var p = config.zuobiao.背包格子于面板偏移量[fbl];
                for (let index = 1; index <= 5; index++) {
                    for (let index1 = 1; index1 <= 8; index1++) {
                        tools.悬浮球描述("穿戴" + index + "_" + index1 + "格");
                        var p1 = p[index + "_" + index1];
                        var x = result.img.x + p1.x + random(-8, 8);
                        var y = result.img.y + p1.y + random(-5, 5);
                        click(x, y)
                        var r = tools.findImageForWaitClick("beibaochuandaiBtn.png", {
                            maxTries: 6,
                            interval: 666
                        })
                        if (!r.status) {
                            r = tools.findImageForWaitClick("beibaoshiyongBtn.png", {
                                maxTries: 6,
                                interval: 666
                            })
                            if (!r.status) {
                                return
                            }
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
        if (!result) {
            toastLog("申请截图失败");
            exit();
        }
    },
    findImageForWaitClick: (fileName, options) => {
        var result = tools.findImageForWait(fileName, options);
        if (result.status && (result.img.x > 0 || result.img.y > 0)) {
            var x = result.img.x + result.size.w / 2 + random(-3, 3);
            var y = result.img.y + result.size.h / 2 + random(-3, 3);
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
                //tools.悬浮球描述("找图" + fileName + "成功(" + (tryCount + 1) + ")");
                return result
            } else {
                tools.悬浮球描述(fileName + "未找到(" + (tryCount + 1) + ")");
            }

            tryCount++;
        }
    },
    findImageAreaForWait: (fileName, x1, y1, x2, y2, options) => {
        var w = device.width;
        var h = device.height;
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
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
            if (new Date().getTime() - start > timeout) {
                msg = "超时未找到图像：" + fileName;
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
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
    findImageAreaForWaitClick: (fileName, x1, y1, x2, y2, options) => {
        var result = tools.findImageAreaForWait(fileName, x1, y1, x2, y2, options);
        if (result.status && (result.img.x > 0 || result.img.y > 0)) {
            var x = result.img.x + result.size.w / 2 + random(-3, 3);
            var y = result.img.y + result.size.h / 2 + random(-3, 3);
            click(x, y)
        }
        return result;
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
            if (targetImg == null) {
                toastLog(fileName + '图片不存在');
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
    findImageAreaClick(fileName, x1, y1, x2, y2) {
        var result = tools.findImageArea(fileName, x1, y1, x2, y2);
        if (result.status && (result.img.x > 0 || result.img.y > 0)) {
            var x = result.img.x + result.size.w / 2 + random(-3, 3);
            var y = result.img.y + result.size.h / 2 + random(-3, 3);
            click(x, y)
            return true
        } else {
            if (fileName != "closeBtn.png" && fileName != "closeBtn2.png" && fileName != "zuoguaiwuBtn.png") {
                tools.悬浮球描述('找图失败' + fileName);
            }
            return false
        }
    },
    findImageClick: (fileName, threshold) => {
        var result = tools.findImage(fileName, threshold);
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
    /** 判断两张图片是否相似（用于判断人物坐标是否发生变化）
     * @param {Image} img1 第一张图片（之前截的区域）
     * @param {Image} img2 第二张图片（当前截图）
     * @param {number} threshold 单个像素 RGB 差异的容忍值（默认 20），越小越严格
     * @param {number} tolerance 允许有多少个像素超过 threshold（默认 5），越小越严格
     * @returns {boolean} 是否足够相似（true = 没变化，false = 有变化）
     */
    isSimilarImage: (img1, img2, threshold, tolerance) => {
        if (threshold == null) {
            threshold = 20;
        }
        if (tolerance == null) {
            tolerance = 5;
        }
        let w = img1.getWidth(), h = img1.getHeight();
        if (w !== img2.getWidth() || h !== img2.getHeight()) return false;

        let diffCount = 0;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                let c1 = images.pixel(img1, x, y);
                let c2 = images.pixel(img2, x, y);

                // 计算颜色差异总和：|R1-R2| + |G1-G2| + |B1-B2|
                let diff = Math.abs(colors.red(c1) - colors.red(c2)) +
                    Math.abs(colors.green(c1) - colors.green(c2)) +
                    Math.abs(colors.blue(c1) - colors.blue(c2));

                if (diff > threshold) {
                    diffCount++;
                    if (diffCount > tolerance) return false;
                }
            }
        }
        return true;
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
            toastLog('获取区域文字 x2超出屏宽')
            return null;
        }
        if (y2 > h) {
            toastLog('获取区域文字 y2超出屏高')
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
            toastLog('获取区域文字异常' + e)
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
        let rotation = context.getSystemService(context.WINDOW_SERVICE)
            .getDefaultDisplay()
            .getRotation();

        let w, h;
        if (rotation == Surface.ROTATION_0) { //竖屏（自然方向）
            w = device.width;
            h = device.height;
        } else {
            w = device.height;
            h = device.width;
        }
        return {
            w,
            h
        };
        // let w, h;
        // if (context.getResources().getConfiguration().orientation == 1) {
        //     // 竖屏
        //     w = device.width;
        //     h = device.height;
        // } else {
        //     // 横屏
        //     w = device.height;
        //     h = device.width;
        // }
        // return {
        //     w,
        //     h
        // };
    }
}


win.ditu1.setOnCheckedChangeListener((group, checkedId) => {
    let checkedRadio = win.ditu1.findViewById(checkedId);
    switch (checkedRadio) {
        case win.radio1:
            switchRadio1(1);
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
        case win.radio5:
            switchRadio1(5);
            break;
    }
});
tools.初始化参数();
// 初始化文字识别插件(必须初始化才生效)
utils.initOcr("谷歌")
tools.shenqiCapture();
ui.run(() => {
    win.tab1.setOnClickListener(() => switchTab(1));
    win.tab2.setOnClickListener(() => switchTab(2));
    win.tab3.setOnClickListener(() => switchTab(3));

    win.btnStart.click(() => {
        if (isStart) {
            isShowConfig = true
            isStart = false
            ui.run(() => {
                win.btnStart.text("启动")
            });
            当前总状态 = 总状态.未启动;
        } else {
            tools.悬浮球描述("技术支持:宁波字节飞舞软件科技")
            isShowConfig = false;
            isStart = true
            win.setPosition(-10000, padding_top);
            ui.run(() => {
                win.btnStart.text("暂停")
            });
            当前总状态 = 总状态.已启动;
            toastLog("正在启动...")
            isStart = true;
        }
    })
    win.btnClose.click(() => {
        isShowConfig = false
        win.setPosition(-10000, padding_top);
    });
    win.btnReset.click(() => {
        isShowConfig = false;
        win.setPosition(-10000, padding_top);
        当前总状态 = 总状态.申请重启;
        toastLog("正在结束当前任务,请稍后");
        while (true) {
            if (当前总状态 == 总状态.重启中) {
                break;
            }
            sleep(666);
        }
        engines.execScriptFile(项目路径 + "reload.js"); // 你主脚本的名称
        sleep(666);
        exit();
    });
    win.t_BuJi.click(() => {
        开启强行补给 = true;
        上次装备自检时间 = new Date().getTime() - (20 * 60 * 1000); // 减去 20 分钟; 
    })
    win.btnSetFouse.click(() => {
        win.requestFocus(); //设置焦点
    })

    win.btnSave.click(() => {
        var isSave = true;
        let checkedId = win.ditu1.getCheckedRadioButtonId();
        if (checkedId <= 0) {
            isSave = false;
            toast("未选择地图");
            return false;
        }
        let radioButton = win.ditu1.findViewById(checkedId);
        var r = radioButton.getText();
        var ditu1 = radioButton.attr("id").split("/")[1];
        var ditu1_1 = "";
        var 挂机地图 = "";
        var 挂机城市 = ""
        switch (r) {
            case "骷髅洞":
                checkedId = win.group1_1.getCheckedRadioButtonId();
                if (checkedId <= 0) {
                    isSave = false;
                    toast("未选择地图");
                    return false;
                }
                radioButton = win.group1_1.findViewById(checkedId);
                ditu1_1 = radioButton.attr("id").split("/")[1];
                挂机地图 = radioButton.getText();
                挂机城市 = "比奇"
                break;
            case "石墓阵":
                checkedId = win.group1_2.getCheckedRadioButtonId();
                if (checkedId <= 0) {
                    isSave = false;
                    toast("未选择地图");
                    return false;
                }
                radioButton = win.group1_2.findViewById(checkedId);
                ditu1_1 = radioButton.attr("id").split("/")[1];
                挂机地图 = radioButton.getText();
                挂机城市 = "盟重"
                break;
            case "蜈蚣洞":
                checkedId = win.group1_3.getCheckedRadioButtonId();
                if (checkedId <= 0) {
                    isSave = false;
                    toast("未选择地图");
                    return false;
                }
                radioButton = win.group1_3.findViewById(checkedId);
                ditu1_1 = radioButton.attr("id").split("/")[1];
                挂机地图 = radioButton.getText();
                挂机城市 = "盟重"
                break;
            case "其他":
                checkedId = win.group1_5.getCheckedRadioButtonId();
                if (checkedId <= 0) {
                    isSave = false;
                    toast("未选择地图");
                    return false;
                }
                radioButton = win.group1_5.findViewById(checkedId);
                ditu1_1 = radioButton.attr("id").split("/")[1];
                挂机地图 = radioButton.getText();
                挂机城市 = "盟重"
                break;
            default:
                isSave = false;
                toast("不支持" + r);
                break;
        }

        挂机参数 = {
            ditu1: ditu1,
            ditu1_1: ditu1_1,
            购买物品: [{
                name: "魔法药中包",
                num: win.t_lanYaoZhongBao.getText(),
            },
            {
                name: "魔法药中个",
                num: win.t_lanYaoZhongGe.getText(),
            },
            {
                name: "金创药中个",
                num: win.t_hongYaoZhongGe.getText(),
            },
            {
                name: "金创药中包",
                num: win.t_hongYaoZhongBao.getText(),
            },
            {
                name: "随机包",
                num: win.t_suiJiBao.getText(),
            },
            {
                name: "随机",
                num: win.t_suiJiGe.getText(),
            },
            {
                name: "地牢",
                num: win.t_diLaoGe.getText(),
            },
            {
                name: "修复油",
                num: win.t_xiuFuYou.getText(),
            },
            {
                name: "护身符大",
                num: win.t_hushenhu.getText()
            },
            ],
            衣服持久0回程: win.cbIsHuiChengYiFu.isChecked() ? 1 : 0,
            武器持久0回程: win.cbIsHuiChengWuQi.isChecked() ? 1 : 0,
            补给时点分身: win.cbIsFenShen.isChecked() ? 1 : 0,
            超过5只怪隐身: win.cbIsYinShen.isChecked() ? 1 : 0,
            召唤骷髅: win.cbZhaoHuanKuLou.isChecked() ? 1 : 0,
            召唤神兽: win.cbZhaoShenShou.isChecked() ? 1 : 0,
            沿途打怪: win.cbYanTuDaGuai.isChecked() ? 1 : 0,
            地牢回城: win.cbIsDiLao.isChecked() ? 1 : 0,
            装备实际未满下线: win.cbShiJiWeiManXiaXian.isChecked() ? 1 : 0,
            一波怪物死亡拾取: win.cbIsYiBoSiWangSiQu.isChecked() ? 1 : 0,
            首次用符攻击: win.cbIsFuGongJi.isChecked() ? 1 : 0,
            只打满血怪: win.cbManXue.isChecked() ? 1 : 0,
            挂机地图: 挂机地图,
            挂机城市: 挂机城市,
            拾取时长: parseInt(win.t_shiQuShiChang.getText()),
        }
        commonStorage.put("peizhi", JSON.stringify(挂机参数));
        isShowConfig = false;
        win.setPosition(-10000, padding_top);
        toast("保存成功")
    })


    win.setSize(w, h);
    win.setPosition(-10000, padding_top);
    win.setTouchable(true); // 可交互
    // win.btnStart.setSize(100,500)

    // 设置悬浮窗圆角背景
    let gd = new android.graphics.drawable.GradientDrawable();
    gd.setCornerRadius(20); // 圆角半径 20dp（单位是 px）
    gd.setColor(android.graphics.Color.parseColor("#E5FFFFFF"));
    gd.setStroke(2, android.graphics.Color.parseColor("#81f900"));
    win.configFrame.setBackgroundDrawable(gd);

    gd = new android.graphics.drawable.GradientDrawable();
    gd.setCornerRadius(10); // 圆角半径 20dp（单位是 px）
    gd.setColor(android.graphics.Color.parseColor("#B2000000")); // 70% 不透明白
    gd.setStroke(2, android.graphics.Color.parseColor("#376b00"));

    window.xuanFuPanel.setBackgroundDrawable(gd);


    // windowCommon.xuanFuCommon.setBackgroundDrawable(gd);
    windowCommon.setPosition(3, -5)
});

function switchTab(index) {
    for (let i = 1; i <= 3; i++) {
        let isActive = i === index;
        win["text" + i].setTextColor(colors.parseColor(isActive ? "#000000" : "#888888"));
        win["line" + i].setVisibility(isActive ? 0 : 8); // 0:VISIBLE, 8:GONE
        win["view" + i].setVisibility(isActive ? 0 : 8);
    }
}

function switchRadio1(index) {
    for (let i = 1; i <= 5; i++) {
        let isActive = i === index;
        win["ditu1_" + i].setVisibility(isActive ? 0 : 8);
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
    let windowX = window.getX();
    let windowY = window.getY();
    let 偏移量 = 0;
    if (h == 720) {
        偏移量 = 30;
    } else {
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
    var h_ = parseInt(h * 0.9);
    padding_left = parseInt(w * 0.1)
    padding_top = parseInt((h) * 0.05);
    tabW = parseInt((w_ / tabCount));
    win.setSize(w_, h_);
    win.setPosition(padding_left, padding_top);
    // win.setTouchable(true);    // 可交互
    win.tab1.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab2.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab3.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.btnStart.setLayoutParams(android.widget.LinearLayout.LayoutParams(180, 75));
    win.btnSave.setLayoutParams(android.widget.LinearLayout.LayoutParams(180, 75));
    win.btnClose.setLayoutParams(android.widget.LinearLayout.LayoutParams(180, 75));
    win.btnSetFouse.setLayoutParams(android.widget.LinearLayout.LayoutParams(180, 75));
    win.btnReset.setLayoutParams(android.widget.LinearLayout.LayoutParams(180, 75));

}


//启动程序
threads.start(function () {

    // tools.人物移动.盟重去地下秘密通道();
    // return
    //  var r = tools.findImageForWaitClick("jiaoseBtn.png", {
    //             maxTries: 10,
    //             interval: 333
    //         });
    //         return;
    // sleep(2000)
    // var fbl = `${device.width}_${device.height}`;
    // var 左上箭头 = config.zuobiao.按钮集合[fbl].左上箭头;

    // click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));

    let 上次装备自检时间 = new Date().getTime() - (20 * 60 * 1000); // 减去 20 分钟; 
    let 上次打怪时间 = new Date().getTime();
    let 上次跑图时间 = new Date().getTime();
    let 装备自检时间戳 = 15 * 60 * 1000;
    let 打怪时间戳 = 0.5 * 1000;
    let 跑图时间戳 = 3.5 * 1000;
    while (true) {
        if (isStart) {
            if (!是否载加过金币) {
                var r = tools.常用操作.获取人物金币();//这里不用多线程好像会被卡死
                if (r != null) {
                    启动金币 = r;
                    是否载加过金币 = true;
                }
            }
            var 打怪次数 = 0; //大于0则坐标移动过，需强制跑图
            if (new Date().getTime() - 上次装备自检时间 > 装备自检时间戳) {
                if (开启强行补给) {
                    tools.回城补给在挂机();
                    开启强行补给 = false;
                }
                else {
                    var r = tools.常用操作.判断是否需要补给();
                    if (r) {
                        tools.回城补给在挂机();
                    } else {
                        tools.去挂机图打怪(挂机参数.挂机城市);
                    }
                }
                上次装备自检时间 = new Date().getTime();
            }

            if (new Date().getTime() - 上次打怪时间 > 打怪时间戳) {
                var r = false;
                while (true) {
                    try {
                        r = tools.寻找打怪(打怪次数 > 0 ? true : false);
                    } catch (e) {
                        r = false;
                        toastLog("寻找打怪异常" + e)
                    }
                    if (r) {
                        打怪次数++;
                        continue;
                    } else {
                        break;
                    }
                }
                if (打怪次数 > 0 && 挂机参数.一波怪物死亡拾取 == 1) {
                    //sleep(333);
                    tools.开始拾取();
                }
                上次打怪时间 = new Date().getTime();
            }

            if (new Date().getTime() - 上次跑图时间 > 跑图时间戳) {
                var 当前地图 = tools.常用操作.获取人物地图();
                if (当前地图 == 挂机参数.挂机地图) {
                    //tools.常用操作.点击挂机坐标(打怪次数 > 0 ? true : false);
                    try {
                        tools.常用操作.点击挂机坐标(打怪次数 > 0 ? true : false);
                    } catch (e) {
                        toastLog('点击挂机坐标异常' + e);
                    }
                }
                else {
                    tools.去挂机图打怪(挂机参数.挂机城市);
                }
                上次跑图时间 = new Date().getTime();
            }

        } else {
            sleep(1000); //3
        }
    }
});



// 开一个线程周期性更新 UI
threads.start(function () {
    while (true) {
        let currentDirection = context.getResources().getConfiguration().orientation;
        var 分钟 = 0;
        try {
            分钟 = parseInt((new Date().getTime() - 启动时间) / 1000 / 60);
        } catch (error) {
            分钟 = 0;
        }
        ui.run(() => {
            window.cpuText.setText("CPU: " + utils.getCpuPercentage());
            window.memText.setText("内存: " + utils.getMemoryInfo());
            window.startText.setText("(" + 分钟 + ")");
            window.cangkuText.setText("仓库(" + 存入仓库数量 + ")");
            window.jingbiText.setText("金币(" + 启动金币 + ")");
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