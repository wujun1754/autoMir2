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
let fbl = `${device.width}_${device.height}`;
let 项目路径 = "/sdcard/Download/";
// 配置类
let config = require("/sdcard/Download/common/config.js")
// 工具类
let utils = require("/sdcard/Download/common/utils.js")
// 公共储存对象
var commonStorage = storages.create("zijiefeiwu.cn");
let MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');
let ocr = new MLKitOCR();
let ocrPladderOCR = $ocr.create({
    models: 'slim', // 指定精度相对低但速度更快的模型，若不指定则为default模型，精度高一点但速度慢一点
});
let 存入仓库数量 = 0;
var 挂机点跑图顺序 = 0;

let 认证自检时间 = new Date().getTime();
let 认证自检时间戳 = 30 * 1000;

let 画面自检时间 = new Date().getTime();
let 画面自检时间戳 = 60 * 1000 * 3;


var 检查蓝药时间戳 = 1000 * 60;
var 上次检查蓝药时间 = new Date().getTime(); // 减去 20 分钟; 

// var 检查武器衣服时间戳 = 1000 * 60 * 6;
var 上次检查武器衣服时间 = new Date().getTime(); // 减去 20 分钟; 

var 检查背包是否已满时间戳 = 1000 * 60 * 30;
var 上次检查背包是否已满时间 = new Date().getTime();

var 检查宝宝时间戳 = 1000 * 60 * 2;
var 上次检查宝宝时间 = new Date().getTime();


var 无地牢时间戳 = 1000 * 60 * 60 * 24;
var 上次检测地牢时间 = new Date().getTime(); // 减去 1000 分钟;


var 内挂时间戳 = 1000 * 60 * 60 * 24;
var 上次设置内挂时间 = new Date().getTime(); // 减去 1000 分钟;

var 组队模式时间戳 = 1000 * 60 * 60 * 24;
var 上次设置组队模式时间 = new Date().getTime(); // 减去 1000 分钟;


var 操作模式时间戳 = 1000 * 60 * 60 * 24;
var 上次设置操作模式时间 = new Date().getTime(); // 减去 1000 分钟;

