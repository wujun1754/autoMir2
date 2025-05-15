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

var 检查蓝药时间戳 = 1000 * 60;
var 上次检查蓝药时间 = new Date().getTime() - (20 * 60 * 1000); // 减去 20 分钟; 

var 检查武器衣服时间戳 = 1000 * 60 * 10;
var 上次检查武器衣服时间 = new Date().getTime() - (20 * 60 * 1000); // 减去 20 分钟; 

var 检查宝宝时间戳 = 1000 * 60;
var 上次检查宝宝时间 = new Date().getTime() - (20 * 60 * 1000); // 减去 20 分钟; 


var 内挂时间戳 = 1000 * 60 * 60 * 24;
var 上次设置内挂时间 = new Date().getTime() - (1000 * 60 * 60 * 48); // 减去 1000 分钟;


var 攻击面板时间戳 = 1000 * 60 * 60 * 24;
var 上次设置攻击面板时间 = new Date().getTime() - (1000 * 60 * 60 * 48); // 减去 1000 分钟;


var 组队模式时间戳 = 1000 * 60 * 60 * 24;
var 上次设置组队模式时间 = new Date().getTime() - (1000 * 60 * 60 * 48); // 减去 1000 分钟;


var 分身面板时间戳 = 1000 * 60 * 60 * 24;
var 上次设置分身面板时间 = new Date().getTime() - (1000 * 60 * 60 * 48); // 减去 1000 分钟;


var 操作模式时间戳 = 1000 * 60 * 60 * 24;
var 上次设置操作模式时间 = new Date().getTime() - (1000 * 60 * 60 * 48); // 减去 1000 分钟;

var 上次坐标截图 = null;
var 是否用过备用衣服 = false;
var 启动金币 = "未知"
var 盛趣包名 = "com.shengqugames.mzsb"
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
    随机跑图: 0,
    无蓝回城: 0,
    无蓝等待: 1,
    替换男重盔: 0,
    替换女重盔: 0,
    替换男灵魂: 0,
    替换女灵魂: 0,
    备用男重盔: 0,
    备用女重盔: 0,
    攻击检查宝宝: 0,
    替换降魔: 0,
    是否隐身: 0,
    隐身数量: 0,
    隐身走动: 0,
    拾取时长: 15,
    挂机地图: "",
    挂机城市: "",
    机器标识: ""
}
var 挂机坐标点跑图次数 = 0;
var 开启强行补给 = false;
const 总状态 = {
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
            <text id="bbText" text="v:3.9.1" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="statusText" text="" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="memText" text="内存" textSize="8sp" textColor="#ffffff" marginRight="3" />
            <text id="cangkuText" text="仓库(0)" textSize="8sp" textColor="#ffffff" marginRight="3" />
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
                            <radio textSize="10sp" id="radio2_2" text="石墓三层" />
                            <radio textSize="10sp" id="radio2_3" text="石墓五层" />
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
                            <input id="t_lanYaoZhongBao" focusable="true" w="30sp" text="0" />
                        </horizontal>

                        <horizontal paddingLeft="6sp">
                            <text text="中蓝个" textSize="10sp" textColor="#000000" />
                            <input id="t_lanYaoZhongGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中红包" textSize="10sp" textColor="#000000" />
                            <input id="t_hongYaoZhongBao" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="中红个" textSize="10sp" textColor="#000000" />
                            <input id="t_hongYaoZhongGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="拾取时长" textSize="10sp" textColor="#000000" />
                            <input id="t_shiQuShiChang" inputType="number" w="40sp" text="0" />秒
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <checkbox id="cbIsYinShen" text="隐身" textSize="10sp" />
                            <input id="t_YinShen" focusable="true" w="30sp" text="0" />
                        </horizontal>
                    </horizontal>

                    <horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="随机包" textSize="10sp" textColor="#000000" />
                            <input id="t_suiJiBao" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="随机个" textSize="10sp" textColor="#000000" />
                            <input id="t_suiJiGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="地牢个" textSize="10sp" textColor="#000000" />
                            <input id="t_diLaoGe" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="修复油" textSize="10sp" textColor="#000000" />
                            <input id="t_xiuFuYou" inputType="number" w="30sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="护身符大" textSize="10sp" textColor="#000000" />
                            <input id="t_hushenhu" inputType="number" w="40sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="机器标识" textSize="10sp" textColor="#000000" />
                            <input id="t_jiqibiaoshi" inputType="number" w="70sp" text="0" />
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
                            <checkbox id="cbIsWuLanDengDai" text="无蓝等待" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsFenShen" text="补给点分身" textSize="10sp" />
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
                            <checkbox id="cbIsFuGongJi" text="首攻用符" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                    <horizontal>




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
                            <checkbox id="cbIsYiBoSiWangSiQu" text="一波怪死拾取" textSize="10sp" />
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
                            <checkbox id="cbYinShenZouDong" text="隐身走动" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbJianChaBaoBao" text="攻击检查宝宝" textSize="10sp" />
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
                <button id="btnClose" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="关闭" />
            </horizontal>
            <horizontal paddingLeft="3">
                <button id="btnBuJi" textSize="12sp" text="回城补给" style="Widget.AppCompat.Button.Colored" />
                <button id="btnSetFouse" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="焦点" />
                <button id="btnExit" textSize="12sp" style="Widget.AppCompat.Button.Colored" text="退出程序" />
            </horizontal>
        </vertical>

    </frame>
);