var 上次所在地图 = "";
var 上次坐标截图 = null;
var 被攻击怪物血量截图 = null;
var 是否用过备用衣服 = false;
var 是否用过备用武器 = false;
var 启动金币 = "未知"
var 盛趣包名 = "com.shengqugames.mzsb"
var 挂机参数 = {
    ditu1: "radio1",
    ditu1_1: "radio1_1",
    购买物品: [{
        name: "随机",
        num: 2,
    }, {
        name: "随机包",
        num: 0,
    },
    {
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
    随机跑图: 0,
    无蓝回城: 0,
    无飞回城: 1,
    替换男重盔: 0,
    替换女重盔: 0,
    替换男灵魂: 0,
    替换女灵魂: 0,
    备用男重盔: 0,
    备用女重盔: 0,
    备用斩马: 0,
    攻击检查宝宝: 0,
    攻击检查武器衣服: 0,
    认证短信: 0,
    认证自动识别: 0,
    云码认证: 0,
    地图拖动: 0,
    替换降魔: 0,
    隐身数量: 0,
    隐身走动: 0,
    拾取时长: 15,
    打怪等待: 600,
    随机血量: 0,
    拾取延时: 200,
    挂机地图: "",
    挂机城市: "",
    机器标识: "",
    跟随宝宝: 0,
    跟随几格: 2,
    检查衣服武器时间戳: 600
}
var 挂机坐标点跑图次数 = 0;
var 开启强行补给 = false;
var 总状态 = {
    未启动: "未启动",
    已启动: "已启动",
    小退中: "小退中",
    重启中: "重启中"

};
var 当前总状态 = 总状态.未启动;
var 启动时间 = new Date().getTime();
let lastDirection = context.getResources().getConfiguration().orientation;
var w = parseInt(device.width * 0.96);
var h = parseInt(device.height * 0.9);
var padding_left = parseInt((device.width - w) / 2)
var padding_top = parseInt((device.height - h) / 2);
let tabCount = 3;
let tabW = 0;
var 是否启动初始化过 = false;
var 是否激活拾取 = false;
var isStart = false
var isShowConfig = false
var 宝宝最后位置信息 = {
    p: null,
    time: null
}
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
            <text id="bbText" text="v:6.9.52" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="statusText" text="" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="memText" text="内存" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="cangkuText" text="库(0)" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="startText" text="" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="jingbiText" text="金币(未知)" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="tempText" text="" textSize="8sp" textColor="#ffffff" marginRight="3" />
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
            <vertical id="content" paddingLeft="6">
                <vertical id="view1" visibility="visible" gravity="center">
                    <horizontal>
                        <radiogroup id="ditu1" orientation="horizontal" >
                            <radio textSize="10sp" id="radio1" text="骷髅洞" />
                            <radio textSize="10sp" id="radio2" text="石墓阵" />
                            <radio textSize="10sp" id="radio3" text="蜈蚣洞" />
                            <radio textSize="10sp" id="radio4" text="苍月" />
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
                            <radio textSize="10sp" id="radio2_2" text="石墓二层" />
                            <radio textSize="10sp" id="radio2_3" text="石墓三层" />
                            <radio textSize="10sp" id="radio2_4" text="石墓四层" />
                            <radio textSize="10sp" id="radio2_5" text="石墓五层" />
                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_3" visibility="gone">
                        <radiogroup id="group1_3" orientation="vertical" >
                            <radio textSize="10sp" id="radio3_1" text="地牢一层东" />
                            <radio textSize="10sp" id="radio3_2" text="地牢一层北1" />
                            <radio textSize="10sp" id="radio3_3" text="连接通道九" />
                            <radio textSize="10sp" id="radio3_4" text="连接通道八" />
                            <radio textSize="10sp" id="radio3_5" text="连接通道六" />
                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_4" visibility="gone">
                        <radiogroup id="group1_4" orientation="vertical" >
                            <radio textSize="10sp" id="radio4_1" text="骨魔洞一层" />
                            <radio textSize="10sp" id="radio4_2" text="骨魔洞二层" />
                            <radio textSize="10sp" id="radio4_3" text="骨魔洞三层" />

                            <radio textSize="10sp" id="radio4_4" text="牛魔寺庙一层" />
                            <radio textSize="10sp" id="radio4_5" text="牛魔寺庙二层" />
                            <radio textSize="10sp" id="radio4_6" text="牛魔寺庙三层" />
                            <radio textSize="10sp" id="radio4_7" text="牛魔寺庙四层" />

                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_5" visibility="gone">
                        <radiogroup id="group1_5" orientation="vertical" >
                            <radio textSize="10sp" id="radio5_1" text="沃玛寺庙一层" />
                            <radio textSize="10sp" id="radio5_2" text="沃玛寺庙二层" />
                        </radiogroup>
                    </horizontal>
                </vertical>
                <vertical id="view2" visibility="gone" gravity="center">
                    <horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中蓝包" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_lanYaoZhongBao" focusable="true" w="20sp" text="0" />
                        </horizontal>

                        <horizontal paddingLeft="6sp">
                            <text text="中蓝个" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_lanYaoZhongGe" inputType="number" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中红包" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_hongYaoZhongBao" inputType="number" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中红个" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_hongYaoZhongGe" inputType="number" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="拾取时长" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_shiQuShiChang" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="隐身怪物" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_YinShen" focusable="true" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="随机血量" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_suijixueliang" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="机器标识" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_jiqibiaoshi" inputType="text" w="80sp" text="0" />
                        </horizontal>
                    </horizontal>

                    <horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="随机包" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_suiJiBao" inputType="number" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="随机个" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_suiJiGe" inputType="number" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="地牢个" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_diLaoGe" inputType="number" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="修复油" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_xiuFuYou" inputType="number" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="护身符大" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_hushenhu" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="打怪等待" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_daguaidengdai" inputType="number" w="30sp" text="0" />
                        </horizontal>

                        <horizontal paddingLeft="6sp">
                            <text text="拾取延时" textSize="10sp" textColor="#000000" />
                            <input id="t_shiquyanshi" textSize="10sp" inputType="number" w="30sp" text="200" />
                        </horizontal>

                        <horizontal paddingLeft="6sp">
                            <text text="检查武器" textSize="10sp" textColor="#000000" />
                            <input id="t_shoujihaoma" textSize="10sp" inputType="number" w="80sp" text="0" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsHuiChengYiFu" text="衣服回程" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbIsHuiChengWuQi" text="武器回程" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsDiLao" text="地牢回城" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsWuLanHuiCheng" text="无蓝回城" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsWuFeiHuiCheng" text="无飞回城" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsFenShen" text="点击分身" textSize="10sp" />
                        </horizontal>

                        <horizontal gravity="right">
                            <checkbox id="cbDiTuTuoDong" text="地图拖动" textSize="10sp" />
                        </horizontal>

                    </horizontal>
                    <horizontal>
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
                            <checkbox id="cbManXue" text="打满血怪" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbShiJiWeiManXiaXian" text="误报下线" textSize="10sp" />
                        </horizontal>


                        <horizontal gravity="right">
                            <checkbox id="cbRenzhengDuanXin" text="认证提醒" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbRenzhengShiBie" text="认证识别" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbRenzhengYunMa" text="云码认证" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbTiHuanNanZhongKui" text="替换男盔" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanNvZhongKui" text="替换女盔" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbTiHuanNanLingHun" text="替换男灵" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanNvLingHun" text="替换女灵" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanXiangMo" text="替换降魔" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsFuGongJi" text="首攻用符" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsGenSuiBaoBao" text="跟随宝宝" textSize="10sp" />
                        </horizontal>
                        <horizontal>
                            <text text="跟随几格" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_gensuijuli" focusable="true" w="20sp" text="0" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbBeiYongNanZhongKui" text="备用男盔" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbBeiYongNvZhongKui" text="备用女盔" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbBeiYongZhanMa" text="备用斩马" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbYinShenZouDong" text="隐身不动" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbJianChaBaoBao" text="检查宝宝" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbJianChaWuQi" text="检查武器衣服" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbSuiJiPaoTu" text="随机跑图" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                </vertical>
                <vertical id="view3" visibility="gone" gravity="center">
                    <text textSize="12sp" text="内部学习学习交流软件，禁止拿来打金获利" textColor="#000000" />
                    <text textSize="12sp" paddingTop="5" text="技术支持：宁波字节飞舞软件科技" textColor="#000000" />
                    <text textSize="12sp" paddingTop="5" text="联系人：15070347799" textColor="#000000" />
                </vertical>
            </vertical>
            <horizontal paddingLeft="3">
                <button id="btnStart" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="启动" />
                <button id="btnSave" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="保存" />
                <button id="btnReset" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="重启" />
                <button id="btnBuJi" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="补给" />
            </horizontal>
            <horizontal paddingLeft="3">
                <button id="btnSetFouse" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="焦点" />
                <button id="btnClose" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="关闭" />
                <button id="btnExit" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="退出" />
                <button id="btnRenZheng" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="测试" />
            </horizontal>
        </vertical>

    </frame>
);


var tools = {
    常用方法: {
        是否为正整数: (str) => {
            if (str) {
                return /^\d+$/.test(str);
            }
            return false;
        },
        申请截图: () => {
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
        错误日志: (text, type) => {
            var url = "http://183.249.84.44/api/api/errzuobiao";
            var res = http.post(url, {
                "result": text + "(" + 挂机参数.机器标识 + ")",
                "type": type
            });
            return res.body.string();
        },
        发送邮件: (subject, body) => {
            app.sendEmail({
                email: ["175417739@qq.com"],
                subject: subject + "(" + 挂机参数.机器标识 + ")",
                text: body
            });
        },
        启动初始化: () => {
            var r = tools.常用操作.获取人物金币();//这里不用多线程好像会被卡死
            if (r != null) {
                启动金币 = r;
            }
        },
        初始化参数: () => {
            if (commonStorage.contains("peizhi")) {
                var str = commonStorage.get("peizhi");
                挂机参数 = JSON.parse(str);
            }
            if (挂机参数.拾取时长 == null || 挂机参数.拾取时长 <= 0) {
                挂机参数.拾取时长 = 15;
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
            if (挂机参数.隐身数量) {
                win.t_YinShen.setText(挂机参数.隐身数量.toString());
            } else {
                win.t_YinShen.setText("0");
            }
            if (挂机参数.机器标识) {
                win.t_jiqibiaoshi.setText(挂机参数.机器标识.toString());
            } else {
                win.t_jiqibiaoshi.setText("");
            }
            if (挂机参数.跟随几格) {
                win.t_gensuijuli.setText(挂机参数.跟随几格.toString());
            } else {
                win.t_gensuijuli.setText("2");
            }




            if (挂机参数.检查衣服武器时间戳 && 挂机参数.检查衣服武器时间戳 > 0) {
                win.t_shoujihaoma.setText(挂机参数.检查衣服武器时间戳.toString());
            } else {
                win.t_shoujihaoma.setText("600");
            }
            if (挂机参数.打怪等待 && 挂机参数.打怪等待 > 0) {
                win.t_daguaidengdai.setText(挂机参数.打怪等待.toString());
            } else {
                win.t_daguaidengdai.setText("120");
            }
            if (挂机参数.随机血量 && 挂机参数.随机血量 > 0) {
                win.t_suijixueliang.setText(挂机参数.随机血量.toString());
            } else {
                win.t_suijixueliang.setText("0");
            }
            if (挂机参数.拾取延时 && 挂机参数.拾取延时 > 0) {
                win.t_shiquyanshi.setText(挂机参数.拾取延时.toString());
            } else {
                win.t_shiquyanshi.setText("200");
            }
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
            // if (挂机参数.一波怪物死亡拾取 == 1 || 挂机参数.一波怪物死亡拾取 == "1") {
            //     win.cbIsYiBoSiWangSiQu.setChecked(true);
            // }
            if (挂机参数.首次用符攻击 == 1 || 挂机参数.首次用符攻击 == "1") {
                win.cbIsFuGongJi.setChecked(true);
            }
            if (挂机参数.只打满血怪 == 1 || 挂机参数.只打满血怪 == "1") {
                win.cbManXue.setChecked(true);
            }
            if (挂机参数.替换男重盔 == 1 || 挂机参数.替换男重盔 == "1") {
                win.cbTiHuanNanZhongKui.setChecked(true);
            }
            if (挂机参数.替换女重盔 == 1 || 挂机参数.替换女重盔 == "1") {
                win.cbTiHuanNvZhongKui.setChecked(true);
            }
            if (挂机参数.替换男灵魂 == 1 || 挂机参数.替换男灵魂 == "1") {
                win.cbTiHuanNanLingHun.setChecked(true);
            }
            if (挂机参数.替换女灵魂 == 1 || 挂机参数.替换女灵魂 == "1") {
                win.cbTiHuanNvLingHun.setChecked(true);
            }
            if (挂机参数.替换降魔 == 1 || 挂机参数.替换降魔 == "1") {
                win.cbTiHuanXiangMo.setChecked(true);
            }
            if (挂机参数.无蓝回城 == 1 || 挂机参数.无蓝回城 == "1") {
                win.cbIsWuLanHuiCheng.setChecked(true);
            }
            if (挂机参数.无飞回城 == 1 || 挂机参数.无飞回城 == "1") {
                win.cbIsWuFeiHuiCheng.setChecked(true);
            }
            if (挂机参数.备用男重盔 == 1 || 挂机参数.备用男重盔 == "1") {
                win.cbBeiYongNanZhongKui.setChecked(true);
            }
            if (挂机参数.备用女重盔 == 1 || 挂机参数.备用女重盔 == "1") {
                win.cbBeiYongNvZhongKui.setChecked(true);
            }
            if (挂机参数.备用斩马 == 1 || 挂机参数.备用斩马 == "1") {
                win.cbBeiYongZhanMa.setChecked(true);
            }


            if (挂机参数.隐身走动 == 1 || 挂机参数.隐身走动 == "1") {
                win.cbYinShenZouDong.setChecked(true);
            }
            if (挂机参数.攻击检查宝宝 == 1 || 挂机参数.攻击检查宝宝 == "1") {
                win.cbJianChaBaoBao.setChecked(true);
            }
            if (挂机参数.攻击检查武器衣服 == 1 || 挂机参数.攻击检查武器衣服 == "1") {
                win.cbJianChaWuQi.setChecked(true);
            }
            if (挂机参数.随机跑图 == 1) {
                win.cbSuiJiPaoTu.setChecked(true);
            }
            if (挂机参数.认证短信 == 1) {
                win.cbRenzhengDuanXin.setChecked(true);
            }
            if (挂机参数.认证自动识别 == 1) {
                win.cbRenzhengShiBie.setChecked(true);
            }
            if (挂机参数.云码认证 == 1) {
                win.cbRenzhengYunMa.setChecked(true);
            }
            if (挂机参数.地图拖动 == 1) {
                win.cbDiTuTuoDong.setChecked(true);
            }
            if (挂机参数.跟随宝宝 == 1) {
                win.cbIsGenSuiBaoBao.setChecked(true);
            }


        },
        保存图片: (pic) => {
            var timestamp = new Date().getTime();
            var path = "/sdcard/Download/crop_" + timestamp + ".png";
            images.save(pic, path);// 保存图片
        },
        发送提醒: (str) => {
            var orderNo = 挂机参数.机器标识
            if (orderNo == null || orderNo == "") {
                orderNo = "null"
            }
            var r = http.get("http://183.249.84.44/api/api/sendRenZhengSMS?orderNo=" + str + "(" + orderNo + ")");
        },
    },
    常用操作: {
        截图当前坐标: () => {
            var p = config.zuobiao.人物坐标范围精确[fbl];
            return tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
        },
        截图被攻击怪物血量: () => {
            var p = config.zuobiao.被攻击怪物血量[fbl];
            return tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
        },
        打开角色: () => {
            var r = tools.findImageForWaitClick("jiaoseBtn.png", {
                maxTries: 10,
                interval: 200
            });
            if (!r.status) {
                toastLog("打开角色失败")
            }
            return r;
        },
        打开背包: () => {
            var r = tools.findImageForWaitClick("beibaoBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (!r.status) {
                toastLog("打开背包失败");
            }
            return r;
        },
        小退: () => {
            var r = tools.findImageForWaitClick("yijianxiaoTuiBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (r.status) {
                当前总状态 = 总状态.小退中;
                tools.悬浮球描述("小退等待重新登录");
            }
        },
        小退后开始登录: () => {
            var isok = false;
            let start = new Date().getTime();
            while (true) {
                var 秒 = (new Date().getTime() - start) / 1000;
                var r = tools.findImageForWaitClick("kaishiyouxi.png", {
                    maxTries: 5,
                    interval: 1000
                });
                if (r.status) {
                    tools.悬浮球描述("等待开门(" + parseInt(秒) + ")");
                    r = tools.findImageForWait("yijianxiaoTuiBtn.png", {
                        maxTries: 10,
                        interval: 1200
                    });
                    if (r.status) {
                        isok = true;
                        break;
                    }
                }
                else {
                    tools.悬浮球描述("未找到kaishiyouxi(" + parseInt(秒) + ")");
                }
            }
            return isok;
        },
        获取角色面板: () => {
            var r = tools.findImageForWaitClick("rewumianbanBtn.png", {
                maxTries: 10,
                interval: 200
            });
            return r;
        },
        点击角色装备: (装备, 是否卸下) => {
            var result = tools.findImageForWait("rewumianbanBtn.png", {
                maxTries: 10,
                interval: 200
            })
            if (!result.status) {
                toastLog("未获取人物面板失败")
                return {
                    status: false,
                    err: "未获取人物面板失败"
                }
            }
            var 装备面板 = result.img;
            var x = 装备面板.x + 装备.x + random(-5, 5);
            var y = 装备面板.y + 装备.y + random(-3, 3);
            click(x, y)
            var r = tools.findImageForWait("xiexia.png", {
                maxTries: 10,
                interval: 200
            })
            if (r.status) {
                if (是否卸下) {
                    var x = r.img.x + r.size.w / 2 + random(-3, 3);
                    var y = r.img.y + r.size.h / 2 + random(-3, 3);
                    click(x, y)
                }
                return {
                    status: true,
                    btn: r,
                    btnName: "xiexia.png"
                }
            }
            else {
                r = tools.findImageForWaitClick("xiexia1.png", {
                    maxTries: 10,
                    interval: 200
                })
                if (r.status) {
                    if (是否卸下) {
                        var x = r.img.x + r.size.w / 2 + random(-3, 3);
                        var y = r.img.y + r.size.h / 2 + random(-3, 3);
                        click(x, y)
                    }
                    tools.常用方法.错误日志("使用xiexia1.png找图成功", 3);
                    return {
                        status: true,
                        btn: r,
                        btnName: "xiexia1.png"
                    }
                }
                else {
                    toastLog("xiexia.png和xiexia1.png找图都失败")
                    tools.常用方法.错误日志("xiexia.png和xiexia1.png找图都失败", 3);
                    return {
                        status: false,
                        err: "找图都失败"
                    }
                }
            }
        },
        获取装备持久: (装备) => {
            var r = tools.常用操作.点击角色装备(装备, false);
            if (r.status) {
                r = tools.补给操作.获取物品信息(r.btnName);
                if (r.status && r.持久) {
                    tools.悬浮球描述(JSON.stringify(r.持久));
                }
                return r;
            }
            return {
                status: false
            }
        },
        检查武器衣服持久: () => {
            tools.挂机打怪.启动隐身();
            var 角色 = tools.常用操作.打开角色();
            if (!角色.status) {
                return false;
            }
            var 衣服 = tools.常用操作.获取装备持久(config.zuobiao.人物面板[fbl].衣服);
            var 武器 = tools.常用操作.获取装备持久(config.zuobiao.人物面板[fbl].武器);
            tools.findImageClick("rewumianbanBtn.png")
            tools.常用操作.关闭所有窗口();

            if (挂机参数.衣服持久0回程 == 1 && 衣服.status && 衣服.持久 && 衣服.持久.剩持久 <= 2) {
                if (!是否用过备用衣服) {
                    var isSuccess = false;
                    if (挂机参数.备用男重盔 == 1) {
                        isSuccess = tools.常用操作.使用备用装备("zhongkui_nan.png");
                    }
                    else if (挂机参数.备用女重盔 == 1) {
                        isSuccess = tools.常用操作.使用备用装备("zhongkui_nv.png");
                    }

                    if (isSuccess) {
                        toastLog("使用备用衣服成功")
                        是否用过备用衣服 = true;
                    }
                    else {
                        toastLog("使用备用衣服失败")
                        return true;
                    }
                }
                else {
                    toastLog("是否用过备用衣服 = true")
                    return true;
                }
            }

            if (挂机参数.武器持久0回程 == 1 && 武器.status && 武器.持久 && 武器.持久.剩持久 <= 2) {
                var isSuccess = false;
                if (!是否用过备用武器) {
                    isSuccess = tools.常用操作.使用备用装备("wuqi_zhanma.png");
                    if (isSuccess) {
                        toastLog("使用备用武器成功")
                        是否用过备用武器 = true;
                    }
                    else {
                        toastLog("使用备用武器失败")
                    }
                }
                else {
                    toastLog("是否用过备用武器 = true")
                }
                if (!isSuccess) {
                    var isOk = tools.补给操作.喝修复油();
                    if (isOk) {
                        toastLog("喝修复油成功")
                    }
                    else {
                        toastLog("喝修复油失败")
                        return true;
                    }
                }
            }

            return false;
        },
        开启组队: () => {
            var p = config.zuobiao.按钮集合[fbl].组队;
            click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
            tools.findImageForWaitClick("zuduicloseBtn.png", {
                maxTries: 6,
                interval: 200
            }, 0.9);
            tools.常用操作.关闭所有窗口();
        },
        设置内挂: () => {
            var 高亮显血自己 = config.zuobiao.设置面板[fbl].高亮显血自己;
            var 高亮显血组队 = config.zuobiao.设置面板[fbl].高亮显血组队;
            var 血量加药 = config.zuobiao.设置面板[fbl].血量加药;
            var 随机保护 = config.zuobiao.设置面板[fbl].随机保护;
            //sleep(555)
            var r = tools.findImageForWaitClick("setting.png", {
                maxTries: 10,
                interval: 200
            })
            if (!r.status) {
                return;
            }
            // r = tools.findImageForWaitClick("setting_jiben.png", {
            //     maxTries: 10,
            //     interval: 200
            // })
            // r = tools.findImageAreaForWait("setting_select.png", 高亮显血自己.x[0], 高亮显血自己.y[0], 高亮显血自己.x[1], 高亮显血自己.y[1], {
            //     maxTries: 5,
            //     interval: 200
            // })
            // if (!r.status) {
            //     var x = 高亮显血自己.x[0] + ((高亮显血自己.x[1] - 高亮显血自己.x[0]) / 2) + random(-3, 3);
            //     var y = 高亮显血自己.y[0] + ((高亮显血自己.y[1] - 高亮显血自己.y[0]) / 2) + random(-3, 3);
            //     click(x, y)
            //     sleep(random(333, 666))
            // }

            // r = tools.findImageAreaForWait("setting_select.png", 高亮显血组队.x[0], 高亮显血组队.y[0], 高亮显血组队.x[1], 高亮显血组队.y[1], {
            //     maxTries: 5,
            //     interval: 200
            // })
            // if (!r.status) {
            //     var x = 高亮显血组队.x[0] + ((高亮显血组队.x[1] - 高亮显血组队.x[0]) / 2) + random(-3, 3);
            //     var y = 高亮显血组队.y[0] + ((高亮显血组队.y[1] - 高亮显血组队.y[0]) / 2) + random(-3, 3);
            //     click(x, y)
            //     sleep(random(666, 999))
            // }
            // r = tools.findImageForWaitClick("setting_baohu.png", {
            //     maxTries: 10,
            //     interval: 200
            // })
            // r = tools.findImageAreaForWait("setting_select.png", 血量加药.x[0], 血量加药.y[0], 血量加药.x[1], 血量加药.y[1], {
            //     maxTries: 5,
            //     interval: 200
            // })
            // if (!r.status) {
            //     var x = 血量加药.x[0] + ((血量加药.x[1] - 血量加药.x[0]) / 2) + random(-3, 3);
            //     var y = 血量加药.y[0] + ((血量加药.y[1] - 血量加药.y[0]) / 2) + random(-3, 3);
            //     click(x, y)
            //     sleep(random(666, 999))
            // }
            click(random(420, 430), random(142, 150));
            var r = tools.findImageAreaForWait("setting_select.png", 随机保护.x[0], 随机保护.y[0], 随机保护.x[1], 随机保护.y[1], {
                maxTries: 5,
                interval: 200
            })
            if (!r.status) {
                var x = 随机保护.x[0] + ((随机保护.x[1] - 随机保护.x[0]) / 2) + random(-3, 3);
                var y = 随机保护.y[0] + ((随机保护.y[1] - 随机保护.y[0]) / 2) + random(-3, 3);
                sleep(random(1200, 1500))
                click(x, y)
                sleep(random(999, 1200))
            }
            tools.常用操作.关闭所有窗口();
        },
        初始化攻击面板loops: () => {
            tools.悬浮球描述("设置攻击面板开始");
            var r = null;
            var tryCount = 0;
            while (true) {
                if (tryCount >= 10) {
                    break;
                }
                r = tools.常用操作.初始化攻击面板();
                if (r) {
                    break;
                } else {
                    sleep(random(666, 888))
                }
                tryCount++;
            }
            tools.悬浮球描述("设置攻击面板结束");
        },
        初始化攻击面板: () => {
            var r = tools.findImage("zuoguaiwuBtnTip0.png", 0.8)
            var p = config.zuobiao.左攻击面板[fbl];
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }

            r = tools.findImage("zuoguaiwuBtnTip1.png", 0.8)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                return true;
            }

            r = tools.findImage("zuozuduiBtnTip0.png", 0.8)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                click(random(p.切换.x[0], p.切换.x[1]), random(p.切换.y[0], p.切换.y[1]));
                sleep(random(1500, 2000))
                click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }

            r = tools.findImage("zuozuduiBtnTip1.png", 0.8)
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
        初始化操作模式: (type) => {
            var p = null;
            if (type == 1) {
                p = config.zuobiao.按钮集合[fbl].模式;
            }
            else {
                p = config.zuobiao.按钮集合[fbl].模式2;
            }
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
        初始化大地图面板: () => {
            tools.悬浮球描述("初始化大地图面板开始");
            //dituyoujiantou
            tools.常用操作.打开大地图();
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 500
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                var p = {
                    x1: closeImg.x - 42,
                    x2: closeImg.x - 7,
                    y1: closeImg.y + 43,
                    y2: closeImg.y + 481
                }
                r = tools.findImageAreaForWaitClick("dituyoujiantou.png", p.x1, p.y1, p.x2, p.y2, {
                    maxTries: 5,
                    interval: 200
                })
                if (r.status) {
                    sleep(555);
                    r = tools.findImageAreaForWaitClick("dituyoujiantou.png", p.x1, p.y1, p.x2, p.y2, {
                        maxTries: 5,
                        interval: 200
                    })
                }
            }
            tools.常用操作.关闭所有窗口();
            tools.悬浮球描述("初始化大地图面板结束");
        },
        打开大地图: () => {
            var p = config.zuobiao.小地图范围[fbl];
            var x = random(p.x1, p.x2);
            var y = random(p.y1, p.y2);
            click(x, y);
        },
        获取人物坐标: () => { //注意这个截图不能太小了，否则会造成识别失败
            // var p = config.zuobiao.人物坐标范围[fbl];
            // var img = captureScreen();
            // var r = images.findMultiColors(img, "#FFFFFF", [[0, 8, "#FFFFFF"], [0, 14, "#726F6A"]], {
            //     region: [p.x1, p.y1, p.x2 - p.x1, p.y2 - p.y1],
            //     threshold: 15
            // });
            // utils.recycleNull(img);
            // var 坐标 = {
            //     x: 0,
            //     y: 0
            // }
            // if (r && (r.x > 0 || r.y > 0)) {
            //     坐标.x = tools.获取区域文字(p.x1, p.y1, r.x - 2, r.y + 5, 60, 255, true, false);
            //     // click(r.x + random(12, 20), r.y + random(-3, 3))
            //     // isFind = true;
            // }
            // return 坐标;
            var p = config.zuobiao.人物坐标范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
            if (result != null && result.length > 0) {
                var r = result[0].text;
                r = tools.常用操作.处理坐标错别字(r);
                let parts = null;
                try {
                    parts = r.split(":");
                } catch (error) {
                    parts = null;
                }
                if (parts.length == 2 && parts[0] > 0 && parts[1] > 0) {
                    return {
                        x: parseInt(parts[0]),
                        y: parseInt(parts[1])
                    }
                } else {
                    tools.常用方法.错误日志(JSON.stringify(result), 1);
                    return null;
                }
            } else {
                return null;
            }
        },
        获取人物地图: () => {
            var p = config.zuobiao.地点范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
            if (result != null && result.length > 0) {
                result = tools.常用操作.处理地图错别字(result[0].text);
                if (上次所在地图 != result) {
                    上次所在地图 = result;
                    tools.执行时间戳.检测内挂(true);
                    tools.常用操作.初始化大地图面板(true);
                    tools.常用操作.初始化攻击面板loops();
                    tools.执行时间戳.检测无地牢补给(true);

                }
            }
            return result;
        },
        获取人物金币: () => {
            var p = config.zuobiao.金币范围[fbl];
            var result = tools.获取区域文字(p.x1, p.y1 - 10, p.x2, p.y2, 60, 255, true, false);
            if (result != null && result.length == 1) {
                return result[0].text;
            } else {
                return null;
            }
        },
        检查背包是否有东西: (index1, index2) => {
            var r = tools.补给操作.整理背包(true);
            if (r.status) {
                sleep(666);
                tools.补给操作.点击背包格子(index1, index2, r);
                r = tools.补给操作.获取操作按钮("穿戴", "检查背包 是否有东西", false, false);
                if (!r.status) {
                    r = tools.补给操作.获取操作按钮("使用", "检查背包 是否有东西", false, false);
                }
                if (r.status) {
                    if (r.btnName.indexOf("1") >= 0) {
                        tools.常用操作.点击人物();
                    }
                    return true;
                }
                else {
                    r = tools.常用操作.检测是否在游戏画面();
                    if (r) {
                        return false;
                    }
                    else {
                        tools.常用操作.退出游戏("检查背包 是否有东西未发现任何按钮且检测不到游戏画面");
                    }
                }
                tools.常用操作.关闭所有窗口();
            }
            return false;
        },
        读取聊天框信息: () => {
            var p = config.zuobiao.聊天框面板[fbl];
            var imgSmall = tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
            var huiduImg = images.grayscale(imgSmall);//灰度化
            let r = utils.ocrGetContentStr(huiduImg);
            utils.recycleNull(imgSmall);
            utils.recycleNull(huiduImg);
            return r;
            //return tools.获取区域文字(p.x1, p.y1, p.x2, p.y2, 60, 255, true, false);
        },
        读取聊天框最后一行信息: () => {
            var p = config.zuobiao.聊天框最后一行[fbl];
            var imgSmall = tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
            var huiduImg = images.grayscale(imgSmall);//灰度化
            let r = utils.ocrGetContentStr(huiduImg);
            utils.recycleNull(imgSmall);
            utils.recycleNull(huiduImg);
            return r;
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
        获取护身符持久: (result) => {
            if (result == null) return null;
            for (var i = 0; i < result.length; i++) {
                if (result[i].text.indexOf("/") >= 0) {
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
        使用备用装备: (pic) => {
            var isok = false;
            tools.常用操作.打开背包();
            var r = tools.findImageForWaitClick(pic, {
                maxTries: 5,
                interval: 200
            })
            if (r.status) {
                r = tools.findImageForWaitClick("beibaochuandaiBtn.png", {
                    maxTries: 5,
                    interval: 200
                })
                if (r.status) {
                    isok = true;
                }
            }
            tools.常用操作.关闭所有窗口();
            return isok;
        },
        点击人物: () => {
            var 人物中心 = config.zuobiao.人物中心[fbl];
            click(人物中心.x + random(5, -5), 人物中心.y + random(5, -5))
        },
        检测是否小退: (设置小退模式) => {
            var r = tools.findImage("xiaotuimianban.png"); //小退面板
            if (r.status) {
                if (设置小退模式) {
                    当前总状态 = 总状态.小退中;
                }
                return true;
            }
            else {
                return false;
            }
        },
        检测是否在游戏画面: () => {
            var r = tools.findImageForWait("yijianxiaoTuiBtn.png", {
                maxTries: 5,
                interval: 200
            });
            return r.status;
        },
        处理坐标错别字: (text) => {
            if (!text) return text;
            text = text.replace(/-/g, "").replace(/\\/g, "").replace(/\./g, "").replace(/,/g, "").replace(/l/g, "1").replace(/i/g, "1").replace(/]/g, "1").replace(/G/g, "6").replace(/B/g, "3").replace(/S/g, "6").replace(/s/g, "6").replace(/T/g, "1").replace(/t/g, "1").replace(/o/g, "0").replace(/O/g, "0").replace(/Ö/g, "0");
            //toastLog(text)
            if (text) {
                var r = tools.常用方法.是否为正整数(text);
                if (r) {
                    if (text.length == 6) {
                        text = text.substring(0, 3) + ":" + text.substring(3, 6)
                    }
                    else if (text.length == 7) {
                        text = text.substring(0, 3) + ":" + text.substring(4, 7)
                    }
                }
            }
            return text;
        },
        处理地图错别字: (text) => {
            if (!text) return text;
            if ((text.indexOf("人") >= 0 || text.indexOf("兽") >= 0) && (text.indexOf("古") >= 0 || text.indexOf("吉") >= 0 || text.indexOf("墓") >= 0)) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "兽人古墓一层"
                }
                else if (text.indexOf("二") >= 0) {
                    text = "兽人古墓二层"
                }
                else if (text.indexOf("三") >= 0) {
                    text = "兽人古墓三层"
                }
            }
            else if (text.indexOf("苍月岛") >= 0) {
                if (text.indexOf("渔") >= 0 || text.indexOf("村") >= 0) {
                    text = "苍月岛渔村"
                }
                else {
                    text = "苍月岛"
                }
            }
            else if (text.indexOf("比奇城") >= 0) {
                text = "比奇城"
            }
            else if (text.indexOf("比奇省") >= 0) {
                text = "比奇省"
            }
            else if (text.indexOf("边界村") >= 0) {
                text = "边界村"
            }
            else if (text.indexOf("银杏") >= 0 && text.indexOf("山") >= 0) {
                text = "银杏山谷"
            }
            else if ((text.indexOf("沃") >= 0 || text.indexOf("玛") >= 0) && (text.indexOf("森") >= 0 || text.indexOf("林") >= 0)) {
                text = "沃玛森林"
            }
            else if (text.indexOf("土城") >= 0) {
                text = "土城"
            }
            else if (text.indexOf("盟重省") >= 0) {
                text = "盟重省"
            }
            else if (text.indexOf("红名村") >= 0) {
                text = "红名村"
            }
            else if (text.indexOf("沙巴克") >= 0) {
                text = "沙巴克"
            }
            else if (text.indexOf("祖玛寺庙") >= 0) {
                text = "祖玛寺庙"
            }
            else if ((text.indexOf("铁") >= 0 || text.indexOf("灯") >= 0 || text.indexOf("笼") >= 0) && (text.indexOf("屋") >= 0)) {
                text = "铁灯笼屋"
            }
            else if ((text.indexOf("阴") >= 0 || text.indexOf("森") >= 0) && (text.indexOf("屋") >= 0)) {
                text = "阴森石屋"
            }
            else if ((text.indexOf("阴") >= 0 || text.indexOf("森") >= 0) && (text.indexOf("路") >= 0)) {
                text = "阴森石路"
            }
            else if ((text.indexOf("紫") >= 0 || text.indexOf("水") >= 0) && (text.indexOf("晶") >= 0 || text.indexOf("屋") >= 0)) {
                text = "紫水晶屋"
            }
            else if (text.indexOf("石") >= 0 || text.indexOf("墓") >= 0) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "石墓一层"
                }
                else if (text.indexOf("二") >= 0) {
                    text = "石墓二层"
                }
                else if (text.indexOf("三") >= 0) {
                    text = "石墓三层"
                }
                else if (text.indexOf("四") >= 0) {
                    text = "石墓四层"
                }
                else if (text.indexOf("五") >= 0) {
                    text = "石墓五层"
                }
                else if (text.indexOf("入") >= 0 || text.indexOf("口") >= 0) {
                    text = "石墓入口"
                }
            }
            else if (text.indexOf("地牢") >= 0 && (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) && text.indexOf("东") >= 0) {
                text = "地牢一层东"
            }
            else if (text.indexOf("地牢") >= 0 && (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) && text.indexOf("北") >= 0) {
                text = "地牢一层北1"
            }
            else if ((text.indexOf("连") >= 0 || text.indexOf("接") >= 0) && (text.indexOf("通") >= 0 || text.indexOf("道") >= 0)) {
                if (text.indexOf("九") >= 0) {
                    text = "连接通道九"
                }
                else if (text.indexOf("八") >= 0) {
                    text = "连接通道八"
                }
                else if (text.indexOf("七") >= 0) {
                    text = "连接通道七"
                }
                else if (text.indexOf("六") >= 0) {
                    text = "连接通道六"
                }
            }
            else if ((text.indexOf("沃") >= 0 || text.indexOf("玛") >= 0) && (text.indexOf("寺") >= 0 || text.indexOf("庙") >= 0)) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "沃玛寺庙一层"
                }
                else if (text.indexOf("二") >= 0) {
                    text = "沃玛寺庙二层"
                }
                else if (text.indexOf("三") >= 0) {
                    text = "沃玛寺庙三层"
                }
                else if (text.indexOf("口") >= 0 || text.indexOf("入") >= 0) {
                    text = "沃玛寺庙入口"
                }
            }
            else if ((text.indexOf("骨") >= 0) && (text.indexOf("洞") >= 0 || text.indexOf("层") >= 0)) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "骨魔洞一层"
                }
                else if (text.indexOf("二") >= 0) {
                    text = "骨魔洞二层"
                }
                else if (text.indexOf("三") >= 0) {
                    text = "骨魔洞三层"
                }
            }
            else if ((text.indexOf("牛") >= 0 || text.indexOf("魔") >= 0) && (text.indexOf("寺") >= 0 || text.indexOf("庙") >= 0)) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "牛魔寺庙一层"
                }
                else if (text.indexOf("二") >= 0) {
                    text = "牛魔寺庙二层"
                }
                else if (text.indexOf("三") >= 0) {
                    text = "牛魔寺庙三层"
                }
                else if (text.indexOf("四") >= 0) {
                    text = "牛魔寺庙四层"
                }
                else if (text.indexOf("五") >= 0) {
                    text = "牛魔寺庙五层"
                }
                else if (text.indexOf("口") >= 0 || text.indexOf("入") >= 0) {
                    text = "牛魔寺庙入口"
                }
            }
            return text;
        },
        重启游戏: () => {
            tools.常用操作.退出游戏();
            sleep(2000);
            launch(盛趣包名);
            tools.悬浮球描述("等待游戏启动中....");
            sleep(2000);

            var timeout = 1000 * 60 * 30;
            var start = new Date().getTime();
            var 是否找隐私 = true;

            while (true) {
                if (new Date().getTime() - start > timeout) {
                    tools.常用方法.错误日志("重启游戏失败,loginquedingBtn.png找不到", 3);
                    return false;
                }
                if (是否找隐私) {
                    r = tools.findImageClick("loginyinshiBtn.png");
                    if (r) {
                        是否找隐私 = false;
                        sleep(random(1000, 1200));
                        continue;
                    }
                }
                r = tools.findImageClick("loginquedingBtn.png");
                if (r) {
                    break;
                }
                sleep(1000);
            }

            r = tools.findImageForWaitClick("kaishiyouxiBtn.png", { //开始
                maxTries: 60 * 10,
                timeout: 1000 * 60 * 10,
                interval: 1000
            });
            if (!r.status) {
                tools.常用方法.错误日志("重启游戏失败,kaishiyouxiBtn.png找不到", 3);
                return false;
            }

            r = tools.findImageForWaitClick("kaishiyouxi.png", { //开始
                maxTries: 60 * 10,
                timeout: 1000 * 60 * 10,
                interval: 1000
            });
            if (!r.status) {
                tools.常用方法.错误日志("重启游戏失败,kaishiyouxi.png找不到", 3);
                return false;
            }

            timeout = 1000 * 60 * 30;
            start = new Date().getTime();
            tryCount = 0;

            while (true) {
                tryCount++;
                if (new Date().getTime() - start > timeout) {
                    tools.常用方法.错误日志("重启游戏失败,yijianxiaoTuiBtn.png找不到", 3);
                    return false;
                }

                r = tools.findImage("yijianxiaoTuiBtn.png");
                if (r.status) {
                    break;
                }

                r = tools.findImage("paiduitishi.png");
                if (r.status) {
                    tools.悬浮球描述("排队中(" + parseInt(tryCount * 2 / 60) + ")");
                    start = new Date().getTime(); //说明在排队，重新计算时间
                }
                sleep(1000);
            }


            return true;
        },
        退出游戏: (原因) => {
            tools.常用方法.发送提醒(原因)
            home();
            sleep(5000);
            app.openAppSetting(盛趣包名);
            sleep(5000);

            // 模拟点击“强行停止”按钮（不同手机可能文字不一样）
            var w = null;
            while (true) {
                w = textMatches(/(强行停止|结束运行)/).findOne();
                if (w != null) {
                    w.click();
                    break;
                }
                sleep(1000);
            }
            sleep(5000);

            w = null;
            while (true) {
                w = textMatches(/(确定|强行停止)/).findOne()
                if (w != null) {
                    w.click();
                    break;
                }
                sleep(1000);
            }
            sleep(5000);
            home();
            sleep(5000);
        },
        关闭所有窗口: (isClick, time) => {
            if (time == null) {
                time = 500;
            }
            if (isClick) {
                tools.常用操作.点击人物();
            }
            var result = true;
            var tyrCount = 0;
            while (result) {
                sleep(time)
                if (tyrCount >= 10) {
                    break;
                }
                result = tools.findImageClick("closeBtn2.png", 0.9);
                tyrCount++;
            }
        },
    },
    执行时间戳: {
        检测认证: () => {
            if ((挂机参数.认证自动识别 == 1 || 挂机参数.认证短信 == 1) && new Date().getTime() - 认证自检时间 > 认证自检时间戳) {
                tools.悬浮球描述("认证自检开始");
                var r = tools.验证码认证.检测是否有认证();
                if (r.status) {
                    if (挂机参数.认证自动识别 == 1) {
                        tools.验证码认证.处理认证(r.value);
                    }
                    if (挂机参数.认证短信 == 1) {
                        tools.常用方法.发送提醒("验证码认证");
                        //tools.常用操作.小退();
                    }
                }
                认证自检时间 = new Date().getTime();
                tools.悬浮球描述("认证自检结束");
            }
        },
        检测宝宝: (强制检测) => {
            if (new Date().getTime() - 上次检查宝宝时间 > 检查宝宝时间戳 || 强制检测) {
                if (挂机参数.召唤骷髅 == 1 || 挂机参数.召唤神兽 == 1) {
                    tools.悬浮球描述("检查宝宝开始");
                    var r = tools.挂机打怪.宝宝是否存在(0);
                    if (!r) {
                        if (挂机参数.召唤骷髅 == 1) {
                            tools.挂机打怪.点击召唤骷髅();
                        }
                        if (挂机参数.召唤神兽 == 1) {
                            tools.挂机打怪.点击召唤神兽();
                        }
                    }
                    上次检查宝宝时间 = new Date().getTime();
                    tools.悬浮球描述("检查宝宝结束");
                }
            }
        },
        检测蓝药: () => {
            if (挂机参数.无蓝回城 == 1 && new Date().getTime() - 上次检查蓝药时间 > 检查蓝药时间戳) {
                tools.悬浮球描述("检查蓝药开始");
                var r = tools.补给操作.找蓝个();
                if (!r) {
                    r = tools.常用操作.检测是否在游戏画面();
                    if (r) {
                        tools.挂机打怪.回城补给在挂机("检测蓝药");
                    }
                }
                上次检查蓝药时间 = new Date().getTime();
                tools.悬浮球描述("检查蓝药结束");
            }
        },
        检测武器衣服: () => {
            var 检查衣服武器时间戳 = 60 * 1000 * 10;
            if (挂机参数.检查衣服武器时间戳 > 0) {
                检查衣服武器时间戳 = 挂机参数.检查衣服武器时间戳 * 1000;
            }
            if (new Date().getTime() - 上次检查武器衣服时间 > 检查衣服武器时间戳) {
                tools.常用操作.点击人物();
                tools.悬浮球描述("检查装备持久开始");
                var r = tools.常用操作.检查武器衣服持久();
                if (r) {
                    r = tools.常用操作.检测是否在游戏画面();
                    if (r) {
                        tools.挂机打怪.回城补给在挂机("检测武器衣服");
                    }
                }
                上次检查武器衣服时间 = new Date().getTime();
                tools.悬浮球描述("检查装备持久结束");
            }
        },
        检测操作模式: (强制检测) => {
            if (new Date().getTime() - 上次设置操作模式时间 >= 操作模式时间戳) {
                tools.悬浮球描述("设置操作模式开始");
                tools.常用操作.初始化操作模式(2);
                上次设置操作模式时间 = new Date().getTime();
                tools.悬浮球描述("设置操作模式结束");
            }
        },
        检测内挂: (强制检测) => {
            if (new Date().getTime() - 上次设置内挂时间 > 内挂时间戳 || 强制检测) {
                tools.悬浮球描述("设置内挂参数开始");
                tools.常用操作.设置内挂();
                上次设置内挂时间 = new Date().getTime();
                tools.常用操作.关闭所有窗口();
                tools.悬浮球描述("设置内挂参数结束");
            }
        },
        检测组队模式: (强制检测) => {
            if (new Date().getTime() - 上次设置组队模式时间 >= 组队模式时间戳 || 强制检测) {
                tools.悬浮球描述("设置组队模式开始");
                tools.常用操作.开启组队();
                上次设置组队模式时间 = new Date().getTime();
                tools.悬浮球描述("设置组队模式结束");
            }
        },
        检测画面: () => {
            if (new Date().getTime() - 画面自检时间 > 画面自检时间戳) {
                ocrPladderOCR.release();
                ocrPladderOCR = $ocr.create({
                    models: 'slim', // 指定精度相对低但速度更快的模型，若不指定则为default模型，精度高一点但速度慢一点
                });

                tools.悬浮球描述("画面自检开始");
                r = tools.常用操作.检测是否小退(true);
                if (r) {
                    var time = random(60, 120);
                    for (let index = 0; index < time; index++) {
                        tools.悬浮球描述("等待登录(" + (time - index) + ")");
                        sleep(1000);
                    }
                    tools.常用操作.小退后开始登录();
                    当前总状态 = 总状态.已启动;
                    tools.挂机打怪.去挂机图打怪();
                    tools.悬浮球描述("登录成功");
                }
                tools.常用操作.初始化攻击面板loops();
                画面自检时间 = new Date().getTime();
                tools.悬浮球描述("画面自检结束");
            }
        },
        检测背包是否已满: () => {
            if (new Date().getTime() - 上次检查背包是否已满时间 > 检查背包是否已满时间戳) {
                tools.悬浮球描述("检查背包是否已满开始");
                var r = tools.常用操作.检查背包是否有东西(5, 7);
                if (r) {
                    tools.挂机打怪.回城补给在挂机("拾取发现装备已满");
                }
                检查背包是否已满时间戳 = new Date().getTime();
                tools.悬浮球描述("检查背包是否已满结束");
            }
        },
        // if (new Date().getTime() - 上次检测地牢时间 > 无地牢时间戳 || 强制检测) {
        检测无地牢补给: (强制检测) => {
            //     tools.悬浮球描述("检测无地牢开始");
            //     var r = tools.补给操作.找地牢();
            //     if (!r) {
            //         r = tools.常用操作.检测是否在游戏画面();
            //         if (r) {
            //             tools.挂机打怪.回城补给在挂机("检测无地牢");
            //         }
            //     }
            //     tools.悬浮球描述("检测无地牢结束");
            // }
        }
    },
    挂机打怪: {
        寻找打怪: () => {
            var 按钮集合 = config.zuobiao.按钮集合[fbl];
            var 选择怪物攻击 = config.zuobiao.左攻击面板[fbl].选择怪物攻击;
            var isFind = false;
            var isShiQu = false;
            var r = null;
            var 其他玩家 = {
                status: false,
                r: null
            };
            if (挂机参数.只打满血怪 == 0) {
                其他玩家 = tools.挂机打怪.扫描其他玩家();
            }
            if (挂机参数.只打满血怪 == 1 || 其他玩家.status) {
                r = tools.挂机打怪.找满血怪();
                if (r && (r.x > 0 || r.y > 0)) {
                    click(r.x + random(12, 20), r.y + random(-3, 3))
                    isFind = true;
                }
            }
            else {
                r = tools.挂机打怪.找非满血怪();
                if (r && (r.x > 0 || r.y > 0)) {
                    click(random(选择怪物攻击.x[0], 选择怪物攻击.x[1]), random(选择怪物攻击.y[0], 选择怪物攻击.y[1]))
                    isFind = true;
                }
            }
            if (isFind) {
                tools.悬浮球描述("左面板命中怪物");
                if (挂机参数.首次用符攻击 == 1) {
                    tools.挂机打怪.打符();
                }
                for (let index = 0; index < 3; index++) {
                    sleep(100);
                    click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                }
                r = tools.挂机打怪.找正上锁定怪物(5, 100);
                if (r.status) {
                    utils.recycleNull(被攻击怪物血量截图);
                    被攻击怪物血量截图 = tools.常用操作.截图被攻击怪物血量();
                    上次坐标截图 = tools.常用操作.截图当前坐标();
                    isShiQu = true;
                }
                else {
                    toastLog("锁定失败");
                    isFind = false;
                }
            }
            else {
                tools.悬浮球描述("未扫描到怪物存在");
            }
            if (isShiQu) {
                var timeout = 挂机参数.打怪等待;// 1000 * 60 * 10;
                if (timeout == null || timeout <= 0) {
                    timeout = 300;
                }
                timeout = timeout * 1000;
                var 人物是否移动 = false;
                var 移动时间戳 = 1000 * 1.8;
                var 上一次移动 = new Date().getTime();

                var 攻击时间戳 = 1000 * 5;
                var 上一次攻击 = new Date().getTime() - (60 * 1000);

                var 隐身时间戳 = 1000 * 10;
                var 上一次隐身 = new Date().getTime() - (60 * 1000);

                var 隐身不动时间戳 = 1000 * 30;
                var 上一次隐身不动 = new Date().getTime();

                let start = new Date().getTime();
                var 怪物 = [];
                var 锁定的怪物 = "";
                var isChange = false;
                var 血量预警 = false;
                var 是否隐身等待 = false;
                var 攻击宝宝身边怪物 = false;
                var 宝宝位置 = "";
                while (当前总状态 == 总状态.已启动) {
                    var 时间戳 = new Date().getTime() - start;
                    if (时间戳 > timeout) {
                        var isok = tools.人物移动.使用随机();
                        if (!isok) {
                            tools.挂机打怪.点击挂机坐标(true);
                            sleep(1000 * 30);
                        }
                        toastLog("超过时间强制结束");
                        return false;
                    }
                    r = tools.挂机打怪.找正上锁定怪物(3, 100);
                    if (r.status) {
                        isChange = tools.挂机打怪.怪物血量是否变化();
                        if (锁定的怪物.length <= 0) {
                            锁定的怪物 = tools.挂机打怪.身边锁定怪物();
                        }
                        if ((挂机参数.只打满血怪 == 1 || 其他玩家.status) && !攻击宝宝身边怪物 && isChange && 锁定的怪物.length <= 0) {
                            锁定的怪物 = tools.挂机打怪.身边锁定怪物();
                            if (锁定的怪物.length <= 0) {
                                click(random(726, 736), random(25, 35));
                                toastLog("血量变动,放弃归属");
                                return true;
                            }
                        }
                        怪物 = tools.挂机打怪.获取人物身边怪物数据();

                        if (挂机参数.隐身数量 > 0 && 怪物 && 怪物.length > 0 && (new Date().getTime() - 上一次隐身 >= 隐身时间戳)) {
                            if (怪物.length >= parseInt(挂机参数.隐身数量)) {
                                //if (是否到达隐身血量) {
                                tools.挂机打怪.启动隐身();
                                上一次隐身 = new Date().getTime();
                            }

                        }

                        //var 是否到达隐身血量 = tools.挂机打怪.获取人物血量是否隐身()
                        if (!是否隐身等待 && !其他玩家.status && 挂机参数.隐身走动 == 1 && 锁定的怪物.length > 0) {
                            var r = tools.挂机打怪.扫描宝宝();
                            if (r.status) {
                                //以免宝宝超出屏幕
                                var 人物血量中心 = config.zuobiao.人物血量中心[fbl];
                                var 一格像素 = config.zuobiao.走一格像素[fbl];
                                if (Math.abs(r.r.x - 人物血量中心.x) >= 一格像素.x * 4) {
                                    r.r.x = r.r.x > 人物血量中心.x ? 人物血量中心.x + 一格像素.x * 4 : 人物血量中心.x - 一格像素.x * 4;
                                }

                                if (Math.abs(r.r.y - 人物血量中心.y) >= 一格像素.y * 3) {
                                    r.r.y = r.r.y > 人物血量中心.y ? 人物血量中心.y + 一格像素.x * 3 : 人物血量中心.y - 一格像素.y * 3;//一格像素.y * 3;
                                }
                                tools.人物移动.指定像素移动(r.r.x, r.r.y);
                                //tools.挂机打怪.向宝宝移动();
                                // if (!r.isMove) {
                                //     tools.人物移动.随机走一步(random(500, 600));
                                // }
                                是否隐身等待 = true;
                            }
                        }

                        if (挂机参数.跟随宝宝 == 1 && 挂机参数.跟随几格 > 0 && 锁定的怪物.length > 0) {
                            tools.挂机打怪.向宝宝移动();
                        }

                        if (挂机参数.随机血量 > 0) {
                            var 血量预警 = tools.挂机打怪.获取人物血量是否飞随机();
                            if (血量预警) {
                                tools.人物移动.使用随机();
                            }
                        }

                        if (!是否隐身等待 && new Date().getTime() - 上一次移动 >= 移动时间戳 && 锁定的怪物.length <= 0) {
                            人物是否移动 = tools.人物移动.跑图坐标是否变化();
                            if (人物是否移动) {
                                var 当前坐标截图 = tools.常用操作.截图当前坐标();
                                utils.recycleNull(上次坐标截图);
                                上次坐标截图 = 当前坐标截图;
                            }
                            else {
                                r = tools.挂机打怪.向怪物移动();
                                if (r) {
                                    click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                                }
                                else {
                                    click(random(726, 736), random(25, 35));
                                    toastLog("向怪物移动失败,放弃归属");
                                    return false;
                                }
                                // var r = tools.挂机打怪.大范围扫描锁定怪物();
                                // if (r && r.x > 0 && r.y > 0) {
                                //     tools.人物移动.指定像素移动(r.x, r.y);
                                //     click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                                // }
                                // else {
                                //     tools.人物移动.随机走一步(random(1500, 3500));
                                //     click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                                // }
                            }
                            上一次移动 = new Date().getTime();
                        }

                        if (!是否隐身等待 && new Date().getTime() - 上一次攻击 >= 攻击时间戳) {
                            click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                            上一次攻击 = new Date().getTime();
                        }

                        if (是否隐身等待 && new Date().getTime() - 上一次隐身不动 >= 隐身不动时间戳 && !isChange) {
                            click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                            上一次隐身不动 = new Date().getTime();
                        }

                        if (挂机参数.只打满血怪 == 0 && !其他玩家.status) {
                            其他玩家 = tools.挂机打怪.扫描其他玩家();
                            if (其他玩家.status) {
                                是否隐身等待 = false;
                                for (let index = 0; index < 3; index++) {
                                    sleep(100);
                                    click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                                }
                            }
                        }

                        tools.挂机打怪.激活拾取后操作();

                        tools.执行时间戳.检测认证();

                        tools.执行时间戳.检测画面();

                        tools.执行时间戳.检测宝宝();

                        tools.执行时间戳.检测蓝药();

                        //tools.执行时间戳.检测无地牢补给();

                        tools.执行时间戳.检测武器衣服();

                        tools.执行时间戳.检测宝宝();

                        tools.执行时间戳.检测背包是否已满();

                        //var t1 = new Date().getTime();
                        //var t2 = new Date().getTime();
                        //tools.悬浮球临时描述("(" + ((t2 - t1) / 1000).toString() + ")");
                        tools.悬浮球描述("(" + parseInt((timeout - (时间戳)) / 1000) + "),(" + 锁定的怪物 + "),isChange(" + isChange + ")" + 宝宝位置 + "" + (其他玩家.status ? "发现有人" + JSON.stringify(其他玩家.r) : "") + "");
                        //sleep(111);
                    } else {
                        tools.挂机打怪.开始拾取();
                        if (挂机参数.只打满血怪 == 1 || 其他玩家.status) {
                            r = tools.挂机打怪.获取宝宝身边怪物数据(1);
                            if (r.status && r.value && r.value.length > 0) {
                                sleep(150);//额外延时，好像有时间不触发拾取
                                tools.挂机打怪.拾取延时();
                                var item = r.value[0];
                                var x = item.x + 20;
                                var y = item.y;
                                if (x >= 820 && x <= 895 && y >= 470 && y <= 540) { //避免点到金令
                                    toastLog("金令坐标,取消攻击宝宝身边怪物")
                                    return true;
                                }
                                click(item.x, item.y);
                                锁定的怪物 = "";
                                攻击宝宝身边怪物 = true;
                                上次坐标截图 = tools.常用操作.截图当前坐标();
                                上一次移动 = new Date().getTime();
                                for (let index = 0; index < 3; index++) {
                                    sleep(100);
                                    click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                                }
                                //toastLog("攻击宝宝身边怪物")
                                continue;
                            }
                        }
                        break;
                    }
                }
            }
            //tools.悬浮球描述("("+minute+":"+second+")");
            return isFind;
        },
        找满血怪: () => {
            var p = config.zuobiao.左攻击面板[fbl].怪物集合;
            var img = captureScreen();
            var r = images.findMultiColors(img, p.找色[0].color, [[p.找色[1].x, p.找色[1].y, p.找色[1].color], [p.找色[2].x, p.找色[2].y, p.找色[2].color]], {
                region: [p.x[0], p.y[0], p.x[1] - p.x[0], p.y[1] - p.y[0]],
                threshold: 15
            });
            utils.recycleNull(img);
            return r;
        },
        找非满血怪: () => {
            var p = config.zuobiao.左攻击面板[fbl].怪物集合;
            var img = captureScreen();
            var r = images.findMultiColors(img, p.找色非满血[0].color, [[p.找色非满血[1].x, p.找色非满血[1].y, p.找色非满血[1].color]], {
                region: [p.x[0], p.y[0], p.x[1] - p.x[0], p.y[1] - p.y[0]],
                threshold: 35
            });
            utils.recycleNull(img);
            return r;
        },
        找正上锁定怪物: (tryCount, interval) => {
            if (interval == null || interval <= 0) {
                interval = 10;
            }
            if (tryCount == null || tryCount <= 0) {
                tryCount = 1;
            }
            var p = config.zuobiao.锁定怪物标识范围[fbl];
            return tools.findImageAreaForWait("zhongjianguaiwuBtn.png", p.x[0], p.y[0], p.x[1], p.y[1], {
                maxTries: tryCount,
                interval: interval,
                threshold: 0.65
            })

            // 不能通过找色去做，因为有时会误点到人物
            // for (var index = 0; index < tryCount; index++) {
            //     var img = captureScreen();
            //     var r = images.findMultiColors(img, p.找色[0].color, [[p.找色[1].x, p.找色[1].y, p.找色[1].color]], {
            //         region: [p.x[0], p.y[0], p.x[1] - p.x[0], p.y[1] - p.y[0]],
            //         threshold: 35
            //     });
            //     utils.recycleNull(img);
            //     if (r && (r.x > 0 || r.y > 0)) {
            //         return r;
            //     }
            //     if (tryCount > 1) {
            //         if (interval == null || interval <= 100) {
            //             interval = 100;
            //         }
            //         sleep(interval)
            //     }
            // }
            // return null;
        },
        回城补给在挂机: (来源) => {
            tools.常用方法.错误日志(来源, 2)
            tools.补给操作.回城补给();
            tools.挂机打怪.去挂机图打怪();
        },
        去挂机图打怪: () => {
            if (当前总状态 == 总状态.已启动) {
                tools.人物移动.去挂机地图Loop();
            }
        },
        开始拾取: () => {
            是否激活拾取 = true;
            var 按钮集合 = config.zuobiao.按钮集合[fbl];
            click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
            //tools.悬浮球临时描述("激活拾取");
        },
        拾取延时: () => { //避免click太频繁导致 拾取失败
            var 拾取延时 = 0;
            if (挂机参数.拾取延时 != null && 挂机参数.拾取延时 > 0) {
                拾取延时 = 挂机参数.拾取延时;
            }
            // if (延时增加 != null && 延时增加 > 0) {
            //     拾取延时 += 延时增加;
            // }
            if (拾取延时 > 0) {
                sleep(拾取延时);
            }
        },
        激活拾取后操作: () => {
            if (是否激活拾取) {
                var 按钮集合 = config.zuobiao.按钮集合[fbl];
                let start = new Date().getTime();
                while (当前总状态 == 总状态.已启动) {
                    tools.挂机打怪.拾取延时();
                    if (new Date().getTime() - start > (挂机参数.拾取时长 * 1000)) {
                        click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
                        break;
                    }
                    var 文字 = tools.常用操作.读取聊天框最后一行信息();
                    if ((文字.indexOf("不能") >= 0 || 文字.indexOf("拾取") >= 0) && (文字.indexOf("一定") >= 0 || 文字.indexOf("时间") >= 0)) {
                        click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
                        break;
                    }
                    if (文字.indexOf("已满") >= 0 || 文字.indexOf("己满") >= 0 || 文字.indexOf("负重") >= 0) {
                        var r1 = tools.常用操作.检查背包是否有东西(5, 7);
                        if (r1) {
                            tools.挂机打怪.回城补给在挂机("拾取发现装备已满");
                        } else {
                            tools.常用操作.小退();
                            break;
                        }
                    }

                    var r = tools.findImage("shiquzhongBtn.png", 0.9)
                    if (!r.status) {
                        break;
                    }
                    else {
                        tools.悬浮球描述("拾取(" + parseInt(((挂机参数.拾取时长 * 1000) - (new Date().getTime() - start)) / 1000) + ")");
                    }
                }
                //toastLog("取消拾取")
                //tools.悬浮球临时描述("取消拾取");
                是否激活拾取 = false;
            }

        },
        初始化挂机: () => {
            tools.执行时间戳.检测无地牢补给(true);

            tools.执行时间戳.检测操作模式(true);

            //tools.执行时间戳.检测内挂(true);

            tools.执行时间戳.检测组队模式(true);
        },
        点击挂机坐标: (是否强制跑图) => {
            var 是否跑图 = false;
            if (是否强制跑图) {
                //toastLog("强制跑图")
                是否跑图 = true;
            }
            else if (上次坐标截图 == null) {
                是否跑图 = true;
                上次坐标截图 = tools.常用操作.截图当前坐标();
            }
            else {
                var r = tools.人物移动.跑图坐标是否变化();
                if (r) {
                    var 当前坐标截图 = tools.常用操作.截图当前坐标();
                    utils.recycleNull(上次坐标截图);
                    上次坐标截图 = 当前坐标截图;
                    是否跑图 = false;
                }
                else {
                    是否跑图 = true;
                }
            }
            var 挂机坐标s = tools.挂机打怪.获取挂机坐标();
            if (!挂机坐标s.status) {
                return
            }
            if (!是否跑图) {
                return;
            }
            if (挂机参数.地图拖动 == 1) {
                tools.人物移动.拖动大地图到中心();
            }
            else {
                tools.常用操作.打开大地图();
            }
            var r = null;
            if (挂机参数.随机跑图 == 1) {
                var index = random(0, 挂机坐标s.result.length - 1)
                r = 挂机坐标s.result[index];
                msg = "随机(" + (index + 1) + ")挂点"
            }
            else {
                r = 挂机坐标s.result[挂机点跑图顺序];
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
            }
            //toastLog(msg);
            //tools.悬浮球描述(msg);
            var closeImg = null;
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 100
            })
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                return;
            }
            var x = closeImg.x + random(r.x[0], r.x[1]);
            var y = closeImg.y + random(r.y[0], r.y[1]);
            click(x, y)
            if (挂机参数.地图拖动 == 1) {
                sleep(200);
                tools.人物移动.拖动大地图到边缘();
            }
            else {
                tools.常用操作.关闭所有窗口();
            }
            tools.挂机打怪.激活拾取后操作();
        },
        获取人物血量是否飞随机: () => {
            var result = false;
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FF4246", [[0, -24, "#BC0916"]], {
                region: [365, 618, 3, 26],
                threshold: 35
            });
            utils.recycleNull(img);
            if (r == null || r.x <= 0 || r.y <= 0) {
                r = tools.findImage("beibaoBtn.png"); //如果血量没找到，但是背包找到判定为飞随机
                if (r.status) {
                    result = true;
                }
            }
            return result;
        },
        获取人物血量是否隐身: () => {
            var result = false;
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FF4246", [[0, -69, "#79030C"]], {
                region: [365, 560, 3, 85],
                threshold: 35
            });
            utils.recycleNull(img);
            if (r == null || r.x <= 0 || r.y <= 0) {
                result = true;
            }
            return result;
        },
        启动隐身: () => {
            // if (挂机参数.隐身走动 == 1) {
            //     tools.常用操作.点击人物();
            // }
            for (let index = 0; index < 7; index++) {
                tools.findImageClick("yinshenBtn.png");
                sleep(110)
            }
        },
        打符: () => {
            var 按钮集合 = config.zuobiao.按钮集合[fbl];
            for (let index = 0; index < 8; index++) {
                click(random(按钮集合.打符.x[0], 按钮集合.打符.x[1]), random(按钮集合.打符.y[0], 按钮集合.打符.y[1]));
                sleep(110)
            }
        },
        点击召唤骷髅: () => {
            tools.常用操作.点击人物();
            for (let index = 0; index < 10; index++) {
                tools.findImageClick("zhaohuankulouBtn.png");
                sleep(110)
            }
        },
        点击召唤神兽: () => {
            tools.常用操作.点击人物();
            // var r = tools.findImageForWaitClick("zhaohuanshenshouBtn.png", {
            //     maxTries: 5,
            //     interval: 666
            // });
            for (let index = 0; index < 10; index++) {
                tools.findImageClick("zhaohuanshenshouBtn.png");
                sleep(110)
            }
        },
        获取挂机坐标: () => {
            var r = null;
            if (挂机参数.挂机地图 == "兽人古墓一层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓一层.打怪点;
            } else if (挂机参数.挂机地图 == "兽人古墓二层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓二层.打怪点;
            } else if (挂机参数.挂机地图 == "兽人古墓三层") {
                r = config.zuobiao.比奇大地图偏移[fbl].兽人古墓三层.打怪点;
            } else if (挂机参数.挂机地图 == "地牢一层东") {
                r = config.zuobiao.盟重大地图偏移[fbl].地牢一层东.打怪点;
            } else if (挂机参数.挂机地图 == "地牢一层北1") {
                r = config.zuobiao.盟重大地图偏移[fbl].地牢一层北1.打怪点;
            } else if (挂机参数.挂机地图 == "连接通道九") {
                r = config.zuobiao.盟重大地图偏移[fbl].连接通道九.打怪点;
            } else if (挂机参数.挂机地图 == "连接通道八") {
                r = config.zuobiao.盟重大地图偏移[fbl].连接通道八.打怪点;
            } else if (挂机参数.挂机地图 == "连接通道六") {
                r = config.zuobiao.盟重大地图偏移[fbl].连接通道六.打怪点;
            } else if (挂机参数.挂机地图 == "沃玛寺庙一层") {
                r = config.zuobiao.比奇大地图偏移[fbl].沃玛寺庙一层.打怪点;
            } else if (挂机参数.挂机地图 == "沃玛寺庙二层") {
                r = config.zuobiao.比奇大地图偏移[fbl].沃玛寺庙二层.打怪点;
            } else if (挂机参数.挂机地图 == "骨魔洞一层") {
                r = config.zuobiao.苍月大地图偏移[fbl].骨魔洞一层.打怪点;
            } else if (挂机参数.挂机地图 == "骨魔洞二层") {
                r = config.zuobiao.苍月大地图偏移[fbl].骨魔洞二层.打怪点;
            } else if (挂机参数.挂机地图 == "骨魔洞三层") {
                r = config.zuobiao.苍月大地图偏移[fbl].骨魔洞三层.打怪点;
            } else if (挂机参数.挂机地图 == "石墓一层") {
                r = config.zuobiao.盟重大地图偏移[fbl].石墓一层.打怪点;
            } else if (挂机参数.挂机地图 == "石墓二层") {
                r = config.zuobiao.盟重大地图偏移[fbl].石墓二层.打怪点;
            } else if (挂机参数.挂机地图 == "石墓三层") {
                r = config.zuobiao.盟重大地图偏移[fbl].石墓三层.打怪点;
            } else if (挂机参数.挂机地图 == "石墓四层") {
                r = config.zuobiao.盟重大地图偏移[fbl].石墓四层.打怪点;
            } else if (挂机参数.挂机地图 == "石墓五层") {
                r = config.zuobiao.盟重大地图偏移[fbl].石墓五层.打怪点;
            } else if (挂机参数.挂机地图 == "牛魔寺庙一层") {
                r = config.zuobiao.苍月大地图偏移[fbl].牛魔寺庙一层.打怪点;
            }
            else if (挂机参数.挂机地图 == "牛魔寺庙二层") {
                r = config.zuobiao.苍月大地图偏移[fbl].牛魔寺庙二层.打怪点;
            } else if (挂机参数.挂机地图 == "牛魔寺庙三层") {
                r = config.zuobiao.苍月大地图偏移[fbl].牛魔寺庙三层.打怪点;
            } else if (挂机参数.挂机地图 == "牛魔寺庙四层") {
                r = config.zuobiao.苍月大地图偏移[fbl].牛魔寺庙四层.打怪点;
            } else if (挂机参数.挂机地图 == "牛魔寺庙五层") {
                r = config.zuobiao.苍月大地图偏移[fbl].牛魔寺庙五层.打怪点;
            }
            else {
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
        宝宝是否存在: (跟随等待时间) => {
            var r = tools.挂机打怪.扫描宝宝();
            if (r.status) {
                return true;
            }
            var tryCount = 0;
            while (true) {
                if (tryCount >= 12) {
                    break;
                }
                var r = tools.findImageClick("chongwuBtn.png");
                sleep(500)
                if (r) {
                    r = tools.常用操作.读取聊天框最后一行信息();
                    tools.悬浮球描述(r + "(" + tryCount + ")");
                    if ((r.indexOf("行") >= 0 || r.indexOf("动") >= 0 || r.indexOf("属") >= 0 || r.indexOf("下") >= 0)) {
                        if (r.indexOf("攻") >= 0 || r.indexOf("击") >= 0) {
                            tools.常用操作.初始化攻击面板loops();
                            return true;
                        }
                        else if (r.indexOf("跟") >= 0 || r.indexOf("随") >= 0) {
                            if (跟随等待时间 && 跟随等待时间 > 0) {
                                sleep(跟随等待时间)
                            }
                        }
                    }
                }
                tryCount++;
            }
            tools.常用操作.初始化攻击面板loops();
            return false;
        },
        扫描宝宝: () => {
            let img = captureScreen();
            var color = "#00BF00";
            var result = {
                status: false,
                r: null
            };
            var regions = [
                [0, 0, 617, 720],
                [663, 0, 617, 720],
                [617, 0, 43, 240],
                [617, 250, 43, 470],
            ]
            for (let index = 0; index < regions.length; index++) {
                var reg = regions[index];
                var r = images.findMultiColors(img, color, [[20, 0, color]], {
                    region: reg,
                    threshold: 30
                });
                if (r && (r.x > 0 || r.y > 0)) {
                    result = {
                        status: true,
                        r: r
                    }
                    break;
                }
            }
            utils.recycleNull(img);
            return result;
        },
        扫描其他玩家: () => {
            var color = "#DB0000";
            var result = {
                status: false,
                r: null
            };
            var reg = [240, 53, 820, 500];
            var img = captureScreen();
            var r = images.findMultiColors(img, color, [[18, 0, "#DB0000"], [18, -7, "#E4E3E2"], [19, -9, "#F1F0F0"], [20, -12, "#F7F6F6"]], {
                region: reg,
                threshold: 25
            });
            utils.recycleNull(img);
            if (r && (r.x > 0 || r.y > 0)) {
                result = {
                    status: true,
                    r: r
                }
            }
            return result;
        },
        向宝宝移动: () => {
            var start = new Date().getTime();
            var 人物中心 = config.zuobiao.人物血量中心[fbl];
            var 走一格像素 = config.zuobiao.走一格像素[fbl];
            var 跟随几格 = 挂机参数.跟随几格;
            var isMove = false;
            while (true) {
                if (new Date().getTime() - start > 15 * 1000) {//超过15秒自动退出
                    toastLog("移动超过时间强制结束");
                    break;
                }
                var r = tools.挂机打怪.扫描宝宝();
                if (r.status) {
                    var 宝宝中心x = r.r.x + 20; //宝宝中心x
                    var 宝宝中心y = r.r.y; //宝宝中心y
                    if (Math.abs(宝宝中心x - 人物中心.x) <= 走一格像素.x * 跟随几格 && Math.abs(宝宝中心y - 人物中心.y) <= 走一格像素.y * 跟随几格) {
                        return {
                            status: true,
                            isMove: isMove,
                            msg: "移动成功"
                        };
                    }
                    var duartion = random(300, 500);
                    isMove = true;
                    if (宝宝中心x + (走一格像素.x * 跟随几格) < 人物中心.x) {
                        if (宝宝中心y + (走一格像素.y * 跟随几格) < 人物中心.y) {
                            tools.人物移动.左上走(duartion)
                        }
                        else if (宝宝中心y - (走一格像素.y * 跟随几格) > 人物中心.y) {
                            tools.人物移动.左下走(duartion)
                        }
                        else {
                            tools.人物移动.左走一步(duartion)
                        }
                    }
                    else if (宝宝中心x - (走一格像素.x * 跟随几格) > 人物中心.x) {
                        if (宝宝中心y + (走一格像素.y * 跟随几格) < 人物中心.y) {
                            tools.人物移动.右上走(duartion)
                        }
                        else if (宝宝中心y - (走一格像素.y * 跟随几格) > 人物中心.y) {
                            tools.人物移动.右下走(duartion)
                        }
                        else {
                            tools.人物移动.右走一步(duartion)
                        }
                    }
                    else {
                        if (宝宝中心y + (走一格像素.y * 跟随几格) < 人物中心.y) {
                            tools.人物移动.上走一步(duartion)
                        }
                        else if (宝宝中心y - (走一格像素.y * 跟随几格) > 人物中心.y) {
                            tools.人物移动.下走一步(duartion)
                        }
                        else {
                            break;
                        }
                    }
                    if (Math.abs(宝宝中心x - 人物中心.x) <= 走一格像素.x * (跟随几格 + 1) && Math.abs(宝宝中心y - 人物中心.y) <= 走一格像素.y * (跟随几格 + 1)) {
                        sleep(666)
                    }
                }
                else {
                    break;
                }
            }
            return {
                status: false,
                isMove: isMove,
                msg: "移动失败"
            };;
        },
        向怪物移动: () => {
            var start = new Date().getTime();
            var 人物中心 = config.zuobiao.人物中心[fbl];
            var tryCount = 0;
            var 允许距离 = {
                x: 100,
                y: 55
            }
            while (true) {
                if (new Date().getTime() - start > 8 * 1000) {//超过15秒自动退出
                    toastLog("移动超过时间强制结束");
                    break;
                }
                // if (tryCount >= 10) {
                //     tools.悬浮球描述("扫描怪物失败随机走动");
                //     tools.人物移动.随机走一步(random(1500, 3500));
                //     break;
                // }
                // var 锁定的怪物 = tools.挂机打怪.身边锁定怪物();
                // if (锁定的怪物.length > 0) {
                //     toastLog("移动成功");
                //     break;
                // }
                var r = tools.挂机打怪.大范围扫描锁定怪物();
                if (r && r.x > 0 && r.y > 0) {
                    tryCount = 0;
                    tools.悬浮球描述("成功扫描怪物" + JSON.stringify(r));
                    var x = r.x;
                    var y = r.y;
                    if (Math.abs(x - 人物中心.x) <= 允许距离.x && Math.abs(y - 人物中心.y) <= 允许距离.y) {
                        tools.悬浮球描述("移动成功" + JSON.stringify(r));
                        return true;
                    }
                    var duartion = random(300, 500);
                    if (x + 允许距离.x < 人物中心.x) {
                        if (y + 允许距离.y < 人物中心.y) {
                            tools.人物移动.左上走(duartion)
                        }
                        else if (y - 允许距离.y > 人物中心.y) {
                            tools.人物移动.左下走(duartion)
                        }
                        else {
                            tools.人物移动.左走一步(duartion)
                        }
                    }
                    else if (x - 允许距离.x > 人物中心.x) {
                        if (y + 允许距离.y < 人物中心.y) {
                            tools.人物移动.右上走(duartion)
                        }
                        else if (y - 允许距离.y > 人物中心.y) {
                            tools.人物移动.右下走(duartion)
                        }
                        else {
                            tools.人物移动.右走一步(duartion)
                        }
                    }
                    else {
                        if (y + 允许距离.y < 人物中心.y) {
                            tools.人物移动.上走一步(duartion)
                        }
                        else if (y - 允许距离.y > 人物中心.y) {
                            tools.人物移动.下走一步(duartion)
                        }
                        else {
                            break;
                        }
                    }
                    // if (Math.abs(x - 人物中心.x) <= 允许距离.x * 2.5 && Math.abs(y - 人物中心.y) <= 允许距离.y * 2.5) {
                    //     sleep(333)
                    // }
                }
                else {
                    break;
                    // sleep(666)
                    // tryCount++;
                }
            }
            return false;
        },
        获取人物身边怪物数据: () => {
            let img = captureScreen();
            var color = "#DB0000";
            var result = [];
            var regions = [
                [618, 202, 50, 5], // 正上方
                [555, 202, 50, 5], // 左上方
                [681, 202, 50, 5], // 右上方

                [618, 287, 50, 5], // 正下方
                [555, 287, 50, 5], // 左下方
                [681, 287, 50, 5], // 右下方

                [555, 245, 50, 5], // 正左方
                [681, 245, 50, 5], // 正右方
            ]
            regions.forEach((reg, index) => {
                var r = images.findAllPointsForColor(img, color, {
                    region: reg, // 正上方
                    threshold: 10
                });
                if (r && r.length > 0) {
                    result.push({
                        方向: index,
                        血量: r.length
                    })
                }
            })
            utils.recycleNull(img);
            return result;
        },
        获取宝宝身边怪物数据: (status) => {
            var r = tools.挂机打怪.扫描宝宝();
            var result = {
                status: false,
                value: null
            }
            if (r.status) {
                var p = r.r;
                let img = captureScreen();
                var color = "#DB0000";
                var value = [];
                var regions = [
                    [p.x - 2, p.y - 45, 50, 8], // 正上方
                    [p.x - 67, p.y - 45, 50, 8], // 左上方
                    [p.x + 61, p.y - 45, 50, 8], // 右上方

                    [p.x - 2, p.y + 40, 50, 8], // 正下方
                    [p.x - 67, p.y + 40, 50, 8], // 左下方
                    [p.x + 61, p.y + 40, 50, 8], // 右下方

                    [p.x - 67, p.y - 2, 50, 8], // 正左方
                    [p.x + 61, p.y - 2, 50, 8], // 正右方
                ]
                regions.forEach((reg, index) => {
                    var r = images.findColor(img, color, {
                        region: reg, // 正上方
                        threshold: 4
                    });
                    if (status == 0) {
                        value.push(r)
                    }
                    else if (status == 1) {
                        if (r && r.x > 0 && r.y > 0) {
                            value.push(r)
                        }
                    }
                    else if (status == 2) {
                        if (r == null || r.x <= 0 || r.y <= 0) {
                            value.push(r)
                        }
                    }
                })
                utils.recycleNull(img);
                result = {
                    status: true,
                    value: value,
                    p: p
                }
            }
            return result;
        },
        身边锁定怪物: () => {
            var imgSmall = tools.截屏裁剪(null, 555, 246, 724, 349);
            var huiduImg = images.grayscale(imgSmall);//灰度化
            let r = utils.ocrGetContentStr(huiduImg);
            if (r) {
                //r = r.replace(/[0-9\/]/g, '');
                r = r.replace(/[0-9\/a-zA-Z]/g, '').replace(/\./g, "").replace(/,/g, "").replace(/:/g, "").replace(/\|/g, '').replace(/\\/g, '');
            }
            utils.recycleNull(imgSmall);
            utils.recycleNull(huiduImg);
            return r;
        },
        大范围扫描锁定怪物: () => {
            var r = tools.获取区域文字(300, 66, 917, 535, 60, 255, true, false);
            if (r && r.length > 0) {
                for (var index = 0; index < r.length; index++) {
                    var info = r[index];
                    let hasNumber = /\d/.test(info.text);
                    if (!hasNumber) {
                        info.x = info.x + 300;
                        info.y = info.y + 60;
                        return info;
                    }
                }
            }
            return null;
        },
        怪物血量是否变化: () => {
            // x: [505, 760],
            // y: [2, 62],
            var img = captureScreen();
            var p = config.zuobiao.锁定怪物标识范围[fbl];
            var r = utils.regionalFindImg2(img, 被攻击怪物血量截图, p.x[0], p.y[0], p.x[1], p.y[1], 60, 255, 0.95, false, false, "");
            utils.recycleNull(img);
            if (r != null && (r.x > 0 || r.y > 0)) {
                return false;
            } else {
                return true;
            }
        },
    },
    人物移动: {
        使用地牢: () => {
            var isOk = false;
            tools.常用操作.打开背包();
            sleep(1200)
            var 地牢 = config.找色[fbl].地牢;
            var img = captureScreen();
            var r = images.findMultiColors(img, 地牢[0].color, [[地牢[1].x, 地牢[1].y, 地牢[1].color], [地牢[2].x, 地牢[2].y, 地牢[2].color]], {
                threshold: 40
            });
            if (r && r.x > 0 && r.y > 0) {
                click(r.x + random(5, 10), r.y + random(5, 10));
                if (r.y < config.zuobiao.药品格子面板[fbl].y1) {
                    tools.findImageForWaitClick("shiyongBtn.png", {
                        maxTries: 5,
                        interval: 200
                    });
                }
                isOk = true;
            }
            utils.recycleNull(img);
            tools.常用操作.关闭所有窗口();
            if (isOk) {
                tools.常用操作.初始化攻击面板loops();
            }
            return isOk;
        },
        使用随机: () => {
            var isOk = false;
            var 随机 = config.找色[fbl].随机;
            var img = captureScreen();
            var r = images.findMultiColors(img, 随机[0].color, [[随机[1].x, 随机[1].y, 随机[1].color], [随机[2].x, 随机[2].y, 随机[2].color]], {
                threshold: 40
            });
            if (r && r.x > 0 && r.y > 0) {
                click(r.x + random(5, 10), r.y + random(5, 10));
                isOk = true;
                utils.recycleNull(img);
            }
            else {
                tools.常用操作.打开背包();
                sleep(666)
                var img1 = captureScreen();
                r = images.findMultiColors(img1, 随机[0].color, [[随机[1].x, 随机[1].y, 随机[1].color], [随机[2].x, 随机[2].y, 随机[2].color]], {
                    threshold: 40
                });
                if (r && r.x > 0 && r.y > 0) {
                    click(r.x + random(5, 10), r.y + random(5, 10));
                    tools.findImageForWaitClick("shiyongBtn.png", {
                        maxTries: 6,
                        interval: 200
                    });
                    utils.recycleNull(img1);
                    isOk = true;
                }
                tools.常用操作.关闭所有窗口();
            }
            if (isOk) {
                tools.常用操作.初始化攻击面板loops();
            }
            return isOk;
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
                    [0, duration, [p.x - dx1, p.y - dx1], [p.x + dx2, p.y + dx1]
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
        左上走: (duration) => {
            if (duration > 0) {
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gesture(duration, [p.x - dx1, p.y - dx1], [random(80, 85), random(498, 502)])
                //     [0, duration, [p.x - dx1, p.y - dx1],
                //         [p.x - dx2, p.y - dx2]
                //     ]
                // );
            }
        },
        右上走: (duration) => {
            if (duration > 0) {
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gesture(duration, [p.x - dx1, p.y - dx1], [random(170, 180), random(498, 502)])
            }
        },
        右下走: (duration) => {
            if (duration > 0) {
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gesture(duration, [p.x - dx1, p.y - dx1], [random(170, 180), random(575, 580)])
                //     [0, duration, [p.x - dx1, p.y - dx1],
                //         [p.x + dx2, p.y + dx2]
                //     ]
                // );
            }
        },
        左下走: (duration) => {
            if (duration > 0) {
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                let dx2 = random(40, 70);
                gesture(duration, [p.x - dx1, p.y - dx1], [random(80, 85), random(575, 580)])
            }
        },
        指定像素移动: (x, y) => {
            var 人物中心 = config.zuobiao.人物血量中心[fbl];
            var 走一格像素 = config.zuobiao.走一格像素[fbl];
            var 走动x = Math.round(Math.abs(x - 人物中心.x) / 走一格像素.x);
            if (走动x > 0) {
                if (x < 人物中心.x) {
                    tools.人物移动.左走一步(走动x * 1000);
                }
                else {
                    tools.人物移动.右走一步(走动x * 1000);
                }
            }

            var 走动y = Math.round(Math.abs(y - 人物中心.y) / 走一格像素.y);
            if (走动y > 0) {
                if (y < 人物中心.y) {
                    tools.人物移动.上走一步(走动y * 1000);
                }
                if (y > 人物中心.y) {
                    tools.人物移动.下走一步(走动y * 1000);
                }
            }


        },
        跑图坐标是否变化: () => {
            var img = captureScreen();
            var p = config.zuobiao.小地图范围2[fbl];
            var r = utils.regionalFindImg2(img, 上次坐标截图, p.x1, p.y1, p.x2, p.y2, 60, 255, 0.95, false, false, "");
            utils.recycleNull(img);
            if (r != null && (r.x > 0 || r.y > 0)) {
                return false;
            } else {
                return true;
            }
        },
        是否跑图并截图坐标: () => {
            var 是否跑图 = false;
            if (上次坐标截图 == null) {
                是否跑图 = true;
                上次坐标截图 = tools.常用操作.截图当前坐标();
            }
            else {
                var r = tools.人物移动.跑图坐标是否变化()
                if (r) {
                    var 当前坐标截图 = tools.常用操作.截图当前坐标();
                    utils.recycleNull(上次坐标截图);
                    上次坐标截图 = 当前坐标截图;
                    是否跑图 = false;
                    tools.悬浮球描述("人物跑动中")
                }
                else {
                    是否跑图 = true;
                    tools.悬浮球描述("人物未移动")
                }
            }
            return 是否跑图;
        },
        获取路由组: (当前地图, 目的地) => {
            var routesGroup = [];
            try {
                routesGroup = config.地图路由[当前地图][目的地];
            } catch (e) {
                routesGroup = [];
            }
            if (routesGroup == null || routesGroup.length <= 0) {
                toastLog(回老兵 + "Loop[routesGroup=null]")
                routesGroup = [];
            }
            return routesGroup;
        },
        获取安全区坐标范围: () => {
            switch (挂机参数.挂机城市) {
                case "比奇":
                    return config.zuobiao.比奇安全区坐标范围;
                case "盟重":
                    return config.zuobiao.盟重安全区坐标范围;
                case "苍月":
                    return config.zuobiao.苍月安全区坐标范围;
                default:
                    return null;
            }
        },
        获取大地图偏移: () => {
            switch (挂机参数.挂机城市) {
                case "比奇":
                    return config.zuobiao.比奇大地图偏移[fbl];
                case "盟重":
                    return config.zuobiao.盟重大地图偏移[fbl];
                case "苍月":
                    return config.zuobiao.苍月大地图偏移[fbl];
                default:
                    return null;
            }
        },
        获取小贩坐标: () => {
            switch (挂机参数.挂机城市) {
                case "比奇":
                    return config.zuobiao.比奇小贩坐标;
                case "盟重":
                    return config.zuobiao.盟重小贩坐标;
                case "苍月":
                    return config.zuobiao.苍月小贩坐标;
                default:
                    return null;
            }
        },
        检测地图走动方向: (当前地图) => {
            var isCheck = false;
            if (当前地图 == "阴森石屋" || 当前地图 == "阴森石路" || 当前地图 == "紫水晶屋" || 当前地图 == "石墓入口") {
                isCheck = true;
            }
            if (isCheck) {
                var r = tools.findImageForWaitClick("fenshenquedingjiashiBtn.png", {
                    maxTries: 5,
                    interval: 200
                })
                if (r.status) {
                    tools.常用操作.关闭所有窗口();
                }
            }
            switch (当前地图) { //这里走动是为了防止有时点地图点不动，走一步就可以了
                case "阴森石屋":
                    tools.人物移动.左走一步(random(1200, 1500));
                    break;
                case "阴森石路":
                    tools.人物移动.下走一步(random(1200, 1500));
                    break;
                case "紫水晶屋":
                case "石墓入口":
                    tools.人物移动.右上走(random(1200, 1500));
                    break;
                default:
                    tools.人物移动.随机走一步(random(1200, 1500))
                    break;
            }
        },
        去小贩Loop: () => {
            while (当前总状态 == 总状态.已启动) {
                tools.执行时间戳.检测认证();
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 当前地图 = tools.常用操作.获取人物地图();
                var 安全区坐标范围 = tools.人物移动.获取安全区坐标范围();
                var 是否到达城里 = false;
                if (当前地图 == "苍月岛渔村" || 当前地图 == "比奇城" || 当前地图 == "土城") {
                    是否到达城里 = true;
                }
                if (是否到达城里 && 人物坐标 != null && 当前地图 != null && 人物坐标.x > 安全区坐标范围.x1 - 15 && 人物坐标.x < 安全区坐标范围.x2 + 15 && 人物坐标.y > 安全区坐标范围.y1 - 15 && 人物坐标.y < 安全区坐标范围.y2 + 15) {
                    tools.人物移动.安全区到小贩(人物坐标);
                    var 小贩坐标 = tools.人物移动.获取小贩坐标();
                    人物坐标 = tools.常用操作.获取人物坐标();
                    if (人物坐标 != null && Math.abs(人物坐标.x - 小贩坐标.x) <= 1 && Math.abs(人物坐标.y - 小贩坐标.y) <= 1) {
                        toastLog("到达小贩NPC");
                        break;
                    } else {
                        toastLog("未找到小贩NPC");
                    }
                } else {
                    tools.人物移动.回老兵Loop();
                }
                sleep(2500)
            }
        },
        安全区到小贩: (人物坐标) => {
            var 小贩坐标 = tools.人物移动.获取小贩坐标();
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
        回老兵: (当前地图, routes, 大地图偏移) => {
            tools.人物移动.检测地图走动方向(当前地图);
            if (挂机参数.地图拖动 == 1) {
                tools.人物移动.拖动大地图到中心();
            }
            else {
                tools.常用操作.打开大地图();
            }
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                for (var i = 0; i < routes.length; i++) {
                    var 路由 = routes[i];
                    var r = null;
                    路由.forEach((item) => {
                        r = (r == null ? 大地图偏移[item] : r[item]);
                    })
                    var x = closeImg.x + random(r.x[0], r.x[1]);
                    var y = closeImg.y + random(r.y[0], r.y[1]);
                    click(x, y)
                    sleep(random(1200, 1666));
                }
                sleep(random(1200, 1666));
                if (挂机参数.地图拖动 == 1) {
                    tools.人物移动.拖动大地图到边缘();
                }
                else {
                    tools.常用操作.关闭所有窗口();
                }
            } else {
                tools.常用操作.检测是否小退(true);
                toastLog("未找到closeBtn");
            }
        },
        回老兵Loop: () => {
            var 历史坐标 = null;
            var tryCount = 0;
            var 安全区坐标范围 = tools.人物移动.获取安全区坐标范围();
            var 大地图偏移 = tools.人物移动.获取大地图偏移();
            while (当前总状态 == 总状态.已启动) {
                tools.执行时间戳.检测认证();
                var 当前地图 = tools.常用操作.获取人物地图();
                var routesGroup = tools.人物移动.获取路由组(当前地图, "回老兵");
                var routes = routesGroup[0];
                if (当前地图 == "苍月岛渔村" || 当前地图 == "比奇城" || 当前地图 == "土城") {
                    var 人物坐标 = tools.常用操作.获取人物坐标();
                    tools.悬浮球描述("坐标:" + JSON.stringify(人物坐标));
                    if (人物坐标 != null && 人物坐标.x >= 安全区坐标范围.x1 - 5 && 人物坐标.x <= 安全区坐标范围.x2 + 5 && 人物坐标.y >= 安全区坐标范围.y1 - 5 && 人物坐标.y <= 安全区坐标范围.y2 + 5) {
                        toastLog("到达安全区")
                        sleep(3000);
                        break;
                    }
                    if (人物坐标 == null && tryCount < 5) {
                        tryCount++;
                    }
                    else {
                        if (历史坐标 == null || (人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y)) {
                            tools.人物移动.回老兵(当前地图, routes, 大地图偏移);
                            tryCount = 0;
                        }
                        if (人物坐标 != null) {
                            历史坐标 = 人物坐标;
                        }
                    }
                }
                else {
                    var 是否跑图 = tools.人物移动.是否跑图并截图坐标();
                    if (是否跑图) {
                        tools.人物移动.回老兵(当前地图, routes, 大地图偏移);
                    }
                }
                sleep(1000 * 1.5);
            }
        },
        去挂机地图: (目的地, 当前地图) => {
            // tools.常用操作.点击人物();
            // sleep(1288);
            if (挂机参数.地图拖动 == 1) {
                tools.人物移动.拖动大地图到中心();
            }
            else {
                var isCheck = false;
                if (当前地图 == "阴森石屋" || 当前地图 == "阴森石路" || 当前地图 == "紫水晶屋") {
                    isCheck = true;
                }
                if (isCheck) {
                    var r = tools.findImageForWaitClick("fenshenquedingjiashiBtn.png", {
                        maxTries: 6,
                        interval: 200
                    })
                    if (r.status) {
                        tools.常用操作.关闭所有窗口();
                    }
                }
                switch (当前地图) { //这里走动是为了防止有时点地图点不动，走一步就可以了
                    case "阴森石屋":
                        tools.人物移动.左走一步(random(1200, 1500));
                        break;
                    case "阴森石路":
                        tools.人物移动.下走一步(random(1200, 1500));
                        break;
                    case "紫水晶屋":
                        tools.人物移动.右上走(random(1200, 1500));
                        break;
                    case "牛魔寺庙入口":
                        tools.人物移动.上走一步(random(1200, 1500));
                        break;
                    default:
                        tools.人物移动.随机走一步(random(1200, 1500))
                        break;
                }
                tools.常用操作.打开大地图();
            }
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 200
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                toastLog(当前地图 + "-->" + 目的地)
                var routes = config.地图路由[当前地图][目的地][0];
                var 大地图坐标 = null;
                if (挂机参数.挂机城市 == "比奇") {
                    大地图坐标 = config.zuobiao.比奇大地图偏移[fbl];
                } else if (挂机参数.挂机城市 == "盟重") {
                    大地图坐标 = config.zuobiao.盟重大地图偏移[fbl];
                }
                else if (挂机参数.挂机城市 == "苍月") {
                    大地图坐标 = config.zuobiao.苍月大地图偏移[fbl];
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
                //sleep(random(1200, 1666));
                if (挂机参数.地图拖动 == 1) {
                    tools.人物移动.拖动大地图到边缘();
                }
                else {
                    tools.常用操作.关闭所有窗口();
                }
            } else {
                tools.常用操作.检测是否小退(true);
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去挂机地图Loop: () => {
            var 是否跑图 = false;
            tools.常用操作.关闭所有窗口();
            var 当前地图 = tools.常用操作.获取人物地图();
            tools.悬浮球描述("开始去挂机地图(" + 当前地图 + ")");
            if (当前地图 == 挂机参数.挂机地图) { //说明到目的地
                return;
            }
            if (当前地图 == "比奇城" || 当前地图 == "土城") { //多走动几步，以免自动跑图出不去
                tools.人物移动.左走一步(random(8888, 9999));
            }
            var routesGroup = null;
            try {
                routesGroup = config.地图路由[当前地图][挂机参数.挂机地图];
            } catch (e) {
                routesGroup = null;
            }
            if (routesGroup == null || routesGroup.length <= 0) {
                return;
            }
            let 上次跑图时间 = new Date().getTime();
            let 跑图时间戳 = 2.5 * 1000;
            for (let index = 0; index < routesGroup.length; index++) {
                var routes = routesGroup[index];
                var last = routes[routes.length - 1];
                var 目的地 = (index == routesGroup.length - 1 ? last[0] : last[1]);
                while (当前总状态 == 总状态.已启动) {
                    tools.执行时间戳.检测认证();
                    var 是否沿途打怪 = config.沿途打怪点.some(item => item === 当前地图)
                    if (new Date().getTime() - 上次跑图时间 > 跑图时间戳) {
                        var 当前地图 = tools.常用操作.获取人物地图();
                        if (当前地图 == 目的地) { //说明到目的地
                            tools.常用操作.点击人物();
                            tools.挂机打怪.启动隐身();
                            var r = tools.挂机打怪.宝宝是否存在(1000 * 5);
                            if (!r) {
                                if (挂机参数.召唤骷髅 == 1) {
                                    tools.挂机打怪.点击召唤骷髅();
                                }
                                if (挂机参数.召唤神兽 == 1) {
                                    tools.挂机打怪.点击召唤神兽();
                                }
                            }
                            tools.挂机打怪.初始化挂机();
                            break;
                        }
                        if (上次坐标截图 == null) {
                            是否跑图 = true;
                            上次坐标截图 = tools.常用操作.截图当前坐标();
                        }
                        else {
                            var r = tools.人物移动.跑图坐标是否变化()
                            if (r) {
                                var 当前坐标截图 = tools.常用操作.截图当前坐标();
                                utils.recycleNull(上次坐标截图);
                                上次坐标截图 = 当前坐标截图;
                                是否跑图 = false;
                                tools.悬浮球描述("人物跑动中")
                            }
                            else {
                                是否跑图 = true;
                                tools.悬浮球描述("人物未移动")
                            }
                        }
                        if (是否跑图) {
                            try {
                                tools.人物移动.去挂机地图(目的地, 当前地图);
                            } catch (error) {
                                toastLog('去挂机地图Loop跑图异常' + error)
                            }
                        }
                        上次跑图时间 = new Date().getTime();
                    }
                    if (是否沿途打怪 && 挂机参数.沿途打怪 == 1) {
                        var r = false;
                        var 打怪次数 = 0;
                        while (当前总状态 == 总状态.已启动) {
                            try {
                                r = tools.挂机打怪.寻找打怪();
                            } catch (e) {
                                r = false;
                                toastLog("去挂机地图Loop打怪异常")
                            }
                            if (r) {
                                打怪次数++;
                                tools.悬浮球描述("继续攻击")
                                continue;
                            } else {
                                break;
                            }
                        }
                    }
                    else {
                        sleep(150);
                    }
                }
            }
            tools.常用操作.点击人物();
            sleep(random(666, 999));
            toastLog("到达目的地挂机地图Loop");
            return;
        },
        拖动大地图到边缘: () => {
            tools.悬浮球描述("拖动大地图到边缘");
            var biaoJiImg = null;
            var btn = tools.findImageForWait("daditutuodongBtn.png", {
                maxTries: 12,
                interval: 100
            })
            if (btn.status) {
                biaoJiImg = btn.img;
            } else {
                tools.常用操作.关闭所有窗口();
                tools.常用操作.打开大地图();
                btn = tools.findImageForWait("daditutuodongBtn.png", {
                    maxTries: 12,
                    interval: 100
                })
                if (btn.status) {
                    biaoJiImg = btn.img;
                }
                else {
                    tools.悬浮球描述("未找到大地图");
                    return;
                }
            }
            var d = random(220, 300);
            var x = biaoJiImg.x;
            var y = biaoJiImg.y;
            gestures(
                [0, d, [x, y],
                    [666, 700]
                ]
            );
        },
        拖动大地图到中心: () => {
            tools.悬浮球描述("拖动大地图到中心");
            var biaoJiImg = null;
            var p = config.zuobiao.大地图拖动相对位置[fbl];
            var btn = tools.findImageForWait("dangqiandituBtn.png", {
                maxTries: 10,
                interval: 200
            })
            if (btn.status) {
                biaoJiImg = btn.img;
            } else {
                tools.常用操作.关闭所有窗口();
                tools.常用操作.打开大地图();
                btn = tools.findImageForWait("dangqiandituBtn.png", {
                    maxTries: 10,
                    interval: 200
                })
                if (btn.status) {
                    biaoJiImg = btn.img;
                }
                else {
                    tools.悬浮球描述("未找到大地图");
                    return;
                }
            }
            var d = random(300, 400);
            var x = biaoJiImg.x + p.x;
            var y = biaoJiImg.y + p.y;
            gestures(
                [0, d, [x, y],
                    [133, 122]
                ]
            );
        },
    },
    补给操作: {
        判断是否出现BOSS提示: (等待时间) => { //type=1卖，type=2修,type=3存
            var img = captureScreen();
            var r = images.findMultiColors(img, "#00D2FF", [[26, 0, "#00D2FF"], [85, 0, "#FFFFFF"]], {
                region: [500, 140, 300, 35],
                threshold: 15
            });
            utils.recycleNull(img);
            if (r && (r.x > 0 || r.y > 0)) {
                tools.常用方法.错误日志("补给时发现BOSS提示文字", 3);
                if (等待时间 && 等待时间 > 0) {
                    sleep(等待时间);
                }
            }
            return r;
        },
        喝修复油: () => {
            var 背包按钮 = tools.常用操作.打开背包();
            if (背包按钮.status) {
                var 修复油 = tools.findImageForWaitClick("xiufuyou1.png", {
                    maxTries: 5,
                    interval: 200
                });
                if (修复油.status) {
                    if (修复油.img.y < config.zuobiao.药品格子面板[fbl].y1) {
                        tools.findImageForWaitClick("shiyongBtn.png", {
                            maxTries: 5,
                            interval: 200
                        });
                    }
                    tools.常用操作.关闭所有窗口();
                    return true;
                }
            }
            tools.常用操作.关闭所有窗口();
            return false;
        },
        找地牢: () => {
            var 格子P = config.zuobiao.药品格子面板[fbl];
            var r = tools.findImageAreaForWait("dilao_gezi.png", 格子P.x1, 格子P.y1, 格子P.x2, 格子P.y2, {
                maxTries: 5,
                interval: 200,
                threshold: 0.6
            });
            if (r.status) {
                tools.悬浮球描述("格子面板找图命中")
                return true;
            }

            var 背包按钮 = tools.常用操作.打开背包();
            if (背包按钮.status) {
                r = tools.findImageForWait("dilao.png", {
                    maxTries: 5,
                    interval: 200
                }, 0.6);
                if (r.status) {
                    tools.悬浮球描述("找开背包找图命中")
                    tools.常用操作.关闭所有窗口();
                    return true;
                }

                var 地牢 = config.找色[fbl].地牢;
                var img = captureScreen();
                r = images.findMultiColors(img, 地牢[0].color, [[地牢[1].x, 地牢[1].y, 地牢[1].color], [地牢[2].x, 地牢[2].y, 地牢[2].color]], {
                    threshold: 50
                });
                utils.recycleNull(img);
                if (r != null && r.x > 0 && r.y > 0) {
                    tools.悬浮球描述("找开背包找色命中")
                    tools.常用操作.关闭所有窗口();
                    return true;
                }
            }

            tools.常用操作.关闭所有窗口();
            return false;
        },
        找蓝个: () => {
            var img = captureScreen();
            var r = images.findMultiColors(img, "#6DB3F0", [[0, -19, "#1942A2"]], {
                region: [373, 618, 3, 30],
                threshold: 35
            });
            utils.recycleNull(img);
            if (r && r.x > 0 && r.y > 0) {
                return true;
            }
            else {
                tools.常用方法.错误日志("找色匹配蓝个失败", 2);
                var 格子P = config.zuobiao.药品格子面板[fbl];
                var r = tools.findImageAreaForWait("lanyaoge.png", 格子P.x1, 格子P.y1, 格子P.x2, 格子P.y2, {
                    maxTries: 15,
                    interval: 200
                }, 0.65);
                if (r.status) {
                    return true;
                } else {
                    tools.常用方法.错误日志("找图匹配蓝个失败", 2);
                    r = tools.findImage("beibaoBtn.png"); //背包找到才判定为无蓝
                    if (r.status) {
                        tools.常用方法.错误日志("匹配蓝个失败且找到背包图标", 2);
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        },
        点击小贩按钮: (type, isClose) => { //type=1表示出售、2表示购买、3表示修理
            if (isClose) {
                tools.常用操作.关闭所有窗口();
            }
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl];
            var msg = "";
            click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2));
            var r = null;
            switch (type) {
                case 1:
                    r = tools.findImageForWaitClick("chushouwupingBtn.png", {
                        maxTries: 10,
                        interval: 200
                    });
                    msg = "出售按钮"
                    break;
                case 2:
                    r = tools.findImageForWaitClick("goumaiwupingBtn.png", {
                        maxTries: 10,
                        interval: 200
                    });
                    msg = "购买按钮"
                    break;
                case 3:
                    r = tools.findImageForWaitClick("putongxiuliBtn.png", {
                        maxTries: 10,
                        interval: 200
                    });
                    msg = "普通修理按钮"
                    break;


            }
            if (r.status) {
                return true;
            }
            else {
                toastLog("未找到" + msg)
                return false;
            }
        },
        点击背包格子: (index1, index2, zhengliBtn) => {
            var zhengliP = {
                x: zhengliBtn.img.x,
                y: zhengliBtn.img.y
            }
            var 背包格子偏移 = config.zuobiao.背包格子偏移[fbl];
            var x = zhengliP.x + 背包格子偏移["1_1"].x + (背包格子偏移.中心点偏移量X * (index2 - 1)) + random(-5, 5)
            var y = zhengliP.y + 背包格子偏移["1_1"].y + (背包格子偏移.中心点偏移量Y * (index1 - 1)) + random(-5, 5)
            click(x, y)
        },
        背包拖动背景至可关闭位置: (zhengliBtn) => {
            if (zhengliBtn == null) {
                zhengliBtn = tools.findImageForWait("beibaozhengliBtn.png", {
                    maxTries: 10,
                    interval: 200
                });
            }
            if (!zhengliBtn.status) {
                toastLog("未找到背包整理按钮")
                return;
            }
            var zhengliP = {
                x: zhengliBtn.img.x,
                y: zhengliBtn.img.y
            }
            let x1 = zhengliP.x - 100 + random(-10, 10);
            let y1 = zhengliP.y + 15 + random(5, 10);
            gesture(random(666, 999), [x1, y1], [x1 - random(100, 120), y1 + random(20, 120)])
        },
        获取操作按钮(按钮类型, 来源, isClick, notFindEixt) {

            // r = tools.findImageForWait("beibaochuandaiBtn.png", {
            //     maxTries: 3,
            //     interval: 333
            // })
            // if (r.status) {
            //     return true;
            // }
            // r = tools.findImageForWait("beibaochuandaiBtn1.png", {
            //     maxTries: 3,
            //     interval: 333
            // })
            var r = null;
            var sucessBtn = "";
            var btnName = "";
            var btn1Name = "";
            switch (按钮类型) {
                case "放入":
                    btnName = "beibaofangruBtn.png";
                    btn1Name = "beibaofangruBtn1.png";
                    break;
                case "穿戴":
                    btnName = "beibaochuandaiBtn.png";
                    btn1Name = "beibaochuandaiBtn1.png";
                    break;
                case "使用":
                    btnName = "beibaoshiyongBtn.png";
                    btn1Name = "beibaoshiyongBtn1.png";
                    break;
            }
            r = tools.findImageForWait(btnName, {
                maxTries: 10,
                interval: 200
            });
            if (r.status) {
                sucessBtn = btnName;
            }
            else {
                r = tools.findImageForWait(btn1Name, {
                    maxTries: 10,
                    interval: 200
                });
                if (r.status) {
                    sucessBtn = btn1Name;
                    tools.常用方法.错误日志(btn1Name + "找图成功(" + 来源 + ")", 3);
                }
                else {
                    tools.常用方法.错误日志(btnName + "和" + btn1Name + "找图失败(" + 来源 + ")", 3);
                }
            }

            if (r.status) {
                if (isClick) {
                    var x = r.img.x + r.size.w / 2 + random(-5, 5);
                    var y = r.img.y + r.size.h / 2 + random(-3, 3);
                    click(x, y)
                }
                return {
                    status: true,
                    btnName: sucessBtn,
                    value: r
                }
            }
            else {
                if (notFindEixt) {
                    tools.常用操作.退出游戏(btnName + "和" + btn1Name + "找图失败(" + 来源 + ")");
                }
                return {
                    status: false
                }
            }
        },
        整理背包: (isOpen) => {
            if (isOpen) {
                tools.常用操作.打开背包();
                sleep(555)
            }
            var r = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 200
            });
            if (!r.status) {
                toastLog("未找到背包整理按钮")
            }
            return r;
        },
        获取物品信息: (btnName) => {
            var btn = tools.findImageForWait(btnName, {
                maxTries: 6,
                interval: 200
            });
            if (btn.status) {
                var p = btn.img;
                var 装备属性明细 = config.zuobiao.人物面板[fbl].装备属性明细;
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y - 10, p.x, p.y + 装备属性明细.y);
                let r = ocrPladderOCR.detect(img);
                utils.recycleNull(img);
                if (r) {
                    var allText = '';
                    r.forEach(item => {
                        allText += item.text;
                    });
                    var 持久 = tools.常用操作.根据面板获取持久(r);
                    return {
                        status: true,
                        持久: 持久,
                        value: allText
                    }
                }
            }
            return {
                status: false,
                持久: null,
                value: null
            }
        },
        判断选中格子是否跳过: (排除装备, btnName) => {
            var info = tools.补给操作.获取物品信息(btnName);
            
            var arr = [{
                name: "中蓝包",
                pic: "lanyaobao.png"
            },
            {
                name: "中蓝个",
                pic: "lanyaoge.png"
            }, {
                name: "修复油",
                pic: "xiufuyou.png"
            }];
            if (!排除装备) {
                arr.push({
                    name: "护身符大",
                    pic: "fushenfu.png"
                })
            }
            if (挂机参数.备用斩马 == 1 && !排除装备) {
                arr.push({
                    name: "斩马",
                    pic: "wuqi_zhanma.png"
                })
            }
            if (挂机参数.备用男重盔 == 1 && !排除装备) {
                arr.push({
                    name: "重盔甲（男）",
                    pic: "zhongkui_nan.png"
                })
            }
            if (挂机参数.备用女重盔 == 1 && !排除装备) {
                arr.push({
                    name: "重盔甲（女）",
                    pic: "zhongkui_nv.png"
                })
            }
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FFDD3C", [[40, 0, "#FFDD3C"], [0, 55, "#FFDD3C"]]);
            utils.recycleNull(img);
            if (r && r.x > 0 && r.y > 0) {
                for (let index = 0; index < arr.length; index++) {
                    var item = arr[index];
                    var result = tools.findImageArea(item.pic, r.x - 10, r.y - 10, r.x + 70, r.y + 70, 0.7);

                    if (result.status) {
                        if (item.pic == "wuqi_zhanma.png" && btnName != null && btnName.length > 0) {
                            var info = tools.补给操作.获取物品信息(btnName);
                            if (info.status && (info.value.indexOf("马") >= 0
                                || info.value.indexOf("刀") >= 0
                                || info.value.indexOf("新") >= 0
                                || info.value.indexOf("折") >= 0
                                || info.value.indexOf("重量27") >= 0)) {
                                return {
                                    status: true,
                                    msg: item.name + "跳过",
                                    pic: item.pic,
                                    info: info
                                }
                            }
                            else {
                                return {
                                    status: false,
                                    msg: "",
                                    info: info
                                }
                            }
                        }
                        else if (item.pic == "fushenfu.png" && btnName != null && btnName.length > 0) {
                            var info = tools.补给操作.获取物品信息(btnName);
                            if (info.status && (info.value.indexOf("护身") >= 0 || info.value.indexOf("符") >= 0)) {
                                return {
                                    status: true,
                                    msg: item.name + "跳过",
                                    pic: item.pic
                                }
                            }
                        }
                        else {
                            return {
                                status: true,
                                msg: item.name + "跳过",
                                pic: item.pic
                            }
                        }
                    }
                }
                return {
                    status: false,
                    msg: ""
                }
            }
            else {
                return {
                    status: false,
                    msg: "未找到格子选中框"
                }
            }
        },
        判断选中格子是否跳过: (排除装备, btnName) => {
            var arr = [{
                name: "中蓝包",
                pic: "lanyaobao.png"
            },
            {
                name: "中蓝个",
                pic: "lanyaoge.png"
            }, {
                name: "修复油",
                pic: "xiufuyou.png"
            }];
            if (!排除装备) {
                arr.push({
                    name: "护身符大",
                    pic: "fushenfu.png"
                })
            }
            if (挂机参数.备用斩马 == 1 && !排除装备) {
                arr.push({
                    name: "斩马",
                    pic: "wuqi_zhanma.png"
                })
            }
            if (挂机参数.备用男重盔 == 1 && !排除装备) {
                arr.push({
                    name: "重盔甲（男）",
                    pic: "zhongkui_nan.png"
                })
            }
            if (挂机参数.备用女重盔 == 1 && !排除装备) {
                arr.push({
                    name: "重盔甲（女）",
                    pic: "zhongkui_nv.png"
                })
            }
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FFDD3C", [[40, 0, "#FFDD3C"], [0, 55, "#FFDD3C"]]);
            utils.recycleNull(img);
            if (r && r.x > 0 && r.y > 0) {
                for (let index = 0; index < arr.length; index++) {
                    var item = arr[index];
                    var result = tools.findImageArea(item.pic, r.x - 10, r.y - 10, r.x + 70, r.y + 70, 0.7);

                    if (result.status) {
                        if (item.pic == "wuqi_zhanma.png" && btnName != null && btnName.length > 0) {
                            var info = tools.补给操作.获取物品信息(btnName);
                            if (info.status && (info.value.indexOf("马") >= 0
                                || info.value.indexOf("刀") >= 0
                                || info.value.indexOf("新") >= 0
                                || info.value.indexOf("折") >= 0
                                || info.value.indexOf("重量27") >= 0)) {
                                return {
                                    status: true,
                                    msg: item.name + "跳过",
                                    pic: item.pic,
                                    info: info
                                }
                            }
                            else {
                                return {
                                    status: false,
                                    msg: "",
                                    info: info
                                }
                            }
                        }
                        else if (item.pic == "fushenfu.png" && btnName != null && btnName.length > 0) {
                            var info = tools.补给操作.获取物品信息(btnName);
                            if (info.status && (info.value.indexOf("护身") >= 0 || info.value.indexOf("符") >= 0)) {
                                return {
                                    status: true,
                                    msg: item.name + "跳过",
                                    pic: item.pic
                                }
                            }
                        }
                        else {
                            return {
                                status: true,
                                msg: item.name + "跳过",
                                pic: item.pic
                            }
                        }
                    }
                }
                return {
                    status: false,
                    msg: ""
                }
            }
            else {
                return {
                    status: false,
                    msg: "未找到格子选中框"
                }
            }
        },
        判断选中格子是否存仓库: () => {
            var arr = [{
                name: "万年雪霜",
                pic: "wannianxueshuang.png"
            },
            {
                name: "组队卷",
                pic: "zuduijuan.png"
            }];
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FFDD3C", [[40, 0, "#FFDD3C"], [0, 55, "#FFDD3C"]]);
            utils.recycleNull(img);
            if (r && r.x > 0 && r.y > 0) {
                for (let index = 0; index < arr.length; index++) {
                    var item = arr[index];
                    var result = tools.findImageArea(item.pic, r.x - 10, r.y - 10, r.x + 70, r.y + 70, 0.7);
                    if (result.status) {
                        return {
                            status: true,
                            msg: item.name
                        }
                    }
                }
                return {
                    status: false,
                    msg: ""
                }
            }
            else {
                return {
                    status: false,
                    msg: "未找到格子选中框"
                }
            }
        },
        判断选中格子是否极品: (btnName) => {
            var btn = tools.findImageForWait(btnName, {
                maxTries: 6,
                interval: 200
            });
            if (btn.status) {
                var p = btn.img;
                var 装备属性明细 = config.zuobiao.人物面板[fbl].装备属性明细;
                //var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y - 10, p.x, p.y + 装备属性明细.y);
                var img = captureScreen();
                var r = images.findMultiColors(img, "#FF0000", [[30, 0, "#FF0000"], [38, 0, "#FF0000"], [49, 0, "#FF0000"]], {
                    region: [p.x + 装备属性明细.x, p.y, 装备属性明细.x * -1, 24],
                    threshold: 30
                });
                utils.recycleNull(img);
                if (r && r.x > 0 && r.y > 0) {
                    return true
                    // r = images.findMultiColors(img, "#FFDD3C", [[57, 0, "#FFDD3C"], [0, 56, "#FFDD3C"], [57, 56, "#FFDD3C"]]);
                    // utils.recycleNull(img);
                    // if (r && r.x > 0 && r.y > 0) {
                    //     var result = tools.findImageArea("shuji.png", r.x, r.y, r.x + 57, r.y + 56);
                    //     if (!result.status) {
                    //         return true
                    //     }
                    // }
                }
            }
            return false;
        },
        判断修卖是否跳过: (btnName, type) => {//type=1卖，type=2修
            var info = tools.补给操作.获取物品信息(btnName);
            if (!info.status) {
                toastLog("获取物品信息失败");
                return false;
            }
            var str = info.value;
            if ((str.indexOf("新") || str.indexOf("斩")) && str.indexOf("马")) {

            }


            var arr = [{
                name: "万年雪霜",
                pic: "wannianxueshuang.png"
            },
            {
                name: "组队卷",
                pic: "zuduijuan.png"
            }];
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FFDD3C", [[57, 0, "#FFDD3C"], [0, 56, "#FFDD3C"], [57, 56, "#FFDD3C"]]);
            utils.recycleNull(img);
            if (r && r.x > 0 && r.y > 0) {
                for (let index = 0; index < arr.length; index++) {
                    var item = arr[index];
                    var result = tools.findImageArea(item.pic, r.x - 5, r.y - 5, r.x + 70, r.y + 70);
                    if (result.status) {
                        return {
                            status: true,
                            msg: item.name
                        }
                    }
                }
                return {
                    status: false,
                    msg: ""
                }
            }
            else {
                return {
                    status: false,
                    msg: "未找到格子选中框"
                }
            }
        },
        回城补给: () => {
            tools.悬浮球描述("回城补给");
            var 当前地图 = tools.常用操作.获取人物地图();
            if (挂机参数.地牢回城 == 1 && 当前地图.indexOf("苍月岛") < 0 && 当前地图.indexOf("比奇") < 0 && 当前地图.indexOf("盟重") < 0 && 当前地图 != "土城") {
                tools.人物移动.使用地牢();
                tools.常用操作.关闭所有窗口();
            }
            tools.人物移动.去小贩Loop();
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.卖物品Loop();
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.修理装备Loop();
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.买物品Loops();
            }
            tools.悬浮球描述("补给完成");
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
        卖物品Loop: () => {
            tools.悬浮球描述("开始卖物品");
            while (当前总状态 == 总状态.已启动) {
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
            var r = tools.补给操作.点击小贩按钮(1, false);
            if (!r) {
                return {
                    status: false,
                    err: "未获取出售物品按钮"
                }
            }
            var zhengliBtn = tools.补给操作.整理背包(false);
            if (!zhengliBtn.status) {
                tools.补给操作.点击小贩按钮(2, true); //这里尝试购买后，可能会出现整理按钮
                return {
                    status: false,
                    err: "未获取到整理按钮"
                }
            }
            var 是否已跳过衣服 = false;
            var 是否已跳过武器 = false;
            for (let index = 1; index <= 5; index++) {
                for (let index1 = 1; index1 <= 8; index1++) {
                    tools.执行时间戳.检测认证();
                    if (当前总状态 != 总状态.已启动) {
                        return {
                            status: true,
                            err: "程序未启动"
                        }
                    }
                    if (index == 1 && index1 == 1) {
                        sleep(random(1288, 1588))
                    }
                    else {
                        sleep(random(555, 666))
                    }
                    tools.悬浮球描述(`开始出售${index}_${index1}格子`)
                    tools.补给操作.点击背包格子(index, index1, zhengliBtn);
                    r = tools.补给操作.获取操作按钮("放入", "卖物品", false, true);
                    if (r.status) {
                        var info = tools.补给操作.判断选中格子是否跳过(false, r.btnName);
                        if (info.status) {
                            var 是否跳过 = false;
                            if (info.pic == "wuqi_zhanma.png") {
                                if (!是否已跳过武器) {
                                    是否跳过 = true;
                                    是否已跳过武器 = true;
                                }
                                else {
                                    toastLog("已保留过武器");
                                }
                            }
                            else if (info.pic == "zhongkui_nan.png" || info.pic == "zhongkui_nv.png") {
                                if (!是否已跳过衣服) {
                                    是否跳过 = true;
                                    是否已跳过衣服 = true;
                                }
                                else {
                                    toastLog("已保留过衣服");
                                }
                            }
                            else {
                                是否跳过 = true;
                            }
                            if (是否跳过) {
                                toastLog(info.msg);
                                continue;
                            }
                        }
                        var 是否极品 = tools.补给操作.判断选中格子是否极品(r.btnName);
                        if (是否极品) {
                            tools.悬浮球描述(`发现极品${index}_${index1}存仓库`)
                            tools.补给操作.存仓库(index, index1);
                            是否已跳过衣服 = false; //这里防止有极品  之前有跳过动作，又卖掉
                            是否已跳过武器 = false;
                            return {
                                status: false,
                                err: "重新卖装备"
                            }
                        }
                        var 存仓库 = tools.补给操作.判断选中格子是否存仓库();
                        if (存仓库.status) {
                            tools.悬浮球描述(`${index}_${index1}发现${存仓库.msg}需存仓库装备`)
                            tools.补给操作.存仓库(index, index1);
                            return {
                                status: false,
                                err: "重新卖装备"
                            }
                        }
                        r = tools.findImageForWaitClick(r.btnName, {
                            maxTries: 6,
                            interval: 666
                        });
                        r = tools.findImageForWaitClick("OKBtn.png", {
                            maxTries: 10,
                            interval: 666
                        });
                    } else {
                        r = tools.补给操作.判断是否出现BOSS提示(1000 * 60);
                        if (r && (r.x > 0 || r.y > 0)) {
                            return {
                                status: false,
                                err: "卖东西时发现BOSS提示文字"
                            }
                        }
                        else {
                            r = tools.常用操作.检测是否在游戏画面();
                            if (r) {
                                tools.补给操作.背包拖动背景至可关闭位置(zhengliBtn);
                                tools.常用操作.关闭所有窗口();
                                return {
                                    status: true,
                                    err: ""
                                }
                            }
                            else {
                                tools.常用方法.发送提醒("卖东西失败,退出游戏");
                                tools.常用操作.退出游戏();
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
                tools.常用操作.关闭所有窗口();
                tools.常用操作.打开背包();
                sleep(1200);
                var 蓝包数量 = tools.补给操作.获取匹配图片的数量("lanyaobao.png");
                var 蓝个数量_背包 = tools.补给操作.获取匹配图片的数量("lanyaoge.png");
                var 蓝个数量_格子 = tools.补给操作.获取匹配图片的数量("lanyaoge_gezi.png");
                var 蓝个数量 = 蓝个数量_背包 + 蓝个数量_格子;
                var 护身符数量 = tools.补给操作.获取匹配图片的数量("fushenfu.png");
                var 修复油数量_背包 = tools.补给操作.获取匹配图片的数量("xiufuyou.png");
                var 修复油数量_格子 = tools.补给操作.获取匹配图片的数量("xiufuyou_gezi.png");
                var 修复油数量 = 修复油数量_背包 + 修复油数量_格子;
                for (var i = 0; i < 物品集合.length; i++) {
                    if (当前总状态 == 总状态.已启动) {
                        tools.执行时间戳.检测认证();
                        var 物品对象 = 物品集合[i];
                        var buyNum = 物品对象["数量"];
                        if (护身符数量 > 0 && 物品对象["名称"].indexOf("护身符") >= 0) {
                            物品对象["数量"] = buyNum - 护身符数量;
                            toastLog("已有护身符数量" + 护身符数量);
                            if (物品对象["数量"] <= 0) {
                                continue;
                            }
                        }

                        if (蓝包数量 > 0 && 物品对象["名称"] == "魔法药中包") {
                            物品对象["数量"] = buyNum - 蓝包数量;
                            toastLog("已有蓝包数量" + 蓝包数量);
                            if (物品对象["数量"] <= 0) {
                                continue;
                            }
                        }

                        if (蓝个数量 > 0 && 物品对象["名称"] == "魔法药中个") {
                            物品对象["数量"] = buyNum - 蓝个数量;
                            toastLog("已有蓝个数量" + 蓝个数量);
                            if (物品对象["数量"] <= 0) {
                                continue;
                            }
                        }

                        if (修复油数量 > 0 && 物品对象["名称"] == "修复油") {
                            物品对象["数量"] = buyNum - 修复油数量;
                            toastLog("已有修复油数量数量" + 修复油数量);
                            if (物品对象["数量"] <= 0) {
                                continue;
                            }
                        }

                        tools.悬浮球描述("开始购买" + JSON.stringify(物品对象));
                        tools.补给操作.买物品(物品对象)
                        sleep(random(2000, 3000));
                    }
                    else {
                        return;
                    }
                }
            }
            tools.悬浮球描述("购买物品结束");
        },
        买物品: (物品对象) => {
            tools.常用操作.关闭所有窗口();
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
                tools.悬浮球描述("购买数" + (i + 1));
                tools.findImageClick("buygoumaiBtn.png");
                sleep(random(888, 1288))
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
            r = tools.findImageForWait("beibaozhengliBtn.png", {
                maxTries: 6,
                interval: 666
            })
            if (!r.status) {
                return {
                    status: false,
                    err: "未找到整理按钮"
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
                r = tools.findImageForWaitClick("beibaocunruBtn1.png", {
                    maxTries: 10,
                    interval: 666
                });
                if (r.status) {
                    存入仓库数量++;
                }
                else {
                    return {
                        status: false,
                        err: "尝试10次未获取到存入按钮"
                    }
                }
            }
        },
        修理装备Loop: () => {
            tools.悬浮球描述("修理装备中");
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.卸下人物装备();
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.修理装备();
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.穿装备();
            }
            是否用过备用衣服 = false;
            是否用过备用武器 = false;
            tools.悬浮球描述("修理结束");
        },
        修理装备: () => {
            var r = tools.补给操作.点击小贩按钮(3, false);
            if (!r) {
                return {
                    status: false,
                    err: ""
                }
            }
            var zhengliBtn = tools.补给操作.整理背包(false);
            var 是否返回修理 = false;
            for (let index = 1; index <= 5; index++) {
                for (let index1 = 1; index1 <= 8; index1++) {
                    tools.执行时间戳.检测认证();
                    if (是否返回修理) {
                        var result = tools.findImageForWaitClick("xiulifanhui.png", {
                            maxTries: 5,
                            interval: 1000
                        })
                        if (!result.status) {
                            toastLog("找不到xiulifanhui")
                            return;
                        }
                        result = tools.findImageForWaitClick("putongxiuliBtn.png", {
                            maxTries: 5,
                            interval: 1000
                        })
                        if (!result.status) {
                            toastLog("找不到putongxiuliBtn")
                            return;
                        }
                    }
                    sleep(1500)
                    tools.悬浮球描述(`开始修理${index}_${index1}格子`);
                    tools.补给操作.点击背包格子(index, index1, zhengliBtn);
                    r = tools.补给操作.获取操作按钮("放入", "修理装备", false, true);
                    if (r.status) {
                        var 跳过 = tools.补给操作.判断选中格子是否跳过(true, r.btnName);
                        if (跳过.status) {
                            是否返回修理 = false;
                            tools.悬浮球描述(跳过.msg);
                            continue;
                        }
                        else {
                            r = tools.findImageForWaitClick(r.btnName, {
                                maxTries: 6,
                                interval: 666
                            });

                            r = tools.findImageForWaitClick("OKBtn.png", {
                                maxTries: 10,
                                interval: 500
                            })
                            是否返回修理 = true;
                            sleep(random(333, 666))
                        }
                    }
                    else {
                        tools.补给操作.背包拖动背景至可关闭位置(zhengliBtn);
                        tools.常用操作.关闭所有窗口();
                        return;
                    }
                }
            }
        },
        卸下人物装备: () => {
            tools.常用操作.打开角色();
            var arr = [
                config.zuobiao.人物面板[fbl].头盔,
                config.zuobiao.人物面板[fbl].衣服,
                config.zuobiao.人物面板[fbl].项链,
                config.zuobiao.人物面板[fbl].武器,
                config.zuobiao.人物面板[fbl].手镯1,
                config.zuobiao.人物面板[fbl].手镯2,
                config.zuobiao.人物面板[fbl].戒指1,
                config.zuobiao.人物面板[fbl].戒指2,
                config.zuobiao.人物面板[fbl].护身符,
            ]
            for (var index = 0; index < arr.length; index++) {
                var item = arr[index];
                tools.常用操作.点击角色装备(item, true);
                sleep(random(666, 888));
            }
            tools.常用操作.关闭所有窗口();
        },
        穿装备: () => {
            var zhengliBtn = tools.补给操作.整理背包(true);
            sleep(1000, 1200);
            if (zhengliBtn.status) {
                for (let index = 1; index <= 5; index++) {
                    for (let index1 = 1; index1 <= 8; index1++) {
                        tools.执行时间戳.检测认证();
                        tools.悬浮球描述("穿戴" + index + "_" + index1 + "格");
                        tools.补给操作.点击背包格子(index, index1, zhengliBtn);
                        var tryCount = 0;
                        while (true) {
                            if (tryCount >= 3) {
                                return
                            }
                            sleep(666);
                            var r = tools.findImageClick("beibaochuandaiBtn.png");
                            if (r) {
                                break;
                            }
                            else {
                                r = tools.findImageClick("beibaochuandaiBtn1.png");
                                if (r) {
                                    break;
                                }
                                var 跳过 = tools.补给操作.判断选中格子是否跳过(true);
                                if (跳过.status) {
                                    tools.悬浮球描述(跳过.msg);
                                    break;
                                }
                                r = tools.findImageClick("beibaoshiyongBtn.png");
                                if (r) {
                                    break;
                                }
                            }
                            tryCount++;
                        }
                        sleep(random(666, 777))
                    }
                }
            }

        },
        获取匹配图片的数量: (picName) => {
            var w = device.width;
            var h = device.height;
            let img = captureScreen();
            var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${picName}`;
            var targetImg = images.read(targetImgPath);
            var r = images.matchTemplate(img, targetImg, {
                threshold: 0.85,
                max: 30
            });
            utils.recycleNull(img);
            utils.recycleNull(targetImg);
            if (r && r.matches) {
                return r.matches.length
            } else {
                return 0
            }
        },
        替换装备: () => {
            tools.悬浮球描述("开始寻找平替装备");
            tools.常用操作.关闭所有窗口();
            sleep(random(555, 666));
            tools.常用操作.打开背包();
            var r = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 333
            });
            if (!r.status) {
                return {
                    status: false,
                    err: "未获取到整理按钮"
                }
            }
            var tihuanPic = [];
            if (挂机参数.替换男重盔 == 1 || 挂机参数.替换男重盔 == "1") {
                tihuanPic.push("zhongkui_nan.png");
            }
            if (挂机参数.替换女重盔 == 1 || 挂机参数.替换女重盔 == "1") {
                tihuanPic.push("zhongkui_nv.png");
            }
            if (挂机参数.替换男灵魂 == 1 || 挂机参数.替换男灵魂 == "1") {
                tihuanPic.push("linghun_nan.png");
            }
            if (挂机参数.替换女灵魂 == 1 || 挂机参数.替换女灵魂 == "1") {
                tihuanPic.push("linghun_nv.png");
            }
            if (挂机参数.替换降魔 == 1 || 挂机参数.替换降魔 == "1") {
                tihuanPic.push("wuqi_xiangmo.png");
            }

            if (tihuanPic && tihuanPic.length > 0) {
                for (let index = 0; index < tihuanPic.length; index++) {
                    var p = tihuanPic[index];
                    sleep(random(777, 999));
                    r = tools.findImageClick(p, 0.9);
                    if (r) {
                        sleep(random(666, 999));
                        r = tools.findImageForWaitClick("beibaochuandaiBtn.png", {
                            maxTries: 6,
                            interval: 333
                        })
                    }
                }
            }
        },
        丢护身符: (格子x, 格子y, 时间戳) => {
            var fbl = `${device.width}_${device.height}`;
            var x1 = 格子x + random(-5, 5);
            var y1 = 格子y + random(-5, 5);
            var x2 = random(config.zuobiao.丢东西范围[fbl].x[0], config.zuobiao.丢东西范围[fbl].x[1]);
            var y2 = random(config.zuobiao.丢东西范围[fbl].y[0], config.zuobiao.丢东西范围[fbl].y[1]);
            gesture(时间戳, [x1, y1], [x2, y2]);
        },
    },
    验证码认证: {
        检测是否有认证: (img) => {
            if (img == null) {
                img = captureScreen();
            }
            var p = {
                x1: 440,
                y1: 351,
                x2: 920,
                y2: 555
            };
            var colorArr = [
                {
                    c1: "#7FDAFF",
                    x2: 0,
                    y2: -20,
                    c2: "#327FC6",
                    x3: 0,
                    y3: 33,
                    c3: "#FF0000",
                },
                {
                    c1: "#CBF1FF",
                    x2: 0,
                    y2: -20,
                    c2: "#68B3FF",
                    x3: 0,
                    y3: 33,
                    c3: "#FF0000",
                },
                {
                    c1: "#D0F2FF",
                    x2: 0,
                    y2: -20,
                    c2: "#69B4FF",
                    x3: 0,
                    y3: 33,
                    c3: "#FF0000",
                }
            ]
            for (let index = 0; index < colorArr.length; index++) {
                var item = colorArr[index];
                var r = images.findMultiColors(img, item.c1, [[item.x2, item.y2, item.c2], [item.x3, item.y3, item.c3]], {
                    region: [p.x1, p.y1, p.x2 - p.x1, p.y2 - p.y1],
                    threshold: 50
                });
                if (r && (r.x > 0 || r.y > 0)) {
                    return {
                        status: true,
                        value: r
                    };
                }
            }
            utils.recycleNull(img);
            return {
                status: false,
                value: null
            };
        },
        处理认证: (认证P) => {
            var r = tools.验证码认证.点开认证(认证P);
            if (r) {
                var tryCount = 0;
                while (true) {
                    if (tryCount >= 6) {
                        break;
                    }
                    if (挂机参数.云码认证 == 1) {
                        r = tools.验证码认证.云码认证();
                    }
                    else {
                        r = tools.验证码认证.超级鹰认证();
                    }
                    if (r.status) {
                        tools.验证码认证.滑动验证码(r.value.x, r.value.y);
                        sleep(1000);
                        var r = tools.常用操作.读取聊天框信息()
                        tools.常用方法.错误日志(r, 5);
                        break;
                    }
                    else {
                        tools.常用方法.错误日志(r.err, 5);
                        r = tools.findImageClick("renzhengshuaxin.png");
                        if (r) {
                            sleep(1000)
                        }
                        else {
                            tools.常用方法.错误日志("未找到renzhengshuaxin.png", 5);
                            break;
                        }
                    }
                    tryCount++;
                }
            }
            else {
                tools.常用方法.错误日志("未找到滑动条", 5);
            }
        },
        点开认证: (认证P) => {
            // var 认证P = {
            //     x: 685 + random(-3, 3),
            //     y: 485 + random(-3, 3),
            // }
            // if (r && (r.x > 0 || r.y > 0)) {
            //     click(r.x + random(12, 20), r.y + random(-3, 3))
            //     isFind = true;
            // }
            click(认证P.x + random(-5, 5), 认证P.y - random(7, 15));
            var btn = tools.findImageForWait("renzhengtuodongtiao.png", {
                maxTries: 10,
                interval: 200
            });
            return btn.status;
        },
        截图认证Base64: () => {
            var img = captureScreen();
            var 截图P = {
                x1: 409,
                y1: 132,
                x2: 852,
                y2: 576
            }
            var pic = tools.截屏裁剪(img, 截图P.x1, 截图P.y1, 截图P.x2, 截图P.y2);
            var base64Str = android.util.Base64.encodeToString(images.toBytes(pic, "png"), 0);
            utils.recycleNull(pic);
            return base64Str
        },
        超级鹰认证: () => {
            var base64Str = tools.验证码认证.截图认证Base64();
            var url = "https://upload.chaojiying.net/Upload/Processing.php";
            var res = http.post(url, {
                "user": "15070347799",
                "pass": "huhuan1754",
                "softid": "970473",
                "codetype": "9902",
                "file_base64": base64Str,
            });
            var err = "错误";
            if (res && res.statusCode == 200) {
                var r = res.body.json();
                if (r.err_no == 0) {
                    var arr = r.pic_str.split("|");
                    var result = null;
                    if (arr.length == 2) {
                        var r1 = arr[0].split(",");
                        var r2 = arr[1].split(",");
                        if (parseInt(r1[0]) > parseInt(r2[0])) {
                            result = r1;
                        }
                        else {
                            result = r2;
                        }
                        return {
                            status: true,
                            value: {
                                x: parseInt(result[0]),
                                y: parseInt(result[1])
                            }
                        }
                    }
                }
                else {
                    err = JSON.stringify(r);
                }
            } else {
                err = "请求异常";
            }
            return {
                status: false,
                err: err,
            }
        },
        云码认证: () => {
            var base64Str = tools.验证码认证.截图认证Base64();
            var url = "http://api.jfbym.com/api/YmServer/customApi";
            var res = http.post(url, {
                "type": "20225",
                "token": "7eEPW-iCCvC33NZ4vEhpFu5af7SIEG87Hz7AR5MoN3E",
                "image": base64Str,
            });
            var err = "错误";
            if (res && res.statusCode == 200) {
                var r = res.body.json();
                if (r.code == 10000) {
                    return {
                        status: true,
                        value: {
                            x: parseInt(r.data.data) + 51,
                            y: 0
                        }
                    }
                }
                else {
                    err = JSON.stringify(r);
                }
            }
            else {
                err = "请求异常";
            }
            return {
                status: false,
                err: err,
            }
        },
        滑动验证码: (x, y) => {
            var 拖动条P = {
                x: 455 + random(-1, 1),
                y: 480 + random(-3, 3),
            }
            var 截图P = {
                x1: 409,
                y1: 132,
                x2: 852,
                y2: 576
            }
            var d = random(2500, 3500);
            gestures(
                [0, d, [拖动条P.x, 拖动条P.y],
                    [截图P.x1 + x, 拖动条P.y + random(-5, 5)]
                ]
            );
        },
    },
    悬浮球描述: (text) => {
        if (text) {
            ui.run(() => {
                windowCommon.commonText.setText(text + "(" + new Date().getTime().toString().slice(-6) + ")");
            });
        }
    },
    悬浮球临时描述: (text) => {
        ui.run(() => {
            window.tempText.setText(text + "(" + new Date().getTime().toString().slice(-6) + ")");
        });
    },
    findImageForWaitClick: (fileName, options, threshold) => {
        var result = tools.findImageForWait(fileName, options, threshold);
        if (result.status && (result.img.x > 0 || result.img.y > 0)) {
            var x = result.img.x + result.size.w / 2 + random(-3, 3);
            var y = result.img.y + result.size.h / 2 + random(-3, 3);
            click(x, y)
        }
        return result;
    },
    findImageForWait: (fileName, options, threshold) => {
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
        if (threshold == null) {
            threshold = 0.7
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
            let result = tools.findImage(fileName, threshold);
            if (result.status) {
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
        let timeout, interval, maxTries, log, threshold;
        if (options) {
            timeout = options.timeout !== undefined ? options.timeout : 1000 * 60;
            interval = options.interval !== undefined ? options.interval : 500;
            maxTries = options.maxTries !== undefined ? options.maxTries : 6;
            threshold = options.threshold !== undefined ? options.threshold : 0.7;
            log = options.log !== undefined ? options.log : false;
        } else {
            timeout = 1000 * 60;
            interval = 500;
            maxTries = 6;
            threshold = 0.7;
            log = false;
        }
        let start = new Date().getTime();
        let tryCount = 0;
        while (true) {
            if (interval > 0) {
                sleep(interval);
            }
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
            var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
            var targetImg = images.read(targetImgPath);
            if (targetImg) {
                var imgSize = {
                    w: targetImg.width,
                    h: targetImg.height
                }
                var img = captureScreen();
                var r = utils.regionalFindImg2(img, targetImg, x1, y1, x2, y2, 60, 255, threshold, false, false, "");
                utils.recycleNull(img);
                utils.recycleNull(targetImg);
                if (r != null && (r.x > 0 || r.y > 0)) {
                    return {
                        status: true,
                        img: r,
                        size: imgSize
                    };
                } else {
                    if (fileName != "closeBtn.png" && fileName != "closeBtn2.png" && fileName != "zuoguaiwuBtn.png" && fileName != "zuoguaiwumanxueBtn.png") {
                        tools.悬浮球描述('找图失败' + fileName);
                    }
                    return {
                        status: false,
                        img: null,
                    }
                }
            }
            else {
                return {
                    status: false,
                    img: null,
                    err: "本地无" + fileName
                }
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
        var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
        var targetImg = images.read(targetImgPath);
        if (targetImg) {
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
            var img = captureScreen();
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
        }
        return {
            status: false,
            img: null,
            err: '未找到对应的图片'
        }
    },
    findImageArea(fileName, x1, y1, x2, y2, threshold) {
        var options = {
            threshold: 0.7
        };
        if (threshold && threshold > 0) {
            options.threshold = threshold;
        }
        var w = device.width;
        var h = device.height;
        var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
        var targetImg = images.read(targetImgPath);
        if (targetImg) {
            var imgSize = {
                w: targetImg.width,
                h: targetImg.height
            }
            var img = captureScreen();
            var r = utils.regionalFindImg2(img, targetImg, x1, y1, x2, y2, 60, 255, options.threshold, false, false, "");
            utils.recycleNull(img);
            utils.recycleNull(targetImg);
            if (r != null && (r.x > 0 || r.y > 0)) {
                return {
                    status: true,
                    img: r,
                    size: imgSize
                };
            }
        }
        return {
            status: false,
            img: null,
            err: '未找到对应的图片'
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
            if (fileName != "closeBtn.png" && fileName != "closeBtn2.png" && fileName != "zuoguaiwuBtn.png" && fileName != "zuoguaiwumanxueBtn.png") {
                tools.悬浮球描述('找图失败' + fileName);
            }
            return false
        }
    },
    findImageClick: (fileName, threshold, isLongClick) => {
        var result = tools.findImage(fileName, threshold);
        if (result.status && result.img.x > 0 && result.img.y > 0) {
            var x = result.img.x + result.size.w / 2 + random(-5, 5);
            var y = result.img.y + result.size.h / 2 + random(-5, 5);
            if (isLongClick) {
                longClick(x, y);
            }
            else {
                click(x, y)
            }
            return true
        } else {
            if (fileName != "closeBtn.png" && fileName != "closeBtn2.png") {
                tools.悬浮球描述(fileName + '找图失败')
            }
            return false
        }
    },
    获取区域文字: (x1, y1, x2, y2, param1, param2, isP1, isP2) => {
        var {
            w,
            h
        } = tools.获取屏幕高宽();
        if (x2 > w) {
            return null;
        }
        if (y2 > h) {
            return null;
        }
        var img = captureScreen();
        var r = null;
        try {
            r = utils.regionalAnalysisChart3(img, x1, y1, x2, y2, param1, param2, isP1, isP2, "");
        } catch (e) {
            toastLog('获取区域文字异常' + e)
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
tools.常用方法.初始化参数();
// 初始化文字识别插件(必须初始化才生效)
utils.initOcr("谷歌")
tools.常用方法.申请截图();
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
            tools.悬浮球描述("技术支持:宁波字节飞舞软件科技(初始化中)")
            isShowConfig = false;
            isStart = true
            win.setPosition(-10000, padding_top);
            ui.run(() => {
                win.btnStart.text("暂停")
            });
            当前总状态 = 总状态.已启动;
        }
    })
    win.btnClose.click(() => {
        isShowConfig = false
        win.setPosition(-10000, padding_top);
    });
    win.btnReset.click(() => {
        isShowConfig = false;
        win.setPosition(-10000, padding_top);
        isStart = false;
        当前总状态 = 总状态.未启动
        isShowConfig = false
        win.setPosition(-10000, padding_top);
        setTimeout(() => {
            exit();
        }, 10 * 1000);
        toastLog("10秒后执行重启")
    });
    win.btnBuJi.click(() => {
        开启强行补给 = true;
        isShowConfig = false
        win.setPosition(-10000, padding_top);
        toastLog("执行完当前任务将回城补给")
    })
    win.btnSetFouse.click(() => {
        win.requestFocus(); //设置焦点
    })
    win.btnExit.click(() => {
        engines.stopAllAndToast();
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
            case "苍月":
                checkedId = win.group1_4.getCheckedRadioButtonId();
                if (checkedId <= 0) {
                    isSave = false;
                    toast("未选择地图");
                    return false;
                }
                radioButton = win.group1_4.findViewById(checkedId);
                ditu1_1 = radioButton.attr("id").split("/")[1];
                挂机地图 = radioButton.getText();
                挂机城市 = "苍月"
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
                挂机城市 = "比奇"
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
            召唤骷髅: win.cbZhaoHuanKuLou.isChecked() ? 1 : 0,
            召唤神兽: win.cbZhaoShenShou.isChecked() ? 1 : 0,
            沿途打怪: win.cbYanTuDaGuai.isChecked() ? 1 : 0,
            地牢回城: win.cbIsDiLao.isChecked() ? 1 : 0,
            装备实际未满下线: win.cbShiJiWeiManXiaXian.isChecked() ? 1 : 0,
            // 一波怪物死亡拾取: win.cbIsYiBoSiWangSiQu.isChecked() ? 1 : 0,
            首次用符攻击: win.cbIsFuGongJi.isChecked() ? 1 : 0,
            只打满血怪: win.cbManXue.isChecked() ? 1 : 0,

            替换男重盔: win.cbTiHuanNanZhongKui.isChecked() ? 1 : 0,
            替换女重盔: win.cbTiHuanNvZhongKui.isChecked() ? 1 : 0,
            替换男灵魂: win.cbTiHuanNanLingHun.isChecked() ? 1 : 0,
            替换女灵魂: win.cbTiHuanNvLingHun.isChecked() ? 1 : 0,
            替换降魔: win.cbTiHuanXiangMo.isChecked() ? 1 : 0,

            备用男重盔: win.cbBeiYongNanZhongKui.isChecked() ? 1 : 0,
            备用女重盔: win.cbBeiYongNvZhongKui.isChecked() ? 1 : 0,
            备用斩马: win.cbBeiYongZhanMa.isChecked() ? 1 : 0,


            无蓝回城: win.cbIsWuLanHuiCheng.isChecked() ? 1 : 0,
            无飞回城: win.cbIsWuFeiHuiCheng.isChecked() ? 1 : 0,
            隐身走动: win.cbYinShenZouDong.isChecked() ? 1 : 0,
            攻击检查宝宝: win.cbJianChaBaoBao.isChecked() ? 1 : 0,
            攻击检查武器衣服: win.cbJianChaWuQi.isChecked() ? 1 : 0,
            随机跑图: win.cbSuiJiPaoTu.isChecked() ? 1 : 0,
            认证短信: win.cbRenzhengDuanXin.isChecked() ? 1 : 0,
            认证自动识别: win.cbRenzhengShiBie.isChecked() ? 1 : 0,
            云码认证: win.cbRenzhengYunMa.isChecked() ? 1 : 0,
            地图拖动: win.cbDiTuTuoDong.isChecked() ? 1 : 0,
            跟随宝宝: win.cbIsGenSuiBaoBao.isChecked() ? 1 : 0,
            挂机地图: 挂机地图,
            挂机城市: 挂机城市,
            拾取时长: parseInt(win.t_shiQuShiChang.getText()),
            拾取延时: parseInt(win.t_shiquyanshi.getText()),
            隐身数量: parseInt(win.t_YinShen.getText()),
            跟随几格: parseInt(win.t_gensuijuli.getText()),
            机器标识: win.t_jiqibiaoshi.getText(),


            检查衣服武器时间戳: parseInt(win.t_shoujihaoma.getText()),
            打怪等待: win.t_daguaidengdai.getText(),
            随机血量: parseInt(win.t_suijixueliang.getText()),
        }

        commonStorage.put("peizhi", JSON.stringify(挂机参数));
        isShowConfig = false;
        win.setPosition(-10000, padding_top);
        toast("保存成功")
    })
    win.btnRenZheng.click(() => {
        isShowConfig = false
        win.setPosition(-10000, padding_top);

        threads.start(function () {
            setTimeout(() => {
                var r = tools.findImage("xiexia1.png");
                toastLog(JSON.stringify(r));
            }, 2000)

        });
    });


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
// device.wakeUp();
// setInterval(() => {
//     updateWindowPosition();
// }, 1000);



function showWinConfig() {
    var {
        w,
        h
    } = tools.获取屏幕高宽();
    var w_ = parseInt(w * 0.95);
    var h_ = parseInt(h * 0.95);
    padding_left = parseInt(w * 0.02)
    padding_top = parseInt((h) * 0.02);
    tabW = parseInt((w_ / tabCount));
    win.setSize(w_, h_);
    win.setPosition(padding_left, padding_top);
    // win.setTouchable(true);    // 可交互
    win.tab1.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab2.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab3.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.btnStart.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));
    win.btnSave.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));
    win.btnClose.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));
    win.btnSetFouse.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));
    win.btnReset.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));
    win.btnBuJi.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));
    win.btnExit.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));
    win.btnRenZheng.setLayoutParams(android.widget.LinearLayout.LayoutParams(165, 75));

}


// while(true){
//     var r  =tools.挂机打怪.找正上锁定怪物()
//     tools.悬浮球描述(JSON.stringify(r))
//     sleep(100)
//  }


//启动程序
threads.start(function () {
    let 上次跑图时间 = new Date().getTime() - (60 * 1000);
    let 跑图时间戳 = 1.5 * 1000;
    var 开启寻怪 = false;
    while (true) {
        if (isStart) {
            var 打怪次数 = 0; //大于0则坐标移动过，需强制跑图

            if (!是否启动初始化过) {
                tools.常用方法.启动初始化();
                是否启动初始化过 = true;
            }
            if (开启强行补给) {
                开启强行补给 = false;
                toastLog("强制回城补给")
                tools.挂机打怪.回城补给在挂机("强行补给");
            }

            tools.执行时间戳.检测认证();

            var r = false;
            while (当前总状态 == 总状态.已启动 && 开启寻怪) {
                try {
                    r = tools.挂机打怪.寻找打怪(打怪次数 > 0 ? true : false);
                } catch (e) {
                    r = false;
                    toastLog("打怪异常" + e)
                }
                if (r) {
                    打怪次数++;
                    tools.悬浮球描述("继续攻击")
                    continue;
                } else {
                    break;
                }
            }


            //tools.执行时间戳.检测操作模式();

            //tools.执行时间戳.检测内挂();

            //tools.执行时间戳.检测组队模式();
            if (new Date().getTime() - 上次跑图时间 > 跑图时间戳) {
                开启寻怪 = true;
                var 当前地图 = tools.常用操作.获取人物地图();
                if (当前地图 == 挂机参数.挂机地图) {
                    try {
                        tools.挂机打怪.点击挂机坐标(打怪次数 > 0 ? true : false);
                    } catch (e) {
                        tools.常用方法.错误日志("点击挂机坐标异常", 6)
                        toastLog('点击挂机坐标异常' + e);
                    }
                }
                else {
                    tools.挂机打怪.去挂机图打怪();
                }
                上次跑图时间 = new Date().getTime();
            }






        } else {
            //tools.悬浮球描述(当前总状态);
            sleep(1000);
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
            //window.cpuText.setText("CPU: " + utils.getCpuPercentage());
            window.memText.setText(utils.getMemoryInfo());
            window.startText.setText("(" + 分钟 + ")");
            window.cangkuText.setText("存(" + 存入仓库数量 + ")");
            window.jingbiText.setText("(" + 启动金币 + ")");
            // window.statusText.setText(当前总状态);

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