var tools = {
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
        if (挂机参数.是否隐身 == 1 || 挂机参数.是否隐身 == "1") {
            win.cbIsYinShen.setChecked(true);
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
        if (挂机参数.无蓝等待 == 1 || 挂机参数.无蓝等待 == "1") {
            win.cbIsWuLanDengDai.setChecked(true);
        }
        if (挂机参数.备用男重盔 == 1 || 挂机参数.备用男重盔 == "1") {
            win.cbBeiYongNanZhongKui.setChecked(true);
        }
        if (挂机参数.备用女重盔 == 1 || 挂机参数.备用女重盔 == "1") {
            win.cbBeiYongNvZhongKui.setChecked(true);
        }
        if (挂机参数.隐身走动 == 1 || 挂机参数.隐身走动 == "1") {
            win.cbYinShenZouDong.setChecked(true);
        }
        if (挂机参数.攻击检查宝宝 == 1 || 挂机参数.攻击检查宝宝 == "1") {
            win.cbJianChaBaoBao.setChecked(true);
        }
        if (挂机参数.随机跑图 == 1 || 挂机参数.随机跑图 == "1") {
            win.cbSuiJiPaoTu.setChecked(true);
        }
    },
    发送邮件: (subject, body) => {
        app.sendEmail({
            email: ["175417739@qq.com"],
            subject: subject + "(" + 挂机参数.机器标识 + ")",
            text: body
        });
    },
    重启游戏: () => {
        tools.退出游戏();
        sleep(2000);
        launch(盛趣包名);
        tools.悬浮球描述("等待游戏启动中....");
        sleep(2000);

        var timeout = 1000 * 60 * 30;
        var start = new Date().getTime();
        var 是否找隐私 = true;

        while (true) {
            if (new Date().getTime() - start > timeout) {
                tools.错误日志("重启游戏失败,loginquedingBtn.png找不到", 3);
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
            tools.错误日志("重启游戏失败,kaishiyouxiBtn.png找不到", 3);
            return false;
        }

        r = tools.findImageForWaitClick("kaishiyouxi.png", { //开始
            maxTries: 60 * 10,
            timeout: 1000 * 60 * 10,
            interval: 1000
        });
        if (!r.status) {
            tools.错误日志("重启游戏失败,kaishiyouxi.png找不到", 3);
            return false;
        }

        timeout = 1000 * 60 * 30;
        start = new Date().getTime();
        tryCount = 0;

        while (true) {
            tryCount++;
            if (new Date().getTime() - start > timeout) {
                tools.错误日志("重启游戏失败,yijianxiaoTuiBtn.png找不到", 3);
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
    退出游戏: () => {
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
    错误日志: (text, type) => {
        var url = "http://183.249.91.105:8001/api/api/errzuobiao";
        var res = http.post(url, {
            "result": text,
            "type": type
        });
        return res.body.string();
    },
    常用操作: {
        截图当前坐标: () => {
            var fbl = `${device.width}_${device.height}`;
            var p = config.zuobiao.人物坐标范围精确[fbl];
            return tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
        },
        打开角色: () => {
            var r = tools.findImageForWaitClick("jiaoseBtn.png", {
                maxTries: 10,
                interval: 200
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
        点击召唤骷髅: () => {
            tools.常用操作.点击人物();
            for (let index = 0; index < 5; index++) {
                tools.findImageClick("zhaohuankulouBtn.png");
                sleep(500)
            }
        },
        点击召唤神兽: () => {
            tools.常用操作.点击人物();
            // var r = tools.findImageForWaitClick("zhaohuanshenshouBtn.png", {
            //     maxTries: 5,
            //     interval: 666
            // });
            for (let index = 0; index < 5; index++) {
                tools.findImageClick("zhaohuanshenshouBtn.png");
                sleep(500)
            }
        },
        获取角色面板: () => {
            var r = tools.findImageForWaitClick("rewumianbanBtn.png", {
                maxTries: 10,
                interval: 200
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
        启动隐身: () => {
            if (挂机参数.隐身走动 == 1) {
                tools.人物移动.随机走一步(random(888, 1111));
            }
            for (let index = 0; index < 5; index++) {
                tools.findImageClick("yinshenBtn.png");
                sleep(500)
            }
        },
        开启组队: () => {
            sleep(random(666, 888));
            var p = config.zuobiao.按钮集合[fbl].组队;
            click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
            tools.findImageForWaitClick("zuduicloseBtn.png", {
                maxTries: 6,
                interval: 333
            }, 0.9);
            tools.常用操作.关闭所有窗口();
        },
        设置内挂: () => {
            var 高亮显血自己 = config.zuobiao.设置面板[fbl].高亮显血自己;
            var 高亮显血组队 = config.zuobiao.设置面板[fbl].高亮显血组队;
            var 血量加药 = config.zuobiao.设置面板[fbl].血量加药;
            var 随机保护 = config.zuobiao.设置面板[fbl].随机保护;
            sleep(555)
            var r = tools.findImageForWaitClick("setting.png", {
                maxTries: 10,
                interval: 200
            })
            if (!r.status) {
                return;
            }
            r = tools.findImageForWaitClick("setting_jiben.png", {
                maxTries: 10,
                interval: 200
            })
            r = tools.findImageAreaForWait("setting_select.png", 高亮显血自己.x[0], 高亮显血自己.y[0], 高亮显血自己.x[1], 高亮显血自己.y[1], {
                maxTries: 5,
                interval: 200
            })
            if (!r.status) {
                var x = 高亮显血自己.x[0] + ((高亮显血自己.x[1] - 高亮显血自己.x[0]) / 2) + random(-3, 3);
                var y = 高亮显血自己.y[0] + ((高亮显血自己.y[1] - 高亮显血自己.y[0]) / 2) + random(-3, 3);
                click(x, y)
                sleep(random(333, 666))
            }

            r = tools.findImageAreaForWait("setting_select.png", 高亮显血组队.x[0], 高亮显血组队.y[0], 高亮显血组队.x[1], 高亮显血组队.y[1], {
                maxTries: 5,
                interval: 200
            })
            if (!r.status) {
                var x = 高亮显血组队.x[0] + ((高亮显血组队.x[1] - 高亮显血组队.x[0]) / 2) + random(-3, 3);
                var y = 高亮显血组队.y[0] + ((高亮显血组队.y[1] - 高亮显血组队.y[0]) / 2) + random(-3, 3);
                click(x, y)
                sleep(random(666, 999))
            }
            r = tools.findImageForWaitClick("setting_baohu.png", {
                maxTries: 10,
                interval: 200
            })
            r = tools.findImageAreaForWait("setting_select.png", 血量加药.x[0], 血量加药.y[0], 血量加药.x[1], 血量加药.y[1], {
                maxTries: 5,
                interval: 200
            })
            if (!r.status) {
                var x = 血量加药.x[0] + ((血量加药.x[1] - 血量加药.x[0]) / 2) + random(-3, 3);
                var y = 血量加药.y[0] + ((血量加药.y[1] - 血量加药.y[0]) / 2) + random(-3, 3);
                click(x, y)
                sleep(random(666, 999))
            }

            r = tools.findImageAreaForWait("setting_select.png", 随机保护.x[0], 随机保护.y[0], 随机保护.x[1], 随机保护.y[1], {
                maxTries: 5,
                interval: 200
            })
            if (!r.status) {
                var x = 随机保护.x[0] + ((随机保护.x[1] - 随机保护.x[0]) / 2) + random(-3, 3);
                var y = 随机保护.y[0] + ((随机保护.y[1] - 随机保护.y[0]) / 2) + random(-3, 3);
                click(x, y)
                sleep(random(999, 1200))
            }
            tools.常用操作.关闭所有窗口();
        },
        初始化挂机: () => {
            let start = new Date().getTime();
            tools.常用操作.关闭所有窗口();
            上次检查蓝药时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
            上次检查武器衣服时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
            上次检查宝宝时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
            上次设置内挂时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
            上次设置攻击面板时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
            上次设置组队模式时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
            上次设置分身面板时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
            上次设置操作模式时间 = start - (1000 * 60 * 60 * 48); // 减去 48小时
        },
        初始化攻击面板: () => {
            var r = tools.findImage("zuoguaiwuBtnTip0.png", 0.7)
            var p = config.zuobiao.左攻击面板[fbl];
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }

            r = tools.findImage("zuoguaiwuBtnTip1.png", 0.7)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                return true;
            }

            r = tools.findImage("zuozuduiBtnTip0.png", 0.7)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                click(random(p.切换.x[0], p.切换.x[1]), random(p.切换.y[0], p.切换.y[1]));
                sleep(random(1500, 2000))
                click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }

            r = tools.findImage("zuozuduiBtnTip1.png", 0.7)
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
        点击挂机坐标: (是否强制跑图) => {
            var 是否跑图 = false;
            if (是否强制跑图) {
                是否跑图 = true;
            }
            else if (上次坐标截图 == null) {
                是否跑图 = true;
                上次坐标截图 = tools.常用操作.截图当前坐标();
            }
            else {
                var r = tools.跑图坐标是否变化();
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
            var 挂机坐标s = tools.常用操作.获取挂机坐标();
            if (!挂机坐标s.status) {
                return
            }
            if (!是否跑图) {
                return;
            }
            tools.常用操作.打开大地图();
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

            tools.悬浮球描述(msg);
            var closeImg = null;
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 222
            })
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                return;
            }
            var x = closeImg.x + random(r.x[0], r.x[1]);
            var y = closeImg.y + random(r.y[0], r.y[1]);
            click(x, y)
            tools.常用操作.关闭所有窗口(false, random(555, 666));
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
                    parts = null;
                }
                if (parts.length == 2 && parts[0] > 0 && parts[1] > 0) {
                    return {
                        x: parseInt(parts[0]),
                        y: parseInt(parts[1])
                    }
                } else {
                    tools.错误日志(JSON.stringify(result), 1);
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
            sleep(666);
            var r = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 6,
                interval: 666
            })
            if (r.status) {
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
            var smallImg = tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
            try {
                r = ocrPladderOCR.detect(smallImg);
            } catch (e) {
                r = null;
            }
            utils.recycleNull(smallImg);
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
        获取装备持久: () => {
            var result = {
                武器: null,
                衣服: null
            };
            var 角色 = tools.常用操作.打开角色();
            if (!角色.status) return result
            var 角色面板 = tools.常用操作.获取角色面板();
            if (!角色面板.status) return result
            var 装备属性明细 = config.zuobiao.人物面板[fbl].装备属性明细;
            var 卸下按钮 = tools.常用操作.点击角色面板_武器(角色面板.img);



            if (卸下按钮.status) {
                var p = 卸下按钮.img;
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y, p.x, p.y + 装备属性明细.y);
                let r = ocrPladderOCR.detect(img);
                result.武器 = tools.常用操作.根据面板获取持久(r);
                if (result.武器) {
                    tools.悬浮球描述(JSON.stringify(result.武器));
                }
            }

            卸下按钮 = tools.常用操作.点击角色面板_衣服(角色面板.img);
            if (卸下按钮.status) {
                var p = 卸下按钮.img;
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y, p.x, p.y + 装备属性明细.y);
                let r = ocrPladderOCR.detect(img);
                result.衣服 = tools.常用操作.根据面板获取持久(r);
                if (result.衣服) {
                    tools.悬浮球描述(JSON.stringify(result.衣服));
                }
            }

            tools.常用操作.关闭所有窗口(true);
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
        检测宝宝: () => {
            var tryCount = 0;
            while (true) {
                if (tryCount >= 12) {
                    break;
                }
                var r = tools.findImageClick("chongwuBtn.png");
                sleep(555)
                if (r) {
                    r = tools.常用操作.读取聊天框最后一行信息();
                    tools.悬浮球描述(r + "(" + tryCount + ")");
                    if ((r.indexOf("行") >= 0 || r.indexOf("动") >= 0 || r.indexOf("属") >= 0) && (r.indexOf("攻") >= 0 || r.indexOf("击") >= 0)) {
                        return true;
                    }
                }
                tryCount++;
            }
            return false;
        },
        使用备用装备: (pic) => {
            var isok = false;
            tools.常用操作.关闭所有窗口();
            sleep(666);
            tools.常用操作.打开背包();
            var r = tools.findImageForWaitClick(pic, {
                maxTries: 10,
                interval: 333
            })
            if (r.status) {
                r = tools.findImageForWaitClick("beibaochuandaiBtn.png", {
                    maxTries: 10,
                    interval: 200
                })
                if (r.status) {
                    isok = true;
                }
            }
            return isok;
        },
        检查武器衣服持久: () => {
            // var 人物所在 = tools.常用操作.获取人物地图();
            // if (人物所在 == "比奇城" || 人物所在 == "土城") {
            //     return true;
            // }
            var r = tools.常用操作.获取装备持久();
            if (当前总状态 == 总状态.已启动 && 挂机参数.衣服持久0回程 == 1) {
                if (r && r.衣服 && r.衣服.剩持久 <= 2) {
                    if (挂机参数.备用男重盔 == 1 && !是否用过备用衣服) {
                        r = tools.常用操作.使用备用装备("zhongkui_nan.png");
                        if (r) {
                            是否用过备用衣服 = true;
                        }
                        else {
                            return true;
                        }
                    }
                    else if (挂机参数.备用女重盔 == 1 && !是否用过备用衣服) {
                        r = tools.常用操作.使用备用装备("zhongkui_nv.png");
                        if (r) {
                            是否用过备用衣服 = true;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
                }
            }
            if (当前总状态 == 总状态.已启动 && r && r.武器 && r.武器.剩持久 <= 2) {
                var isOk = tools.喝修复油();
                if (!isOk) {
                    if (挂机参数.武器持久0回程 == 1) {
                        toastLog("武器持久=" + r.武器.剩持久 + "回城")
                        return true;
                    }
                }
            }
            if (当前总状态 == 总状态.已启动) {
                // var r1 = tools.常用操作.检查背包是否有东西("5_7");
                // if (r1) {
                //     return true;
                // }
            }
            tools.常用操作.关闭所有窗口();
            return false;

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
                maxTries: 10,
                interval: 333
            });
            return r.status;
        },
        检测是否有蓝药: () => {
            if (当前总状态 == 总状态.已启动) {
                var r = tools.findImageForWait("lanyaoge.png", { //药品格子没蓝就回
                    maxTries: 5,
                    interval: 200
                });
                if (r.status) {
                    return true;
                }

                // tools.常用操作.关闭所有窗口();
                // tools.常用操作.打开背包();
                // r = tools.findImageForWait("lanyaoge.png", {
                //     maxTries: 5,
                //     interval: 300
                // });
                // if (r.status) {
                //     return true;
                // }
                // r = tools.findImageForWait("lanyaobao.png", {
                //     maxTries: 5,
                //     interval: 300
                // });
                // if (r.status) {
                //     return true;
                // }
            }
            return false;
        },
        关闭所有窗口: (isClick, time) => {
            if (time == null) {
                time = 666;
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
    处理地图错别字: (text) => {
        if (!text) return text;
        text = text.replace("吉", "古");
        if ((text.indexOf("人") >= 0 || text.indexOf("兽") >= 0) && (text.indexOf("古") >= 0 || text.indexOf("墓") >= 0)) {
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
        else if (text.indexOf("灯笼屋") >= 0) {
            text = "铁灯笼屋"
        }
        else if (text.indexOf("苍月岛") >= 0) {
            text = "苍月岛"
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
        else if (text.indexOf("阴") >= 0 && text.indexOf("森") >= 0 && text.indexOf("石") >= 0 && text.indexOf("屋") >= 0) {
            text = "阴森石屋"
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
        else if ((text.indexOf("骨") >= 0 || text.indexOf("魔") >= 0) && (text.indexOf("洞") >= 0 || text.indexOf("层") >= 0)) {
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
    去挂机图打怪: (isTwo) => {
        if (当前总状态 == 总状态.已启动 && isTwo) {
            tools.常用操作.初始化挂机();
        }
        if (当前总状态 == 总状态.已启动) {
            tools.人物移动.去挂机地图Loop();
        }
        if (当前总状态 == 总状态.已启动) {
            tools.常用操作.初始化挂机();
        }
    },
    悬浮球描述: (text) => {
        ui.run(() => {
            windowCommon.commonText.setText(text);
        });
    },
    悬浮球临时描述: (text) => {
        ui.run(() => {
            window.tempText.setText(text);
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
        路由分组: () => {
            var 当前地图 = null;
            var routes = null;
            while (true) {
                当前地图 = tools.常用操作.获取人物地图();
                try {
                    routes = config.地图路由[当前地图][挂机参数.挂机地图];
                } catch (error) {
                    routes = null;
                }
                if (routes != null && routes.length > 0) {
                    break;
                }
                else {
                    tools.悬浮球描述("获取路由失败,重试中");
                    tools.人物移动.随机走一步(random(1500, 3500));
                    sleep(1000);
                }
            }



            let result = [];
            let currentGroup = [];
            var 大地图坐标 = null;
            if (挂机参数.挂机城市 == "比奇") {
                大地图坐标 = config.zuobiao.比奇大地图偏移[fbl];
            } else if (挂机参数.挂机城市 == "盟重") {
                大地图坐标 = config.zuobiao.盟重大地图偏移[fbl];
            }
            routes.forEach(route => {
                var r = 大地图坐标[route[0]];
                if (r.是否是断点 === true) {
                    if (currentGroup.length > 0) {
                        result.push(currentGroup); // 完成一个断点组，保存并开始新的组
                        currentGroup = []; // 清空当前组
                    }
                    currentGroup.push(route); // 新的断点开始新的组
                } else {
                    currentGroup.push(route); // 不是断点的放入当前组
                }
            });
            if (currentGroup.length > 0) {
                result.push(currentGroup);
            }
            return result;
        },
        使用地牢: () => {
            var isOk = false;
            tools.常用操作.关闭所有窗口();
            tools.常用操作.打开背包();
            sleep(666)
            var 地牢 = config.找色[fbl].地牢;
            var img = captureScreen();
            var r = images.findMultiColors(img, 地牢[0].color, [[地牢[1].x, 地牢[1].y, 地牢[1].color], [地牢[2].x, 地牢[2].y, 地牢[2].color]], {
                threshold: 40
            });
            if (r && r.x > 0 && r.y > 0) {
                click(r.x + random(5, 10), r.y + random(5, 10));
                if (r.y < config.zuobiao.药品格子面板[fbl].y1) {
                    tools.findImageForWaitClick("shiyongBtn.png", {
                        maxTries: 6,
                        interval: 333
                    });
                }
                isOk = true;
            }
            utils.recycleNull(img);
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
        苍月安全区到小贩: (人物坐标) => {
            var 小贩坐标 = config.zuobiao.苍月小贩坐标;
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
        去苍月小贩Loop: () => {
            while (当前总状态 == 总状态.已启动) {
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 当前地图 = tools.常用操作.获取人物地图();
                var 安全区坐标范围 = config.zuobiao.苍月安全区坐标范围;
                if (人物坐标 != null && 当前地图 != null && 当前地图 == "苍月岛" && 人物坐标.x > 安全区坐标范围.x1 - 15 && 人物坐标.x < 安全区坐标范围.x2 + 15 && 人物坐标.y > 安全区坐标范围.y1 - 15 && 人物坐标.y < 安全区坐标范围.y2 + 15) {
                    tools.人物移动.苍月安全区到小贩(人物坐标);
                    var 小贩坐标 = config.zuobiao.苍月小贩坐标;
                    人物坐标 = tools.常用操作.获取人物坐标();
                    if (人物坐标 != null && Math.abs(人物坐标.x - 小贩坐标.x) <= 1 && Math.abs(人物坐标.y - 小贩坐标.y) <= 1) {
                        toastLog("到达小贩NPC");
                        break;
                    } else {
                        toastLog("未找到小贩NPC");
                    }
                } else {
                    tools.人物移动.去苍月老兵Loop();
                }
                sleep(5000)
            }
        },
        去盟重小贩Loop: () => {
            while (当前总状态 == 总状态.已启动) {
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
            while (当前总状态 == 总状态.已启动) {
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
        去比奇老兵: (当前地图) => {
            tools.常用操作.打开大地图();
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                var fbl = `${device.width}_${device.height}`;
                var routes = config.地图路由[当前地图]["回比奇老兵"][0];
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
                tools.常用操作.检测是否小退(true);
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去比奇老兵Loop: () => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 历史坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            var 当前地图 = tools.常用操作.获取人物地图();
            var routesGroup = null;
            try {
                routesGroup = config.地图路由[当前地图]["回比奇老兵"];
            } catch (e) {
                routesGroup = null;
            }
            if (routesGroup == null || routesGroup.length <= 0) {
                return;
            }
            var 安全区坐标范围 = config.zuobiao.比奇安全区坐标范围;
            for (var index = 0; index < routesGroup.length; index++) {
                while (当前总状态 == 总状态.已启动) {
                    当前地图 = tools.常用操作.获取人物地图();
                    var 人物坐标 = tools.常用操作.获取人物坐标();
                    tools.悬浮球描述("人物坐标:" + JSON.stringify(人物坐标));
                    if (人物坐标 != null && 当前地图 == "比奇城" && 人物坐标.x >= 安全区坐标范围.x1 - 5 && 人物坐标.x <= 安全区坐标范围.x2 + 5 && 人物坐标.y >= 安全区坐标范围.y1 - 5 && 人物坐标.y <= 安全区坐标范围.y2 + 5) {
                        sleep(3000);
                        break; //说明到了安全区
                    }
                    if (人物坐标 == null && tryCount < 5) {
                        tryCount++;
                        sleep(1000 * 3);
                        continue;
                    }
                    if (tryCount >= 5 || 历史坐标 == null || (人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y)) {
                        tools.人物移动.随机走一步(random(1500, 2500));
                        sleep(1000 * 2);
                        toastLog('开始跑图(去比奇老兵)');
                        try {
                            tools.人物移动.去比奇老兵(当前地图);
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
            }

            toastLog("到达目的地比奇老兵Loop");
            return;

        },
        去盟重老兵: (当前地图) => {
            tools.常用操作.打开大地图();
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                var fbl = `${device.width}_${device.height}`;
                var routes = config.地图路由[当前地图]["回盟重老兵"][0];
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
                tools.常用操作.检测是否小退(true);
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去盟重老兵Loop: () => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 历史坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            var 当前地图 = tools.常用操作.获取人物地图();
            var routesGroup = null;
            try {
                routesGroup = config.地图路由[当前地图]["回盟重老兵"];
            } catch (e) {
                routesGroup = null;
            }
            if (routesGroup == null || routesGroup.length <= 0) {
                return;
            }
            var 安全区坐标范围 = config.zuobiao.盟重安全区坐标范围;
            for (var index = 0; index < routesGroup.length; index++) {
                while (当前总状态 == 总状态.已启动) {
                    当前地图 = tools.常用操作.获取人物地图();
                    var 人物坐标 = tools.常用操作.获取人物坐标();
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
                    if (tryCount >= 5 || 历史坐标 == null || (人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y)) {
                        tools.人物移动.随机走一步(random(1500, 2500));
                        sleep(1000 * 2);
                        toastLog('开始跑图(去盟重老兵)');
                        try {
                            tools.人物移动.去盟重老兵(当前地图);
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
            }
            toastLog("到达目的地盟重老兵Loop");
            return;

        },
        去苍月老兵: (当前地图) => {
            tools.常用操作.打开大地图();
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 666
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                var fbl = `${device.width}_${device.height}`;
                var routes = config.地图路由[当前地图]["回苍月老兵"][0];
                var 大地图坐标 = config.zuobiao.苍月大地图偏移[fbl];
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
                tools.常用操作.检测是否小退(true);
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去苍月老兵Loop: () => {
            //tools.人物移动.去比奇挂机图(挂机地图);
            var 历史坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            var 当前地图 = tools.常用操作.获取人物地图();
            var routesGroup = null;
            try {
                routesGroup = config.地图路由[当前地图]["回苍月老兵"];
            } catch (e) {
                routesGroup = null;
            }
            if (routesGroup == null || routesGroup.length <= 0) {
                return;
            }
            var 安全区坐标范围 = config.zuobiao.苍月安全区坐标范围;
            for (var index = 0; index < routesGroup.length; index++) {
                while (当前总状态 == 总状态.已启动) {
                    当前地图 = tools.常用操作.获取人物地图();
                    var 人物坐标 = tools.常用操作.获取人物坐标();
                    tools.悬浮球描述("人物坐标:" + JSON.stringify(人物坐标));
                    if (人物坐标 != null && 当前地图 == "苍月岛" && 人物坐标.x >= 安全区坐标范围.x1 - 5 && 人物坐标.x <= 安全区坐标范围.x2 + 5 && 人物坐标.y >= 安全区坐标范围.y1 - 5 && 人物坐标.y <= 安全区坐标范围.y2 + 5) {
                        sleep(3000);
                        break; //说明到了安全区
                    }
                    if (人物坐标 == null && tryCount < 5) {
                        tryCount++;
                        sleep(1000 * 3);
                        continue;
                    }
                    if (tryCount >= 5 || 历史坐标 == null || (人物坐标.x == 历史坐标.x && 人物坐标.y == 历史坐标.y)) {
                        tools.人物移动.随机走一步(random(1500, 2500));
                        sleep(1000 * 2);
                        toastLog('开始跑图(去苍月老兵)');
                        try {
                            tools.人物移动.去苍月老兵(当前地图);
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
            }
            toastLog("到达目的地苍月老兵Loop");
            return;

        },
        去挂机地图: (目的地, 当前地图) => {

            tools.常用操作.点击人物();
            sleep(888);
            tools.常用操作.打开大地图();
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 222
            });
            if (closeBtn.status) {
                var closeImg = closeBtn.img;
                toastLog(当前地图 + ":" + 目的地)
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
                sleep(random(1200, 1666));
                tools.常用操作.关闭所有窗口();
            } else {
                tools.常用操作.检测是否小退(true);
                toastLog("未找到closeBtn");
                return;
            }
            return;
        },
        去挂机地图Loop: () => {
            var 是否跑图 = false;
            var 是否召唤宝宝 = false;
            tools.常用操作.关闭所有窗口();
            sleep(888)
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
            for (let index = 0; index < routesGroup.length; index++) {
                var routes = routesGroup[index];
                var last = routes[routes.length - 1];
                var 目的地 = (index == routesGroup.length - 1 ? last[0] : last[1]);
                while (当前总状态 == 总状态.已启动) {
                    当前地图 = tools.常用操作.获取人物地图();
                    var 是否沿途打怪 = config.沿途打怪点.some(item => item === 当前地图)
                    if (当前地图 == 目的地) { //说明到目的地
                        break;
                    }
                    if (上次坐标截图 == null) {
                        是否跑图 = true;
                        上次坐标截图 = tools.常用操作.截图当前坐标();
                    }
                    else {
                        var r = tools.跑图坐标是否变化()
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
                            toastLog('跑图异常' + error)
                        }

                    }
                    if (!是否召唤宝宝) {
                        if (挂机参数.召唤骷髅 == 1 || 挂机参数.召唤骷髅 == "1") {
                            tools.常用操作.点击召唤骷髅();
                        }
                        if (挂机参数.召唤神兽 == 1 || 挂机参数.召唤神兽 == "1") {
                            tools.常用操作.点击召唤神兽();
                        }

                        是否召唤宝宝 = true;
                    }
                    if (是否沿途打怪) {
                        try {
                            tools.寻找打怪();
                        } catch (e) {
                            toastLog("半路寻找打怪异常" + e)
                        }
                    }

                    sleep(1000 * 2.5);
                }
            }
            tools.常用操作.点击人物();
            sleep(random(666, 999));
            toastLog("到达目的地挂机地图Loop");
            return;
        },
        盟重去地下秘密通道: () => {
            tools.常用操作.关闭所有窗口();
            tools.悬浮球描述("开始去地下秘密通道");
            var 挂机地图 = 挂机参数.挂机地图;
            var 历史坐标 = tools.常用操作.获取人物坐标();
            var tryCount = 0;
            var 跑图次数 = 1;
            while (当前总状态 == 总状态.已启动) {
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
            while (当前总状态 == 总状态.已启动) {
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
            threshold: 30
        });
        utils.recycleNull(img);
        return r;
    },
    找非满血怪: () => {
        let fbl = `${device.width}_${device.height}`;
        var p = config.zuobiao.左攻击面板[fbl].怪物集合;
        var img = captureScreen();
        var r = images.findMultiColors(img, p.找色非满血[0].color, [[p.找色非满血[1].x, p.找色非满血[1].y, p.找色非满血[1].color]], {
            region: [p.x[0], p.y[0], p.x[1] - p.x[0], p.y[1] - p.y[0]],
            threshold: 35
        });
        utils.recycleNull(img);
        return r;
    },
    寻找打怪: (直接攻击) => {
        //tools.悬浮球描述("找怪(" + new Date().getSeconds() + ")");
        var p2 = config.zuobiao.锁定怪物标识范围[fbl];
        var 按钮集合 = config.zuobiao.按钮集合[fbl];
        var 选择怪物攻击 = config.zuobiao.左攻击面板[fbl].选择怪物攻击;
        var isFind = false;
        var isShiQu = false;
        var r = null;
        if (直接攻击) {
            click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
            r = tools.findImageAreaForWait("zhongjianguaiwuBtn.png", p2.x[0], p2.y[0], p2.x[1], p2.y[1], {
                maxTries: 3,
                interval: 150
            })
            if (r.status) {
                isFind = true;
            }
        }
        if (!isFind) {
            if (挂机参数.只打满血怪 == 1 || 挂机参数.只打满血怪 == "1") {
                r = tools.找满血怪();
                if (r == null) {
                    sleep(200);
                    r = tools.找满血怪();
                }
                if (r && (r.x > 0 || r.y > 0)) {
                    click(r.x + random(5, 30), r.y + random(-3, 3))
                    isFind = true;
                }
            }
            else {
                r = tools.找非满血怪();
                if (r == null) {
                    sleep(200);
                    r = tools.找非满血怪();
                }
                if (r && (r.x > 0 || r.y > 0)) {
                    click(random(选择怪物攻击.x[0], 选择怪物攻击.x[1]), random(选择怪物攻击.y[0], 选择怪物攻击.y[1]))
                    isFind = true;
                }
                // r = tools.findImageAreaForWaitClick("zuoguaiwuBtn.png", 怪物集合.x[0], 怪物集合.y[0], 怪物集合.x[1], 怪物集合.y[1], {
                //     maxTries: 3,
                //     interval: 200
                // })

                //r = tools.findImageAreaClick("zuoguaiwuBtn.png", 怪物集合.x[0], 怪物集合.y[0], 怪物集合.x[1], 怪物集合.y[1]);
                // if (r) {
                //     isFind = true;
                // }
            }
        }
        if (isFind) {
            tools.悬浮球描述("攻击中");
            if (直接攻击) {
                isShiQu = true;
            }
            else {
                if (挂机参数.首次用符攻击 == 1) {
                    longClick(random(按钮集合.打符.x[0], 按钮集合.打符.x[1]), random(按钮集合.打符.y[0], 按钮集合.打符.y[1]));
                    sleep(1000);
                }
                click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                r = tools.findImageAreaForWait("zhongjianguaiwuBtn.png", p2.x[0], p2.y[0], p2.x[1], p2.y[1], {
                    maxTries: 3,
                    interval: 200
                })
                if (r.status) {
                    isShiQu = true;
                }
                else {
                    tools.悬浮球描述("锁定失败");
                    isFind = false;
                }
            }

        }
        if (isShiQu) {
            var timeout = 1000 * 60 * 10;
            var 走动时间戳 = 1000 * 5;
            var 上一次走动 = new Date().getTime();

            var 攻击时间戳 = 1000 * 5;
            var 上一次攻击 = new Date().getTime();

            var 隐身时间戳 = 1000 * 10;
            var 上一次隐身 = new Date().getTime() - (60 * 1000);
            var 是否点击过隐身 = false;
            let start = new Date().getTime();
            var 怪物 = [];
            var 怪物为0次数 = 0;
            while (当前总状态 == 总状态.已启动) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > timeout) {
                    tools.常用操作.点击挂机坐标(true);
                    sleep(1000 * 10);
                    break;
                }
                r = tools.findImageArea("zhongjianguaiwuBtn.png", p2.x[0], p2.y[0], p2.x[1], p2.y[1])
                if (r.status) {
                    怪物 = tools.获取身边怪物数据();
                    if (挂机参数.是否隐身 == 1 && (new Date().getTime() - 上一次隐身 >= 隐身时间戳 || !是否点击过隐身)) {
                        if (怪物 && 怪物.length >= parseInt(挂机参数.隐身数量)) {
                            tools.常用操作.启动隐身();
                            是否点击过隐身 = true;
                            sleep(666);
                            //click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                            上一次隐身 = new Date().getTime();
                        }
                    }

                    // if (怪物.length <= 0 && new Date().getTime() - 上一次走动 >= 走动时间戳) {
                    //     怪物为0次数++;
                    //     if (怪物为0次数 > 1) {
                    //         tools.人物移动.随机走一步(random(777, 999));
                    //         click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                    //         上一次走动 = new Date().getTime();
                    //         怪物为0次数 = 0;
                    //     }
                    // }

                    if (new Date().getTime() - 上一次攻击 >= 攻击时间戳) {
                        click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                        上一次攻击 = new Date().getTime();
                    }

                    if (挂机参数.攻击检查宝宝 == 1 && new Date().getTime() - 上次检查宝宝时间 > 检查宝宝时间戳) {
                        if (挂机参数.召唤骷髅 == 1 || 挂机参数.召唤神兽 == 1) {
                            tools.悬浮球描述("检查宝宝开始");
                            var r = tools.常用操作.检测宝宝();
                            if (!r) {
                                if (挂机参数.召唤骷髅 == 1) {
                                    tools.常用操作.点击召唤骷髅();
                                }
                                if (挂机参数.召唤神兽 == 1) {
                                    tools.常用操作.点击召唤神兽();
                                }
                            }
                            上次检查宝宝时间 = new Date().getTime();
                            tools.悬浮球描述("检查宝宝结束");
                        }
                    }

                    if (new Date().getTime() - 上次检查蓝药时间 > 检查蓝药时间戳 && 挂机参数.无蓝回城 == 1) {
                        tools.悬浮球描述("检查蓝药开始");
                        var r = tools.常用操作.检测是否有蓝药();
                        if (!r) {
                            r = tools.常用操作.检测是否在游戏画面();
                            if (r) {
                                tools.回城补给在挂机();
                            }
                        }
                        上次检查蓝药时间 = new Date().getTime();
                        tools.悬浮球描述("检查蓝药结束");
                    }

                    tools.悬浮球描述("攻击中(" + parseInt((timeout - (时间戳)) / 1000) + "),身边怪物(" + 怪物.length + ")");
                    sleep(111);
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
        while (当前总状态 == 总状态.已启动) {
            sleep(333);
            if (new Date().getTime() - start > (挂机参数.拾取时长 * 1000)) {
                click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
                break;
            }
            //var t1 = new Date().getTime();
            var 文字 = tools.常用操作.读取聊天框最后一行信息();
            //tools.悬浮球临时描述(r)
            if ((文字.indexOf("不能") >= 0 || 文字.indexOf("拾取") >= 0) && (文字.indexOf("一定") >= 0 || 文字.indexOf("时间") >= 0)) {
                click(random(按钮集合.拾取.x[0], 按钮集合.拾取.x[1]), random(按钮集合.拾取.y[0], 按钮集合.拾取.y[1]));
                break;
            }
            if (文字.indexOf("已满") >= 0 || 文字.indexOf("己满") >= 0 || 文字.indexOf("负重") >= 0) {
                if (挂机参数.装备实际未满下线 == 1) {
                    var r1 = tools.常用操作.检查背包是否有东西("5_7");
                    if (r1) {
                        tools.回城补给在挂机();
                    } else {
                        tools.常用操作.小退();
                    }
                }
            }
            //var t2 = new Date().getTime();
            tools.悬浮球描述("拾取(" + parseInt(((挂机参数.拾取时长 * 1000) - (new Date().getTime() - start)) / 1000) + ")");
            //tools.悬浮球临时描述(文字 + "(" + ((t2 - t1) / 1000).toString() + ")");

            r = tools.findImage("shiquzhongBtn.png", 0.9)
            if (!r.status) {
                break;
            }//tools.悬浮球描述("拾取中(" + (挂机参数.拾取时长 - tryCount) + ")")
            //tryCount++;
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
    回城补给在挂机: () => {
        tools.补给操作.回城补给();
        tools.去挂机图打怪(true);
    },
    补给操作: {
        回城补给: () => {
            tools.悬浮球描述("回城补给");
            if (挂机参数.地牢回城 == 1 || 挂机参数.地牢回城 == "1") {
                tools.人物移动.使用地牢();
                tools.常用操作.关闭所有窗口();
            }
            if (挂机参数.挂机城市 == "比奇") {
                tools.人物移动.去比奇小贩Loop();
            } else if (挂机参数.挂机城市 == "盟重") {
                tools.人物移动.去盟重小贩Loop();
            } else if (挂机参数.挂机城市 == "苍月") {
                tools.人物移动.去苍月小贩Loop();
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.替换装备();
            }
            if (当前总状态 == 总状态.已启动) {
                tools.点击分身();
            }
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
            tools.常用操作.关闭所有窗口();
            var {
                w,
                h
            } = tools.获取屏幕高宽();
            var fbl = `${device.width}_${device.height}`;
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
            click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
            var r = tools.findImageForWaitClick("chushouwupingBtn.png", {
                maxTries: 10,
                interval: 333
            });
            if (!r.status) {
                return {
                    status: false,
                    err: "未获取出售物品按钮"
                }
            }
            r = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 333
            });
            if (!r.status) {
                tools.常用操作.关闭所有窗口();//这里尝试购买一下物品，整理按钮会出现
                click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
                var r = tools.findImageForWaitClick("goumaiwupingBtn.png", {
                    maxTries: 6,
                    interval: 666
                });
                return {
                    status: false,
                    err: "未获取到整理按钮"
                }
            }
            var 卖装备背包格子 = config.zuobiao.背包格子于面板偏移量[fbl];
            var 整理P = {
                x: r.img.x,
                y: r.img.y
            }
            var 裁剪P = {
                x: r.img.x + 卖装备背包格子["1_1"].x,
                y: r.img.y + 卖装备背包格子["1_1"].y,
                w: w,
                h: h / 2 + 50
            }
            var 是否保留过衣服 = false;
            for (let index = 1; index <= 5; index++) {
                for (let index1 = 1; index1 <= 8; index1++) {
                    if (当前总状态 != 总状态.已启动) {
                        return {
                            status: false,
                            err: "程序未启动"
                        }
                    }
                    sleep(random(1288, 1588))
                    tools.悬浮球描述(`开始出售${index}_${index1}格子`)
                    var p = 卖装备背包格子[`${index}_${index1}`];
                    var randomX = random(-5, 5);
                    var randomY = random(-5, 5);
                    click(整理P.x + p.x + randomX, 整理P.y + p.y + randomY)
                    if (index == 1 && index1 == 1) {
                        r = tools.findImageForWait("OKBtn.png", {
                            maxTries: 10,
                            interval: 500
                        });
                        if (!r.status) {
                            当前总状态 = 总状态.重启中;
                            return {
                                status: true,
                                err: "花屏了"
                            }
                        }
                    }
                    r = tools.findImageForWait("beibaofangruBtn.png", {
                        maxTries: 10,
                        interval: 333
                    });

                    if (r.status) {
                        var img = captureScreen();
                        var imgSmall = tools.截屏裁剪(img, 裁剪P.x, 裁剪P.y, 裁剪P.w, 裁剪P.h) //captureScreen();//
                        let r = ocrPladderOCR.detect(imgSmall); //utils.ocrGetContentStr(imgSmall);
                        var allText = '';
                        //var exists = r.some(item => item.text.indexOf"极品");
                        if (r) {
                            r.forEach(item => {
                                allText += item.text;
                            });
                            tools.悬浮球描述(allText);
                            if (allText.indexOf("极品") >= 0) {
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
                                } else {
                                    if (allText.indexOf("护身符") >= 0) {
                                        toastLog("护身符跳过")
                                        continue;
                                    }
                                    if (挂机参数.备用男重盔 == 1 && !是否保留过衣服) {
                                        if (allText.indexOf("重盔") >= 0 && allText.indexOf("男") >= 0) {
                                            是否保留过衣服 = true;
                                            toastLog("备用男重盔跳过")
                                            continue;
                                        }
                                    }
                                    if (挂机参数.备用女重盔 == 1 && !是否保留过衣服) {
                                        if (allText.indexOf("重盔") >= 0 && allText.indexOf("女") >= 0) {
                                            是否保留过衣服 = true;
                                            toastLog("备用女重盔跳过")
                                            continue;
                                        }
                                    }
                                    r = tools.findImageForWaitClick("beibaofangruBtn.png", {
                                        maxTries: 10,
                                        interval: 666
                                    });
                                    sleep(random(555, 666));
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
                        return {
                            status: true,
                            err: ""
                        }
                        //if (tools.常用操作.检查背包是否有东西("1_1")) {
                        //     return {
                        //         status: false,
                        //         err: "依然有东西存在，继续卖"
                        //     }
                        // }
                        // else {
                        //     return {
                        //         status: true,
                        //         err: ""
                        //     }
                        // }
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
                    if (当前总状态 == 总状态.已启动) {
                        var 物品对象 = 物品集合[i];
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
            if (物品对象["名称"].indexOf("护身符") >= 0) {
                var num = tools.补给操作.获取护身符数量();
                var buyNum = 物品对象["数量"];
                物品对象["数量"] = buyNum - num;
                if (物品对象["数量"] <= 0) {
                    return;
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
                if (当前总状态 == 总状态.已启动) {
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
                return {
                    status: false,
                    err: "尝试10次未获取到存入按钮"
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
            tools.悬浮球描述("修理结束");
        },
        修理装备: () => {
            var result = true;
            var fbl = `${device.width}_${device.height}`;
            var 卖装备背包格子 = config.zuobiao.背包格子于面板偏移量[fbl];
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
                    result = tools.findImageForWait("beibaozhengliBtn.png", {
                        maxTries: 10,
                        interval: 666
                    })
                    var 整理P = {
                        x: result.img.x,
                        y: result.img.y
                    }
                    var p = 卖装备背包格子[`${index}_${index1}`];
                    var randomX = random(-5, 5);
                    var randomY = random(-5, 5);
                    click(整理P.x + p.x + randomX, 整理P.y + p.y + randomY)
                    sleep(random(555, 666));
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
            var result = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 666
            })
            sleep(555, 666);
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
                        var tryCount = 0;
                        while (true) {
                            if (tryCount >= 6) {
                                return
                            }
                            sleep(666);
                            var r = tools.findImageClick("beibaochuandaiBtn.png");
                            if (r) {
                                break;
                            }
                            else {
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
        获取护身符数量: () => {
            var w = device.width;
            var h = device.height;
            let img = captureScreen();
            var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/fushenfu.png`;
            var targetImg = images.read(targetImgPath);
            var r = images.matchTemplate(img, targetImg);
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
    获取自身血量: () => {
        let img = captureScreen();
        var color = "#00C500";
        var xue = 0;
        var r = images.findAllPointsForColor(img, color, {
            region: [618, 240, 50, 8], // 正上方
            threshold: 10
        });
        if (r && r.length > 0) {
            xue = r.length;
        }
        utils.recycleNull(img);
        return xue;
    },
    获取身边怪物数据: () => {
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
    获取锁定怪物血量: () => {
        let img = captureScreen();
        var color = "#FF1000";
        var r = images.findAllPointsForColor(img, color, {
            region: [569,40,143,1], // 正上方
            threshold: 15
        });
        utils.recycleNull(img);
        return r;
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
            let result = tools.findImage(fileName, threshold);
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
            var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
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
            var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
            var targetImg = images.read(targetImgPath);
            var options = {
                threshold: 0.7
            };
            if (threshold && threshold > 0) {
                options.threshold = threshold;
            }
            if (targetImg == null) {
                //tools.悬浮球描述(fileName + '图片不存在')
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
            var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
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
    区域找图: (fileName, x1, y1, x2, y2) => {
        var w = device.width;
        var h = device.height;
        var exists = config.youxiaoFBL.some(item => item.w === w && item.h === h);
        if (exists) {
            var img = captureScreen();
            var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
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
            是否隐身: win.cbIsYinShen.isChecked() ? 1 : 0,
            召唤骷髅: win.cbZhaoHuanKuLou.isChecked() ? 1 : 0,
            召唤神兽: win.cbZhaoShenShou.isChecked() ? 1 : 0,
            沿途打怪: win.cbYanTuDaGuai.isChecked() ? 1 : 0,
            地牢回城: win.cbIsDiLao.isChecked() ? 1 : 0,
            装备实际未满下线: win.cbShiJiWeiManXiaXian.isChecked() ? 1 : 0,
            一波怪物死亡拾取: win.cbIsYiBoSiWangSiQu.isChecked() ? 1 : 0,
            首次用符攻击: win.cbIsFuGongJi.isChecked() ? 1 : 0,
            只打满血怪: win.cbManXue.isChecked() ? 1 : 0,

            替换男重盔: win.cbTiHuanNanZhongKui.isChecked() ? 1 : 0,
            替换女重盔: win.cbTiHuanNvZhongKui.isChecked() ? 1 : 0,
            替换男灵魂: win.cbTiHuanNanLingHun.isChecked() ? 1 : 0,
            替换女灵魂: win.cbTiHuanNvLingHun.isChecked() ? 1 : 0,
            替换降魔: win.cbTiHuanXiangMo.isChecked() ? 1 : 0,

            备用男重盔: win.cbBeiYongNanZhongKui.isChecked() ? 1 : 0,
            备用女重盔: win.cbBeiYongNvZhongKui.isChecked() ? 1 : 0,


            无蓝回城: win.cbIsWuLanHuiCheng.isChecked() ? 1 : 0,
            无蓝等待: win.cbIsWuLanDengDai.isChecked() ? 1 : 0,
            隐身走动: win.cbYinShenZouDong.isChecked() ? 1 : 0,
            攻击检查宝宝: win.cbJianChaBaoBao.isChecked() ? 1 : 0,
            随机跑图: win.cbSuiJiPaoTu.isChecked() ? 1 : 0,
            挂机地图: 挂机地图,
            挂机城市: 挂机城市,
            拾取时长: parseInt(win.t_shiQuShiChang.getText()),
            隐身数量: parseInt(win.t_YinShen.getText()),
            机器标识: win.t_jiqibiaoshi.getText()
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
    win.btnBuJi.setLayoutParams(android.widget.LinearLayout.LayoutParams(180, 75));
    win.btnExit.setLayoutParams(android.widget.LinearLayout.LayoutParams(180, 75));
}


// while (true) {
//     //findRedBarsFast: (img, region, targetColor, threshold = 40, yStep = 2, minLength = 10)
//     // let targetColor = colors.parseColor("#FF0000");
//     // let img = captureScreen();
//     var r = tools.获取身边怪物数据()
//     tools.悬浮球描述(JSON.stringify(r));
//     sleep(1000);
// }


//启动程序
threads.start(function () {
    let 上次打怪时间 = new Date().getTime();
    let 打怪时间戳 = 0.1 * 1000;

    let 上次跑图时间 = new Date().getTime();
    let 跑图时间戳 = 2.5 * 1000;

    let 画面自检时间 = new Date().getTime();
    let 画面自检时间戳 = 60 * 1000;
    while (true) {
        if (isStart) {
            var 打怪次数 = 0; //大于0则坐标移动过，需强制跑图

            if (!是否启动初始化过) {
                tools.启动初始化();
                是否启动初始化过 = true;
            }
            if (开启强行补给) {
                tools.常用操作.点击人物();
                tools.常用操作.启动隐身();
                toastLog("强制回城补给")
                tools.回城补给在挂机();
                开启强行补给 = false;
            }
            if (new Date().getTime() - 画面自检时间 > 画面自检时间戳) {
                ocrPladderOCR.release();
                ocrPladderOCR = $ocr.create({
                    models: 'slim', // 指定精度相对低但速度更快的模型，若不指定则为default模型，精度高一点但速度慢一点
                });

                tools.悬浮球描述("画面自检开始");
                var r = tools.findImage("lianjiezhongduan.png"); //接连中断画面，可能人物死亡
                if (r.status) {
                    r = tools.重启游戏();
                    if (r) {
                        当前总状态 = 总状态.已启动;
                        tools.去挂机图打怪(true);
                    }
                }

                r = tools.常用操作.检测是否小退(true);
                if (r) {
                    var time = random(60, 120);
                    for (let index = 0; index < time; index++) {
                        tools.悬浮球描述("等待登录(" + (time - index) + ")");
                        sleep(1000);
                    }
                    tools.常用操作.小退后开始登录();
                    当前总状态 = 总状态.已启动;
                    tools.去挂机图打怪(true);
                    tools.悬浮球描述("登录成功");
                }

                画面自检时间 = new Date().getTime();
                tools.悬浮球描述("画面自检结束");
            }

            if (new Date().getTime() - 上次检查宝宝时间 > 检查宝宝时间戳) {
                if (挂机参数.召唤骷髅 == 1 || 挂机参数.召唤神兽 == 1) {
                    tools.悬浮球描述("检查宝宝开始");
                    var r = tools.常用操作.检测宝宝();
                    if (!r) {
                        if (挂机参数.召唤骷髅 == 1) {
                            tools.常用操作.点击召唤骷髅();
                        }
                        if (挂机参数.召唤神兽 == 1) {
                            tools.常用操作.点击召唤神兽();
                        }
                    }
                    上次检查宝宝时间 = new Date().getTime();
                    tools.悬浮球描述("检查宝宝结束");
                }
            }

            if (new Date().getTime() - 上次检查蓝药时间 > 检查蓝药时间戳 && 挂机参数.无蓝回城 == 1) {
                tools.悬浮球描述("检查蓝药开始");
                var r = tools.常用操作.检测是否有蓝药();
                if (!r) {
                    r = tools.常用操作.检测是否在游戏画面();
                    if (r) {
                        tools.回城补给在挂机();
                    }
                }
                上次检查蓝药时间 = new Date().getTime();
                tools.悬浮球描述("检查蓝药结束");
            }

            if (new Date().getTime() - 上次检查武器衣服时间 > 检查武器衣服时间戳) {
                tools.常用操作.点击人物();
                tools.常用操作.启动隐身();
                tools.悬浮球描述("检查武器衣服持久开始");
                var r = tools.常用操作.检查武器衣服持久();
                if (r) {
                    r = tools.常用操作.检测是否在游戏画面();
                    if (r) {
                        tools.回城补给在挂机();
                    }
                }
                上次检查武器衣服时间 = new Date().getTime();
                tools.悬浮球描述("检查武器衣服持久结束");
            }

            if (new Date().getTime() - 上次设置操作模式时间 >= 操作模式时间戳) {
                tools.悬浮球描述("设置操作模式开始");
                tools.常用操作.初始化操作模式(2);
                上次设置操作模式时间 = new Date().getTime();
                tools.悬浮球描述("设置操作模式结束");
            }

            if (new Date().getTime() - 上次设置内挂时间 > 内挂时间戳) {
                tools.悬浮球描述("设置内挂参数开始");
                tools.常用操作.设置内挂();
                上次设置内挂时间 = new Date().getTime();
                tools.常用操作.关闭所有窗口();
                tools.悬浮球描述("设置内挂参数结束");
            }

            if (new Date().getTime() - 上次设置攻击面板时间 >= 攻击面板时间戳) {
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
                        sleep(random(888, 999))
                    }
                    tryCount++;
                }
                上次设置攻击面板时间 = new Date().getTime();
                tools.悬浮球描述("设置攻击面板结束");
            }

            if (new Date().getTime() - 上次设置组队模式时间 >= 组队模式时间戳) {
                tools.悬浮球描述("设置组队模式开始");
                tools.常用操作.开启组队();
                上次设置组队模式时间 = new Date().getTime();
                tools.悬浮球描述("设置组队模式结束");
            }

            if (new Date().getTime() - 上次设置分身面板时间 >= 分身面板时间戳) {
                tools.悬浮球描述("设置分身面板开始");
                var r = tools.findImageForWait("fenshenxiulianBtn.png", {
                    maxTries: 3,
                    interval: 333
                })
                if (r.status) {
                    var 左上箭头 = config.zuobiao.按钮集合[fbl].左上箭头;
                    click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));
                }
                上次设置分身面板时间 = new Date().getTime();
                tools.悬浮球描述("设置分身面板结束");
            }

            if (new Date().getTime() - 上次打怪时间 > 打怪时间戳) {
                var r = false;
                while (当前总状态 == 总状态.已启动) {
                    // if (打怪次数 > 5) {//不要长时间打怪，需要检测药和宝宝
                    //     break;
                    // }
                    try {
                        r = tools.寻找打怪(打怪次数 > 0 ? true : false);
                    } catch (e) {
                        r = false;
                        toastLog("寻找打怪异常" + e)
                    }
                    if (r) {
                        打怪次数++;
                        tools.悬浮球描述("继续攻击")
                        continue;
                    } else {
                        break;
                    }
                }
                if (打怪次数 > 0 && 挂机参数.一波怪物死亡拾取 == 1) {
                    tools.开始拾取();
                }
                上次打怪时间 = new Date().getTime();
            }

            if (new Date().getTime() - 上次跑图时间 > 跑图时间戳) {
                var 当前地图 = tools.常用操作.获取人物地图();
                if (当前地图 == 挂机参数.挂机地图) {
                    try {
                        tools.常用操作.点击挂机坐标(打怪次数 > 0 ? true : false);
                    } catch (e) {
                        toastLog('点击挂机坐标异常' + e);
                    }
                }
                else {
                    tools.去挂机图打怪(true);
                }
                上次跑图时间 = new Date().getTime();
            }


        } else {
            tools.悬浮球描述(当前总状态);
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
            //window.cpuText.setText("CPU: " + utils.getCpuPercentage());
            window.memText.setText("内存: " + utils.getMemoryInfo());
            window.startText.setText("(" + 分钟 + ")");
            window.cangkuText.setText("仓库(" + 存入仓库数量 + ")");
            window.jingbiText.setText("金币(" + 启动金币 + ")");
            window.statusText.setText(当前总状态);

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