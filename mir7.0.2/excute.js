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
var 是否强制跑图 = false;

let 认证自检时间 = new Date().getTime();
let 认证自检时间戳 = 30 * 1000;

let 画面自检时间 = new Date().getTime();
let 画面自检时间戳 = 60 * 1000 * 3;


var 检查蓝药时间戳 = 1000 * 60;
var 上次检查蓝药时间 = new Date().getTime(); // 减去 20 分钟; 

// var 检查武器衣服时间戳 = 1000 * 60 * 6;
var 上次检查武器衣服时间 = new Date().getTime(); // 减去 20 分钟; 

var 检查宝宝时间戳 = 1000 * 30;
var 上次检查宝宝时间 = new Date().getTime();

var 上次装备已满喝药时间 = new Date().getTime() - 1000 * 60 * 24;


var 内挂时间戳 = 1000 * 60 * 60 * 24;
var 上次设置内挂时间 = new Date().getTime(); // 减去 1000 分钟;

var 组队模式时间戳 = 1000 * 60 * 60 * 24;
var 上次设置组队模式时间 = new Date().getTime(); // 减去 1000 分钟;


var 操作模式时间戳 = 1000 * 60 * 60 * 24;
var 上次设置操作模式时间 = new Date().getTime();

var 上次打怪时间 = new Date().getTime() - 1000 * 60 * 24;


var 发现其他玩家时间 = new Date().getTime() - 1000 * 60 * 24;// 减去 24小时;
var 发现其他玩家时间等待 = 1000 * 60 * 3;

var 禁止拾取时间 = new Date().getTime() - 1000 * 60 * 24;// 减去 24小时;

var 上一次持久提示时间 = new Date().getTime() - 1000 * 60 * 24;

let 上次跑图时间 = new Date().getTime() - (60 * 1000);

var 上一次点拾取时间 = new Date().getTime() - (60 * 1000);
let 跑图时间戳 = 1.3 * 1000;
var 上次所在地图 = "";
var 上次坐标截图 = null;
var 锁定怪物截图 = null;
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
        name: "灰毒药",
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
    沿途打怪: 0,
    地牢回城: 0,
    装备实际未满下线: 1,
    一波怪物死亡拾取: 0,
    首次用符攻击: 0,
    只打满血怪: 1,
    反跑地图: 0,
    存万年: 0,
    无蓝回城: 0,
    无飞回城: 1,
    替换魔鬼项链: 0,
    替换翡翠项链: 0,
    替换明珠: 0,
    替换大手镯: 0,
    替换坚固: 0,
    替换死神: 0,
    替换道头: 0,
    替换降妖: 0,
    替换道德: 0,
    替换黑色戒指: 0,
    替换凌风: 0,
    替换凝霜: 0,
    替换男盔: 0,
    替换女盔: 0,
    地图轮询: 0,
    强制拾取: 0,


    备用男重盔: 0,
    备用女重盔: 0,
    备用凌风: 0,
    备用凝霜: 0,
    攻击宝宝身边: 0,
    寻找宝宝数: 0,
    攻击检查武器衣服: 0,
    持久提醒: 0,
    认证自动识别: 0,
    云码认证: 0,
    捆雪霜包: 0,
    召唤宝宝: 0,

    地图拖动: 0,
    替换黑色戒指: 0,
    隐身数量: 0,
    隐身走动: 0,
    拾取时长: 15,
    打怪等待: 600,
    随机血量: 0,
    拾取延时: 200,
    挂机地图: "",
    轮询切换地图: "",
    挂机城市: "",
    挂机地图大: "",
    机器标识: "",
    版本号: "",
    组队: "",
    跟随宝宝: 0,
    跟随几格: 2,
    检查衣服武器时间戳: 600
}
var 开启强行补给 = false;
var 总状态 = {
    未启动: "未启动",
    已启动: "已启动",
    小退中: "小退中",
    重启中: "重启中"

};
var 装备枚举 = {
    重盔女: "zhuangbei_zhongkui_nv.png",
    重盔男: "zhuangbei_zhongkui_nan.png",
    斩马刀: "zhuangbei_zhanma.png",
    凌风: "zhuangbei_lingfeng.png",

    修罗: "zhuangbei_xiuluo.png",
    凝霜: "zhuangbei_ningshuang.png",
    凌风: "zhuangbei_lingfeng.png",

    死神手: "zhuangbei_sishenshou.png",
    坚固手: "zhuangbei_jianku.png",
    大手镯: "zhuangbei_dashouzhuo.png",

    魔鬼项链: "zhuangbei_moguilian.png",
    凤凰项链: "zhuangbei_fenghuang.png",
    翡翠项链: "zhuangbei_feichuilian.png",

    黑色戒指: "zhuangbei_heisejiezhi.png",
    降妖戒指: "zhuangbei_xiangyao.png",
    道德戒指: "zhuangbei_daode.png",
    珊瑚戒指: "zhuangbei_shanhu.png",
    道士头盔: "zhuangbei_daotou.png",
};

var 补给枚举 = {
    护身符: "buji_fushenfu.png",
    红毒: "buji_hongdu.png",
    灰毒: "buji_huidu.png",
    万年雪霜: "buji_wannianxueshuang.png",
    万年雪霜包: "buji_wannianxueshuangbao.png",
    组队卷: "buji_zuduijuan.png",
    修复油_背包: "buji_xiufuyou.png",
    修复油_格子: "buji_xiufuyou_gezi.png",
    中蓝个_背包: "buji_lanyaoge.png",
    中蓝个_格子: "buji_lanyaoge_gezi.png",
    大蓝个_背包: "buji_lanyaodage.png",

    战神油_背包: "buji_zhanshenyou.png",
    战神油_格子: "buji_zhanshenyou_gezi.png",
    中蓝包: "buji_lanyaobao.png",
    捆药绳: "buji_kunyaoshen.png",
    地牢: "buji_dilao.png",
}
var 存仓库枚举 = {
    祈祷之刃: "cangku_qidaozhiren.png",
    幽灵项链: "cangku_youlingxianglian.png",
    祝福油: "buji_zhufuyou.png",
    祷字: "wenzi_zhuangbei_qidao.png",
    血字: "wenzi_zhuangbei_moxue.png",
    记字: "wenzi_zhuangbei_jiyi.png",
    杖字: "wenzi_zhuangbei_mozhang.png",
    狱字: "wenzi_zhuangbei_lianyu.png",
    福字: "wenzi_zhuangbei_zhufuyou.png",
    虹字: "wenzi_zhuangbei_hongmo.png",
    命字: "wenzi_zhuangbei_shengming.png",
    银蛇: "wenzi_zhuangbei_yinse.png",
}
var 文字图枚举 = {
    斩: "wenzi_zhan.png",
    镯: "wenzi_zhuo.png",
    戒: "wenzi_jie.png",
    符: "wenzi_fu.png",
    盔: "wenzi_kui.png",
    修: "wenzi_xiu.png",
    凝: "wenzi_ning.png",
    霜: "wenzi_shuang.png",
    凌: "wenzi_ling.png",
    黄: "wenzi_huang.png",
    蝎: "wenzi_xieshe.png",
    猪: "wenzi_zhu.png",
    蛾: "wenzi_e.png",
    魔: "wenzi_mo.png",
    髅: "wenzi_rou.png",
    油: "wenzi_you.png",
    药: "wenzi_zhuangbei_yao.png",
    钳: "wenzi_wugongdong_qian.png",
    角_测试: "wenzhi_test_jiao.png",
    蜈: "wenzi_wugongdong_wu.png",
    跳: "wenzi_wugongdong_tiao.png",
    蠕: "wenzi_wugongdong_lu.png",
    蠕左面板: "wenzhi_zuomianban_wugong_ru.png",
    黑: "wenzi_wugongdong_hei.png",
    恶蛆: "wenzi_wugongdong_equ.png",
    祈祷: "wenzi_qidao.png",
    灵: "wenzi_youling.png",
    髅左面板: "wenzhi_zuomianban_rou.png",
    骷左面板: "wenzhi_zuomianban_ku.png",
    骷髅: "wenzi_kurou.png",
    邪恶: "wenzhi_zuomianban_xiee.png",
    休息: "wenzhi_xiuxi.png",
    攻击: "wenzhi_gongji.png",
    跟随: "wenzhi_gensui.png",
    下属: "wenzhi_xiashu.png",
    怪物名法师: "wenzhi_fashi.png",
    怪物名将军: "wenzhi_jiangjun.png",
    不能拾取: "wenzhi_bunengshiqu.png",
    已满: "wenzi_yiman.png",
    组: "wenzhi_zudui.png",
};
var 持久提示枚举 = {
    凝霜: "wenzhi_zhuangbeitishi_ningshuang.png",
    重盔: "wenzhi_zhuangbeitishi_zhongkui.png",
}
var 左怪物文字枚举 = {
    蜈蚣洞: [
        {
            精英怪: false,
            name: "钳虫",
            pic: "wenzhi_zuomianban_wugong_qian.png",
            怪物显示图: "wenzi_wugongdong_qian.png",
            左上血条偏移: {
                x: -4,
                y: -51
            }
        }, {
            精英怪: false,
            name: "黑色恶蛆",
            pic: "wenzhi_zuomianban_wugong_e.png",
            怪物显示图: "wenzi_wugongdong_equ.png",
            左上血条偏移: {
                x: -20,
                y: -51
            }
        }, {
            精英怪: false,
            name: "蜈蚣",
            pic: "wenzhi_zuomianban_wugong_wu.png",
            怪物显示图: "wenzi_wugongdong_wu.png",
            左上血条偏移: {
                x: -4,
                y: -51
            }
        }, {
            精英怪: false,
            name: "跳跳蜂",
            pic: "wenzhi_zuomianban_wugong_tiao.png",
            怪物显示图: "wenzi_wugongdong_tiao.png",
            左上血条偏移: {
                x: -28,
                y: -51
            }
        }, {
            精英怪: true,
            name: "巨型蠕虫",
            pic: "wenzhi_zuomianban_wugong_ru.png",
            //怪物显示图: "wenzi_wugongdong_lu.png",
            怪物显示图: "wenzhi_zuomianban_wugong_ju.png",
            左上血条偏移: {
                x: 10,
                y: -51
            }
        }, {
            精英怪: true,
            name: "邪恶蚶虫",
            pic: "wenzhi_zuomianban_xiee.png",
            怪物显示图: "wenzi_wugongdong_xiee.png",
            左上血条偏移: {
                x: 10,
                y: -51
            }
        }],
    骷髅洞: [
        {
            精英怪: false,
            name: "掷斧骷髅",
            pic: "wenzhi_zuomianban_kulou_fu.png",
            怪物显示图: "wenzi_kurou_fu.png",
            左上血条偏移: {
                x: -4,
                y: -51
            }
        },
        {
            精英怪: false,
            name: "骷髅战士",
            pic: "wenzhi_zuomianban_kulou_zhan.png",
            怪物显示图: "wenzi_kurou_zhan.png",
            左上血条偏移: {
                x: -21,
                y: -51
            }
        },
        {
            精英怪: false,
            name: "骷髅战将",
            pic: "wenzhi_zuomianban_kulou_jiang.png",
            怪物显示图: "wenzi_kurou_jiang.png",
            左上血条偏移: {
                x: -37,
                y: -51
            }
        },
        {
            精英怪: false,
            name: "骷髅(髅)",
            pic: "wenzhi_zuomianban_kulou_lou.png",
            怪物显示图: "wenzi_kurou_lou.png",
            左上血条偏移: {
                x: -19,
                y: -51
            }
        },
        {
            精英怪: false,
            name: "骷髅(骷)",
            pic: "wenzhi_zuomianban_kulou_ku.png",
            怪物显示图: "wenzi_kurou_ku.png",
            左上血条偏移: {
                x: -4,
                y: -51
            }
        },
    ],
    牛魔洞: [
        {
            精英怪: false,
            name: "牛魔战士",
            pic: "wenzhi_zuomianban_niumo_zhan.png",
            怪物显示图: "wenzi_niumo_zhan.png",
            左上血条偏移: {
                x: -20,
                y: -51
            }
        },
        {
            精英怪: false,
            name: "牛魔斗士",
            pic: "wenzhi_zuomianban_niumo_dou.png",
            怪物显示图: "wenzi_niumo_dou.png",
            左上血条偏移: {
                x: -20,
                y: -51
            }
        },
        {
            精英怪: false,
            name: "牛魔侍卫",
            pic: "wenzhi_zuomianban_niumo_shi.png",
            怪物显示图: "wenzi_niumo_wei.png",
            左上血条偏移: {
                x: -39,
                y: -51
            }
        },
        {
            精英怪: true,
            name: "牛魔法师",
            pic: "wenzhi_zuomianban_niumo_fa.png",
            怪物显示图: "wenzi_niumo_fa.png",
            左上血条偏移: {
                x: -20,
                y: -51
            }
        },
        {
            精英怪: false,
            name: "牛魔",
            pic: "wenzhi_zuomianban_niumo_mo.png",
            怪物显示图: "wenzi_niumo_mo.png",
            左上血条偏移: {
                x: -4,
                y: -51
            }
        }
    ]
};

var 强制拾取枚举 = [
    {
        text: "油",
        pic: "wenzhi_shiqu_you.png"
    },
    {
        text: "死神手套",
        pic: "wenzhi_shiqu_si.png"
    }
]

var 精英怪枚举 = {
    牛魔法师: {
        name: "牛魔法师",
        pic: "wenzhi_zuomianban_fashi.png",
        是否隐身: false,
        是否施毒: false,
        是否打防: false,
        是否打魔: true,
        是否攻击: true,
        只攻击满血: false,
        攻击中扫描拾取: true
    },
    牛魔将军: {
        name: "牛魔将军",
        pic: "wenzhi_zuomianban_jiangjun.png",
        是否隐身: true,
        是否施毒: true,
        是否打防: true,
        是否打魔: false,
        是否攻击: false,
        只攻击满血: true,
        攻击中扫描拾取: true
    },
    邪恶蚶虫: {
        name: "邪恶蚶虫",
        pic: "wenzhi_zuomianban_xiee.png",
        是否隐身: true,
        是否施毒: true,
        是否打防: true,
        是否打魔: false,
        是否攻击: true,
        只攻击满血: true,
        攻击中扫描拾取: false
    },
    巨型蠕虫: {
        name: "巨型蠕虫",
        pic: "wenzhi_zuomianban_wugong_ru.png",
        是否隐身: false,
        是否施毒: false,
        是否打防: false,
        是否打魔: false,
        是否攻击: true,
        只攻击满血: true,
        攻击中扫描拾取: true
    },
    宝箱: {
        name: "宝箱",
        pic: "wenzhi_zuomianban_baoxiang.png",
        是否隐身: false,
        是否施毒: false,
        是否打防: false,
        是否打魔: false,
        是否攻击: true,
        攻击中扫描拾取: true
    }
}
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
var isShowConfig = false;
var 是否有组队任务 = false;
var 跑图错误次数 = 0;
var 锁定失败次数 = 0;
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
            <text id="bbText" text="7.0.2" textSize="8sp" textColor="#ffffff" marginRight="3" />
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
                            <radio textSize="10sp" id="radio2_6" text="石墓阵" />
                        </radiogroup>
                    </horizontal>
                    <horizontal id="ditu1_3" visibility="gone">
                        <radiogroup id="group1_3" orientation="vertical"  >
                            <radio textSize="10sp" id="radio3_1" text="地牢一层东" />
                            <radio textSize="10sp" id="radio3_2" text="地牢一层北1" />
                            <radio textSize="10sp" id="radio3_3" text="地牢一层西1" />
                            <radio padding="2dp" id="radio3_4" text="地牢一层北2" />
                            <radio textSize="10sp" id="radio3_5" text="黑暗地带" />
                            <radio textSize="10sp" id="radio3_6" text="传奇部落" />
                            <radio textSize="10sp" id="radio3_7" text="邪恶势力" />
                            <radio textSize="10sp" id="radio3_8" text="一线天" />
                            <radio textSize="10sp" id="radio3_9" text="死亡棺材" />
                            <radio textSize="10sp" id="radio3_10" text="恐怖空间" />
                            <radio textSize="10sp" id="radio3_11" text="生死之间" />
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
                            <radio textSize="10sp" id="radio5_3" text="比奇野外" />
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
                            <text text="灰毒药" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_HuiDu" inputType="number" w="20sp" text="0" />
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

                        <horizontal paddingLeft="6sp">
                            <text text="跟随格" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_gensuijuli" focusable="true" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="找宝宝" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_xunzhaoshuliang" focusable="true" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="攻击宝宝身边怪物" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_gongjishuliang" focusable="true" w="20sp" text="0" />
                        </horizontal>
                        <horizontal paddingLeft="6sp">
                            <text text="组队好友" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_zudui" focusable="true" w="40sp" text="0" />
                        </horizontal>
                        <horizontal >
                            <text text="版本号" textSize="10sp" textColor="#000000" />
                            <input textSize="10sp" id="t_banbenhao" inputType="text" w="48sp" text="0" />
                        </horizontal>

                    </horizontal>
                    <horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanDaoTou" text="替换道头" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanMingZhu" text="替换明珠" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanZhanMa" text="替换凌风" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanXiuLuo" text="替换凝霜" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanNanKui" text="替换男盔" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanNvKui" text="替换女盔" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbDiTuLunXun" text="地图轮询" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbQiangZhiShiQu" text="强制拾取" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbTiHuanMoGui" text="替换魔鬼" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanFeiChui" text="替换翡翠" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="left">
                            <checkbox id="cbTiHuanDaShou" text="替换大手" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanJianGu" text="替换坚固" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanSiShen" text="替换死神" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanHeiSe" text="替换黑戒" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanXiangYao" text="替换降妖" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbTiHuanDaoDe" text="替换道德" textSize="10sp" />
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

                        <horizontal gravity="right">
                            <checkbox id="cbIsGenSuiBaoBao" text="跟随宝宝" textSize="10sp" />
                        </horizontal>
                    </horizontal>
                    <horizontal>
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
                            <checkbox id="cbRenzhengDuanXin" text="持久提醒" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbRenzhengShiBie" text="认证识别" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbRenzhengYunMa" text="云码认证" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbKunxueshuangBao" text="捆雪霜包" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbzhaohuanBaoBao" text="召唤宝宝" textSize="10sp" />
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
                            <checkbox id="cbBeiYongZhanMa" text="备用凌风" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbBeiYongXiuLuo" text="备用凝霜" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbYinShenZouDong" text="隐身不动" textSize="10sp" />
                        </horizontal>

                        <horizontal gravity="right">
                            <checkbox id="cbSuiJiPaoTu" text="反跑地图" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsFuGongJi" text="首攻用符" textSize="10sp" />
                        </horizontal>
                        <horizontal gravity="right">
                            <checkbox id="cbIsCunWan" text="存万年" textSize="10sp" />
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
                <button id="btnStart" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="启动" />
                <button id="btnSave" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="保存" />
                <button id="btnReset" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="重启" />
                <button id="btnBuJi" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="补给" />
                <button id="btnSetFouse" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="焦点" />
                <button id="btnRenZheng" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="组队" />
                <button id="btnExit" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="退出" />
                <button id="btnClose" textSize="8sp" style="Widget.AppCompat.Button.Colored" text="关闭" />
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


            var 灰毒药 = 挂机参数.购买物品.find(item => {
                return item.name == "灰毒药"
            });
            if (灰毒药 && 灰毒药.num) {
                win.t_HuiDu.setText(灰毒药.num.toString());
            }
            else {
                win.t_HuiDu.setText("0");
            }

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

            if (挂机参数.寻找宝宝数 && 挂机参数.寻找宝宝数 > 0) {
                win.t_xunzhaoshuliang.setText(挂机参数.寻找宝宝数.toString());
            } else {
                win.t_xunzhaoshuliang.setText("0");
            }

            if (挂机参数.攻击宝宝身边 && 挂机参数.攻击宝宝身边 > 0) {
                win.t_gongjishuliang.setText(挂机参数.攻击宝宝身边.toString());
            } else {
                win.t_gongjishuliang.setText("0");
            }

            if (挂机参数.组队) {
                win.t_zudui.setText(挂机参数.组队);
            } else {
                win.t_zudui.setText("");
            }

            if (挂机参数.机器标识) {
                win.t_jiqibiaoshi.setText(挂机参数.机器标识.toString());
            } else {
                win.t_jiqibiaoshi.setText("");
            }
            if (挂机参数.版本号) {
                win.t_banbenhao.setText(挂机参数.版本号.toString());
            } else {
                win.t_banbenhao.setText("");
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
            if (挂机参数.补给时点分身 == 1) {
                win.cbIsFenShen.setChecked(true);
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
            if (挂机参数.只打满血怪 == 1) {
                win.cbManXue.setChecked(true);
            }
            if (挂机参数.替换魔鬼项链 == 1) {
                win.cbTiHuanMoGui.setChecked(true);
            }
            if (挂机参数.替换翡翠项链 == 1) {
                win.cbTiHuanFeiChui.setChecked(true);
            }
            if (挂机参数.替换大手镯 == 1) {
                win.cbTiHuanDaShou.setChecked(true);
            }
            if (挂机参数.替换坚固 == 1) {
                win.cbTiHuanJianGu.setChecked(true);
            }


            if (挂机参数.替换凝霜 == 1) {
                win.cbTiHuanXiuLuo.setChecked(true);
            }
            if (挂机参数.替换凌风 == 1) {
                win.cbTiHuanZhanMa.setChecked(true);
            }

            if (挂机参数.替换男盔 == 1) {
                win.cbTiHuanNanKui.setChecked(true);
            }
            if (挂机参数.替换女盔 == 1) {
                win.cbTiHuanNvKui.setChecked(true);
            }

            if (挂机参数.地图轮询 == 1) {
                win.cbDiTuLunXun.setChecked(true);
            }
            if (挂机参数.强制拾取 == 1) {
                win.cbQiangZhiShiQu.setChecked(true);
            }


            if (挂机参数.替换明珠 == 1) {
                win.cbTiHuanMingZhu.setChecked(true);
            }

            if (挂机参数.替换死神 == 1) {
                win.cbTiHuanSiShen.setChecked(true);
            }

            if (挂机参数.替换黑色戒指 == 1) {
                win.cbTiHuanHeiSe.setChecked(true);
            }
            if (挂机参数.替换降妖 == 1) {
                win.cbTiHuanXiangYao.setChecked(true);
            }
            if (挂机参数.替换道德 == 1) {
                win.cbTiHuanDaoDe.setChecked(true);
            }



            if (挂机参数.替换道头 == 1) {
                win.cbTiHuanDaoTou.setChecked(true);
            }
            // <checkbox id="cbTiHuanDaoTou" text="替换道头" textSize="10sp" />
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
            if (挂机参数.备用凌风 == 1) {
                win.cbBeiYongZhanMa.setChecked(true);
            }
            if (挂机参数.备用凝霜 == 1) {
                win.cbBeiYongXiuLuo.setChecked(true);
            }


            if (挂机参数.隐身走动 == 1) {
                win.cbYinShenZouDong.setChecked(true);
            }
            if (挂机参数.反跑地图 == 1) {
                win.cbSuiJiPaoTu.setChecked(true);
            }
            if (挂机参数.存万年 == 1) {
                win.cbIsCunWan.setChecked(true);
            }
            if (挂机参数.持久提醒 == 1) {
                win.cbRenzhengDuanXin.setChecked(true);
            }
            if (挂机参数.认证自动识别 == 1) {
                win.cbRenzhengShiBie.setChecked(true);
            }
            if (挂机参数.云码认证 == 1) {
                win.cbRenzhengYunMa.setChecked(true);
            }
            if (挂机参数.捆雪霜包 == 1) {
                win.cbKunxueshuangBao.setChecked(true);
            }
            if (挂机参数.召唤宝宝 == 1) {
                win.cbzhaohuanBaoBao.setChecked(true);
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
        处理持久: (raw) => {
            if (!raw) return null;

            // —— 1. 预处理：如果是5位，去掉中间那位 ——  
            if (raw.length === 5) {
                raw = raw.slice(0, 2) + raw.slice(3);  // e.g. "14714" → "1414"
            }

            // —— 2. 4位数：直接拆成两组两位 ——  
            if (raw.length === 4) {
                var cur = parseInt(raw.slice(0, 2), 10);
                var max = parseInt(raw.slice(2, 4), 10);
                return cur <= max ? { current: cur, max: max } : null;
            }

            // —— 3. 3位数：拆成1位+2位 ——  
            if (raw.length === 3) {
                var cur = parseInt(raw.slice(0, 1), 10);
                var max = parseInt(raw.slice(1, 3), 10);
                return cur <= max ? { current: cur, max: max } : null;
            }

            // —— 4. 2位数：拆成1位+1位 ——  
            if (raw.length === 2) {
                return {
                    current: parseInt(raw[0], 10),
                    max: parseInt(raw[1], 10)
                };
            }

            // —— 5. 其他长度：无法解析 ——  
            return null;
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
            var p = config.zuobiao.按钮集合[fbl].背包;
            var r = tools.findImageAreaForWaitClick("beibaoBtn.png", p.x[0], p.y[0], p.x[1], p.y[1], {
                maxTries: 10,
                interval: 100
            })
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
                tools.常用方法.发送提醒("小退")
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
                tools.常用操作.点击左面板怪物();
                sleep(1000);
                result = tools.findImageForWait("rewumianbanBtn.png", {
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
            }
            var 装备面板 = result.img;
            var x = 装备面板.x + 装备.x + random(-5, 5);
            var y = 装备面板.y + 装备.y + random(-3, 3);
            tools.click(x, y)
            return tools.补给操作.获取操作按钮(["卸下"], "点击角色装备", 是否卸下, true, false);
        },
        获取装备持久: (装备) => {
            var r = tools.常用操作.点击角色装备(装备, false);
            if (r.status) {
                r = tools.补给操作.获取物品信息(r.value);
                if (r.status && r.持久) {
                    tools.悬浮球描述(JSON.stringify(r.持久));
                }
                return r;
            }
            return {
                status: false
            }
        },
        检查武器衣服持久及包袱: () => {
            tools.挂机打怪.启动隐身();
            tools.常用操作.打开角色();
            var 衣服 = tools.常用操作.获取装备持久(config.zuobiao.人物面板[fbl].衣服);
            var 武器 = tools.常用操作.获取装备持久(config.zuobiao.人物面板[fbl].武器);
            var r = tools.findImage("rewumianbanBtn.png")
            if (r.status == false) {
                tools.常用操作.点击左面板怪物()
                sleep(666);
            }
            tools.常用操作.关闭所有窗口();

            var zhengliBtn = tools.补给操作.整理背包(true);
            r = tools.常用操作.检查背包是否已满(zhengliBtn);
            if (r) {
                var count = tools.补给操作.喝蓝_背包(zhengliBtn, false);
                if (count > 0) {
                    tools.常用方法.错误日志("成功喝中蓝(" + count + ")", 2);
                    上次装备已满喝药时间 = new Date().getTime();
                }
                else {
                    return {
                        status: true,
                        msg: "主动检查装备已满"
                    };
                }
            }


            //剩持久: parseInt(r.current),
            //满持久: parseInt(r.max)
            if (挂机参数.持久提醒 == 1 && 衣服.status && 衣服.持久 && 衣服.持久.满持久 < 12) {
                tools.常用方法.错误日志("衣服持久(" + 衣服.持久.满持久 + ")", 9)
            }

            if (挂机参数.持久提醒 == 1 && 武器.status && 武器.持久 && 武器.持久.满持久 < 10) {
                tools.常用方法.错误日志("武器持久(" + 武器.持久.满持久 + ")", 9)
            }

            if (挂机参数.衣服持久0回程 == 1 && 衣服.status && 衣服.持久 && 衣服.持久.剩持久 <= 2) {
                if (!是否用过备用衣服) {
                    var isSuccess = false;
                    if (挂机参数.备用男重盔 == 1) {
                        isSuccess = tools.常用操作.使用备用装备(装备枚举.重盔男, zhengliBtn);
                    }
                    else if (挂机参数.备用女重盔 == 1) {
                        isSuccess = tools.常用操作.使用备用装备(装备枚举.重盔女, zhengliBtn);
                    }

                    if (isSuccess) {
                        toastLog("使用备用衣服成功")
                        是否用过备用衣服 = true;
                    }
                    else {
                        toastLog("使用备用衣服失败")
                        tools.常用方法.错误日志("无备用衣服(" + 衣服.持久.满持久 + ")", 9)
                        return {
                            status: true,
                            msg: "衣服持久（" + 衣服.持久.剩持久 + "）|无备用衣服"
                        };
                    }
                }
                else {
                    toastLog("是否用过备用衣服 = true")
                    return {
                        status: true,
                        msg: "衣服持久（" + 衣服.持久.剩持久 + "）|已使用备用衣服"
                    };
                }
            }

            if (挂机参数.武器持久0回程 == 1 && 武器.status && 武器.持久 && 武器.持久.剩持久 <= 2) {
                if (zhengliBtn.status) {
                    var isOk = tools.补给操作.喝战神油();
                    if (isOk) {
                        toastLog("喝战神油成功")
                        return {
                            status: false
                        };
                    }
                    else {
                        toastLog("喝战神油失败")
                    }

                    isOk = tools.补给操作.喝修复油();
                    if (isOk) {
                        toastLog("喝修复油成功")
                        return {
                            status: false
                        };
                    }
                    else {
                        toastLog("喝修复油失败")
                    }
                }
                var isSuccess = false;
                if (!是否用过备用武器) {
                    if (挂机参数.备用凝霜 == 1) {
                        isSuccess = tools.常用操作.使用备用装备(装备枚举.凝霜, zhengliBtn);
                    }
                    else if (挂机参数.备用凌风 == 1) {
                        isSuccess = tools.常用操作.使用备用装备(装备枚举.凌风, zhengliBtn);
                    }

                    if (isSuccess) {
                        toastLog("使用备用武器成功")
                        是否用过备用武器 = true;
                    }
                    else {
                        toastLog("使用备用武器失败")
                        tools.常用方法.错误日志("无备用武器(" + 武器.持久.满持久 + ")", 9)
                        return {
                            status: true,
                            msg: "武器持久（" + 武器.持久.剩持久 + "）|无备用武器"
                        };
                    }
                }
                else {
                    toastLog("是否用过备用武器 = true")
                    return {
                        status: true,
                        msg: "武器持久（" + 衣服.持久.剩持久 + "）|已使用备用武器"
                    };

                }
            }
            return {
                status: false
            };
        },
        开启组队: () => {
            var p = config.zuobiao.按钮集合[fbl].组队;
            tools.click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
            tools.findImageForWaitClick("zuduicloseBtn.png", {
                maxTries: 5,
                interval: 100
            }, 0.9);
            tools.常用操作.关闭所有窗口(false, 0, true);
        },
        组队好友: () => {
            var arr = 挂机参数.组队.split(",");
            if (arr != null && arr.length > 0) {
                var p = config.zuobiao.按钮集合[fbl].好友;
                tools.click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
                sleep(1200);
                var x = 1005;
                var y = 0;
                for (var index = 0; index < arr.length; index++) {
                    var item = arr[index];
                    switch (parseInt(item)) {
                        case 1:
                            y = 152;
                            break;
                        case 2:
                            y = 222;
                            break;
                        case 3:
                            y = 292;
                            break;
                        case 4:
                            y = 358;
                            break;
                    }
                    tools.click(x + random(-50, 50), y + random(-15, 15));
                    sleep(1000);
                    tools.findImageForWaitClick(文字图枚举.组, {
                        maxTries: 6,
                        interval: 200
                    }, 0.9);
                    sleep(1000);
                    toastLog("已完成" + (index + 1) + "号好友组队");
                }
                tools.常用操作.关闭所有窗口();
            }
            是否有组队任务 = false;
        },
        设置内挂: () => {
            var 高亮显血自己 = config.zuobiao.设置面板[fbl].高亮显血自己;
            var 高亮显血组队 = config.zuobiao.设置面板[fbl].高亮显血组队;
            var 血量加药 = config.zuobiao.设置面板[fbl].血量加药;
            var 随机保护 = config.zuobiao.设置面板[fbl].随机保护;
            //sleep(555)
            var r = tools.findImageForWaitClick("setting.png", {
                maxTries: 10,
                interval: 100
            })
            if (!r.status) {
                return;
            }
            tools.click(random(420, 430), random(142, 150));
            var r = tools.findImageAreaForWait("setting_select.png", 随机保护.x[0], 随机保护.y[0], 随机保护.x[1], 随机保护.y[1], {
                maxTries: 5,
                interval: 200
            })
            if (!r.status) {
                var x = 随机保护.x[0] + ((随机保护.x[1] - 随机保护.x[0]) / 2) + random(-3, 3);
                var y = 随机保护.y[0] + ((随机保护.y[1] - 随机保护.y[0]) / 2) + random(-3, 3);
                sleep(random(1200, 1500))
                tools.click(x, y)
            }
            sleep(random(999, 1200))
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
            var p = config.zuobiao.左攻击面板[fbl];
            var r = tools.findImage("zuoguaiwuBtnTip0.png", 0.8)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                tools.click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }

            r = tools.findImage("zuoguaiwuBtnTip1.png", 0.8)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                return true;
            }

            r = tools.findImage("zuozuduiBtnTip0.png", 0.8)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                tools.click(random(p.切换.x[0], p.切换.x[1]), random(p.切换.y[0], p.切换.y[1]));
                sleep(random(1500, 2000))
                tools.click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true;
            }

            r = tools.findImage("zuozuduiBtnTip1.png", 0.8)
            if (r.status && r.img.x > 0 && r.img.y > 0) {
                tools.click(random(p.切换.x[0], p.切换.x[1]), random(p.切换.y[0], p.切换.y[1]));
                sleep(random(1500, 2000))
                tools.click(random(p.选择怪物.x[0], p.选择怪物.x[1]), random(p.选择怪物.y[0], p.选择怪物.y[1]));
                return true
            }

            tools.click(random(p.展开.x[0], p.展开.x[1]), random(p.展开.y[0], p.展开.y[1]));
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
                    tools.click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]));
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
            tools.click(x, y);
        },
        获取人物坐标: () => { //注意这个截图不能太小了，否则会造成识别失败
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
                    var isok = tools.常用操作.检测是否在游戏画面();
                    if (isok &&
                        (
                            result.indexOf("土城") >= 0
                            || result.indexOf("盟重省") >= 0
                            || result.indexOf("红名村") >= 0
                            || result.indexOf("沙巴克") >= 0
                            || result.indexOf("祖玛寺庙") >= 0
                            || result.indexOf("苍月") >= 0
                            || result.indexOf("比奇") >= 0
                            || result.indexOf("银杏山谷") >= 0
                            || result.indexOf("边界村") >= 0
                            || result.indexOf("沙巴克") >= 0
                        )) {
                        tools.执行时间戳.检测内挂(true);
                        tools.常用操作.初始化大地图面板(true);
                        tools.常用操作.初始化攻击面板loops();
                        tools.执行时间戳.检测组队模式(true);
                        //tools.执行时间戳.检测无地牢补给(true);
                    }

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
        检查背包是否已满: (zhengliBtn) => {
            var p = tools.补给操作.获取背包面板位置(zhengliBtn);
            r = tools.findImageAreaForWait("beibao5_7null.png", p.x1, p.y1, p.x2, p.y2, {
                maxTries: 10,
                interval: 100,
                threshold: 0.8
            })
            if (r.status) {
                return false;
            }
            else {
                return true;
            }
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
            if (result.indexOf("久") >= 0) {
                result = result.replace(/\//g, '').replace(/ /g, "");
                let match = result.match(/(?:久)[^\d]{0,2}?(\d{2,5})/);
                if (match && match.length >= 1) {
                    var r = tools.常用方法.处理持久(match[1]); // return { current: cur, max: max };
                    if (r != null) {
                        return {
                            剩持久: parseInt(r.current),
                            满持久: parseInt(r.max)
                        };
                    }
                }
            }
            return null;
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
        使用备用装备: (picName, zhengliBtn) => {
            var isok = false;
            var 背包面板P = tools.补给操作.获取背包面板位置(zhengliBtn);
            var arr = tools.matchTemplateForArea(picName, 5, 0.7,
                [背包面板P.x1, 背包面板P.y1, 背包面板P.width, 背包面板P.height]
            )
            if (arr && arr.count > 0) {
                for (var index = 0; index < arr.count; index++) {
                    var item = arr.r[index];
                    var 文字图 = "";
                    var 点击P = {
                        x: item.point.x + random(5, 10),
                        y: item.point.y + random(2, 8),
                    }
                    sleep(555)
                    tools.click(点击P.x, 点击P.y);
                    sleep(555)
                    var r = tools.补给操作.获取操作按钮(["穿戴"], "寻找装备", false, false);
                    if (!r.status) {
                        sleep(555)
                        tools.常用操作.点击左面板怪物();
                        continue;
                    }
                    if (picName == 装备枚举.凌风) {
                        文字图 = 文字图枚举.凌;
                    }
                    else if (picName == 装备枚举.凝霜) {
                        文字图 = 文字图枚举.凝;
                    }
                    else if (picName == 装备枚举.重盔男 || picName == 装备枚举.重盔女) {
                        文字图 = 文字图枚举.盔;
                    }
                    var result = tools.补给操作.背包选中按钮中找字图(文字图, r.value)
                    if (result.status) {
                        var btn = r.value;
                        var x = btn.img.x + btn.size.w / 2 + random(4, 8);
                        var y = btn.img.y + btn.size.h / 2 + random(-3, 3);
                        tools.click(x, y)
                        isok = true;
                        break;
                    }
                }
            }
            return isok;
        },
        点击人物: () => {
            var 人物中心 = config.zuobiao.人物中心[fbl];
            tools.click(人物中心.x + random(5, -5), 人物中心.y + random(5, -5))
        },
        检测是否在游戏画面: () => {
            if (isShowConfig) {
                return false;
            }
            var 铺P = config.zuobiao.按钮集合[fbl].铺范围;
            var 小退P = config.zuobiao.按钮集合[fbl].铺范围;
            var puBtn = tools.findImageAreaForWait("puBtn.png", 铺P.x[0], 铺P.y[0], 铺P.x[1], 铺P.y[1], {
                maxTries: 10,
                interval: 100
            })
            if (puBtn.status) {
                return true;
            }

            var xiaotuiBtn = tools.findImageAreaForWait("yijianxiaoTuiBtn.png", 小退P.x[0], 小退P.y[0], 小退P.x[1], 小退P.y[1], {
                maxTries: 10,
                interval: 100
            })
            if (xiaotuiBtn.status) {
                return true;
            }

            return false;

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
            var isok = false;
            if (!text) return text;
            if ((text.indexOf("人") >= 0 || text.indexOf("兽") >= 0) && (text.indexOf("古") >= 0 || text.indexOf("吉") >= 0 || text.indexOf("墓") >= 0)) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "兽人古墓一层"
                    isok = true;
                }
                else if (text.indexOf("二") >= 0) {
                    text = "兽人古墓二层"
                    isok = true;
                }
                else if (text.indexOf("三") >= 0) {
                    text = "兽人古墓三层"
                    isok = true;
                }
            }
            else if (text.indexOf("苍") >= 0 || text.indexOf("月") >= 0) {
                if (text.indexOf("渔") >= 0 || text.indexOf("村") >= 0) {
                    text = "苍月岛渔村"
                    isok = true;
                }
                else {
                    text = "苍月岛"
                    isok = true;
                }
            }
            else if (text.indexOf("比奇城") >= 0) {
                text = "比奇城"
                isok = true;
            }
            else if (text.indexOf("比奇省") >= 0) {
                text = "比奇省"
                isok = true;
            }
            else if (text.indexOf("边界村") >= 0) {
                text = "边界村"
                isok = true;
            }
            else if (text.indexOf("银杏") >= 0 && text.indexOf("山") >= 0) {
                text = "银杏山谷"
                isok = true;
            }
            else if ((text.indexOf("沃") >= 0 || text.indexOf("玛") >= 0) && (text.indexOf("森") >= 0 || text.indexOf("林") >= 0)) {
                text = "沃玛森林"
                isok = true;
            }
            else if (text.indexOf("土城") >= 0) {
                text = "土城"
                isok = true;
            }
            else if (text.indexOf("盟重省") >= 0) {
                text = "盟重省"
                isok = true;
            }
            else if (text.indexOf("红名村") >= 0) {
                text = "红名村"
                isok = true;
            }
            else if (text.indexOf("沙巴克") >= 0) {
                text = "沙巴克"
                isok = true;
            }
            else if (text.indexOf("祖玛寺庙") >= 0) {
                text = "祖玛寺庙"
                isok = true;
            }
            else if ((text.indexOf("铁") >= 0 || text.indexOf("灯") >= 0 || text.indexOf("笼") >= 0) && (text.indexOf("屋") >= 0)) {
                text = "铁灯笼屋"
                isok = true;
            }
            else if ((text.indexOf("阴") >= 0 || text.indexOf("森") >= 0) && (text.indexOf("屋") >= 0)) {
                text = "阴森石屋"
                isok = true;
            }
            else if ((text.indexOf("阴") >= 0 || text.indexOf("森") >= 0) && (text.indexOf("路") >= 0)) {
                text = "阴森石路"
                isok = true;
            }
            else if ((text.indexOf("紫") >= 0 || text.indexOf("水") >= 0) && (text.indexOf("晶") >= 0 || text.indexOf("屋") >= 0)) {
                text = "紫水晶屋"
                isok = true;
            }
            else if (text.indexOf("石") >= 0 || text.indexOf("墓") >= 0) {
                if (text.indexOf("小") >= 0 || text.indexOf("溪") >= 0) {
                    text = "石墓小溪"
                    isok = true;
                }
                else if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "石墓一层"
                    isok = true;
                }
                else if (text.indexOf("二") >= 0) {
                    text = "石墓二层"
                    isok = true;
                }
                else if (text.indexOf("三") >= 0) {
                    text = "石墓三层"
                    isok = true;
                }
                else if (text.indexOf("四") >= 0) {
                    text = "石墓四层"
                    isok = true;
                }
                else if (text.indexOf("五") >= 0) {
                    text = "石墓五层"
                    isok = true;
                }
                else if (text.indexOf("阵") >= 0) {
                    text = "石墓阵"
                    isok = true;
                }
                else if (text.indexOf("入") >= 0 || text.indexOf("人") >= 0 || text.indexOf("口") >= 0) {
                    text = "石墓入口"
                    isok = true;
                }
            }
            else if ((text.indexOf("地") >= 0 || text.indexOf("牢") >= 0) && text.indexOf("东") >= 0) {
                text = "地牢一层东"
                isok = true;
            }
            else if ((text.indexOf("地") >= 0 || text.indexOf("牢") >= 0) && text.indexOf("北") >= 0) {
                if (text.indexOf("2") >= 0) {
                    text = "地牢一层北2"
                }
                else {
                    text = "地牢一层北1"
                }
                isok = true;
            }
            else if ((text.indexOf("地") >= 0 || text.indexOf("牢") >= 0) && text.indexOf("西") >= 0) {
                text = "地牢一层西1"
                isok = true;
            }
            else if ((text.indexOf("黑") >= 0 || text.indexOf("暗") >= 0) && (text.indexOf("地") >= 0 || text.indexOf("带") >= 0)) {
                text = "黑暗地带"
                isok = true;
            }
            else if ((text.indexOf("传") >= 0 || text.indexOf("奇") >= 0) && (text.indexOf("部") >= 0 || text.indexOf("落") >= 0)) {
                text = "传奇部落"
                isok = true;
            }
            else if ((text.indexOf("邪") >= 0 || text.indexOf("恶") >= 0) && (text.indexOf("势") >= 0 || text.indexOf("力") >= 0)) {
                text = "邪恶势力"
                isok = true;
            }
            else if (text.indexOf("线") >= 0 || text.indexOf("天") >= 0) {
                text = "一线天"
                isok = true;
            }
            else if ((text.indexOf("死") >= 0 || text.indexOf("亡") >= 0) && (text.indexOf("棺") >= 0 || text.indexOf("材") >= 0)) {
                text = "死亡棺材"
                isok = true;
            }
            else if ((text.indexOf("死") >= 0 || text.indexOf("生") >= 0) && (text.indexOf("之") >= 0 || text.indexOf("间") >= 0)) {
                text = "生死之间"
                isok = true;
            }
            else if ((text.indexOf("恐") >= 0 || text.indexOf("怖") >= 0) && (text.indexOf("空") >= 0 || text.indexOf("间") >= 0)) {
                text = "恐怖空间"
                isok = true;
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
                    isok = true;
                }
                else if (text.indexOf("二") >= 0) {
                    text = "沃玛寺庙二层"
                    isok = true;
                }
                else if (text.indexOf("三") >= 0) {
                    text = "沃玛寺庙三层"
                    isok = true;
                }
                else if (text.indexOf("口") >= 0 || text.indexOf("入") >= 0) {
                    text = "沃玛寺庙入口"
                    isok = true;
                }
            }
            else if ((text.indexOf("骨") >= 0) && (text.indexOf("洞") >= 0 || text.indexOf("层") >= 0)) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "骨魔洞一层"
                    isok = true;
                }
                else if (text.indexOf("二") >= 0) {
                    text = "骨魔洞二层"
                    isok = true;
                }
                else if (text.indexOf("三") >= 0) {
                    text = "骨魔洞三层"
                    isok = true;
                }
            }
            else if ((text.indexOf("牛") >= 0 || text.indexOf("魔") >= 0) && (text.indexOf("寺") >= 0 || text.indexOf("庙") >= 0)) {
                if (text.indexOf("一") >= 0 || text.indexOf("-") >= 0) {
                    text = "牛魔寺庙一层"
                    isok = true;
                }
                else if (text.indexOf("二") >= 0) {
                    text = "牛魔寺庙二层"
                    isok = true;
                }
                else if (text.indexOf("三") >= 0) {
                    text = "牛魔寺庙三层"
                    isok = true;
                }
                else if (text.indexOf("四") >= 0) {
                    text = "牛魔寺庙四层"
                    isok = true;
                }
                else if (text.indexOf("五") >= 0) {
                    text = "牛魔寺庙五层"
                    isok = true;
                }
                else if (text.indexOf("口") >= 0 || text.indexOf("入") >= 0) {
                    text = "牛魔寺庙入口"
                    isok = true;
                }
            }

            if (!isok) {
                tools.常用方法.错误日志(text, -1);
            }
            return text;
        },
        点击左面板人物: () => {
            tools.click(random(17, 23), random(168, 180));
        },
        点击左面板怪物: () => {
            tools.click(random(17, 23), random(293, 313));
        },
        重启游戏: () => {
            tools.常用操作.退出游戏("重启游戏");
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
            tools.常用方法.错误日志(原因, 3);
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
        找大地图关闭按钮: () => {
            var p = {
                x1: 1024,
                y1: 20,
                x2: 1276,
                y2: 100
            }
            var closeBtn = tools.findImageAreaForWait("closeBtn.png", p.x1, p.y1, p.x2, p.y2, {
                maxTries: 10,
                interval: 50,
                threshold: 0.7
            })
            if (closeBtn.status) {
                return closeBtn;
            }
            //toastLog("范围找失败");
            return tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 50
            })
        },
        关闭所有窗口: (isClick, time, isonlyOne) => {
            if (time == null) {
                time = 500;
            }
            if (isClick) {
                tools.常用操作.点击人物();
            }
            var result = true;
            if (isonlyOne) {
                tools.findImageClick("closeBtn2.png", 0.9);
            }
            else {
                var tyrCount = 0;
                while (result) {
                    sleep(time)
                    if (tyrCount >= 10) {
                        break;
                    }
                    result = tools.findImageClick("closeBtn2.png", 0.9);
                    tyrCount++;
                }
            }

        },
        跑图累计错误执行: () => {
            if (跑图错误次数 >= 6) {
                toastLog("跑图错误6次");
                tools.findImageForWaitClick("queBtn.png", {
                    maxTries: 10,
                    interval: 100
                })
                tools.常用操作.关闭所有窗口();

                var 按钮集合 = config.zuobiao.按钮集合[fbl];
                tools.人物移动.左上走(random(2300, 3600));
                tools.人物移动.右下走(random(1200, 1500));
                sleep(300)
                var arr = config.zuobiao.人物点击范围[fbl].上边;
                var r = tools.人物移动.点击人物空位(arr);
                if (!r) {
                    arr = config.zuobiao.人物点击范围[fbl].右边;
                    tools.人物移动.点击人物空位(arr);
                }
                sleep(666);
                tools.click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));



                tools.常用操作.初始化大地图面板(true);

                跑图错误次数 = 0;
            }
        },
    },
    执行时间戳: {
        检测认证: () => {
            if (挂机参数.认证自动识别 == 1 && new Date().getTime() - 认证自检时间 > 认证自检时间戳) {
                tools.悬浮球描述("检测验证码开始");
                var r = tools.验证码认证.检测是否有认证();
                if (r.status) {
                    if (挂机参数.认证自动识别 == 1) {
                        tools.验证码认证.处理认证(r.value);
                    }
                }
                认证自检时间 = new Date().getTime();
                tools.悬浮球描述("检测验证码结束");
            }
        },
        检测宝宝: (强制检测) => {
            if ((new Date().getTime() - 上次检查宝宝时间 > 检查宝宝时间戳 || 强制检测) && 挂机参数.召唤宝宝 == 1) {
                tools.悬浮球描述("检查宝宝开始");
                tools.挂机打怪.宝宝是否存在("攻击", true);
                上次检查宝宝时间 = new Date().getTime();
                tools.悬浮球描述("检查宝宝结束");
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
        检测武器衣服包袱: (强制检测) => {
            var 检查衣服武器时间戳 = 60 * 1000 * 10;
            if (挂机参数.检查衣服武器时间戳 > 0) {
                检查衣服武器时间戳 = 挂机参数.检查衣服武器时间戳 * 1000;
            }
            if ((new Date().getTime() - 上次检查武器衣服时间 > 检查衣服武器时间戳) || 强制检测) {
                //tools.常用操作.点击人物();
                tools.悬浮球描述("检查武器衣服包袱开始");
                var r = tools.常用操作.检查武器衣服持久及包袱();
                tools.常用操作.关闭所有窗口();
                if (r.status) {
                    tools.挂机打怪.回城补给在挂机(r.msg);
                }
                上次检查武器衣服时间 = new Date().getTime();
                tools.悬浮球描述("检查武器衣服包袱结束");
            }
        },
        检测操作模式: (强制检测) => {
            if (new Date().getTime() - 上次设置操作模式时间 >= 操作模式时间戳 || 强制检测) {
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
                tools.悬浮球描述("画面自检开始");
                ocrPladderOCR.release();
                ocrPladderOCR = $ocr.create({
                    models: 'slim', // 指定精度相对低但速度更快的模型，若不指定则为default模型，精度高一点但速度慢一点
                });
                画面自检时间 = new Date().getTime();
                tools.悬浮球描述("画面自检结束");
            }
        },
        // if (new Date().getTime() - 上次检测地牢时间 > 无地牢时间戳 || 强制检测) {
        检测无地牢补给: (强制检测) => {

        }
    },
    挂机打怪: {
        石墓阵打怪: () => {
            // var index = random(0, 3);
            // 石墓阵上一次跑图点
            // var 门点 = null;
            // var 目的地 = null;
            // switch (index) {
            //     case 0:
            //         门点 = config.zuobiao.石墓阵.右;
            //         石墓阵上一次跑图点 = "右"
            //         目的地 = {
            //             x: 14,
            //             y: 36
            //         }
            //         break;
            //     case 1:
            //         门点 = config.zuobiao.石墓阵.左;
            //         石墓阵上一次跑图点 = "左"
            //         目的地 = {
            //             x: 36,
            //             y: 17
            //         }
            //         break;
            //     case 2:
            //         门点 = config.zuobiao.石墓阵.上;
            //         石墓阵上一次跑图点 = "上"
            //         目的地 = {
            //             x: 36,
            //             y: 34
            //         }
            //         break;
            //     case 3:
            //         门点 = config.zuobiao.石墓阵.下;
            //         石墓阵上一次跑图点 = "下"
            //         目的地 = {
            //             x: 18,
            //             y: 13
            //         }
            //         break;
            // }
            // var r = tools.人物移动.指定坐标移动(门点.x, 门点.y, 2)
            // if (r) {
            //     var start = new Date().getTime();
            //     while (true) {
            //         if (new Date().getTime() - start > 15 * 1000) {//超过15秒自动退出
            //             toastLog("进入门点超过时间 强制结束");
            //             return false;
            //         }
            //         var 人物坐标 = tools.常用操作.获取人物坐标();
            //         if (人物坐标 == null || 人物坐标.x <= 0 || 人物坐标.y <= 0) {
            //             tools.人物移动.随机走一步(random(1888, 2000))
            //             continue;
            //         }
            //         if (Math.abs(人物坐标.x - 目的地.x) <= 5 && Math.abs(人物坐标.y - 目的地.y) <= 5) {
            //             toastLog("到达下一层")
            //             return true;
            //         }

            //         if (人物坐标.x > 门点.x) {
            //             if (人物坐标.y > 门点.y) {
            //                 tools.人物移动.左上走(random(666, 888))
            //             }
            //             else if (人物坐标.y < 门点.y) {
            //                 tools.人物移动.左下走(random(666, 888))
            //             }
            //             else {
            //                 tools.人物移动.左走一步(random(666, 888))
            //             }
            //         }
            //         else if (人物坐标.x < 门点.x) {
            //             if (人物坐标.y > 门点.y) {
            //                 tools.人物移动.右上走(random(666, 888))
            //             }
            //             else if (人物坐标.y < 门点.y) {
            //                 tools.人物移动.右下走(random(666, 888))
            //             }
            //             else {
            //                 tools.人物移动.右走一步(random(666, 888))
            //             }
            //         }
            //         else {
            //             if (人物坐标.y > 门点.y) {
            //                 tools.人物移动.上走一步(random(666, 888))
            //             }
            //             else if (人物坐标.y < 门点.y) {
            //                 tools.人物移动.下走一步(random(666, 888))
            //             }
            //         }
            //     }
            // }
            // var start = new Date().getTime();
            // while (true) {
            //     if (new Date().getTime() - start > 30 * 1000) {//超过15秒自动退出
            //         toastLog("向指定坐标移动超过时间 强制结束");
            //         return false;
            //     }
            //     var 人物坐标 = tools.常用操作.获取人物坐标();
            //     if (人物坐标 == null || 人物坐标.x <= 0 || 人物坐标.y <= 0) {
            //         tools.人物移动.随机走一步(random(1888, 2000))
            //         continue;
            //     }
            //     if (Math.abs(人物坐标.x - x) > 偏差) {
            //         if (人物坐标.x > x) {
            //             var r = tools.人物移动.点击左边空位(true);
            //             if (!r) {
            //                 tools.人物移动.左走一步(random(888, 1000));
            //             }
            //         }
            //         else {
            //             var r = tools.人物移动.点击右边空位(true);
            //             if (!r) {
            //                 tools.人物移动.右走一步(random(888, 1000));
            //             }
            //         }
            //     }
            //     else if (Math.abs(人物坐标.y - y) > 偏差) {
            //         if (人物坐标.y > y) {
            //             var r = tools.人物移动.点击上边空位(true);
            //             if (!r) {
            //                 tools.人物移动.上走一步(random(888, 1000));
            //             }
            //         }
            //         else {
            //             var r = tools.人物移动.点击下边空位(true);
            //             if (!r) {
            //                 tools.人物移动.下走一步(random(888, 1000));
            //             }
            //         }
            //     }
            //     else {
            //         toastLog("移动成功");
            //         return true;
            //     }
            // }


            // return false;
        },
        寻找打怪: (打怪次数) => {
            var r = tools.挂机打怪.锁定怪物();
            if (r) {
                tools.挂机打怪.攻击怪物(打怪次数);
            }
            return r;
        },
        锁定怪物: () => {
            var 按钮集合 = config.zuobiao.按钮集合[fbl];
            var 选择怪物攻击 = config.zuobiao.左攻击面板[fbl].选择怪物攻击;
            var isFind = false;
            var 坐标 = null;
            if (挂机参数.挂机地图.indexOf("兽人古墓") >= 0) {
                var p = config.zuobiao.左攻击面板[fbl].怪物集合;
                var 文字p = config.zuobiao.左攻击面板[fbl].文字区域;
                var arr = tools.matchTemplateForArea(文字图枚举.髅左面板, 5, 0.75,
                    [文字p.x1, 文字p.y1, 文字p.x2 - 文字p.x1, 文字p.y2 - 文字p.y1]
                )
                if (arr.count > 0) {
                    var img = captureScreen();
                    arr.r.sort((a, b) => a.point.y - b.point.y);
                    for (var index = 0; index < arr.count; index++) {
                        var item = arr.r[index];
                        var 血条范围 = {
                            x: p.x[0],
                            y: item.point.y,
                            w: p.x[1] - p.x[0],
                            h: 35,
                        }
                        var r = null;
                        if (挂机参数.只打满血怪 == 1) {
                            r = images.findMultiColors(img, p.找色[0].color, [[p.找色[1].x, p.找色[1].y, p.找色[1].color], [p.找色[2].x, p.找色[2].y, p.找色[2].color]], {
                                region: [血条范围.x, 血条范围.y, 血条范围.w, 血条范围.h],
                                threshold: 15
                            });
                        }
                        else {
                            r = images.findMultiColors(img, p.找色非满血[0].color, [[p.找色非满血[1].x, p.找色非满血[1].y, p.找色非满血[1].color]], {
                                region: [血条范围.x, 血条范围.y, 血条范围.w, 血条范围.h],
                                threshold: 35
                            });
                        }
                        if (r && (r.x > 0 || r.y > 0)) {
                            tools.click(r.x + random(12, 20), r.y + random(-3, 3))
                            isFind = true;
                            坐标 = {
                                x: r.x,
                                y: r.y
                            }
                            break;
                        }
                    }
                    utils.recycleNull(img);
                }
            }
            else {
                var 其他玩家 = false;
                if (挂机参数.隐身走动 == 1) {
                    tools.常用操作.点击左面板怪物();
                    其他玩家 = new Date().getTime() - 发现其他玩家时间 <= 发现其他玩家时间等待 ? true : false;
                }
                if (挂机参数.只打满血怪 == 1 || 其他玩家) {
                    var r = tools.挂机打怪.找满血怪();
                    if (r && (r.x > 0 || r.y > 0)) {
                        tools.click(r.x + random(12, 20), r.y + random(-3, 3))
                        isFind = true;
                        坐标 = {
                            x: r.x,
                            y: r.y
                        }
                    }
                }
                else {
                    var r = tools.挂机打怪.找非满血怪();
                    if (r && (r.x > 0 || r.y > 0)) {
                        tools.click(random(选择怪物攻击.x[0], 选择怪物攻击.x[1]), random(选择怪物攻击.y[0], 选择怪物攻击.y[1]))
                        isFind = true;
                        坐标 = {
                            x: r.x,
                            y: r.y
                        }
                    }
                }
            }
            if (isFind) {
                tools.click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
            }
            tools.拾取.激活后操作();
            if (isFind) {
                var r = tools.挂机打怪.找正上锁定怪物(4, 50);
                if (r.status) {
                    上次坐标截图 = tools.常用操作.截图当前坐标();
                    tools.挂机打怪.截图锁定怪物(坐标)
                }
                else {
                    toastLog("锁定失败");
                    return false;
                }
            }
            else {
                tools.悬浮球描述("未发现怪物");
                var now = new Date().getTime();
                if (now >= 禁止拾取时间 && tools.拾取.扫描拾取(null, false)) {
                    tools.拾取.点击(1);
                    // var r = tools.findImage("shiqubiaoji.png", 0.65);
                    // if (r.status){
                    //     tools.拾取.点击(1);
                    //     tools.悬浮球描述("发现需拾取");
                    // }
                }
                if ((new Date().getTime() - 上次打怪时间) >= 1000 * 60 * 5) {
                    tools.常用操作.初始化攻击面板loops();
                    上次打怪时间 = new Date().getTime();
                }
            }
            return isFind;
        },
        截图锁定怪物: (坐标) => {
            var p = config.zuobiao.左攻击面板[fbl];//config.左攻击面板[fbl];
            utils.recycleNull(锁定怪物截图);
            锁定怪物截图 = null;
            var 截图P = {
                x1: p.文字区域.x1,
                x2: p.文字区域.x2,
                y1: 0,
                y2: 0
            }
            if (坐标 && 坐标.y > 0) {
                for (var index = 0; index < p.Y轴顺序.length; index++) {
                    var item = p.Y轴顺序[index];
                    if (坐标.y >= item.y1 && 坐标.y <= item.y2) {
                        截图P.y1 = item.y1;
                        截图P.y2 = item.y2;
                        break;
                    }
                }
            }
            if (截图P.y1 > 0 && 截图P.y2 > 0) {
                锁定怪物截图 = tools.截屏裁剪(null, 截图P.x1, 截图P.y1, 截图P.x2, 截图P.y2);
            }
        },
        攻击怪物: (打怪次数) => {
            上次打怪时间 = new Date().getTime();
            var 按钮集合 = config.zuobiao.按钮集合[fbl];
            var 拾取范围P = config.zuobiao.扫描拾取身边范围[fbl];
            var 宝宝身边怪物 = 0;
            var r = null;
            var timeout = 挂机参数.打怪等待 * 1000;
            var 移动时间戳 = 1000 * 1.4;
            var 上一次移动 = new Date().getTime();

            var 攻击时间戳 = 1000 * 2;
            var 上一次攻击 = new Date().getTime() - (60 * 1000);

            var 隐身时间戳 = 1000 * 15;
            var 上一次隐身 = new Date().getTime() - (60 * 1000);

            var 施毒时间戳 = 1000 * 30;
            var 上一次施毒 = new Date().getTime() - (60 * 1000);

            var 精英怪施毒时间戳 = 1000 * 5;
            var 精英怪上一次施毒 = new Date().getTime() - (60 * 1000);

            var 上一次怪物身边时间 = new Date().getTime() - (60 * 1000);

            var start = new Date().getTime();
            var 怪物 = [];
            var 精英怪 = null;

            var 锁定的怪物 = "";
            var 本次扫描的怪物名 = "";

            var isChange = false;
            var 是否隐身等待 = false;
            var 是否锁定危险怪 = false;
            var 是否强制攻击 = false;
            var 切换左面板人物 = false;
            var 是否正在攻击宝宝身边怪 = false;
            var 左面板怪物 = null;
            var 是否触发拾取 = false;
            var 是否发现不能拾取 = false;
            var 扫描宝宝 = {
                status: false
            };
            while (当前总状态 == 总状态.已启动) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > timeout && (精英怪 == null || !精英怪.status)) {
                    tools.挂机打怪.点击挂机坐标(true);
                    if (挂机参数.隐身走动 == 1) {
                        tools.常用操作.点击左面板怪物();
                    }
                    toastLog("打怪时间超过" + timeout + "秒")
                    sleep(1000 * 15);
                    return false;
                }
                if (锁定失败次数 >= 3) {
                    tools.挂机打怪.点击挂机坐标(true);
                    if (挂机参数.隐身走动 == 1) {
                        tools.常用操作.点击左面板怪物();
                    }
                    toastLog("锁定失败(" + 锁定失败次数 + "),强制跑图")
                    锁定失败次数 = 0;
                    sleep(1000 * 8);
                    return false;
                }
                r = tools.挂机打怪.找正上锁定怪物(0, 0);
                if (r.status) {
                    if (!是否发现不能拾取) {
                        if (精英怪 == null || !精英怪.status || 精英怪.攻击中扫描拾取) {
                            //if (true) {
                            if (tools.拾取.扫描拾取(拾取范围P, false)) {
                                tools.拾取.点击(1);
                                是否触发拾取 = true;
                                tools.悬浮球临时描述("主动拾取");
                                sleep(666)
                            }
                        }
                        if (是否触发拾取) {
                            是否发现不能拾取 = tools.拾取.攻击激活后操作();
                        }
                    }
                    if ((左面板怪物 == null || !左面板怪物.status) && 锁定怪物截图 != null) {
                        左面板怪物 = tools.挂机打怪.分析左面板怪物()
                        if (左面板怪物 != null && 左面板怪物.status && 左面板怪物.value.精英怪) {
                            精英怪 = {
                                status: true,
                                value: 精英怪枚举[左面板怪物.value.name]
                            }
                            //tools.悬浮球临时描述("扫描到精英怪")
                        }
                    }
                    本次扫描的怪物名 = tools.挂机打怪.扫描身边怪物名(左面板怪物);
                    if (本次扫描的怪物名.length > 0) {
                        锁定的怪物 = 本次扫描的怪物名;
                        上一次怪物身边时间 = new Date().getTime();
                    }
                    if (锁定的怪物.length > 0 && (!是否隐身等待 || 是否强制攻击) && (new Date().getTime() - 上一次怪物身边时间) >= (1000 * 1.8)) {
                        r = tools.挂机打怪.向怪物移动(左面板怪物);
                        if (r.status) {
                            continue; //这里continue是为了快速再次执行该方法，避免等移动时间戳
                        }
                        else if (挂机参数.隐身走动 == 0) {
                            锁定失败次数++;
                            上一次怪物身边时间 = new Date().getTime();
                            toastLog("2秒未靠近怪")
                            // tools.click(random(726, 736), random(25, 35));
                            // if (切换左面板人物) {
                            //     切换左面板人物 = false;
                            //     tools.常用操作.点击左面板怪物();
                            // }
                            // toastLog(r.msg);
                            // return false;
                        }
                        else {
                            tools.悬浮球临时描述("移动失败(2)")
                            sleep(120);
                        }
                    }
                    if (挂机参数.隐身走动 == 1 && !是否强制攻击 && (new Date().getTime() - 发现其他玩家时间) <= 发现其他玩家时间等待) { //二分钟内发现玩家需要强制攻击
                        toastLog((new Date().getTime() - 发现其他玩家时间) / 1000 + "秒前发现玩家,强制攻击")
                        是否强制攻击 = true;
                    }
                    if (!isChange) {
                        isChange = tools.挂机打怪.怪物血量是否变化();
                    }
                    if ((!是否隐身等待 || 是否强制攻击) && new Date().getTime() - 上一次攻击 >= 攻击时间戳) { //点攻击放最上面，效率会高一些
                        tools.click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                        上一次攻击 = new Date().getTime();
                    }
                    if (挂机参数.隐身数量 > 0) {
                        怪物 = tools.挂机打怪.获取人物身边怪物数据();
                        扫描宝宝 = tools.挂机打怪.扫描宝宝();
                        if (扫描宝宝.status) {
                            宝宝最后位置信息 = {
                                p: {
                                    x: 扫描宝宝.r.x,
                                    y: 扫描宝宝.r.y,
                                },
                                time: new Date().getTime()
                            }
                        }
                    }
                    if (精英怪 && 精英怪.status && !是否锁定危险怪) {
                        if (精英怪.value.是否施毒) {
                            tools.挂机打怪.施毒();
                            精英怪上一次施毒 = new Date().getTime();
                            上一次施毒 = new Date().getTime();
                            上一次攻击 = new Date().getTime() - (60 * 1000);
                        }
                        if (精英怪.value.是否打防) {
                            tools.挂机打怪.打防();
                        }
                        if (精英怪.value.是否打魔) {
                            tools.挂机打怪.打魔();
                        }
                        if (精英怪.value.是否隐身) {
                            tools.挂机打怪.启动隐身();
                            上一次隐身 = new Date().getTime();
                        }
                        if (精英怪.value.是否攻击) {
                            是否强制攻击 = true;
                        }
                        else {
                            是否隐身等待 = true;
                        }
                        是否锁定危险怪 = true;
                    }
                    if (挂机参数.随机血量 > 0) {
                        // if (tools.挂机打怪.是否小退()) {
                        //     tools.常用操作.小退();
                        // }
                        if (tools.挂机打怪.是否逃跑() && (精英怪 == null || !精英怪.status)) {
                            tools.挂机打怪.开始逃跑();
                        }
                        else if (tools.挂机打怪.是否自愈()) {
                            tools.挂机打怪.自愈();
                        }
                    }
                    if ((精英怪 == null || !精英怪.status) && (挂机参数.隐身走动 == 0 || 是否强制攻击) && !是否正在攻击宝宝身边怪 && isChange && 锁定的怪物.length <= 0) {
                        if (是否强制攻击 && 切换左面板人物) {
                            切换左面板人物 = false;
                            tools.常用操作.点击左面板怪物();
                            sleep(100);
                        }
                        toastLog("血量变化强制关闭")
                        tools.click(random(726, 736), random(25, 35));

                        return true;
                    }
                    if (挂机参数.隐身数量 > 0 && 怪物 && 怪物.length > 0 && (new Date().getTime() - 上一次隐身 >= 隐身时间戳)) {
                        if (怪物.length >= parseInt(挂机参数.隐身数量) || (精英怪 && 精英怪.status && 精英怪.value.是否隐身)) {
                            tools.挂机打怪.启动隐身();
                            上一次隐身 = new Date().getTime();
                        }
                    }
                    if (精英怪 && 精英怪.status && 精英怪.value.是否施毒) {
                        if (new Date().getTime() - 上一次施毒 >= 施毒时间戳 || (new Date().getTime() - 上一次怪物身边时间) >= (1000 * 3)) {
                            tools.挂机打怪.施毒();
                            上一次施毒 = new Date().getTime();
                        }
                    }
                    if (挂机参数.寻找宝宝数 > 0 && 怪物.length >= 挂机参数.寻找宝宝数) {
                        if (!扫描宝宝.status) {
                            tools.挂机打怪.寻找宝宝();
                        }
                    }
                    if (!是否隐身等待 && !是否强制攻击 && 挂机参数.隐身走动 == 1 && 锁定的怪物.length > 0) {
                        var r = 扫描宝宝;
                        if (r.status) {
                            var 人物血量中心 = config.zuobiao.人物血量中心[fbl];
                            var 一格像素 = config.zuobiao.走一格像素[fbl];
                            if (Math.abs(r.r.x - 人物血量中心.x) >= 一格像素.x * 4) {
                                r.r.x = r.r.x > 人物血量中心.x ? 人物血量中心.x + 一格像素.x * 4 : 人物血量中心.x - 一格像素.x * 4;
                            }

                            if (Math.abs(r.r.y - 人物血量中心.y) >= 一格像素.y * 3) {
                                r.r.y = r.r.y > 人物血量中心.y ? 人物血量中心.y + 一格像素.x * 3 : 人物血量中心.y - 一格像素.y * 3;//一格像素.y * 3;
                            }
                            tools.人物移动.指定像素移动(r.r.x, r.r.y);
                            是否隐身等待 = true;
                            切换左面板人物 = true;
                            tools.常用操作.点击左面板人物();
                            sleep(222);
                        }
                    }
                    if (new Date().getTime() - 上一次移动 >= 移动时间戳) {
                        var 是否跑图 = tools.人物移动.是否跑图并截图坐标(false);
                        if (!是否跑图) {
                            上一次隐身 = new Date().getTime() - (60 * 1000);
                        }
                        else {
                            if ((!是否隐身等待 || 是否强制攻击) && 锁定的怪物.length <= 0) {
                                r = tools.挂机打怪.向怪物移动(左面板怪物);
                                if (r.status) {
                                    continue; //这里continue是为了快速再次执行该方法，避免等移动时间戳
                                }
                                else if (挂机参数.隐身走动 == 0) {
                                    锁定失败次数++;
                                    tools.click(random(726, 736), random(25, 35));
                                    toastLog(r.msg);
                                    return false;
                                }
                                else {
                                    tools.人物移动.随机走一步(random(777, 999));
                                    tools.悬浮球临时描述("无法移动")
                                    //tools.挂机打怪.打符();
                                }
                            }
                        }
                        上一次移动 = new Date().getTime();
                    }
                    if (是否隐身等待 && !是否强制攻击) {
                        var result = tools.挂机打怪.判断是否强制攻击();
                        宝宝身边怪物 = result.怪物数;
                        if (result.status) {
                            toastLog(result.来源)
                            是否强制攻击 = true;
                        }
                    }
                    if (精英怪 == null || !精英怪.status) {
                        精英怪 = tools.挂机打怪.寻找精英怪();
                        if (精英怪.status) {
                            //tools.悬浮球临时描述("扫描到精英怪")
                            toastLog("扫描到精英怪")
                            //tools.挂机打怪.打符();
                            锁定的怪物 = "";
                            上一次攻击 = new Date().getTime() - (60 * 1000);
                            continue;
                        }
                    }
                    // if (tools.补给操作.检测聊天框持久提示()) {
                    //     tools.执行时间戳.检测武器衣服包袱(true);
                    // }

                    tools.执行时间戳.检测认证();

                    tools.执行时间戳.检测画面();

                    tools.执行时间戳.检测宝宝();

                    tools.执行时间戳.检测蓝药();

                    if (精英怪 == null || !精英怪.status) {
                        tools.执行时间戳.检测武器衣服包袱();
                    }

                    tools.悬浮球描述("(" + parseInt((timeout - (时间戳)) / 1000) + ")(" + 锁定的怪物 + "[" + isChange + "])宝宝(" + 宝宝身边怪物 + ")");
                } else {
                    if (new Date().getTime() >= 禁止拾取时间) {
                        tools.拾取.点击(1);
                    }
                    else {
                        toastLog("取消被动拾取")
                    }
                    if (isChange) {
                        锁定失败次数 = 0;
                    }
                    else {
                        锁定失败次数++;
                        toastLog("锁定失败(" + 锁定失败次数 + ")")
                    }
                    精英怪 = null;
                    左面板怪物 = null;
                    锁定的怪物 = "";
                    是否锁定危险怪 = false;
                    上次坐标截图 = tools.常用操作.截图当前坐标();
                    上一次移动 = new Date().getTime();
                    上一次攻击 = new Date().getTime() - (60 * 1000);
                    start = new Date().getTime();
                    if (挂机参数.攻击宝宝身边 > 0) {
                        var t1 = new Date().getTime();
                        r = tools.挂机打怪.获取宝宝身边怪物数据(1);
                        if (r.status && r.value && r.value.length > 0) {
                            var 是否攻击宝宝身边 = false;
                            if (挂机参数.隐身走动 == 0) {
                                是否攻击宝宝身边 = true;
                            }
                            else if (r.value.length >= 挂机参数.攻击宝宝身边) {
                                是否攻击宝宝身边 = true;
                            }
                            var r1 = tools.挂机打怪.攻击宝宝身边怪物(r, 是否攻击宝宝身边);
                            if (r1) {
                                if (是否攻击宝宝身边) {
                                    是否强制攻击 = true;
                                    是否正在攻击宝宝身边怪 = true;
                                }
                                else {
                                    是否强制攻击 = false;
                                }
                                continue;
                            }
                        }
                    }
                    if (切换左面板人物) {
                        切换左面板人物 = false;
                        tools.常用操作.点击左面板怪物();
                        sleep(100);
                        tools.常用操作.点击左面板怪物();
                    }
                    break;
                }
            }
        },
        关闭中间怪物: () => {
            tools.click(random(726, 736), random(25, 35));
        },
        分析左面板怪物: () => {
            if (挂机参数.挂机地图大 == "蜈蚣洞") {
                var arr = 左怪物文字枚举.蜈蚣洞;
            }
            else if (挂机参数.挂机地图大 == "骷髅洞") {
                var arr = 左怪物文字枚举.骷髅洞;
            }
            else if (挂机参数.挂机地图大 == "牛魔") {
                var arr = 左怪物文字枚举.牛魔洞;
            }
            if (arr != null && arr.length > 0 && 锁定怪物截图 != null) {
                for (var index = 0; index < arr.length; index++) {
                    var item = arr[index];
                    var r = tools.findImage(item.pic, 0.7, 锁定怪物截图);
                    if (r.status) {
                        return {
                            status: true,
                            value: item
                        };
                    }
                }
            }
            return {
                status: false
            };
        },
        寻找精英怪: () => {
            var arr = [];
            var 按钮集合 = config.zuobiao.按钮集合[fbl];
            var p = config.zuobiao.左攻击面板[fbl].怪物集合;
            if (挂机参数.挂机地图.indexOf("牛魔") >= 0) {
                // arr.push(精英怪枚举.牛魔将军)
                // arr.push(精英怪枚举.牛魔法师)
                // arr.push(精英怪枚举.宝箱)
            }
            else if (挂机参数.挂机地图.indexOf("骨魔") >= 0) {
                arr.push(精英怪枚举.宝箱)
            }
            else if (挂机参数.挂机地图大.indexOf("蜈蚣洞") >= 0) {
                arr.push(精英怪枚举.邪恶蚶虫)
                arr.push(精英怪枚举.巨型蠕虫)
            }
            if (arr && arr.length > 0) {
                for (var index = 0; index < arr.length; index++) {
                    var item = arr[index];
                    var r = tools.findImageArea(item.pic, p.x[0], p.y[0], p.x[1], p.y[1], 0.85);
                    if (r.status) {
                        if (item.只攻击满血) {
                            var 血条范围 = {
                                x: p.x[0],
                                y: r.img.y,
                                w: p.x[1] - p.x[0],
                                h: 35,
                            }
                            var img = captureScreen();
                            var 满血条 = images.findMultiColors(img, p.找色[0].color, [[p.找色[1].x, p.找色[1].y, p.找色[1].color], [p.找色[2].x, p.找色[2].y, p.找色[2].color]], {
                                region: [血条范围.x, 血条范围.y, 血条范围.w, 血条范围.h],
                                threshold: 15
                            });
                            utils.recycleNull(img);
                            if (满血条 == null || 满血条.x <= 0 || 满血条.y <= 0) {
                                continue;
                            }
                        }
                        var x = r.img.x + r.size.w / 2 + random(5, 10);
                        var y = r.img.y + r.size.h / 2 + random(5, 10);
                        tools.click(x, y);
                        if (item.是否攻击) {
                            sleep(122);
                            tools.click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                        }
                        return {
                            status: true,
                            value: item
                        };
                    }
                }
            }
            return {
                status: false
            }
        },
        判断是否强制攻击: () => {
            var 怪物数 = 0;
            var p = config.zuobiao.左攻击面板[fbl].怪物集合;
            var 寻人 = tools.挂机打怪.找非满血怪();//注意这里必须提前切换左面板选怪人物
            if (寻人 && (寻人.x > 0 || 寻人.y > 0)) {
                var nan = tools.findImageAreaForWait("renwu_nan.png", p.x[0], p.y[0], p.x[1], p.y[1], {
                    maxTries: 3,
                    interval: 100,
                    threshold: 0.7
                })
                if (nan.status) {
                    发现其他玩家时间 = new Date().getTime();
                    return {
                        status: true,
                        怪物数: 怪物数,
                        来源: "发现男玩家"
                    };
                }

                var nv = tools.findImageAreaForWait("renwu_nv.png", p.x[0], p.y[0], p.x[1], p.y[1], {
                    maxTries: 3,
                    interval: 100,
                    threshold: 0.7
                })
                if (nv.status) {
                    发现其他玩家时间 = new Date().getTime();
                    return {
                        status: true,
                        怪物数: 怪物数,
                        来源: "发现女玩家"
                    };
                }
            }


            var 宝宝身边怪物 = tools.挂机打怪.获取宝宝身边怪物数据(1);
            if (宝宝身边怪物.status && 宝宝身边怪物.value) {
                怪物数 = 宝宝身边怪物.value.length;
            }
            if (宝宝身边怪物.status && 宝宝身边怪物.value && 宝宝身边怪物.value.length >= 挂机参数.攻击宝宝身边) {
                var r1 = tools.挂机打怪.攻击宝宝身边怪物(宝宝身边怪物, true);
                sleep(1000)
                if (r1) {
                    return {
                        status: true,
                        怪物数: 怪物数,
                        来源: "攻击宝宝身边怪物"
                    };
                }
            }
            return {
                怪物数: 怪物数,
                status: false
            };
        },
        找满血怪: () => {
            var arr = config.zuobiao.左攻击面板[fbl].血量坐标;
            var img = captureScreen();
            var result = null;
            var t1 = new Date().getTime();
            for (let index = 0; index < arr.length; index++) {
                var item = arr[index];
                var isC1 = images.detectsColor(img, item.c1, item.x1, item.y1, 10, "diff")
                if (isC1) {
                    var isC2 = images.detectsColor(img, item.c2, item.x2, item.y2, 10, "diff")
                    if (isC2) {
                        result = {
                            x: item.x1 + random(30, 90),
                            y: item.y1 + random(-5, 3),
                        }
                        break;
                    }
                }
                // var reg = [item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1];
                // var r = images.findMultiColors(img, p[0].color, [[p[1].x, p[1].y, p[1].color]], {
                //     region: reg,
                //     threshold: 15
                // });
                // tools.悬浮球临时描述(JSON.stringify(r) + ":" + JSON.stringify(reg))
                // if (r && (r.x > 0 || r.y > 0)) {
                //     result = r;
                //     break;
                // }
            }
            utils.recycleNull(img);
            
            return result;
            // var p = config.zuobiao.左攻击面板[fbl].怪物集合;
            // var img = captureScreen();
            // var r = images.findMultiColors(img, p.找色[0].color, [[p.找色[1].x, p.找色[1].y, p.找色[1].color], [p.找色[2].x, p.找色[2].y, p.找色[2].color]], {
            //     region: [p.x[0], p.y[0], p.x[1] - p.x[0], p.y[1] - p.y[0]],
            //     threshold: 30
            // });
            // utils.recycleNull(img);
            // return r;
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
        攻击宝宝身边怪物: (宝宝身边怪物, 是否攻击) => {
            if (宝宝身边怪物.status && 宝宝身边怪物.value && 宝宝身边怪物.value.length > 0) {

                var 选择怪物攻击 = config.zuobiao.左攻击面板[fbl].选择怪物攻击;
                var 按钮集合 = config.zuobiao.按钮集合[fbl];
                if (挂机参数.隐身走动 == 0) {
                    var r = tools.挂机打怪.找非满血怪();
                    if (r && (r.x > 0 || r.y > 0)) {
                        tools.click(random(选择怪物攻击.x[0], 选择怪物攻击.x[1]), random(选择怪物攻击.y[0], 选择怪物攻击.y[1]))
                        if (是否攻击) {
                            sleep(random(200, 222));
                            tools.click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                            //toastLog("攻宠身边怪")
                        }
                        else {
                            //toastLog("锁宠身边怪")
                        }
                        return true;
                    }
                }
                else {
                    var r = 宝宝身边怪物.value[0];
                    tools.click(r.x + random(10, 20), r.y + random(5, 10));
                    if (是否攻击) {
                        sleep(random(200, 222));
                        tools.click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                    }
                    return true;
                }
            }
            return false;
        },
        找正上锁定怪物: (tryCount, interval) => {
            var p = config.zuobiao.中间怪物Btn范围[fbl];
            if (interval == null || interval <= 0) {
                interval = 10;
            }
            if (tryCount == null || tryCount <= 0) {
                tryCount = 1;
            }
            if (tryCount <= 0) {
                return tools.findImageArea("zhongjianguaiwuBtn.png", p.x1, p.y1, p.x2, p.y2, 0.8)
            }
            else {
                return tools.findImageAreaForWait("zhongjianguaiwuBtn.png", p.x1, p.y1, p.x2, p.y2, {
                    maxTries: tryCount,
                    interval: interval,
                    threshold: 0.8
                })
            }
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
        需要拾取明细: () => {
            return tools.matchTemplate("shiqubiaoji.png", 5, 0.65);
        },
        初始化挂机: () => {

            tools.挂机打怪.设置宝宝模式("攻击");

            tools.执行时间戳.检测无地牢补给(true);

            tools.执行时间戳.检测操作模式(true);

            //tools.常用操作.初始化大地图面板(true);

            tools.常用操作.初始化攻击面板loops();

            tools.执行时间戳.检测组队模式(true);
            //tools.执行时间戳.检测无地牢补给(true);

            //tools.执行时间戳.检测内挂(true);

            //tools.执行时间戳.检测组队模式(true);

        },
        石墓阵跑图: () => {
            // var index = random(0, 3);
            // 石墓阵上一次跑图点
            // var 门点 = null;
            // var 目的地 = null;
            // switch (index) {
            //     case 0:
            //         门点 = config.zuobiao.石墓阵.右;
            //         石墓阵上一次跑图点 = "右"
            //         目的地 = {
            //             x: 14,
            //             y: 36
            //         }
            //         break;
            //     case 1:
            //         门点 = config.zuobiao.石墓阵.左;
            //         石墓阵上一次跑图点 = "左"
            //         目的地 = {
            //             x: 36,
            //             y: 17
            //         }
            //         break;
            //     case 2:
            //         门点 = config.zuobiao.石墓阵.上;
            //         石墓阵上一次跑图点 = "上"
            //         目的地 = {
            //             x: 36,
            //             y: 34
            //         }
            //         break;
            //     case 3:
            //         门点 = config.zuobiao.石墓阵.下;
            //         石墓阵上一次跑图点 = "下"
            //         目的地 = {
            //             x: 18,
            //             y: 13
            //         }
            //         break;
            // }
            // var r = tools.人物移动.指定坐标移动(门点.x, 门点.y, 2)
            // if (r) {
            //     var start = new Date().getTime();
            //     while (true) {
            //         if (new Date().getTime() - start > 15 * 1000) {//超过15秒自动退出
            //             toastLog("进入门点超过时间 强制结束");
            //             return false;
            //         }
            //         var 人物坐标 = tools.常用操作.获取人物坐标();
            //         if (人物坐标 == null || 人物坐标.x <= 0 || 人物坐标.y <= 0) {
            //             tools.人物移动.随机走一步(random(1888, 2000))
            //             continue;
            //         }
            //         if (Math.abs(人物坐标.x - 目的地.x) <= 5 && Math.abs(人物坐标.y - 目的地.y) <= 5) {
            //             toastLog("到达下一层")
            //             return true;
            //         }

            //         if (人物坐标.x > 门点.x) {
            //             if (人物坐标.y > 门点.y) {
            //                 tools.人物移动.左上走(random(666, 888))
            //             }
            //             else if (人物坐标.y < 门点.y) {
            //                 tools.人物移动.左下走(random(666, 888))
            //             }
            //             else {
            //                 tools.人物移动.左走一步(random(666, 888))
            //             }
            //         }
            //         else if (人物坐标.x < 门点.x) {
            //             if (人物坐标.y > 门点.y) {
            //                 tools.人物移动.右上走(random(666, 888))
            //             }
            //             else if (人物坐标.y < 门点.y) {
            //                 tools.人物移动.右下走(random(666, 888))
            //             }
            //             else {
            //                 tools.人物移动.右走一步(random(666, 888))
            //             }
            //         }
            //         else {
            //             if (人物坐标.y > 门点.y) {
            //                 tools.人物移动.上走一步(random(666, 888))
            //             }
            //             else if (人物坐标.y < 门点.y) {
            //                 tools.人物移动.下走一步(random(666, 888))
            //             }
            //         }
            //     }
            // }
        },
        点击挂机坐标: (强制跑图) => {
            var 是否跑图 = false;
            if (强制跑图) {
                是否跑图 = true;
            }
            else {
                是否跑图 = tools.人物移动.是否跑图并截图坐标(true);
            }
            var 挂机坐标s = tools.挂机打怪.获取挂机坐标();
            if (!挂机坐标s.status) {
                return
            }
            if (!是否跑图) {
                return;
            }
            tools.常用操作.跑图累计错误执行();
            tools.常用操作.打开大地图();
            var closeImg = null;
            var closeBtn = tools.常用操作.找大地图关闭按钮();
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                跑图错误次数++;
                toastLog("找不到地图关闭按钮")
                return;
            }
            var 箭头P = tools.挂机打怪.大地图箭头(closeBtn);
            if (挂机参数.反跑地图 == 1) {
                if (挂机点跑图顺序 <= 0) {
                    挂机点跑图顺序 = 挂机坐标s.result.length - 1;
                }
            }
            else {
                if (挂机点跑图顺序 >= 挂机坐标s.result.length) {
                    挂机点跑图顺序 = 0;
                }
            }

            var r = 挂机坐标s.result[挂机点跑图顺序];
            var x = 0;
            var y = 0;
            if (Array.isArray(r.x)) {
                x = closeImg.x + random(r.x[0], r.x[1]);
                y = closeImg.y + random(r.y[0], r.y[1]);
            }
            else {
                var 偏移 = config.zuobiao.打怪点偏移[fbl];
                x = closeImg.x + (r.x - 偏移.x) + random(-5, 5);
                y = closeImg.y + (r.y - 偏移.y) + random(-5, 5);
            }
            //toastLog("x:" + (箭头P.r.x - x) + ",y:" + (箭头P.r.y - y) + "");
            if (箭头P.status && 箭头P.r && Math.abs(箭头P.r.x - x) <= 50 && Math.abs(箭头P.r.y - y) <= 50) {

                toastLog("到达挂点[" + (挂机点跑图顺序 + 1) + "]");
                if (挂机参数.反跑地图 == 1) {
                    挂机点跑图顺序--;
                }
                else {
                    挂机点跑图顺序++;
                }
                r = 挂机坐标s.result[挂机点跑图顺序];
                if (Array.isArray(r.x)) {
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                }
                else {
                    var 偏移 = config.zuobiao.打怪点偏移[fbl];
                    x = closeImg.x + (r.x - 偏移.x) + random(-5, 5);
                    y = closeImg.y + (r.y - 偏移.y) + random(-5, 5);
                }
            }
            tools.click(x, y)
            是否强制跑图 = false;
            tools.常用操作.关闭所有窗口(false, 0, true);
            return;
        },
        // 点击挂机坐标: (强制跑图) => {
        //     var 是否跑图 = false;
        //     if (强制跑图) {
        //         是否跑图 = true;
        //     }
        //     else {
        //         是否跑图 = tools.人物移动.是否跑图并截图坐标(true);
        //     }
        //     var 挂机坐标s = tools.挂机打怪.获取挂机坐标();
        //     if (!挂机坐标s.status) {
        //         return
        //     }
        //     if (!是否跑图) {
        //         return;
        //     }
        //     tools.常用操作.跑图累计错误执行();
        //     tools.常用操作.打开大地图();
        //     var closeImg = null;
        //     var closeBtn = tools.findImageForWait("closeBtn.png", {
        //         maxTries: 10,
        //         interval: 100
        //     })
        //     if (closeBtn.status) {
        //         closeImg = closeBtn.img;
        //     } else {
        //         跑图错误次数++;
        //         toastLog("找不到地图关闭按钮")
        //         return;
        //     }
        //     var start = new Date().getTime();
        //     while (true) {
        //         if (new Date().getTime() - start > (1000 * 6)) {
        //             toastLog("点击坐标超过6秒");
        //             tools.常用操作.关闭所有窗口(false, 0, true);
        //             return;
        //         }
        //         if (挂机参数.反跑地图 == 1) {
        //             if (挂机点跑图顺序 <= 0) {
        //                 挂机点跑图顺序 = 挂机坐标s.result.length - 1;
        //             }
        //         }
        //         else {
        //             if (挂机点跑图顺序 >= 挂机坐标s.result.length) {
        //                 挂机点跑图顺序 = 0;
        //             }
        //         }
        //         var r = 挂机坐标s.result[挂机点跑图顺序];
        //         var x = 0;
        //         var y = 0;
        //         if (Array.isArray(r.x)) {
        //             x = closeImg.x + random(r.x[0], r.x[1]);
        //             y = closeImg.y + random(r.y[0], r.y[1]);
        //         }
        //         else {
        //             var 偏移 = config.zuobiao.打怪点偏移[fbl];
        //             x = closeImg.x + (r.x - 偏移.x) + random(-5, 5);
        //             y = closeImg.y + (r.y - 偏移.y) + random(-5, 5);
        //         }


        //         tools.click(x, y)

        //         var x1 = closeImg.x - 1033;
        //         var x2 = x1 + 817;
        //         var y1 = closeImg.y + 39;
        //         var y2 = y1 + 524;

        //         var result = null;
        //         if (x1 < 0 || y1 < 0 || x2 > 1280 || y2 > 720) {
        //             toastLog("参数异常x1=" + x1 + ",y1=" + y1 + ",x2=" + x2 + ",y2=" + y2 + "");
        //             tools.常用操作.关闭所有窗口(false, 0, true);
        //             return;
        //         }
        //         try {
        //             result = tools.findAllColorAreaForWait("#00FFFF", x1, y1, x2, y2, {
        //                 maxTries: 10,
        //                 interval: 200
        //             })
        //         } catch (error) {
        //             toastLog("找色(线路)异常");
        //             tools.常用操作.关闭所有窗口(false, 0, true);
        //             return;
        //         }
        //         if (result.status && result.count >= 10) {
        //             是否强制跑图 = false;
        //             跑图错误次数 = 0;
        //             toastLog("前往挂机点[" + (挂机点跑图顺序 + 1) + "]");
        //             tools.常用操作.关闭所有窗口(false, 0, true);
        //             return;
        //         }
        //         else {
        //             if (挂机参数.反跑地图 == 1) {
        //                 挂机点跑图顺序--;
        //             }
        //             else {
        //                 挂机点跑图顺序++;
        //             }
        //             跑图错误次数++;
        //             tools.悬浮球描述("可能到达挂机点[" + (挂机点跑图顺序 + 1) + "]");
        //         }
        //     }
        // },
        是否逃跑: () => {
            var result = false;
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FF4246", [[0, -43, "#A5060D"]], {
                region: [365, 590, 3, 100],
                threshold: 15
            });
            // var r = images.findMultiColors(img, "#FF4246", [[0, -32, "#B80918"]], {
            //     region: [365, 600, 3, 45],
            //     threshold: 15
            // });
            utils.recycleNull(img);
            if (r == null || r.x <= 0 || r.y <= 0) {
                if (tools.常用操作.检测是否在游戏画面()) {
                    result = true;
                }
            }
            return result;
        },
        是否自愈: () => {
            var result = false;
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FF4246", [[0, -63, "#660611"]], {
                region: [365, 570, 3, 100],
                threshold: 15
            });
            utils.recycleNull(img);
            if (r == null || r.x <= 0 || r.y <= 0) {
                if (tools.常用操作.检测是否在游戏画面()) {
                    var r = tools.findImageArea("closeBtn2.png", 288, 36, 1280, 560, 0.9);
                    if (!r.status) {
                        result = true;
                    }
                }
            }
            return result;
        },
        是否小退: () => {
            var result = false;
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FF4246", [[0, -23, "#BF0712"]], {
                region: [365, 610, 3, 50],
                threshold: 15
            });
            utils.recycleNull(img);
            if (r == null || r.x <= 0 || r.y <= 0) {
                if (tools.常用操作.检测是否在游戏画面()) {
                    var r = tools.findImageArea("closeBtn2.png", 288, 36, 1280, 560, 0.9);
                    if (!r.status) {
                        result = true;
                    }
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
            var 范围 = config.zuobiao.按钮集合[fbl].隐身;
            var start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 6)) {
                    toastLog("超过隐身时间戳,强制结束");
                    break;
                }
                tools.click(random(范围.x[0], 范围.x[1]), random(范围.y[0], 范围.y[1]));
                var r = tools.挂机打怪.是否技能冷确中(范围);
                if (r) {
                    break;
                }
                // var color = "#FFFFFF"
                // var img = captureScreen();
                // var r = images.findMultiColors(img, color, [[0, 18, color], [12, 17, color]], {
                //     region: [隐身P.x[0], 隐身P.y[0], 隐身P.x[1] - 隐身P.x[0], 隐身P.y[1] - 隐身P.y[0]],
                //     threshold: 10
                // });
                // utils.recycleNull(img);
                // if (r && (r.x > 0 || r.y > 0)) {
                //     break;
                // }
            }
        },
        打符: () => {
            var 范围 = config.zuobiao.按钮集合[fbl].打符;
            var start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 6)) {
                    toastLog("超过打符时间戳,强制结束");
                    break;
                }
                tools.click(random(范围.x[0], 范围.x[1]), random(范围.y[0], 范围.y[1]));
                var r = tools.挂机打怪.是否技能冷确中(范围);
                if (r) {
                    break;
                }
            }
        },
        施毒: () => {
            var 范围 = config.zuobiao.按钮集合[fbl].施毒;
            var start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 4)) {
                    toastLog("超过施毒时间戳,强制结束");
                    break;
                }
                tools.click(random(范围.x[0], 范围.x[1]), random(范围.y[0], 范围.y[1]));
                var r = tools.挂机打怪.是否技能冷确中(范围);
                if (r) {
                    break;
                }
            }
        },
        打防: () => {
            var 范围 = config.zuobiao.按钮集合[fbl].打防;
            var start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 4)) {
                    toastLog("超过打防时间戳,强制结束");
                    break;
                }
                tools.click(random(范围.x[0], 范围.x[1]), random(范围.y[0], 范围.y[1]));
                var r = tools.挂机打怪.是否技能冷确中(范围);
                if (r) {
                    break;
                }
            }
        },
        打魔: () => {
            var 范围 = config.zuobiao.按钮集合[fbl].打魔;
            var start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 4)) {
                    toastLog("超过打魔时间戳,强制结束");
                    break;
                }
                tools.click(random(范围.x[0], 范围.x[1]), random(范围.y[0], 范围.y[1]));
                var r = tools.挂机打怪.是否技能冷确中(范围);
                if (r) {
                    break;
                }
            }
        },
        自愈: () => {
            var 范围 = config.zuobiao.按钮集合[fbl].自愈;
            var start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 6)) {
                    toastLog("超过自愈时间戳,强制结束");
                    break;
                }
                tools.click(random(范围.x[0], 范围.x[1]), random(范围.y[0], 范围.y[1]));
                var r = tools.挂机打怪.是否技能冷确中(范围);
                if (r) {
                    break;
                }
            }
        },
        召唤宝宝: () => {
            var 范围 = config.zuobiao.按钮集合[fbl].召唤宝宝;
            var start = new Date().getTime();
            while (true) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 6)) {
                    toastLog("超过召唤宝宝时间戳,强制结束");
                    break;
                }
                tools.click(random(范围.x[0], 范围.x[1]), random(范围.y[0], 范围.y[1]));
                var r = tools.挂机打怪.是否技能冷确中(范围);
                if (r) {
                    break;
                }
            }
        },
        是否技能冷确中: (范围) => {
            var 技能冷却 = config.zuobiao.按钮集合[fbl].技能冷却;
            var img = captureScreen();
            var r = images.findMultiColors(img, 技能冷却.c1, [[技能冷却.x2, 技能冷却.y2, 技能冷却.c2], [技能冷却.x3, 技能冷却.y3, 技能冷却.c3]], {
                region: [范围.x[0], 范围.y[0], 范围.x[1] - 范围.x[0], 范围.y[1] - 范围.y[0]],
                threshold: 10
            });
            utils.recycleNull(img);
            if (r && (r.x > 0 || r.y > 0)) {
                return true;
            }
            return false;
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
            } else if (挂机参数.挂机地图 == "地牢一层北2") {
                r = config.zuobiao.盟重大地图偏移[fbl].地牢一层北2.打怪点;
            } else if (挂机参数.挂机地图 == "地牢一层西1") {
                r = config.zuobiao.盟重大地图偏移[fbl].地牢一层西1.打怪点;
            } else if (挂机参数.挂机地图 == "黑暗地带") {
                r = config.zuobiao.盟重大地图偏移[fbl].黑暗地带.打怪点;
            } else if (挂机参数.挂机地图 == "传奇部落") {
                r = config.zuobiao.盟重大地图偏移[fbl].传奇部落.打怪点;
            } else if (挂机参数.挂机地图 == "邪恶势力") {
                r = config.zuobiao.盟重大地图偏移[fbl].邪恶势力.打怪点;
            } else if (挂机参数.挂机地图 == "一线天") {
                r = config.zuobiao.盟重大地图偏移[fbl].一线天.打怪点;
            } else if (挂机参数.挂机地图 == "死亡棺材") {
                r = config.zuobiao.盟重大地图偏移[fbl].死亡棺材.打怪点;
            } else if (挂机参数.挂机地图 == "生死之间") {
                r = config.zuobiao.盟重大地图偏移[fbl].生死之间.打怪点;
            } else if (挂机参数.挂机地图 == "恐怖空间") {
                r = config.zuobiao.盟重大地图偏移[fbl].恐怖空间.打怪点;
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
            else if (挂机参数.挂机地图 == "比奇野外") {
                r = config.zuobiao.比奇大地图偏移[fbl].比奇野外.打怪点;
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
        宝宝是否存在: (模式, 是否召唤) => {
            var r = tools.挂机打怪.扫描宝宝();
            if (r.status) {
                return true;
            }
            else {
                var r = tools.挂机打怪.设置宝宝模式(模式);
                if (!r && 是否召唤) {
                    tools.挂机打怪.召唤宝宝();
                    return true;
                }
                return r;
            }
        },
        设置宝宝模式: (模式) => {
            if (挂机参数.召唤宝宝 == 0) {
                return false;
            }
            var p = config.zuobiao.聊天框最后一行[fbl];
            var p1 = config.zuobiao.聊天框面板[fbl];
            var 按钮 = config.zuobiao.按钮集合[fbl].宠物;
            var isOk = false;
            var tryCount = 0;
            tools.click(random(按钮.x[0], 按钮.x[1]), random(按钮.y[0], 按钮.y[1]));
            var result = tools.findImageAreaForWait(文字图枚举.下属, p1.x1, p1.y1, p1.x2, p1.y2, {
                maxTries: 6,
                interval: 100,
                threshold: 0.8
            });
            if (result.status) {
                var clickNums = 0;
                while (true) {
                    tryCount++;
                    tools.悬浮球描述("设置宝宝模式(" + tryCount + ")");
                    if (tryCount > 3) {
                        break;
                    }
                    sleep(333)
                    var clickNums = 0;
                    var 当前模式 = null;
                    var r = tools.findImageArea(文字图枚举.休息, p.x1, p.y1, p.x2, p.y2, 0.8);
                    if (r.status) {
                        当前模式 = "休息";
                    }
                    else {
                        r = tools.findImageArea(文字图枚举.攻击, p.x1, p.y1, p.x2, p.y2, 0.8);
                        if (r.status) {
                            当前模式 = "攻击";
                        }
                        else {
                            r = tools.findImageArea(文字图枚举.跟随, p.x1, p.y1, p.x2, p.y2, 0.8);
                            if (r.status) {
                                当前模式 = "跟随";
                            }
                            else {
                                tools.click(random(按钮.x[0], 按钮.x[1]), random(按钮.y[0], 按钮.y[1]));
                                continue;
                            }
                        }
                    }
                    if (模式 == "攻击") {
                        if (当前模式 == "休息") {
                            clickNums = 2;
                        }
                        else if (当前模式 == "攻击") {
                            clickNums = 0;
                        }
                        else if (当前模式 == "跟随") {
                            clickNums = 1;
                        }
                        else {
                            continue;
                        }
                    }
                    else if (模式 == "跟随") {
                        if (当前模式 == "休息") {
                            clickNums = 1;
                        }
                        else if (当前模式 == "攻击") {
                            clickNums = 2;
                        }
                        else if (当前模式 == "跟随") {
                            clickNums = 0;
                        }
                        else {
                            continue;
                        }
                    }
                    else if (模式 == "休息") {
                        if (当前模式 == "休息") {
                            clickNums = 0;
                        }
                        else if (当前模式 == "攻击") {
                            clickNums = 1;
                        }
                        else if (当前模式 == "跟随") {
                            clickNums = 2;
                        }
                        else {
                            continue;
                        }
                    }
                    else {
                        toast("模式无效");
                        break;
                    }
                    if (clickNums > 0) {
                        for (let index = 0; index < clickNums; index++) {
                            sleep(365);
                            tools.click(random(按钮.x[0], 按钮.x[1]), random(按钮.y[0], 按钮.y[1]));
                        }
                    }
                    tools.悬浮球描述(模式 + "模式设置成功");
                    isOk = true;
                    break;
                }
            }
            //tools.常用操作.初始化攻击面板loops();
            return isOk;
        },
        寻找宝宝: () => {
            let start = new Date().getTime();
            var r = tools.挂机打怪.扫描宝宝();
            if (r.status) {
                tools.挂机打怪.向宝宝移动();
                return true;
            }
            if (宝宝最后位置信息.p && 宝宝最后位置信息.p.x > 0 && (start - 宝宝最后位置信息.time) <= (30 * 1000)) {
                toastLog("原路返回找宝宝");
                tools.人物移动.指定像素移动(宝宝最后位置信息.p.x, 宝宝最后位置信息.p.y);
                r = tools.挂机打怪.扫描宝宝();
                if (r.status) {
                    tools.挂机打怪.向宝宝移动();
                    return true;
                }
            }
            if (挂机点跑图顺序 <= 0) {
                挂机点跑图顺序++;
            }
            else {
                挂机点跑图顺序--;
            }
            tools.挂机打怪.点击挂机坐标(true);
            tools.挂机打怪.设置宝宝模式("跟随")
            while (当前总状态 == 总状态.已启动) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 60)) {
                    toastLog("超过寻找时间,强制结束");
                    return false;
                }
                r = tools.挂机打怪.扫描宝宝();
                tools.悬浮球描述("宝宝" + JSON.stringify(r));
                if (r.status) {
                    tools.常用操作.点击人物();
                    tools.挂机打怪.设置宝宝模式("攻击");
                    tools.挂机打怪.向宝宝移动();
                    return true;
                }
                sleep(200);
            }
        },
        开始逃跑: () => {
            if (挂机点跑图顺序 <= 0) {
                挂机点跑图顺序++;
            }
            else {
                挂机点跑图顺序--;
            }
            let start = new Date().getTime();
            tools.挂机打怪.点击挂机坐标(true);
            tools.挂机打怪.宝宝是否存在("跟随", true);
            tools.悬浮球描述("血量预警，开始逃跑")
            while (当前总状态 == 总状态.已启动) {
                var 时间戳 = new Date().getTime() - start;
                if (时间戳 > (1000 * 30)) {
                    tools.挂机打怪.设置宝宝模式("攻击");
                    toastLog("超过逃跑时间 强制结束");
                    return false;
                }
                var 血量预警 = tools.挂机打怪.是否逃跑();
                if (!血量预警) {
                    tools.挂机打怪.设置宝宝模式("攻击");
                    break;
                }
                else {
                    tools.挂机打怪.自愈();
                }
                sleep(100);
            }
        },
        地图箭头: () => {
            var closeImg = null;
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 10,
                interval: 100
            })
            if (closeBtn.status) {
                closeImg = closeBtn.img;
            } else {
                toastLog("未找到关闭按钮")
                return {
                    status: false
                }
            }
            var x = closeImg.x - 1033;
            var widthX = 816;
            var y = closeImg.y + 40;
            var widthY = 523;
            tools.click(x, y)
            var img = captureScreen();
            var r = images.findMultiColors(img, "#FEE96E", [[0, 12, "#FDDE6B"]], {
                region: [x, y, widthX, widthY],
                threshold: 10
            });
            utils.recycleNull(img);
            return r;
        },
        大地图箭头: (closeBtn) => {
            var closeImg = closeBtn.img;;
            var result = {
                status: false
            };
            var arr = [
                {
                    方向: "正上",
                    箭头: "#FEEA6E",
                    尾1: {
                        x: -5,
                        y: 16,
                        color: "#FEEA6E"
                    },
                    中间: {
                        x: 0,
                        y: 13,
                        color: "#FDDD6E"
                    },
                    尾2: {
                        x: 6,
                        y: 16,
                        color: "#FEEA6E"
                    }
                }, {
                    方向: "左上",
                    箭头: "#FEEA6E",
                    尾1: {
                        x: 7,
                        y: 15,
                        color: "#FEEA6E"
                    },
                    中间: {
                        x: 9,
                        y: 9,
                        color: "#FDDD6E"
                    },
                    尾2: {
                        x: 15,
                        y: 7,
                        color: "#FEEA6E"
                    }
                }, {
                    方向: "正左",
                    箭头: "#FEEA6E",
                    中间: {
                        x: 13,
                        y: 0,
                        color: "#FDDF6E"
                    },
                    尾1: {
                        x: 15,
                        y: -5,
                        color: "#FEEA6E"
                    },
                    尾2: {
                        x: 15,
                        y: 6,
                        color: "#FEEA6E"
                    }
                }, {
                    方向: "左下",
                    箭头: "#FEEA6E",
                    尾1: {
                        x: 7,
                        y: -14,
                        color: "#FEEA6E"
                    },
                    中间: {
                        x: 8,
                        y: -9,
                        color: "#FDDD6E"
                    },
                    尾2: {
                        x: 15,
                        y: -7,
                        color: "#FEEA6E"
                    }
                }, {
                    方向: "正下",
                    箭头: "#FEEA6E",
                    尾1: {
                        x: -5,
                        y: -15,
                        color: "#FEEA6E"
                    },
                    中间: {
                        x: 0,
                        y: -12,
                        color: "#FDDD6E"
                    },
                    尾2: {
                        x: 5,
                        y: -15,
                        color: "#FEEA6E"
                    }
                }, {
                    方向: "右下",
                    箭头: "#FEEA6E",
                    尾1: {
                        x: -13,
                        y: -6,
                        color: "#FEEA6E"
                    },
                    中间: {
                        x: -7,
                        y: -8,
                        color: "#FDDC6E"
                    },
                    尾2: {
                        x: -6,
                        y: -13,
                        color: "#FEEA6E"
                    }
                }, {
                    方向: "正右",
                    箭头: "#FEEA6E",
                    中间: {
                        x: -12,
                        y: 0,
                        color: "#FDDD6E"
                    },
                    尾1: {
                        x: -15,
                        y: -6,
                        color: "#FEEA6E"
                    },
                    尾2: {
                        x: -15,
                        y: 6,
                        color: "#FEEA6E"
                    }
                }, {
                    方向: "右上",
                    箭头: "#FEEA6E",
                    中间: {
                        x: -7,
                        y: 9,
                        color: "#FDDD6E"
                    },
                    尾1: {
                        x: -14,
                        y: 6,
                        color: "#FEEA6E"
                    },
                    尾2: {
                        x: -6,
                        y: 14,
                        color: "#FEEA6E"
                    }
                }]
            var x = closeImg.x - 1033;
            var widthX = 816;
            var y = closeImg.y + 40;
            var widthY = 523;
            var img = captureScreen();
            for (var i = 0; i < arr.length; i++) {
                var p = arr[i];
                r = images.findMultiColors(img, p.箭头, [[p.中间.x, p.中间.y, p.中间.color], [p.尾1.x, p.尾1.y, p.尾1.color], [p.尾2.x, p.尾2.y, p.尾2.color]], {
                    region: [x, y, widthX, widthY],
                    threshold: 5
                });
                if (r && (r.x > 0 || r.y > 0)) {
                    result = {
                        status: true,
                        r: r,
                        方向: p.方向
                    }
                    break;
                }
            }
            utils.recycleNull(img);
            return result;
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
                var r = images.findMultiColors(img, color, [[8, 0, color]], {
                    region: reg,
                    threshold: 15
                });
                if (r && (r.x > 0 || r.y > 0)) {
                    r.x = r.x + 20; //返回宝宝中心血量的
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
                tools.常用操作.点击左面板人物()
                sleep(500);
                r = tools.挂机打怪.找非满血怪();
                if (r && (r.x > 0 || r.y > 0)) {
                    result = {
                        status: true,
                        r: r
                    }
                }
                tools.常用操作.点击左面板怪物()
            }
            return result;
        },
        向宝宝移动: () => {
            var start = new Date().getTime();
            var 人物中心 = config.zuobiao.人物血量中心[fbl];
            var 走一格像素 = config.zuobiao.走一格像素[fbl];
            var 跟随几格 = 挂机参数.跟随几格;
            if (跟随几格 == null || 跟随几格 <= 0) {
                跟随几格 = 3;
            }
            var isMove = false;
            tools.悬浮球描述("向宝宝移动")
            while (true) {
                if (new Date().getTime() - start > 10 * 1000) {//超过15秒自动退出
                    toastLog("向宝宝移动超过时间 强制结束");
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
        向怪物移动: (左面板怪物) => {
            if (左面板怪物 == null || !左面板怪物.status) {
                return {
                    status: false,
                    type: 1,
                    msg: "左面板怪物未知"
                };
            }
            var p = config.zuobiao.大范围扫描怪物名[fbl];
            var 按钮集合 = config.zuobiao.按钮集合[fbl];
            var r = tools.挂机打怪.扫描怪物名图片(左面板怪物.value, false, p);
            if (r.status) {
                r = tools.挂机打怪.扫描怪物空位(r.血量左上);
                if (r && r.status) {
                    tools.click(r.click.x, r.click.y);
                    sleep(222);
                    tools.click(random(按钮集合.普攻.x[0], 按钮集合.普攻.x[1]), random(按钮集合.普攻.y[0], 按钮集合.普攻.y[1]));
                    return {
                        status: true
                    };;
                }
                else {
                    return {
                        status: false,
                        type: 2,
                        msg: "扫描空位失败"
                    };
                }
            }
            else {
                return {
                    status: false,
                    type: 3,
                    msg: "扫描怪物失败"
                };
            }
        },
        扫描怪物空位: (怪物P) => {
            var color = "#DB0000";//红血条
            var color2 = "#00BF00";//蓝血条
            var arr = config.zuobiao.怪物点击范围偏移[fbl];
            var 允许点击P = config.zuobiao.大范围扫描怪物名[fbl];
            var img = captureScreen();
            var result = null;
            var msg = "";
            for (var index = 0; index < arr.length; index++) {
                var item = arr[index].info;
                var text = arr[index].text;
                var 扫描范围 = {
                    x1: 怪物P.x + item.x1,
                    x2: 怪物P.x + item.x2,
                    y1: 怪物P.y + item.y1,
                    y2: 怪物P.y + item.y2,
                }
                var 点击位置 = {
                    x: 怪物P.x + item.click.x,
                    y: 怪物P.y + item.click.y
                }
                if (扫描范围.x1 < 0) {
                    扫描范围.x1 = 0;
                }
                if (扫描范围.y1 < 0) {
                    扫描范围.y1 = 0;
                }
                if (扫描范围.x2 > 1280) {
                    扫描范围.x2 = 1280;
                }
                if (扫描范围.y2 > 720) {
                    扫描范围.y2 = 720;
                }
                // if (item.x1 <= 0 || item.y1 <= 0 || item.x2 > 1280 || item.y2 > 720) {
                //     toastLog(text + "空位失效")
                //     continue;
                // }
                if (点击位置.x < 允许点击P.x1 || 点击位置.x > 允许点击P.x2 || 点击位置.y < 允许点击P.y1 || 点击位置.y > 允许点击P.y2) {
                    //msg += (text + "" + 点击位置.x.toFixed(0) + ":" + 点击位置.y.toFixed(0) + "");
                    // tools.悬浮球临时描述(text + "超界{" + x.toFixed(0) + ":" + y.toFixed(0) + "}")
                    continue;
                }
                var r1 = images.findColor(img, color, {
                    region: [扫描范围.x1, 扫描范围.y1, 扫描范围.x2 - 扫描范围.x1, 扫描范围.y2 - 扫描范围.y1],
                    threshold: 5
                })
                var r2 = images.findColor(img, color2, {
                    region: [扫描范围.x1, 扫描范围.y1, 扫描范围.x2 - 扫描范围.x1, 扫描范围.y2 - 扫描范围.y1],
                    threshold: 5
                })
                if ((r1 == null || r1.x <= 0 || r1.y <= 0) && (r2 == null || r2.x <= 0 || r2.y <= 0)) {
                    result = {
                        status: true,
                        text: text,
                        click: 点击位置
                    }
                    msg += (text + "(" + index + ")OK");
                    break;
                }
            }
            utils.recycleNull(img);
            tools.悬浮球临时描述(msg)
            return result;
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
                value: []
            }
            if (r.status) {
                var p = r.r;
                p.x = p.x - 20;//因为扫描宝宝时为了拿中心位置+20
                let img = captureScreen();
                var color = "#DB0000";
                var value = [];
                var regions = [
                    [p.x - 2, p.y - 50, 50, 15], // 正上方
                    [p.x - 67, p.y - 50, 50, 15], // 左上方
                    [p.x + 61, p.y - 50, 50, 15], // 右上方

                    [p.x - 2, p.y + 50, 50, 15], // 正下方
                    [p.x - 67, p.y + 50, 50, 15], // 左下方
                    [p.x + 61, p.y + 50, 50, 15], // 右下方

                    [p.x - 67, p.y - 8, 50, 16], // 正左方
                    [p.x + 61, p.y - 8, 50, 16], // 正右方
                ]
                regions.forEach((reg, index) => {
                    var r = null;
                    try {
                        r = images.findColor(img, color, {
                            region: reg, // 正上方
                            threshold: 6
                        });
                    } catch (error) {
                        r = null;
                    }
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
        身边怪物错别字: (text) => {
            if (text == null || text.length <= 0) {
                return ""
            }
            text = text.replace(/[0-9\/a-zA-Z]/g, '')
                .replace(/\./g, "")
                .replace(/,/g, "")
                .replace(/!/g, "")
                .replace(/-/g, "")
                .replace(/:/g, "")
                .replace(/\?/g, "")
                .replace(/？/g, "")
                .replace(/\|/g, '')
                .replace(/\\/g, '')
                .replace(/金币/g, "")
                .replace(/金市/g, "")
                .replace(/全市/g, "")
                .replace(/全币/g, "")
                .replace("(", "").replace(")", "").replace("%", "").replace("=", "")

            if (text.indexOf("时间") >= 0 || text.indexOf("时闻") >= 0 || text.indexOf("不能") >= 0 || text.indexOf("范围") >= 0 || text.indexOf("内") >= 0) {
                text = "";
            }
            return text;
        },
        扫描身边怪物名: (左面板怪物) => {
            var 身边范围P = config.zuobiao.身边怪物范围[fbl];
            if (左面板怪物 && 左面板怪物.status) {
                r = tools.挂机打怪.扫描怪物名图片(左面板怪物.value, false, 身边范围P);
                if (r.status) {
                    return r.name;
                }
            }
            return tools.挂机打怪.扫描怪物名文字();
        },
        扫描怪物名文字: () => { //只扫描身边
            var p = config.zuobiao.身边怪物范围[fbl];
            // var t = 0.55;
            // if (挂机参数.挂机地图.indexOf("兽人古墓") >= 0) {
            //     var result = tools.findImageArea(文字图枚举.髅, p.x1, p.y1, p.x2, p.y2, t);
            //     if (result.status) {
            //         return "骷髅(找图发现)"
            //     }
            // }
            var imgSmall = tools.截屏裁剪(null, p.x1, p.y1, p.x2, p.y2);
            var huiduImg = images.grayscale(imgSmall);//灰度化
            let r = utils.ocrGetContentStr(huiduImg);
            if (r) {
                r = tools.挂机打怪.身边怪物错别字(r);
            }
            utils.recycleNull(imgSmall);
            utils.recycleNull(huiduImg);
            return r;
        },
        扫描怪物名图片: (文字枚举, 是否绘制, p) => {
            var t = 0.5;
            var r = tools.findImageArea(文字枚举.怪物显示图, p.x1, p.y1, p.x2, p.y2, t);
            if (r.status) {
                var x = r.img.x + 文字枚举.左上血条偏移.x;
                var y = r.img.y + 文字枚举.左上血条偏移.y;
                // if (是否绘制) {
                //     utils.canvasRectCus(x, y, x + 5, y + 5, "img", "怪", 500);
                // }
                return {
                    status: true,
                    name: 文字枚举.name,
                    血量左上: {
                        x: x,
                        y: y,
                    }
                }
            }
            return {
                status: false
            }
        },
        怪物血量是否变化: () => {
            var p = config.zuobiao.锁定怪物100血范围[fbl];
            var r = tools.findImageArea("zhongjianxueLiang100.png", p.x1, p.y1, p.x2, p.y2, 0.95);
            if (r.status) {
                return false;
            }
            else {
                return true;
            }
        },

    },
    拾取: {
        状态: () => {
            var 拾取 = config.zuobiao.按钮集合[fbl].拾取;
            var img = captureScreen();
            var r = images.findMultiColors(img, 拾取.激活.c1, [[拾取.激活.x2, 拾取.激活.y2, 拾取.激活.c2], [拾取.激活.x3, 拾取.激活.y3, 拾取.激活.c3]], {
                region: [拾取.x[0] - 10, 拾取.y[0] - 10, 拾取.x[1] - 拾取.x[0] + 20, 拾取.y[1] - 拾取.y[0] + 20],
                threshold: 4
            });
            utils.recycleNull(img);
            if ((r && (r.x > 0 || r.y > 0))) {
                return true;
            }
            else {
                return false;
            }
        },
        点击: (type) => {//1是为了激活，0是为了取消激活
            var 拾取 = config.zuobiao.按钮集合[fbl].拾取;
            var 是否激活状态 = tools.拾取.状态();
            if (type == 1) {
                if (是否激活状态) {
                    return;
                }
                上次坐标截图 = tools.常用操作.截图当前坐标();
            } else {
                if (!是否激活状态) {
                    return;
                }
            }
            tools.click(random(拾取.x[0], 拾取.x[1]), random(拾取.y[0], 拾取.y[1]))
            上一次点拾取时间 = new Date().getTime();
        },
        扫描拾取: (p, isClick) => {
            var img = captureScreen();
            // var r = images.findMultiColors(img, "#D49444", [[0, 23, "#FFFF79"], [0, 38, "#FFFFFF"], [0, 70, "#FFFFFF"]], {
            //     threshold: 30
            // });
            //var isClick = false;
            if (p == null || p.x1 <= 0) {
                p = {
                    x1: 0,
                    x2: 1280,
                    y1: 0,
                    y2: 600
                }
            }
            var r = images.findMultiColors(img, "#FFFF68", [[0, 40, "#FFFFFF"], [0, 60, "#FFFFFF"]], {
                threshold: 30,
                region: [p.x1, p.y1, p.x2 - p.x1, p.y2 - p.y1],
            });
            utils.recycleNull(img);
            if (r && (r.x > 0 || r.y > 0)) {
                if (isClick) {
                    tools.click(r.x, r.y + 100)
                    sleep(1000);
                }
                return true;
            }
            else {
                return false;
            }
            // var t1 = new Date().getTime();
            // if (p == null || p.x1 <= 0) {
            //     p = {
            //         x1: 0,
            //         x2: 1280,
            //         y1: 0,
            //         y2: 720
            //     }
            // }
            // var r = tools.findImageArea("shiqubiaoji.png", p.x1, p.y1, p.x2, p.y2, 0.7);
            // var t2 = new Date().getTime();
            // tools.悬浮球描述(JSON.stringify(r) + ((t2-t1)/1000).toFixed(3))
            // if (r.status) {
            //     utils.canvasRectCus(r.img.x, r.img.y, r.img.x + 5, r.img.y + 5, "img", "怪", 200);
            //     if (isClick) {
            //         tools.click(r.img.x, r.img.y + 85)
            //     }
            //     return true;
            // }
            // else {
            //     return false;
            // }
        },
        是否精品装备: () => {
            var 范围 = {
                x1: 600,
                x2: 670,
                y1: 307,
                y2: 333
            }
            for (let index = 0; index < 强制拾取枚举.length; index++) {
                var item = 强制拾取枚举[index];
                var r = tools.findImageArea(item.pic, 范围.x1, 范围.y1, 范围.x2, 范围.y2, 0.55);
                if (r.status) {
                    tools.常用方法.发送提醒("拾取(" + item.text + ")")
                    return {
                        status: true,
                        text: item.text
                    }
                }
            }
            return {
                status: false
            }
        },
        攻击激活后操作: () => {
            var 累计未移动次数 = 0;
            var 移动时间戳 = 1000 * 1.8;
            var 上一次移动 = new Date().getTime();
            var p = config.zuobiao.聊天框最后一行[fbl];
            var p1 = config.zuobiao.聊天框面板[fbl];
            let start = new Date().getTime();
            var 拾取时长 = 1000 * 150;
            var 禁止拾取时间戳 = 1000 * 15;
            var 发现精品装备 = false;
            var 是否发现不能拾取 = false;
            while (当前总状态 == 总状态.已启动) {
                var 是否激活状态 = tools.拾取.状态();
                if (new Date().getTime() - 上次装备已满喝药时间 > (1000 * 60 * 1)) {
                    var 是否已满 = tools.findImageArea(文字图枚举.已满, p1.x1, p1.y1, p1.x2, p1.y2, 0.85);
                    if (是否已满.status) {
                        var count = tools.补给操作.喝蓝_背包(null, true);
                        if (count > 0) {
                            tools.常用方法.错误日志("成功喝蓝(" + count + ")", 2);
                            上次装备已满喝药时间 = new Date().getTime();
                            if (是否激活状态) {
                                tools.拾取.点击(0);
                                sleep(1000);
                                tools.拾取.点击(1);

                            }
                            else {
                                tools.拾取.点击(1);
                            }
                        }
                        else {
                            toastLog("文字识别装备已满");
                            tools.挂机打怪.回城补给在挂机("文字识别装备已满");
                            break;
                        }
                    }
                }
                if (!是否激活状态 && !发现精品装备) {
                    break;
                }
                是否强制跑图 = true;
                上次跑图时间 = new Date().getTime() - (60 * 1000);
                if (new Date().getTime() - start > 拾取时长) {
                    toastLog("拾取超时")
                    if (是否激活状态) {
                        tools.拾取.点击(0);
                    }
                    是否发现不能拾取 = true;
                    禁止拾取时间 = new Date().getTime() + 禁止拾取时间戳;
                    break;
                }
                tools.悬浮球描述("拾取(" + parseInt((拾取时长 - (new Date().getTime() - start)) / 1000) + ")");
                if (发现精品装备) {
                    sleep(100);
                    continue;
                }
                var 不能拾取 = tools.findImageArea(文字图枚举.不能拾取, p.x1, p.y1, p.x2, p.y2, 0.85);
                if (不能拾取.status) {
                    var 精品装备 = tools.拾取.是否精品装备();
                    if (精品装备.status) {
                        发现精品装备 = true;
                        tools.悬浮球临时描述("发现" + 精品装备.text)
                        sleep(100);
                        continue;
                    }
                    是否发现不能拾取 = true;
                    tools.拾取.点击(0);
                    break;
                }
                if (new Date().getTime() - 上一次移动 >= 移动时间戳) {
                    var 是否静止 = tools.人物移动.是否跑图并截图坐标(false);
                    if (是否静止) {
                        累计未移动次数++;
                        if (累计未移动次数 >= 4) {
                            tools.拾取.点击(0);
                            toastLog("静止(" + 累计未移动次数 + ")退出")
                            禁止拾取时间 = new Date().getTime() + 禁止拾取时间戳;
                            是否发现不能拾取 = true;
                            break;
                        }
                        else {
                            toastLog("人物静止(" + 累计未移动次数 + ")")
                            // if (是否激活状态 && 累计未移动次数 >= 2) {
                            //     if (tools.拾取.扫描拾取(null, false)) {
                            //         tools.拾取.点击(0);
                            //         sleep(1200);
                            //         tools.拾取.点击(1);
                            //         sleep(1200)
                            //     }
                            //     toastLog("人物静止(" + 累计未移动次数 + ")")
                            // }
                        }
                    }
                    上一次移动 = new Date().getTime();
                }
            }
            return 是否发现不能拾取;
        },
        激活后操作: () => {
            var 累计未移动次数 = 0;
            var 移动时间戳 = 1000 * 1.8;
            var 上一次移动 = new Date().getTime();
            var p = config.zuobiao.聊天框最后一行[fbl];
            var p1 = config.zuobiao.聊天框面板[fbl];
            var 不能拾取次数 = 0;
            let start = new Date().getTime();
            var 是否拾取多个物品 = false;
            var 拾取时长 = 1000 * 150;
            var 禁止拾取时间戳 = 1000 * 15;
            var 发现精品装备 = false;
            while (当前总状态 == 总状态.已启动) {
                var 是否激活状态 = tools.拾取.状态();
                if (new Date().getTime() - 上次装备已满喝药时间 > (1000 * 60 * 1)) {
                    var 是否已满 = tools.findImageArea(文字图枚举.已满, p1.x1, p1.y1, p1.x2, p1.y2, 0.85);
                    if (是否已满.status) {
                        var count = tools.补给操作.喝蓝_背包(null, true);
                        if (count > 0) {
                            tools.常用方法.错误日志("成功喝中蓝(" + count + ")", 2);
                            上次装备已满喝药时间 = new Date().getTime();
                            if (是否激活状态) {
                                tools.拾取.点击(0);
                                sleep(1500);
                                tools.拾取.点击(1);

                            }
                            else {
                                tools.拾取.点击(1);
                            }
                        }
                        else {
                            toastLog("文字识别装备已满");
                            tools.挂机打怪.回城补给在挂机("文字识别装备已满");
                            break;
                        }
                    }
                }

                if (是否激活状态) {
                    是否强制跑图 = true;
                    上次跑图时间 = new Date().getTime() - (60 * 1000);
                }
                else if (!是否拾取多个物品 && !发现精品装备) {
                    break;
                }
                if (new Date().getTime() - start > 拾取时长) {
                    toastLog("拾取超时")
                    if (是否激活状态) {
                        tools.拾取.点击(0);
                    }
                    禁止拾取时间 = new Date().getTime() + 禁止拾取时间戳;
                    break;
                }
                tools.悬浮球描述("拾取(" + parseInt((拾取时长 - (new Date().getTime() - start)) / 1000) + ")");
                if (发现精品装备) {
                    sleep(100);
                    continue;
                }
                var 不能拾取 = tools.findImageArea(文字图枚举.不能拾取, p.x1, p.y1, p.x2, p.y2, 0.85);
                if (不能拾取.status) {
                    var 精品装备 = tools.拾取.是否精品装备();
                    if (精品装备.status) {
                        发现精品装备 = true;
                        tools.悬浮球临时描述("发现" + 精品装备.text)
                        sleep(100);
                        continue;
                    }
                    不能拾取次数++;
                    禁止拾取时间 = new Date().getTime() + 禁止拾取时间戳;
                }


                if (new Date().getTime() - 上一次移动 >= 移动时间戳) {
                    var 是否静止 = tools.人物移动.是否跑图并截图坐标(false);
                    if (是否静止) {
                        累计未移动次数++;
                        if (累计未移动次数 >= 4) {
                            if (是否激活状态) {
                                tools.拾取.点击(0);
                            }
                            toastLog("人物静止(" + 累计未移动次数 + "),退出")
                            禁止拾取时间 = new Date().getTime() + 禁止拾取时间戳;
                            break;
                        }
                        else {
                            // if (是否激活状态 && 累计未移动次数 >= 2) {
                            //     if (tools.拾取.扫描拾取(null, false)) {
                            //         tools.拾取.点击(0);
                            //         sleep(1200);
                            //         tools.拾取.点击(1);
                            //         sleep(1200)
                            //     }
                            // }
                            toastLog("人物静止(" + 累计未移动次数 + ")")
                        }
                    }
                    上一次移动 = new Date().getTime();
                }
                if (是否拾取多个物品) {
                    if (不能拾取.status) {
                        累计未移动次数 = 0;
                        if (是否激活状态) {
                            tools.拾取.点击(0);
                            sleep(1000);
                            tools.拾取.点击(1);

                        }
                        else {
                            tools.拾取.点击(1);
                        }
                        sleep(2500);
                    }
                    continue;
                }
                else {
                    if (不能拾取.status) {
                        var 拾取明细 = tools.挂机打怪.需要拾取明细()
                        if (拾取明细 && 拾取明细.count >= 3) {
                            累计未移动次数 = 0;
                            是否拾取多个物品 = true;
                            toastLog("拾取数（" + 拾取明细.count + "）强制拾取")
                            continue;
                        }
                        else if (拾取明细 && 拾取明细.count >= 1) {
                            if (不能拾取次数 >= 3) {
                                if (是否激活状态) {
                                    tools.拾取.点击(0);
                                }
                                toastLog("尝试(" + 不能拾取次数 + "),退出")
                                禁止拾取时间 = new Date().getTime() + 禁止拾取时间戳;
                                break;
                            }
                            else {
                                if (是否激活状态 && 不能拾取次数 >= 2) {
                                    tools.拾取.点击(0);
                                    sleep(1200);
                                    tools.拾取.点击(1);
                                }
                                else {
                                    tools.拾取.点击(1);
                                }
                                sleep(2500);
                                continue;
                            }
                        }
                        else {
                            if (是否激活状态) {
                                tools.拾取.点击(0);
                            }
                            禁止拾取时间 = new Date().getTime() + 禁止拾取时间戳;
                            break;
                        }
                    }
                    else {
                        sleep(100);
                    }
                }
            }
        },
    },
    人物移动: {
        // 指定坐标移动: (x, y, 偏差) => {
        //     var start = new Date().getTime();
        //     while (true) {
        //         if (new Date().getTime() - start > 30 * 1000) {//超过15秒自动退出
        //             toastLog("向指定坐标移动超过时间 强制结束");
        //             return false;
        //         }
        //         var 人物坐标 = tools.常用操作.获取人物坐标();
        //         if (人物坐标 == null || 人物坐标.x <= 0 || 人物坐标.y <= 0) {
        //             tools.人物移动.随机走一步(random(1888, 2000))
        //             continue;
        //         }
        //         if (Math.abs(人物坐标.x - x) > 偏差) {
        //             if (人物坐标.x > x) {
        //                 var r = tools.人物移动.点击左边空位(true);
        //                 if (!r) {
        //                     tools.人物移动.左走一步(random(888, 1000));
        //                 }
        //             }
        //             else {
        //                 var r = tools.人物移动.点击右边空位(true);
        //                 if (!r) {
        //                     tools.人物移动.右走一步(random(888, 1000));
        //                 }
        //             }
        //         }
        //         else if (Math.abs(人物坐标.y - y) > 偏差) {
        //             if (人物坐标.y > y) {
        //                 var r = tools.人物移动.点击上边空位(true);
        //                 if (!r) {
        //                     tools.人物移动.上走一步(random(888, 1000));
        //                 }
        //             }
        //             else {
        //                 var r = tools.人物移动.点击下边空位(true);
        //                 if (!r) {
        //                     tools.人物移动.下走一步(random(888, 1000));
        //                 }
        //             }
        //         }
        //         else {
        //             toastLog("移动成功");
        //             return true;
        //         }
        //     }
        // },
        点击人物空位: (arr) => {
            var img = captureScreen();
            var isok = false;
            var color = "#DB0000";//红血条
            var color2 = "#00BF00";//蓝血条
            for (var index = 0; index < arr.length; index++) {
                var item = arr[index];
                var r1 = images.findColor(img, color, {
                    region: [item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1],
                    threshold: 4
                })
                var r2 = images.findColor(img, color2, {
                    region: [item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1],
                    threshold: 4
                })
                if ((r1 == null || r1.x <= 0 || r1.y <= 0) && (r2 == null || r2.x <= 0 || r2.y <= 0)) {
                    tools.click(item.click.x, item.click.y)
                    isok = true;
                    break;
                }
            }
            utils.recycleNull(img);
            return isok;
        },
        点击怪物空位: (arr) => {
            var img = captureScreen();
            var isok = false;
            var color = "#DB0000";//红血条
            var color2 = "#00BF00";//蓝血条
            for (var index = 0; index < arr.length; index++) {
                var item = arr[index];
                var r1 = images.findColor(img, color, {
                    region: [item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1],
                    threshold: 4
                })
                var r2 = images.findColor(img, color2, {
                    region: [item.x1, item.y1, item.x2 - item.x1, item.y2 - item.y1],
                    threshold: 4
                })
                if ((r1 == null || r1.x <= 0 || r1.y <= 0) && (r2 == null || r2.x <= 0 || r2.y <= 0)) {
                    tools.click(item.click.x, item.click.y)
                    isok = true;
                    break;
                }
            }
            utils.recycleNull(img);
            return isok;
        },
        使用地牢: () => {
            var 地牢 = config.找色[fbl].地牢;
            var isOk = false;
            var x = 0;
            var y = 0;
            var zhengliBtn = tools.补给操作.整理背包(true);
            sleep(555);
            var p = tools.补给操作.获取背包面板位置(zhengliBtn);
            var img = captureScreen();
            var r = images.findMultiColors(img, 地牢[0].color, [[地牢[1].x, 地牢[1].y, 地牢[1].color], [地牢[2].x, 地牢[2].y, 地牢[2].color]], {
                threshold: 40,
                region: [p.x1, p.y1, p.width, p.height],
            });
            if (r && r.x > 0 && r.y > 0) {
                x = r.x + random(4, 8);
                y = r.y + random(4, 8);
            }
            else {
                r = tools.findImageArea(补给枚举.地牢, p.x1, p.y1, p.x2, p.y2, 0.7);
                if (r.status) {
                    x = r.img.x + r.size.w / 2 + random(4, 8);
                    y = r.img.y + r.size.h / 2 + random(4, 8);
                }
            }
            if (x > 0 && y > 0) {
                isOk = true;
                tools.click(x, y);
                tools.补给操作.获取操作按钮(["使用"], "使用地牢", true, false, false);
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
                tools.click(r.x + random(5, 10), r.y + random(5, 10));
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
                    tools.click(r.x + random(5, 10), r.y + random(5, 10));
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
                    [0, duration, [p.x + dx1, p.y + dx1], [p.x + dx2, p.y + dx1]
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
                    [0, duration, [p.x - dx1, p.y + dx1],
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
                        [p.x - dx1, p.y - dx2]
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
                        [p.x - dx1, p.y + dx2]
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
        左下跑: (duration) => {
            if (duration > 0) {
                var p = config.zuobiao.遥感中心位置[fbl];
                let dx1 = random(-5, 5);
                gesture(duration, [p.x - dx1, p.y - dx1], [random(80, 85), random(575, 580)])
            }
        },
        指定像素移动: (x, y) => {
            if (x >= 1270) {
                x = 1270;
            }
            if (x <= 0) {
                x = 5;
            }
            if (y >= 710) {
                y = 710;
            }
            if (y <= 0) {
                y = 5;
            }
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
        是否跑图并截图坐标: (是否累计错误次数) => {
            var 是否跑图 = false;
            if (上次坐标截图 == null) {
                是否跑图 = true;
                上次坐标截图 = tools.常用操作.截图当前坐标();
            }
            else {
                var r = tools.人物移动.跑图坐标是否变化()
                //toastLog("坐标是否变化" + r)
                if (r) {
                    if (是否累计错误次数) {
                        跑图错误次数 = 0;
                    }
                    var 当前坐标截图 = tools.常用操作.截图当前坐标();
                    utils.recycleNull(上次坐标截图);
                    上次坐标截图 = 当前坐标截图;
                    是否跑图 = false;
                    //tools.悬浮球描述("人物跑动中")
                }
                else {
                    if (是否累计错误次数) {
                        跑图错误次数++;
                    }
                    是否跑图 = true;
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
                toastLog("Loop[routesGroup=null]")
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
            var 是否宝宝休息 = false;
            while (当前总状态 == 总状态.已启动) {
                tools.执行时间戳.检测认证();
                var 人物坐标 = tools.常用操作.获取人物坐标();
                var 当前地图 = tools.常用操作.获取人物地图();
                var 安全区坐标范围 = tools.人物移动.获取安全区坐标范围();
                var 是否到达城里 = false;
                if (当前地图 == "苍月岛渔村" || 当前地图 == "比奇城" || 当前地图 == "土城") {
                    是否到达城里 = true;
                }
                if (!是否宝宝休息) {
                    if (当前地图.indexOf("苍月") >= 0 || 当前地图.indexOf("比奇") >= 0 || 当前地图.indexOf("盟重") >= 0) {
                        tools.挂机打怪.设置宝宝模式("休息")
                        是否宝宝休息 = true;
                    }
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
            tools.常用操作.打开大地图();
            var closeBtn = tools.findImageForWait("closeBtn.png", {
                maxTries: 6,
                interval: 200
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
                    tools.click(x, y)
                    sleep(random(1200, 1666));
                }
                sleep(random(1200, 1666));
                tools.常用操作.关闭所有窗口();
            } else {
                跑图错误次数++;
                toastLog("回老兵,未找到closeBtn");
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
                //if (false) {
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
                            tools.常用操作.跑图累计错误执行();
                            var 是否跑图 = tools.人物移动.是否跑图并截图坐标(true);
                            if (是否跑图) {
                                tools.人物移动.回老兵(当前地图, routes, 大地图偏移);
                                tryCount = 0;
                            }
                            // tools.人物移动.回老兵(当前地图, routes, 大地图偏移);
                            // 
                        }
                        if (人物坐标 != null) {
                            历史坐标 = 人物坐标;
                        }
                    }
                }
                else {
                    tools.常用操作.跑图累计错误执行();
                    var 是否跑图 = tools.人物移动.是否跑图并截图坐标(true);
                    if (是否跑图) {
                        tools.人物移动.回老兵(当前地图, routes, 大地图偏移);
                    }
                }
                sleep(1000 * 1.5);
            }
        },
        去下一层地图: (当前地图, 目的地) => {
            var 偏移 = config.zuobiao.打怪点偏移[fbl];
            var 下一层 = config.地图路由[当前地图]["下一层"];
            var 大地图坐标 = tools.人物移动.获取大地图偏移();
            tools.悬浮球描述(当前地图 + " --> " + 目的地);
            tools.常用操作.打开大地图();
            var closeBtn = tools.常用操作.找大地图关闭按钮();
            if (!closeBtn.status) {
                跑图错误次数++;
                toastLog("去下一层地图,未找到closeBtn");
                return;
            }
            var closeImg = closeBtn.img;

            var 箭头P = tools.挂机打怪.大地图箭头(closeBtn);


            var routes = null;

            if (下一层 && 下一层.入口 && 箭头P.status) {
                if (Math.abs(箭头P.r.x - 下一层.入口.x) > 50 || Math.abs(箭头P.r.y - 下一层.入口.y) > 50) {
                    var x = closeImg.x + (下一层.入口.x - 偏移.x) + random(-5, 5);
                    var y = closeImg.y + (下一层.入口.y - 偏移.y) + random(-5, 5);
                    tools.click(x, y);
                    tools.常用操作.关闭所有窗口(false, 0, true);
                    是否强制跑图 = false;
                    return;
                }
            }
            if (下一层 && 下一层.进门) {
                routes = 下一层.进门;
            }
            else {
                routes = config.地图路由[当前地图][目的地][0];
            }
            for (var i = 0; i < routes.length; i++) {
                var 路由 = routes[i];
                var r = null;
                路由.forEach((item) => {
                    r = (r == null ? 大地图坐标[item] : r[item]);
                });
                var 标识 = 路由[路由.length - 1];
                if (标识 == 0) {
                    标识 = 路由[0];
                }
                var info = config.地图标识[标识];
                var x = 0;
                var y = 0;
                if (Array.isArray(r.x)) {
                    x = closeImg.x + random(r.x[0], r.x[1]);
                    y = closeImg.y + random(r.y[0], r.y[1]);
                }
                else {
                    if (目的地 == "石墓阵") {
                        x = closeImg.x + (r.x - 偏移.x);
                        y = closeImg.y + (r.y - 偏移.y);
                    }
                    else {
                        x = closeImg.x + (r.x - 偏移.x) + random(-5, 5);
                        y = closeImg.y + (r.y - 偏移.y) + random(-5, 5);
                    }
                }
                if (i == 0) {
                    sleep(333);
                }
                tools.click(x, y)
                if (i < routes.length - 1) {
                    if (info && info.pic && info.pic.length > 0) {
                        var px1 = closeImg.x + (info.范围.x1 - 偏移.x);
                        var px2 = closeImg.x + (info.范围.x2 - 偏移.x);
                        var py1 = closeImg.y + (info.范围.y1 - 偏移.y);
                        var py2 = closeImg.y + (info.范围.y2 - 偏移.y);
                        var r = tools.findImageAreaForWait(info.pic, px1, py1, px2, py2, {
                            maxTries: 10,
                            interval: 300,
                            threshold: 0.7
                        });
                        if (!r.status) {
                            toastLog("(" + info.pic + ")无")
                            // toastLog("未发现图片(" + info.pic + ")" + JSON.stringify(info) + JSON.stringify(closeImg) + JSON.stringify(偏移))
                            // sleep(2000)
                            跑图错误次数++;
                            break;
                        }
                    }
                    else {
                        sleep(random(1000, 1200));
                    }
                }

            }
            是否强制跑图 = false;
            tools.常用操作.关闭所有窗口();
        },
        去挂机地图Loop: () => {
            var 是否跑图 = false;
            var 当前地图 = tools.常用操作.获取人物地图();
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
            var 强制跑图 = false;
            for (let index = 0; index < routesGroup.length; index++) {
                var routes = routesGroup[index];
                var last = routes[routes.length - 1];
                var 目的地 = last[1];
                if (last[last.length - 1] == 0) {
                    目的地 = last[0];
                }
                while (当前总状态 == 总状态.已启动) {
                    tools.执行时间戳.检测认证();
                    tools.常用操作.跑图累计错误执行();
                    var 是否沿途打怪 = config.沿途打怪点.some(item => item === 当前地图)
                    if (new Date().getTime() - 上次跑图时间 > 跑图时间戳) {
                        var 当前地图 = tools.常用操作.获取人物地图();
                        if (当前地图 == 挂机参数.挂机地图 || 挂机参数.挂机地图 == "比奇野外") {
                            tools.常用操作.点击人物();
                            tools.挂机打怪.启动隐身();
                            tools.挂机打怪.宝宝是否存在("跟随", true);
                            sleep(random(2500, 3000));
                            tools.挂机打怪.初始化挂机();
                            break;
                        }
                        if (当前地图 == 目的地) { //说明到目的地
                            break;
                        }
                        if (强制跑图) {
                            是否跑图 = true;
                        }
                        else {
                            是否跑图 = tools.人物移动.是否跑图并截图坐标(true);
                        }
                        if (是否跑图) {
                            try {
                                tools.人物移动.去下一层地图(当前地图, 目的地);
                                //tools.人物移动.去挂机地图(目的地, 当前地图);
                            } catch (error) {
                                toastLog('挂机Loop异常' + error)
                            }
                        }
                        上次跑图时间 = new Date().getTime();
                    }
                    if (是否沿途打怪 && 挂机参数.沿途打怪 == 1) {
                        var r = false;
                        var 打怪次数 = 0;
                        while (当前总状态 == 总状态.已启动) {
                            try {
                                r = tools.挂机打怪.寻找打怪(打怪次数);
                            } catch (e) {
                                r = false;
                                toastLog("去挂机地图Loop打怪异常")
                            }
                            if (r) {
                                打怪次数++;
                                tools.悬浮球描述("继续攻击")
                                continue;
                            } else {
                                强制跑图 = 打怪次数 > 0 || 是否强制跑图 ? true : false;
                                break;
                            }
                        }
                    }
                }
            }
            toastLog("到达目的地");
        },
        进入石墓阵: () => {
            while (当前总状态 == 总状态.已启动) {
                var r = tools.findImageClick("shimuzhengrukou.png", 0.8);
                if (r) {
                    tools.悬浮球描述("点击入口")
                    sleep(random(333, 555))
                } else {
                    var 当前地图 = tools.常用操作.获取人物地图();
                    if (当前地图 == "石墓阵") {
                        toastLog("到达石墓阵")
                        return true;
                    }
                    else {
                        toastLog("未知错误")
                        return false;
                    }
                }
            }
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
        判断是否出现BOSS提示: (等待时间, 来源) => { //type=1卖，type=2修,type=3存
            var img = captureScreen();
            var r = images.findMultiColors(img, "#00D2FF", [[26, 0, "#00D2FF"], [85, 0, "#FFFFFF"]], {
                region: [500, 140, 300, 35],
                threshold: 15
            });
            utils.recycleNull(img);
            var 是否等待 = false;
            var msg = "";
            if (r && (r.x > 0 || r.y > 0)) {
                是否等待 = true;
                msg = "发现BOSS提示文字"

            }
            else {
                r = tools.findImage("xiaoxilaba.png");
                if (r.status) {
                    是否等待 = true;
                    msg = "发现xiaoxilaba提示文字"
                }
            }
            if (是否等待) {
                tools.常用方法.错误日志(来源 + msg, 3);
                if (等待时间 && 等待时间 > 0) {
                    tools.悬浮球描述("[" + 来源 + "]" + msg + ",等待(" + 等待时间 / 1000 + ")秒");
                    sleep(等待时间);
                }
            }
            return r;
        },
        喝战神油: () => {
            var r = tools.findImageForWaitClick(补给枚举.战神油_背包, {
                maxTries: 3,
                interval: 100
            }, 0.9);
            if (r.status) {
                if (r.img.y < config.zuobiao.药品格子面板[fbl].y1) {
                    r = tools.补给操作.获取操作按钮(["使用"], "使用战神油", true, false, false);
                    if (r.status) {
                        return true;
                    }
                }
            }
            else {
                r = tools.findImageForWaitClick(补给枚举.战神油_格子, {
                    maxTries: 3,
                    interval: 100
                }, 0.9);
                if (r.status) {
                    tools.常用操作.关闭所有窗口(false, 0, true);
                    return true;
                }
            }
            return false;
        },
        喝修复油: () => {
            var r = tools.findImageForWaitClick(补给枚举.修复油_背包, {
                maxTries: 3,
                interval: 100
            });
            if (r.status) {
                if (r.img.y < config.zuobiao.药品格子面板[fbl].y1) {
                    r = tools.补给操作.获取操作按钮(["使用"], "使用修复油", true, false, false);
                    if (r.status) {
                        return true;
                    }
                }
            }
            else {
                r = tools.findImageForWaitClick(补给枚举.修复油_格子, {
                    maxTries: 5,
                    interval: 200
                });
                if (r.status) {
                    return true;
                }
            }
            return false;
        },
        喝蓝_背包: (zhengliBtn, isClose) => {
            if (zhengliBtn == null) {
                zhengliBtn = tools.补给操作.整理背包(true);
            }
            sleep(666);
            var p = tools.补给操作.获取背包面板位置(zhengliBtn);
            var arr1 = tools.matchTemplateForArea(补给枚举.中蓝个_背包, 6, 0.8,
                [p.x1, p.y1, p.width, p.height]
            )
            var arr2 = tools.matchTemplateForArea(补给枚举.大蓝个_背包, 6, 0.8,
                [p.x1, p.y1, p.width, p.height]
            )
            var totalCount = arr1.count + arr2.count;
            var arrClick = [];
            tools.悬浮球描述("匹配到" + totalCount);
            if (arr1.count > 0) {
                for (let index = 0; index < arr1.count; index++) {
                    var item = arr1.r[index];
                    arrClick.push({
                        x: item.point.x + random(4, 8),
                        y: item.point.y + random(4, 8),
                    })
                }
            }
            if (arr2.count > 0) {
                for (let index = 0; index < arr2.count; index++) {
                    var item = arr2.r[index];
                    arrClick.push({
                        x: item.point.x + random(4, 8),
                        y: item.point.y + random(4, 8),
                    })
                }
            }
            var count = 0;
            if (arrClick && arrClick.length > 0) {
                for (let index = 0; index < arrClick.length; index++) {
                    var item = arrClick[index];
                    sleep(1000);
                    tools.click(item.x, item.y);
                    var r = tools.补给操作.获取操作按钮(["使用"], "喝蓝_背包", false, false, true);
                    if (r.status) {
                        var isFind = tools.补给操作.背包选中按钮中找字图("wenzi_zhuangbei_yao.png", r.value)
                        if (isFind.status) {
                            var x = r.value.img.x + r.value.size.w / 2 + random(5, 10);
                            var y = r.value.img.y + r.value.size.h / 2 + random(4, 8);
                            //tools.悬浮球临时描述(x + ":" + y);
                            sleep(666);
                            tools.click(x, y)
                            count++;
                        }
                        else if (!tools.常用操作.检测是否在游戏画面()) {  //没在游戏画面大概率是花屏了，强行喝就行
                            var x = r.value.img.x + r.value.size.w / 2 + random(-3, 3);
                            var y = r.value.img.y + r.value.size.h / 2 + random(-3, 3);
                            tools.click(x, y)
                            count++;
                        }
                        else {
                            sleep(1000);
                            tools.常用操作.点击左面板怪物();
                        }
                    }
                    else {
                        sleep(1000);
                        tools.常用操作.点击左面板怪物();
                    }
                }
            }
            if (isClose) {
                tools.常用操作.关闭所有窗口();
            }
            return count;
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
                var r = tools.findImageAreaForWait(补给枚举.中蓝个_格子, 格子P.x1, 格子P.y1, 格子P.x2, 格子P.y2, {
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
        点击小贩按钮: (按钮名称, isClose) => {
            if (isClose) {
                tools.常用操作.关闭所有窗口();
            }
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl];
            tools.click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2));
            sleep(random(777, 999));
            var r = null;
            var p = null;
            switch (按钮名称) {
                case "出售":
                    p = config.zuobiao.比奇小贩面板.出售物品[fbl];
                    break;
                case "购买":
                    p = config.zuobiao.比奇小贩面板.购买物品[fbl];
                    break;
                case "普修":
                    p = config.zuobiao.比奇小贩面板.普通修理[fbl];
                    break;
                case "保存":
                    p = config.zuobiao.比奇小贩面板.保存物品[fbl];
                    break;

            }
            tools.click(random(p.x1, p.x2), random(p.y1, p.y2));
            return true;
            // if (r.status) {
            //     return true;
            // }
            // else {
            //     toastLog("未找到" + 按钮名称 + "按钮");
            //     return false;
            // }
        },
        点击背包格子: (index1, index2, zhengliBtn) => {
            var zhengliP = {
                x: zhengliBtn.img.x,
                y: zhengliBtn.img.y
            }
            var 背包格子偏移 = config.zuobiao.背包格子偏移[fbl];
            var x = zhengliP.x + 背包格子偏移["1_1"].x + (背包格子偏移.中心点偏移量X * (index2 - 1)) + random(-5, 5)
            var y = zhengliP.y + 背包格子偏移["1_1"].y + (背包格子偏移.中心点偏移量Y * (index1 - 1)) + random(-5, 5)
            tools.click(x, y)
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
            let x1 = zhengliP.x - 80 + random(-10, 10);
            let y1 = zhengliP.y + 10 + random(5, 10);
            gesture(random(666, 999), [x1, y1], [x1 - random(100, 120), y1 + random(20, 120)])
        },
        获取操作按钮(按钮类型, 来源, isClick, notFindEixt, isBoss) {
            var r = null;
            var sucessBtn = "";
            var btnName = "";
            var btn1Name = "";
            var tryCount = 0;
            while (true) {
                if (tryCount >= 3) {
                    break;
                }
                for (let index = 0; index < 按钮类型.length; index++) {
                    var item = 按钮类型[index];
                    switch (item) {
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
                        case "卸下":
                            btnName = "xiexia.png";
                            btn1Name = "xiexia1.png";
                            break;
                    }
                    r = tools.findImage(btnName, 0.7);
                    if (r.status) {
                        sucessBtn = btnName;
                        break;
                    }
                    else {
                        r = tools.findImage(btn1Name, 0.7);
                        if (r.status) {
                            sucessBtn = btn1Name;
                            break;
                        }
                    }
                }
                if (r.status) {
                    if (isClick) {
                        var x = r.img.x + r.size.w / 2 + random(-3, 3);
                        var y = r.img.y + r.size.h / 2 + random(-3, 3);
                        tools.click(x, y)
                    }
                    return {
                        status: true,
                        btnName: sucessBtn,
                        value: r
                    }
                }
                else {
                    if (isBoss && tools.常用操作.检测是否在游戏画面()) {
                        tools.补给操作.判断是否出现BOSS提示(1000 * 30, 来源);
                    }
                }
                sleep(200);
                tryCount++;
            }
            r = tools.常用操作.检测是否在游戏画面();
            if (!r) { //如果没在游戏画面大概率是花屏了
                if (notFindEixt) {
                    当前总状态 = 总状态.重启中;
                    tools.常用操作.退出游戏(JSON.stringify(按钮类型) + "获取操作按钮失败(" + 来源 + ")");
                }
            }
            return {
                游戏画面: r,
                status: false
            }
        },
        当放入按钮找不到(zhengliBtn, notFindEixt, 来源) {
            var zhengliP = {
                x: zhengliBtn.img.x,
                y: zhengliBtn.img.y
            }
            let x1 = zhengliP.x - 80 + random(-10, 10);
            let y1 = zhengliP.y + 10 + random(5, 10);
            tools.click(x1, y1);//点一下整理左下方，为了把花屏去掉
            sleep(1000);
            var 背包面板P = tools.补给操作.获取背包面板位置(zhengliBtn);
            var shiYongOk = false;
            var chuandaiOk = false;
            var tryCount = 0;
            while (true) {
                if (tryCount >= 5) {
                    break;
                }
                tools.补给操作.判断是否出现BOSS提示(1000 * 30, "当放入 按钮找不到");
                r = tools.findImageAreaClick(补给枚举.中蓝个_背包, 背包面板P.x1, 背包面板P.y1, 背包面板P.x2, 背包面板P.y2, 0.8);
                if (!r) {
                    r = tools.findImageAreaClick(补给枚举.护身符, 背包面板P.x1, 背包面板P.y1, 背包面板P.x2, 背包面板P.y2, 0.8);
                }
                if (!r) {
                    r = tools.findImageAreaClick(补给枚举.修复油_背包, 背包面板P.x1, 背包面板P.y1, 背包面板P.x2, 背包面板P.y2, 0.8);
                }
                if (r) {
                    sleep(1000)
                    break;
                }
                else {
                    sleep(200);
                }
                tryCount++;
            }
            if (r) {
                tryCount = 0;
                while (true) {
                    if (tryCount >= 5) {
                        break;
                    }
                    tools.补给操作.判断是否出现BOSS提示(1000 * 30, "当放入 按钮找不到");
                    r = tools.findImageClick("beibaoshiyongBtn.png", 0.75);
                    if (!r) {
                        r = tools.findImageClick("beibaoshiyongBtn1.png", 0.75);
                    }
                    if (r) {
                        shiYongOk = true;
                        break;
                    }
                    else {
                        sleep(200);
                    }
                    tryCount++;
                }

            }


            tryCount = 0;
            while (true) {
                if (tryCount >= 5) {
                    break;
                }
                tools.补给操作.判断是否出现BOSS提示(1000 * 30, "当放入 按钮找不到");

                r = tools.findImageAreaClick(装备枚举.重盔男, 背包面板P.x1, 背包面板P.y1, 背包面板P.x2, 背包面板P.y2, 0.8);
                if (!r) {
                    r = tools.findImageAreaClick(装备枚举.重盔女, 背包面板P.x1, 背包面板P.y1, 背包面板P.x2, 背包面板P.y2, 0.8);
                }
                if (!r && 挂机参数.备用凝霜 == 1) {
                    r = tools.findImageAreaClick(装备枚举.凝霜, 背包面板P.x1, 背包面板P.y1, 背包面板P.x2, 背包面板P.y2, 0.8);
                }
                if (!r && 挂机参数.备用凌风 == 1) {
                    r = tools.findImageAreaClick(装备枚举.凌风, 背包面板P.x1, 背包面板P.y1, 背包面板P.x2, 背包面板P.y2, 0.8);
                }
                if (r) {
                    sleep(1000)
                    break;
                }
                else {
                    sleep(200);
                }
                tryCount++;
            }
            if (r) {
                tryCount = 0;
                while (true) {
                    if (tryCount >= 5) {
                        break;
                    }
                    tools.补给操作.判断是否出现BOSS提示(1000 * 30, "当放入 按钮找不到");
                    r = tools.findImageClick("beibaochuandaiBtn.png", 0.75);
                    if (!r) {
                        r = tools.findImageClick("beibaochuandaiBtn1.png", 0.75);
                    }
                    if (r) {
                        chuandaiOk = true;
                        break;
                    }
                    else {
                        sleep(200);
                    }
                    tryCount++;
                }

            }


            if (chuandaiOk && shiYongOk) {
                tools.常用方法.错误日志("当[放入]按钮找不到,chuandaiOk=" + chuandaiOk + ",shiYongOk=" + shiYongOk + "", 3);
                return {
                    status: true
                }
            }
            else {
                if (notFindEixt) {
                    当前总状态 = 总状态.重启中;
                    tools.常用操作.退出游戏("当[放入]按钮找不到,获取操作按钮依然失败(" + 来源 + ")");
                }
                return {
                    status: false
                }
            }
        },
        整理背包: (isOpen) => {
            if (isOpen) {
                tools.常用操作.打开背包();
            }
            var r = tools.findImageForWaitClick("beibaozhengliBtn.png", {
                maxTries: 10,
                interval: 100
            });
            if (!r.status) {
                toastLog("未找到背包整理按钮")
            }
            return r;
        },
        获取物品信息: (btn) => {
            if (btn && btn.status) {
                var p = btn.img;
                var 装备属性明细 = config.zuobiao.人物面板[fbl].装备属性明细;
                //var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y - 10, p.x, p.y + 装备属性明细.y);
                var img = tools.截屏裁剪(null, p.x + 装备属性明细.x, p.y - 6, p.x, p.y + 60);
                let r = ocrPladderOCR.detect(img);
                utils.recycleNull(img);
                if (r && r.length > 0) {
                    var allText = '';
                    r.forEach(item => {
                        allText += item.text;
                    });
                    var 持久 = tools.常用操作.根据面板获取持久(allText);
                    return {
                        status: true,
                        名称: r[0].text,
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
        获取背包格子位置: (index1, index2, zhengliBtn, isClick) => {
            var result = {
                中心: {
                    x: 0,
                    y: 0
                },
                贴合范围: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                },
                找图范围: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }
            }
            var zhengliP = {
                x: zhengliBtn.img.x,
                y: zhengliBtn.img.y
            }
            var 背包格子偏移 = config.zuobiao.背包格子偏移[fbl];
            result.中心.x = zhengliP.x + 背包格子偏移["1_1"].x + (背包格子偏移.中心点偏移量X * (index2 - 1));
            result.中心.y = zhengliP.y + 背包格子偏移["1_1"].y + (背包格子偏移.中心点偏移量Y * (index1 - 1));

            result.贴合范围.x1 = zhengliP.x + 背包格子偏移["1_1_左上"].x + (背包格子偏移.中心点偏移量X * (index2 - 1));
            result.贴合范围.x2 = result.贴合范围.x1 + 背包格子偏移.中心点偏移量X;
            result.贴合范围.y1 = zhengliP.y + 背包格子偏移["1_1_左上"].y + (背包格子偏移.中心点偏移量Y * (index1 - 1));
            result.贴合范围.y2 = result.贴合范围.y1 + 背包格子偏移.中心点偏移量Y;

            result.找图范围.x1 = result.贴合范围.x1 - 10;
            result.找图范围.x2 = result.贴合范围.x2 + 20;
            result.找图范围.y1 = result.贴合范围.y1 - 10;
            result.找图范围.y2 = result.贴合范围.y2 + 20;

            if (isClick) {
                var x = result.中心.x + random(-5, 5)
                var y = result.中心.y + random(-5, 5)
                tools.click(x, y)
            }
            return result;
        },
        获取背包面板位置: (zhengliBtn) => {
            var result = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                width: 0,
                height: 0
            }
            var zhengliP = {
                x: zhengliBtn.img.x,
                y: zhengliBtn.img.y
            }
            var 背包格子偏移 = config.zuobiao.背包格子偏移[fbl];
            result.x1 = zhengliP.x + 背包格子偏移["1_1_左上"].x;
            result.x2 = result.x1 + 背包格子偏移.背包宽度;
            result.y1 = zhengliP.y + 背包格子偏移["1_1_左上"].y;
            result.y2 = result.y1 + 背包格子偏移.背包高度;
            result.width = 背包格子偏移.背包宽度;
            result.height = 背包格子偏移.背包高度;
            return result;
        },
        判断选中格子动作: (是否排除装备, 是否判断存, 是否判断极品, zhengliBtn, btn, index1, index2) => {
            var 是否跳过 = false;
            var 是否存仓库 = false;
            var 是否极品 = false;
            var 物品名称 = "";

            var r = tools.补给操作.判断选中格子是否跳过(是否排除装备, zhengliBtn, btn, index1, index2);
            if (r.status) {
                是否跳过 = true;
                物品名称 = r.物品名称
            }

            if (是否判断存) {
                r = tools.补给操作.判断选中格子是否存仓库(zhengliBtn, btn, index1, index2);
                if (r.status) {
                    是否存仓库 = true;
                    物品名称 = r.物品名称
                }
            }

            if (是否判断极品 && tools.补给操作.判断选中格子是否极品(btn)) {
                是否极品 = true;
            }
            return {
                status: true,
                是否跳过: 是否跳过,
                是否存仓库: 是否存仓库,
                是否极品: 是否极品,
                物品名称: 物品名称,
            }
        },
        判断选中格子是否跳过: (是否排除装备, zhengliBtn, btn, index1, index2) => {
            var arr = [{
                name: "中蓝包",
                pic: 补给枚举.中蓝包
            }, {
                name: "修复油",
                pic: 补给枚举.修复油_背包
            }, {
                name: "战神油",
                pic: 补给枚举.战神油_背包
            }];
            if (!是否排除装备) {
                arr.push({
                    name: "护身符大",
                    pic: 补给枚举.护身符
                })
                arr.push({
                    name: "红毒",
                    pic: 补给枚举.红毒
                })
                arr.push({
                    name: "灰毒",
                    pic: 补给枚举.灰毒
                })
            }
            if (挂机参数.备用凌风 == 1 && !是否排除装备) {
                arr.push({
                    name: "凌风",
                    pic: 装备枚举.凌风
                })
            }
            if (挂机参数.备用凝霜 == 1 && !是否排除装备) {
                arr.push({
                    name: "凝霜",
                    pic: 装备枚举.凝霜
                })
            }


            if (挂机参数.备用男重盔 == 1 && !是否排除装备) {
                arr.push({
                    name: "重盔甲（男）",
                    pic: 装备枚举.重盔男
                })
            }
            if (挂机参数.备用女重盔 == 1 && !是否排除装备) {
                arr.push({
                    name: "重盔甲（女）",
                    pic: 装备枚举.重盔女
                })
            }
            for (let index = 0; index < arr.length; index++) {
                var item = arr[index];
                var result = tools.补给操作.背包选中格子中找图(item.pic, zhengliBtn, index1, index2);
                if (result.status) {
                    if (item.pic == 装备枚举.凌风) {
                        r = tools.补给操作.背包选中按钮中找字图(文字图枚举.凌, btn)
                        if (r.status) {
                            return {
                                status: true,
                                pic: item.pic,
                                物品名称: item.name
                            }
                        }
                    }
                    else if (item.pic == 装备枚举.凝霜) {
                        r = tools.补给操作.背包选中按钮中找字图(文字图枚举.凝, btn)
                        if (r.status) {
                            return {
                                status: true,
                                pic: item.pic,
                                物品名称: item.name
                            }
                        }
                        else {
                            r = tools.补给操作.背包选中按钮中找字图(文字图枚举.霜, btn)
                            if (r.status) {
                                return {
                                    status: true,
                                    pic: item.pic,
                                    物品名称: item.name
                                }
                            }
                        }
                    }
                    else if (item.pic == 补给枚举.护身符) {
                        r = tools.补给操作.背包选中按钮中找字图(文字图枚举.符, btn)
                        if (r.status) {
                            return {
                                status: true,
                                pic: item.pic,
                                物品名称: item.name
                            }
                        }
                    }
                    else if (item.pic == 补给枚举.战神油_背包) {
                        r = tools.补给操作.背包选中按钮中找字图(文字图枚举.油, btn)
                        if (r.status) {
                            return {
                                status: true,
                                pic: item.pic,
                                物品名称: item.name
                            }
                        }
                    }
                    else if (item.pic == 补给枚举.红毒) {
                        r = tools.补给操作.背包选中按钮中找字图(文字图枚举.黄, btn)
                        if (r.status) {
                            return {
                                status: true,
                                pic: item.pic,
                                物品名称: item.name
                            }
                        }
                    }
                    else if (item.pic == 装备枚举.重盔男 || item.pic == 装备枚举.重盔女) {
                        r = tools.补给操作.背包选中按钮中找字图(文字图枚举.盔, btn)
                        return {
                            status: true,
                            pic: item.pic,
                            物品名称: item.name
                        }
                    }
                    else {
                        return {
                            status: true,
                            pic: item.pic,
                            物品名称: item.name
                        }
                    }

                }
            }
            return {
                status: false
            }
        },
        判断选中格子是否极品: (btn) => {
            if (btn && btn.status) {
                var p = btn.img;
                var 装备属性明细 = config.zuobiao.人物面板[fbl].装备属性明细;
                var img = captureScreen();
                var r = images.findMultiColors(img, "#FF0000", [[30, 0, "#FF0000"], [38, 0, "#FF0000"], [49, 0, "#FF0000"]], {
                    region: [p.x + 装备属性明细.x, p.y, 装备属性明细.x * -1, 24],
                    threshold: 30
                });
                utils.recycleNull(img);
                if (r && r.x > 0 && r.y > 0) {
                    return true
                }
            }
            return false;
        },
        判断选中格子是否存仓库: (zhengliBtn, btn, index1, index2) => {
            //         祈祷之刃: "cangku_qidaozhiren.png",
            // 祝福油: "buji_zhufuyou.png",
            // 祷字: "wenzi_zhuangbei_qidao.png",
            // 血字: "wenzi_zhuangbei_moxue.png",
            // 记字: "wenzi_zhuangbei_jiyi.png",
            // 杖字:"wenzi_zhuangbei_mozhang.png",
            // 狱字:"wenzi_zhuangbei_lianyu.png",
            // 福字:"wenzi_zhuangbei_zhufuyou.png",
            // 虹字:"wenzi_zhuangbei_hongmo.png",
            // 命字:"wenzi_zhuangbei_shengming.png",
            // 银蛇:"wenzi_zhuangbei_yinse.png",
            var arr = [{
                name: "组队卷",
                pic: 补给枚举.组队卷,
                验证文字: false,
                是否提醒: false,
                同时验证: false,
            }, {
                name: "祈祷之刃",
                pic: 存仓库枚举.祈祷之刃,
                验证文字: false,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "幽灵项链",
                pic: 存仓库枚举.幽灵项链,
                wenPic: 文字图枚举.灵,
                验证文字: true,
                是否提醒: true,
                同时验证: true,
            }, {
                name: "祝福油",
                pic: 存仓库枚举.祝福油,
                验证文字: false,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "祷字",
                wenPic: 文字图枚举.祷字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "福字",
                wenPic: 存仓库枚举.福字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "血字",
                wenPic: 存仓库枚举.血字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "记字",
                wenPic: 存仓库枚举.记字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "杖字",
                wenPic: 存仓库枚举.杖字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "狱字",
                wenPic: 存仓库枚举.狱字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "虹字",
                wenPic: 存仓库枚举.虹字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "命字",
                wenPic: 存仓库枚举.命字,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            }, {
                name: "银蛇",
                wenPic: 存仓库枚举.银蛇,
                验证文字: true,
                是否提醒: true,
                同时验证: false,
            },];
            if (挂机参数.存万年 == 1) {
                arr.push({
                    name: "万年雪霜",
                    pic: 补给枚举.万年雪霜,
                    验证文字: false,
                    是否提醒: false,
                    同时验证: false,
                })
            }
            for (let index = 0; index < arr.length; index++) {
                var item = arr[index];
                if (item.同时验证) {
                    var r1 = tools.补给操作.背包选中格子中找图(item.pic, zhengliBtn, index1, index2)
                    var r2 = tools.补给操作.背包选中按钮中找字图(item.wenPic, btn)
                    if (r1.status && r2.status) {
                        if (item.是否提醒) {
                            tools.常用方法.发送提醒("存仓库" + item.name);
                        }
                        return {
                            status: true,
                            pic: item.pic,
                            物品名称: item.name
                        }
                    }
                }
                else {
                    var r = null;
                    if (item.验证文字) {
                        r = tools.补给操作.背包选中按钮中找字图(item.wenPic, btn)
                    }
                    else {
                        r = tools.补给操作.背包选中格子中找图(item.pic, zhengliBtn, index1, index2)
                    }
                    if (r.status) {
                        if (item.是否提醒) {
                            tools.常用方法.发送提醒("存仓库" + item.name);
                        }
                        return {
                            status: true,
                            pic: item.pic,
                            物品名称: item.name
                        }
                    }
                }
            }
            return {
                status: false
            }
        },
        背包选中格子中找图: (pic, zhengliBtn, index1, index2) => {
            var 格子P = tools.补给操作.获取背包格子位置(index1, index2, zhengliBtn, false);
            var result = tools.findImageArea(pic, 格子P.找图范围.x1, 格子P.找图范围.y1, 格子P.找图范围.x2, 格子P.找图范围.y2, 0.7);
            if (result.status) {
                return {
                    status: true,
                    value: result
                }
            }
            return {
                status: false,
                msg: ""
            }
        },
        背包选中按钮中找字图: (字图, btn) => {
            if (btn && btn.status) {
                var p = btn.img;
                var 装备属性明细 = config.zuobiao.人物面板[fbl].装备属性明细;
                var r = tools.findImageArea(字图, p.x + 装备属性明细.x, p.y - 35, p.x, p.y + 65, 0.7);
                return r;
            }
            else {
                return {
                    status: false
                }
            }
        },
        回城补给: () => {
            tools.悬浮球描述("回城补给");
            var 当前地图 = tools.常用操作.获取人物地图();
            if (挂机参数.地牢回城 == 1 && 当前地图.indexOf("苍月") < 0 && 当前地图.indexOf("比奇") < 0 && 当前地图.indexOf("盟重") < 0 && 当前地图 != "土城") {
                tools.人物移动.使用地牢();
                tools.常用操作.关闭所有窗口();
            }
            if (当前总状态 == 总状态.已启动) {
                while (true) {
                    try {
                        tools.人物移动.去小贩Loop();
                        tools.常用方法.错误日志("去小贩Loop:成功", 2)
                        break;
                    } catch (e) {
                        var msg = typeof e === "object" && e.stack ? e.stack + "\n" + e.toString() : e.toString()
                        tools.常用方法.错误日志("去小贩Loop:异常\n" + msg, 2)
                        toastLog("去小贩Loop: 异常\n" + msg);
                        sleep(666);
                    }
                }
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.点击分身();
                tools.常用方法.错误日志("点击分身完成", 2)
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.替换装备();
                tools.常用方法.错误日志("替换装备完成", 2)
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.卖物品Loop();
                tools.常用方法.错误日志("卖物品Loop完成1", 2)
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.把药品格非蓝拖到背包();
                tools.补给操作.卖物品Loop();
                tools.常用方法.错误日志("卖物品Loop完成2", 2)
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.修理装备Loop();
                tools.常用方法.错误日志("修理装备Loop完成", 2)
            }
            if (当前总状态 == 总状态.已启动) {
                tools.补给操作.买物品Loops();
                tools.常用方法.错误日志("买物品Loops完成", 2)
            }
            if (当前总状态 == 总状态.已启动 && 挂机参数.捆雪霜包 == 1) {
                sleep(888);
                var msg = tools.补给操作.检查仓库雪霜();
                tools.常用方法.错误日志("检查仓库雪霜:" + msg, 2);
            }
            tools.常用方法.错误日志("补给完成", 2)
            tools.悬浮球描述("补给完成");
        },
        点击分身: () => {
            if (挂机参数.补给时点分身 == 1) {
                tools.悬浮球描述("");
                tools.常用操作.关闭所有窗口();
                var 左上箭头 = config.zuobiao.按钮集合[fbl].左上箭头;
                var 奖励p = config.zuobiao.按钮集合[fbl].分身领取奖励;
                var 派遣p = config.zuobiao.按钮集合[fbl].分身派遣;
                var 修炼p = config.zuobiao.按钮集合[fbl].分身确定修炼;
                var 加时p = config.zuobiao.按钮集合[fbl].分身加时按钮;

                var r = tools.findImageForWaitClick("fenshenxiulianBtn.png", {
                    maxTries: 10,
                    interval: 333
                })
                if (!r.status) {
                    tools.click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));
                    sleep(random(666, 888));
                    r = tools.findImageForWaitClick("fenshenxiulianBtn.png", {
                        maxTries: 10,
                        interval: 333
                    })
                }
                if (!r.status) {
                    toastLog("未找到分身修炼小图标");
                    sleep(1000)
                    return false;
                }
                r = tools.findImageAreaForWaitClick("fenshen_lingqujiangliBtn.png", 奖励p.x[0], 奖励p.y[0], 奖励p.x[1], 奖励p.y[1], {
                    maxTries: 10,
                    interval: 333,
                    threshold: 0.9
                })
                sleep(random(1500, 2000));

                r = tools.findImageAreaForWaitClick("fenshen_paiqianBtn.png", 派遣p.x[0], 派遣p.y[0], 派遣p.x[1], 派遣p.y[1], {
                    maxTries: 10,
                    interval: 333,
                    threshold: 0.9
                })
                if (!r.status) {
                    toastLog("未找到分身（派遣）按钮");
                    tools.click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));
                    tools.常用操作.关闭所有窗口();
                    return false;
                }

                sleep(random(1500, 2000));

                r = tools.findImageAreaForWaitClick("fenshenquedingxiulianBtn.png", 修炼p.x[0], 修炼p.y[0], 修炼p.x[1], 修炼p.y[1], {
                    maxTries: 10,
                    interval: 333,
                    threshold: 0.9
                })

                if (!r.status) {
                    toastLog("未找到分身修炼（确定）按钮");
                    tools.click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));
                    tools.常用操作.关闭所有窗口();
                    return false;
                }

                sleep(random(1500, 2000));

                while (true) {
                    sleep(random(1500, 2000));
                    r = tools.findImageAreaForWaitClick("fenshenjiashiBtn.png", 加时p.x[0], 加时p.y[0], 加时p.x[1], 加时p.y[1], {
                        maxTries: 10,
                        interval: 333,
                        threshold: 0.9
                    })
                    if (r.status) {
                        sleep(random(1500, 2000));
                        r = tools.findImageAreaForWaitClick("fenshenquedingxiulianBtn.png", 修炼p.x[0], 修炼p.y[0], 修炼p.x[1], 修炼p.y[1], {
                            maxTries: 10,
                            interval: 333,
                            threshold: 0.9
                        })
                        if (!r.status) {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }
                tools.click(random(左上箭头.x[0], 左上箭头.x[1]), random(左上箭头.y[0], 左上箭头.y[1]));
                tools.常用操作.关闭所有窗口();
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
            var r = tools.补给操作.点击小贩按钮("出售", false);
            if (!r) {
                return {
                    status: false,
                    err: "未获取出售物品按钮"
                }
            }
            var zhengliBtn = tools.补给操作.整理背包(false);
            if (!zhengliBtn.status) {
                tools.补给操作.点击小贩按钮("购买", true); //这里尝试购买后，可能会出现整理按钮
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
                    sleep(random(666, 888))
                    tools.补给操作.点击背包格子(index, index1, zhengliBtn);
                    r = tools.补给操作.获取操作按钮(["放入"], "卖物品", false, false, true);
                    if (!r.status) {
                        if (r.游戏画面) { //有游戏画面，说明东西卖完了 确实找不到按钮
                            tools.补给操作.背包拖动背景至可关闭位置(zhengliBtn);
                            tools.常用操作.关闭所有窗口();
                            return {
                                status: true,
                                err: ""
                            }
                        }
                        else {//没游戏画面，说明花屏了
                            r = tools.补给操作.当放入按钮找不到(zhengliBtn, true, "卖东西");
                            if (r.status) {
                                toastLog("解决花屏跳过")
                                return {
                                    status: false,
                                    err: ""
                                }
                                //continue;
                            }
                        }
                    }
                    var info = tools.补给操作.判断选中格子动作(false, true, true, zhengliBtn, r.value, index, index1);
                    if (info.是否跳过) {
                        var 是否跳过 = false;
                        if (info.物品名称 == "斩马" || info.物品名称 == "修罗" || info.物品名称 == "凝霜") {
                            if (!是否已跳过武器) {
                                是否跳过 = true;
                                是否已跳过武器 = true;
                            }
                            else {
                                tools.悬浮球描述("已保留过武器");
                            }
                        }
                        else if (info.物品名称 == "重盔甲（男）" || info.物品名称 == "重盔甲（女）") {
                            if (!是否已跳过衣服) {
                                是否跳过 = true;
                                是否已跳过衣服 = true;
                            }
                            else {
                                tools.悬浮球描述("已保留过衣服");
                            }
                        }
                        else {
                            是否跳过 = true;
                        }
                        if (是否跳过) {
                            tools.悬浮球描述(`${info.物品名称}跳过`)
                            continue;
                        }
                    }

                    if (info.是否极品 || info.是否存仓库) {
                        tools.悬浮球描述(`${info.物品名称}存仓库`)
                        tools.补给操作.存仓库(index, index1);
                        sleep(1000);
                        tools.补给操作.点击小贩按钮("出售", false);
                        continue;
                    }

                    tools.悬浮球描述(`${info.物品名称}正常出售`)
                    var x = r.value.img.x + r.value.size.w / 2 + random(-5, 5);
                    var y = r.value.img.y + r.value.size.h / 2 + random(-3, 3);
                    tools.click(x, y)
                    sleep(777);
                    // r = tools.findImageForWaitClick(r.btnName, {
                    //     maxTries: 6,
                    //     interval: 666
                    // });
                    r = tools.findImageForWaitClick("OKBtn.png", {
                        maxTries: 10,
                        interval: 666
                    });
                }
            }
            tools.补给操作.背包拖动背景至可关闭位置(zhengliBtn);
            tools.常用操作.关闭所有窗口();
            return {
                status: true,
                err: ""
            }
        },
        把药品格非蓝拖到背包: () => {
            var arr = config.zuobiao.药品格子面板[fbl].arr;
            var zhengliBtn = tools.补给操作.整理背包(true);
            sleep(1000)
            for (let index = 0; index < arr.length; index++) {
                var 药品格子P = arr[index];
                var r = tools.findImageArea(补给枚举.中蓝个_格子, 药品格子P.x1, 药品格子P.y1, 药品格子P.x2, 药品格子P.y2, 0.85);
                if (r.status) {
                    continue;
                }

                var 背包格子P = tools.补给操作.获取背包格子位置(5, (8 - index), zhengliBtn);
                var duration = random(888, 1288);
                var 起点x = 药品格子P.x1 + ((药品格子P.x2 - 药品格子P.x1) / 2);
                var 起点y = 药品格子P.y1 + ((药品格子P.y2 - 药品格子P.y1) / 2);

                var 目标x = 背包格子P.中心.x;
                var 目标y = 背包格子P.中心.y;

                gesture(duration, [起点x, 起点y], [目标x, 目标y])
                sleep(1000);
            }
            tools.常用操作.关闭所有窗口(false, 0, true);
        },
        寻找装备: (zhengliBtn, picName, 已替换) => {
            var 背包面板P = tools.补给操作.获取背包面板位置(zhengliBtn);
            var arr = tools.matchTemplateForArea(picName, 2, 0.8,
                [背包面板P.x1, 背包面板P.y1, 背包面板P.width, 背包面板P.height]
            )
            var result = [];
            if (arr.count > 0) {
                var 是否替换过手镯 = false;
                var 替换手镯名称 = "";
                var 是否替换过戒指 = false;
                var 替换戒指名称 = "";
                for (var index = 0; index < arr.count; index++) {
                    var item = arr.r[index];
                    var 点击P = {
                        x: item.point.x + random(5, 10),
                        y: item.point.y + random(4, 8),
                    }
                    tools.click(点击P.x, 点击P.y);
                    var r = tools.补给操作.获取操作按钮(["穿戴"], "寻找装备", false, false, true);
                    r = tools.补给操作.获取物品信息(r.value);
                    sleep(333);
                    tools.常用操作.点击左面板怪物()
                    if (!r.status) {
                        continue;
                    }
                    if (picName == 装备枚举.道士头盔) {
                        if (r.status && (r.value.indexOf("头") >= 0 || r.value.indexOf("盔") >= 0)) {
                            result.push({
                                装备: "头盔",
                                名称: r.名称,
                                点击P: 点击P
                            })
                            break;
                        }
                    }
                    else if (picName == 装备枚举.重盔男 || picName == 装备枚举.重盔女) {
                        if (r.status && (r.value.indexOf("盔") >= 0 || r.value.indexOf("甲") >= 0)) {
                            if (r.持久) {
                                if (r.持久.满持久 == 25) {
                                    result.push({
                                        装备: "衣服",
                                        名称: r.名称,
                                        点击P: 点击P
                                    })
                                }
                                else {
                                    toastLog("重盔" + r.持久.满持久 + "持久未满25不达标")
                                }
                            }
                            else {
                                toastLog("重盔持久识别失败" + JSON.stringify(r))
                            }
                            break;
                        }
                    }
                    else if (picName == 装备枚举.凌风) {
                        if (r.status && (
                            r.value.indexOf("凌") >= 0
                            || r.value.indexOf("风") >= 0
                            || r.value.indexOf("18") >= 0
                            || r.value.indexOf("20") >= 0)) {
                            if (r.持久) {
                                if (r.持久.满持久 == 18) {
                                    result.push({
                                        装备: "武器",
                                        名称: r.名称,
                                        点击P: 点击P
                                    })
                                }
                                else {
                                    toastLog("斩马" + r.持久.满持久 + "持久未满18不达标")
                                }
                            }
                            else {
                                toastLog("斩马持久识别失败" + JSON.stringify(r))
                            }
                            break;
                        }

                    }
                    else if (picName == 装备枚举.凝霜) {
                        if (r.status && (
                            r.value.indexOf("凝") >= 0
                            || r.value.indexOf("霜") >= 0
                            || r.value.indexOf("20") >= 0
                            || r.value.indexOf("25") >= 0)) {
                            if (r.持久) {
                                if (r.持久.满持久 == 20) {
                                    result.push({
                                        装备: "武器",
                                        名称: r.名称,
                                        点击P: 点击P
                                    })
                                }
                                else {
                                    toastLog("凝霜" + r.持久.满持久 + "持久未满20不达标")
                                }
                            }
                            else {
                                toastLog("凝霜持久识别失败" + JSON.stringify(r))
                            }
                            break;
                        }

                    }
                    else if (picName == 装备枚举.魔鬼项链) {
                        if (r.status && ((r.value.indexOf("魔") >= 0 || r.value.indexOf("鬼") >= 0 || r.value.indexOf("17") >= 0) && (r.value.indexOf("项") >= 0 || r.value.indexOf("链") >= 0))) {
                            result.push({
                                装备: "项链",
                                名称: r.名称,
                                点击P: 点击P
                            })
                            break;
                        }
                    }
                    else if (picName == 装备枚举.凤凰项链 || picName == 装备枚举.翡翠项链) {
                        if (r.status && (r.value.indexOf("项") >= 0 || r.value.indexOf("链") >= 0)) {
                            result.push({
                                装备: "项链",
                                名称: r.名称,
                                点击P: 点击P
                            })
                            break;
                        }
                    }
                    else if (picName == 装备枚举.坚固手 || picName == 装备枚举.大手镯 || picName == 装备枚举.死神手) {
                        if (r.status && (r.value.indexOf("手") >= 0 || r.value.indexOf("镯") >= 0 || r.value.indexOf("套") >= 0)) {
                            var 是否之前已替换手镯1 = 已替换.some(item => item.装备 === "手镯1");
                            var 是否之前已替换手镯2 = 已替换.some(item => item.装备 === "手镯2");
                            if (是否之前已替换手镯1 && 是否之前已替换手镯2) {
                                continue;
                            }
                            if (!是否替换过手镯) {
                                是否替换过手镯 = true;
                                if (是否之前已替换手镯1) {
                                    替换手镯名称 = "手镯2";
                                }
                                else if (是否之前已替换手镯2) {
                                    替换手镯名称 = "手镯1";
                                }
                                else {
                                    替换手镯名称 = random(0, 1) == 0 ? "手镯1" : "手镯2";
                                }
                                result.push({
                                    装备: 替换手镯名称,
                                    名称: r.名称,
                                    点击P: 点击P
                                })
                            }
                            else {
                                替换手镯名称 = 替换手镯名称 == "手镯1" ? "手镯2" : "手镯1";
                                var 是否之前已替换该手镯 = 已替换.some(item => item.装备 === 替换手镯名称);
                                if (!是否之前已替换该手镯) {
                                    result.push({
                                        装备: 替换手镯名称,
                                        名称: r.名称,
                                        点击P: 点击P
                                    })
                                }
                                break;
                            }
                        }
                    }
                    else if (picName == 装备枚举.黑色戒指 || picName == 装备枚举.降妖戒指 || picName == 装备枚举.道德戒指) {
                        if (r.status && (r.value.indexOf("戒") >= 0 || r.value.indexOf("指") >= 0)) {
                            var 是否之前已替换戒指1 = 已替换.some(item => item.装备 === "戒指1");
                            var 是否之前已替换戒指2 = 已替换.some(item => item.装备 === "戒指2");
                            if (是否之前已替换戒指1 && 是否之前已替换戒指2) {
                                continue;
                            }
                            if (!是否替换过戒指) {
                                是否替换过戒指 = true;
                                if (是否之前已替换戒指1) {
                                    替换戒指名称 = "戒指2";
                                }
                                else if (是否之前已替换戒指2) {
                                    替换戒指名称 = "戒指1";
                                }
                                else {
                                    替换戒指名称 = random(0, 1) == 0 ? "戒指1" : "戒指2";
                                }
                                result.push({
                                    装备: 替换戒指名称,
                                    名称: r.名称,
                                    点击P: 点击P
                                })
                            }
                            else {
                                替换戒指名称 = 替换戒指名称 == "戒指1" ? "戒指2" : "戒指1";
                                var 是否之前已替换该戒指 = 已替换.some(item => item.装备 === 替换戒指名称);
                                if (!是否之前已替换该戒指) {
                                    result.push({
                                        装备: 替换戒指名称,
                                        名称: r.名称,
                                        点击P: 点击P
                                    })
                                }
                                break;
                            }
                        }
                    }
                }
            }
            return result;
        },
        替换装备: () => {
            var zhengliBtn = tools.补给操作.整理背包(true)
            var 替换 = [];
            var result = []

            if (挂机参数.替换凝霜 == 1) {
                result.push(装备枚举.凝霜);
            }
            if (挂机参数.替换凌风 == 1) {
                result.push(装备枚举.凌风);
            }


            if (挂机参数.替换男盔 == 1) {
                result.push(装备枚举.重盔男);
            }
            if (挂机参数.替换女盔 == 1) {
                result.push(装备枚举.重盔女);
            }

            if (挂机参数.替换道头 == 1) {
                result.push(装备枚举.道士头盔);
            }

            if (挂机参数.替换翡翠项链 == 1) {
                result.push(装备枚举.翡翠项链);
            }
            if (挂机参数.替换明珠 == 1) {
                result.push(装备枚举.凤凰项链);
            }
            if (挂机参数.替换魔鬼项链 == 1) {
                result.push(装备枚举.魔鬼项链);
            }

            if (挂机参数.替换坚固 == 1) {
                result.push(装备枚举.坚固手);
            }
            if (挂机参数.替换大手镯 == 1) {
                result.push(装备枚举.大手镯);
            }
            if (挂机参数.替换死神 == 1) {
                result.push(装备枚举.死神手);
            }

            if (挂机参数.替换降妖 == 1) {
                result.push(装备枚举.降妖戒指);
            }
            if (挂机参数.替换道德 == 1) {
                result.push(装备枚举.道德戒指);
            }
            if (挂机参数.替换黑色戒指 == 1) {
                result.push(装备枚举.黑色戒指);
            }

            for (var index = 0; index < result.length; index++) {
                var pic = result[index];
                sleep(random(666, 888));
                var arr = tools.补给操作.寻找装备(zhengliBtn, pic, 替换);
                if (arr && arr.length > 0) {
                    for (var index1 = 0; index1 < arr.length; index1++) {
                        var 是否包含 = 替换.some(item => item.装备 === arr[index1].装备);
                        if (!是否包含) {
                            替换.push(arr[index1]);
                        }
                        else {
                            // tools.悬浮球描述("已包含" + arr[index1].装备);
                            // sleep(1000)
                            toastLog("已包含" + arr[index1].装备);
                        }
                    }
                }
            }

            tools.悬浮球描述(JSON.stringify(替换))

            if (替换 && 替换.length > 0) {
                tools.常用操作.打开角色();
                for (var index = 0; index < 替换.length; index++) {
                    var item = 替换[index];
                    tools.补给操作.拖动穿装备(item.点击P, item.装备);
                    sleep(random(1288, 1588));
                }
            }
            tools.常用操作.关闭所有窗口();
            //tools.悬浮球描述("结束寻找平替装备");
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
                var 蓝包数量 = tools.matchTemplate(补给枚举.中蓝包, 10, 0.85).count;
                var 蓝个数量_背包 = tools.matchTemplate(补给枚举.中蓝个_背包, 15, 0.85).count;
                var 蓝个数量_格子 = tools.matchTemplate(补给枚举.中蓝个_格子, 6, 0.85).count;
                var 蓝个数量 = 蓝个数量_背包 + 蓝个数量_格子;

                var 护身符数量 = tools.matchTemplate(补给枚举.护身符, 5, 0.85).count;

                var 灰毒数量 = tools.matchTemplate(补给枚举.灰毒, 2, 0.85).count;



                var 修复油数量_背包 = tools.matchTemplate(补给枚举.修复油_背包, 5, 0.85).count;
                var 修复油数量_格子 = tools.matchTemplate(补给枚举.修复油_格子, 5, 0.85).count;
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

                        if (灰毒数量 > 0 && 物品对象["名称"].indexOf("灰毒药") >= 0) {
                            物品对象["数量"] = buyNum - 灰毒数量;
                            toastLog("已有灰毒数量" + 灰毒数量);
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
            tools.click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2))
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
            tools.click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
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
                    tools.click(random(p.x[0], p.x[1]), random(p.y[0], p.y[1]))
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
            tools.常用操作.关闭所有窗口();
        },
        存仓库: (index1, index2) => {
            tools.常用操作.关闭所有窗口();
            var 比奇小贩按钮 = config.zuobiao.比奇小贩按钮[fbl]
            sleep(random(666, 999));
            tools.click(random(比奇小贩按钮.x1, 比奇小贩按钮.x2), random(比奇小贩按钮.y1, 比奇小贩按钮.y2));
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
            tools.click(x, y)
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
                tools.补给操作.穿装备Loop();
            }
            是否用过备用衣服 = false;
            是否用过备用武器 = false;
            tools.悬浮球描述("修理结束");
        },
        修理装备: () => {
            var r = tools.补给操作.点击小贩按钮("普修", false);
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
                    //tools.悬浮球描述(`开始修理${index}_${index1}格子`);
                    tools.补给操作.点击背包格子(index, index1, zhengliBtn);
                    r = tools.补给操作.获取操作按钮(["放入"], "修理装备", false, false, true);
                    if (!r.status) {
                        if (r.游戏画面) { //有游戏画面，说明东西修完了 确实找不到按钮
                            tools.补给操作.背包拖动背景至可关闭位置(zhengliBtn);
                            tools.常用操作.关闭所有窗口();
                            return;
                        }
                        else {//没游戏画面，说明花屏了
                            r = tools.补给操作.当放入按钮找不到(zhengliBtn, true, "修理装备");
                            if (r.status) {
                                是否返回修理 = false;
                                toastLog("解决花屏问题跳过")
                                continue;
                            }
                        }
                    }
                    var info = tools.补给操作.判断选中格子动作(true, false, false, zhengliBtn, r.value, index, index1);
                    if (info.是否跳过) {
                        是否返回修理 = false;
                        tools.悬浮球描述(info.物品名称 + "跳过");
                        continue;
                    }
                    else {
                        tools.悬浮球描述(info.物品名称 + "开始修理");
                        var x = r.value.img.x + r.value.size.w / 2 + random(-5, 5);
                        var y = r.value.img.y + r.value.size.h / 2 + random(-3, 3);
                        tools.click(x, y)
                        sleep(777);

                        r = tools.findImageForWaitClick("OKBtn.png", {
                            maxTries: 10,
                            interval: 500
                        })
                        是否返回修理 = true;
                        sleep(random(333, 666))
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
        穿装备Loop: () => {
            var zhengliBtn = tools.补给操作.整理背包(true);
            sleep(1000, 1200);
            if (zhengliBtn.status) {
                for (let index = 1; index <= 5; index++) {
                    for (let index1 = 1; index1 <= 8; index1++) {
                        tools.执行时间戳.检测认证();
                        tools.补给操作.点击背包格子(index, index1, zhengliBtn);
                        var r = tools.补给操作.获取操作按钮(["穿戴", "使用"], "穿 装 备", false, true, true);
                        if (r.status) {
                            var info = tools.补给操作.判断选中格子动作(true, false, false, zhengliBtn, r.value, index, index1);
                            if (info.是否跳过) {
                                tools.悬浮球描述(info.物品名称 + "跳过");
                                continue;
                            }
                            else {
                                tools.悬浮球描述(info.物品名称 + "穿装备");
                                var btn = r.value;
                                var x = btn.img.x + btn.size.w / 2 + random(-5, 5);
                                var y = btn.img.y + btn.size.h / 2 + random(-3, 3);
                                tools.click(x, y)
                            }
                        }
                        else {
                            return true;
                        }
                        sleep(random(666, 777))
                    }
                }
            }

        },
        拖动穿装备: (起始位置, 目标装备) => {
            var result = tools.findImageForWait("rewumianbanBtn.png", {
                maxTries: 10,
                interval: 200
            })
            if (!result.status) {
                toastLog("未获取rewumianbanBtn.png")
                return false;
            }
            var x = 起始位置.x;
            var y = 起始位置.y;
            if (y <= 60) { //防止拖到状态栏
                y = 60;
            }
            var 装备 = null;
            switch (目标装备) {
                case "头盔":
                    装备 = config.zuobiao.人物面板[fbl].头盔;
                    break;
                case "衣服":
                    装备 = config.zuobiao.人物面板[fbl].衣服;
                    break;
                case "武器":
                    装备 = config.zuobiao.人物面板[fbl].武器;
                    break;
                case "项链":
                    装备 = config.zuobiao.人物面板[fbl].项链;
                    break;
                case "手镯1":
                    装备 = config.zuobiao.人物面板[fbl].手镯1;
                    break;
                case "手镯2":
                    装备 = config.zuobiao.人物面板[fbl].手镯2;
                    break;
                case "戒指1":
                    装备 = config.zuobiao.人物面板[fbl].戒指1;
                    break;
                case "戒指2":
                    装备 = config.zuobiao.人物面板[fbl].戒指2;
                    break;
                case "护身符":
                    装备 = config.zuobiao.人物面板[fbl].护身符;
                    break;
                default:
                    toastLog("未知装备")
                    return false

            }
            var x2 = result.img.x + 装备.x + random(-5, 5);
            var y2 = result.img.y + 装备.y + random(-3, 3);
            var duration = random(888, 1288);
            gesture(duration, [x, y], [x2, y2])
        },
        丢护身符: (格子x, 格子y, 时间戳) => {
            var fbl = `${device.width}_${device.height}`;
            var x1 = 格子x + random(-5, 5);
            var y1 = 格子y + random(-5, 5);
            var x2 = random(config.zuobiao.丢东西范围[fbl].x[0], config.zuobiao.丢东西范围[fbl].x[1]);
            var y2 = random(config.zuobiao.丢东西范围[fbl].y[0], config.zuobiao.丢东西范围[fbl].y[1]);
            gesture(时间戳, [x1, y1], [x2, y2]);
        },
        购买捆药绳: () => {
            var 包袱p = config.zuobiao.存取范围[fbl].包袱;
            var 绳 = config.zuobiao.按钮集合[fbl].捆药绳;
            var 购 = config.zuobiao.按钮集合[fbl].购买物品;
            var 确定 = config.zuobiao.按钮集合[fbl].购买确定;
            var 铺关闭 = config.zuobiao.按钮集合[fbl].铺关闭;
            var tryCount = 0;
            while (true) {
                if (tryCount >= 10) {
                    return {
                        status: false,
                        msg: "尝试10次购买都失败了"
                    }
                }
                var r = tools.findImageAreaForWait(补给枚举.捆药绳, 包袱p.x, 包袱p.y, 包袱p.x + 包袱p.w, 包袱p.y + 包袱p.h, {
                    maxTries: 10,
                    interval: 100,
                    threshold: 0.7
                })
                if (r.status) {
                    tools.常用方法.错误日志("发现捆药绳:" + JSON.stringify(r), 2);
                    return {
                        status: true
                    }
                }
                else {
                    tryCount++;
                    var puBtn = tools.findImageForWaitClick("puBtn.png", {
                        maxTries: 10,
                        interval: 200
                    });
                    if (puBtn.status) {
                        tools.常用方法.错误日志("获取铺图片成功:" + JSON.stringify(puBtn), 2);
                        sleep(3000);
                        tools.click(random(绳.x[0], 绳.x[1]), random(绳.y[0], 绳.y[1]))
                        tools.悬浮球描述("选择捆药绳");
                        sleep(2000);
                        tools.click(random(购.x[0], 购.x[1]), random(购.y[0], 购.y[1]))
                        tools.悬浮球描述("点击购买按钮");
                        sleep(2500);
                        tools.click(random(确定.x[0], 确定.x[1]), random(确定.y[0], 确定.y[1]))
                        tools.悬浮球描述("点击确定按钮");
                        sleep(1500);
                        tools.click(random(铺关闭.x[0], 铺关闭.x[1]), random(铺关闭.y[0], 铺关闭.y[1]))
                        tools.悬浮球描述("点击关闭按钮");
                        sleep(1200);
                    }
                    else {
                        tools.常用方法.错误日志("获取铺图片失败", 2);
                    }
                }
            }



        },
        取出雪霜: () => {
            var t = 0.85;
            var 取回数量 = 0;
            var 仓库p = config.zuobiao.存取范围[fbl].仓库;
            var 包袱p = config.zuobiao.存取范围[fbl].包袱;
            var r = tools.matchTemplateForArea(补给枚举.万年雪霜, 12, t,
                [仓库p.x, 仓库p.y, 仓库p.w, 仓库p.h]
            )
            var 雪霜数量 = r.count;
            if (r.status && 雪霜数量 >= 6) {
                while (true) {
                    var r = tools.findImageAreaForWait(补给枚举.万年雪霜, 仓库p.x, 仓库p.y, 仓库p.x + 仓库p.w, 仓库p.y + 仓库p.h, {
                        maxTries: 10,
                        interval: 100,
                        threshold: t
                    })
                    if (r.status) {
                        var x1 = r.img.x + r.size.w / 2 + random(5, 10);
                        var y1 = r.img.y + r.size.h / 2 + random(5, 10);
                        var x2 = 包袱p.中心.x + random(5, 10);
                        var y2 = 包袱p.中心.y + random(5, 10);
                        gesture(random(666, 999), [x1, y1], [x2, y2])
                        tools.悬浮球描述("雪霜数量(" + 雪霜数量 + "),已取出(" + (取回数量 + 1) + ")");
                        sleep(random(666, 999));
                        取回数量++;
                        if (取回数量 >= 6) {
                            return {
                                status: true
                            };
                        }
                    }
                    else {
                        return {
                            status: false,
                            msg: "未获取到雪霜图片"
                        };
                    }
                }
            }
            else {
                return {
                    status: false,
                    msg: "雪霜数量(" + 雪霜数量 + ")不用捆"
                };
            }
        },
        捆雪霜: () => {
            var 包袱p = config.zuobiao.存取范围[fbl].包袱;
            var 万年雪霜包p = config.zuobiao.按钮集合[fbl].万年雪霜包;
            var r = tools.findImageAreaForWait(补给枚举.捆药绳, 包袱p.x, 包袱p.y, 包袱p.x + 包袱p.w, 包袱p.y + 包袱p.h, {
                maxTries: 10,
                interval: 100,
                threshold: 0.7
            })
            tools.常用方法.错误日志("捆药绳位置:" + JSON.stringify(r), 2);
            tools.悬浮球描述("捆药绳位置:" + JSON.stringify(r))
            if (r.status && (r.img.x > 0 || r.img.y > 0)) {
                var x = r.img.x + r.size.w / 2 + random(5, 10);
                var y = r.img.y + r.size.h / 2 + random(5, 10);
                tools.click(x, y)
                sleep(120);
                tools.click(x, y)
                sleep(2000)
                tools.click(random(万年雪霜包p.x[0], 万年雪霜包p.x[1]), random(万年雪霜包p.y[0], 万年雪霜包p.y[1]))
                sleep(2000)
                return {
                    status: true,
                }
                // r = tools.补给操作.获取操作按钮(["使用"], "捆雪霜", true, true, true);
                // tools.悬浮球描述("捆药绳使用按钮:" + JSON.stringify(r))
                // tools.常用方法.错误日志("捆药绳使用按钮:" + JSON.stringify(r), 2);
                // if (r.status) {
                //     sleep(2000)
                //    tools.click(random(万年雪霜包p.x[0], 万年雪霜包p.x[1]), random(万年雪霜包p.y[0], 万年雪霜包p.y[1]))
                //     sleep(2000)
                //     return {
                //         status: true,
                //     }
                // }
                // else {
                //     return {
                //         status: false,
                //         msg: "未找到捆药绳使用按钮"
                //     }
                // }
            }
            else {
                return {
                    status: false,
                    msg: "未找到捆药绳"
                }
            }
        },
        存雪霜包: () => {
            tools.常用操作.关闭所有窗口();
            sleep(666);
            tools.补给操作.点击小贩按钮("保存", false);
            sleep(1288);
            var 包袱p = config.zuobiao.存取范围[fbl].包袱;
            var 仓库p = config.zuobiao.存取范围[fbl].仓库;
            var r = tools.findImageAreaForWait(补给枚举.万年雪霜包, 包袱p.x, 包袱p.y, 包袱p.x + 包袱p.w, 包袱p.y + 包袱p.h, {
                maxTries: 10,
                interval: 200,
                threshold: 0.8
            })
            if (r.status) {
                var x1 = r.img.x + r.size.w / 2 + random(5, 10);
                var y1 = r.img.y + r.size.h / 2 + random(5, 10);
                var x2 = 仓库p.中心.x + random(5, 10);
                var y2 = 仓库p.中心.y + random(5, 10);
                gesture(random(666, 999), [x1, y1], [x2, y2])
                sleep(random(666, 999));
                return {
                    status: true,
                    msg: "成功存入"
                };
            }
            else {
                return {
                    status: false,
                    msg: "未获取到雪霜包图片"
                };
            }
        },
        检查仓库雪霜: () => {
            tools.补给操作.点击小贩按钮("保存", false);
            sleep(2000);
            var r = tools.补给操作.取出雪霜();
            if (r.status) {
                sleep(2200);
                r = tools.补给操作.购买捆药绳();
                if (r.status) {
                    sleep(1200);
                    r = tools.补给操作.捆雪霜();
                    if (r.status) {
                        r = tools.补给操作.存雪霜包();
                    }
                }
            }
            tools.常用操作.关闭所有窗口();
            return r.msg;
        },
        检测聊天框持久提示: () => {
            if ((new Date().getTime() - 上一次持久提示时间) >= 1000 * 60 * 2) {
                var p = config.zuobiao.聊天框面板[fbl];
                var r = tools.findImageArea(持久提示枚举.凝霜, p.x1, p.y1, p.x2, p.y2, 0.85);
                if (r.status) {
                    上一次持久提示时间 = new Date().getTime();
                    return true;
                }
                r = tools.findImageArea(持久提示枚举.重盔, p.x1, p.y1, p.x2, p.y2, 0.85);
                if (r.status) {
                    上一次持久提示时间 = new Date().getTime();
                    return true;
                }
            }
            return false;
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
            //    tools.click(r.x + random(12, 20), r.y + random(-3, 3))
            //     isFind = true;
            // }
            tools.click(认证P.x + random(-5, 5), 认证P.y - random(7, 15));
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
            var now = new Date();
            var h = String(now.getHours()).padStart(2, '0');
            var m = String(now.getMinutes()).padStart(2, '0');
            var s = String(now.getSeconds()).padStart(2, '0');
            let timeStr = `${m}:${s}`;
            window.tempText.setText(text + "(" + timeStr + ")");
        });
    },
    findImageForWaitClick: (fileName, options, threshold) => {
        var result = tools.findImageForWait(fileName, options, threshold);
        if (result.status && (result.img.x > 0 || result.img.y > 0)) {
            var x = result.img.x + result.size.w / 2 + random(-3, 3);
            var y = result.img.y + result.size.h / 2 + random(-3, 3);
            tools.click(x, y)
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
    findImageAreaForWaitByImg: (targetImg, x1, y1, x2, y2, options) => {
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
                msg = "超过最大尝试次数，未找到图像";
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
            if (new Date().getTime() - start > timeout) {
                msg = "超时未找到图像";
                return {
                    status: false,
                    img: null,
                    err: msg
                }
            }
            if (targetImg) {
                var imgSize = {
                    w: targetImg.width,
                    h: targetImg.height
                }
                var img = captureScreen();
                var r = utils.regionalFindImg2(img, targetImg, x1, y1, x2, y2, 60, 255, threshold, false, false, "");
                utils.recycleNull(img);
                if (r != null && (r.x > 0 || r.y > 0)) {
                    return {
                        status: true,
                        img: r,
                        size: imgSize
                    };
                }
            }
            else {
                return {
                    status: false,
                    img: null,
                    err: "targetImg不能为空"
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
            tools.click(x, y)
        }
        return result;
    },
    findImage: (fileName, threshold, img) => {
        var w = device.width;
        var h = device.height;
        var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${fileName}`;
        var targetImg = images.read(targetImgPath);
        var 是否销毁img = false;
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
            if (img == null) {
                img = captureScreen();
                是否销毁img = true;
            }
            var result = images.findImage(img, targetImg, options);
            if (是否销毁img) {
                utils.recycleNull(img);
            }
            utils.recycleNull(targetImg);
            if (result != null && (result.x > 0 || result.y > 0)) {
                return {
                    status: true,
                    img: result,
                    size: imgSize
                };
            }
        }
        //shiqubiaoji
        if (fileName != "closeBtn.png" && fileName != "closeBtn2.png" && fileName != "zuoguaiwuBtn.png" && fileName != "zuoguaiwumanxueBtn.png" && fileName != "shiqubiaoji.png") {
            tools.悬浮球描述('找图失败' + fileName);
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
            else {
                return {
                    status: false,
                    img: null,
                    err: '未找到对应的图片'
                };
            }
        }
        return {
            status: false,
            img: null,
            err: '本地无' + fileName + '图片'
        }
    },
    findAllColorAreaForWait: (color, x1, y1, x2, y2, options) => {
        let interval, maxTries, threshold;
        let tryCount = 0;
        if (options) {
            interval = options.interval !== undefined ? options.interval : 200;
            maxTries = options.maxTries !== undefined ? options.maxTries : 6;
            threshold = options.threshold !== undefined ? options.threshold : 15;
        } else {
            interval = 200;
            maxTries = 6;
            threshold = 15;
        }
        while (true) {
            if (maxTries && tryCount >= maxTries) {
                return {
                    status: false,
                    img: null,
                    err: "超过" + maxTries + "次未找到颜色"
                }
            }
            if (interval > 0) {
                sleep(interval);
            }
            var img = captureScreen();
            var r = images.findAllPointsForColor(img, color, {
                region: [x1, y1, x2 - x1, y2 - y1],
                threshold: threshold
            });
            utils.recycleNull(img);
            if (r && r.length > 0) {
                return {
                    status: true,
                    count: r.length
                }
            }
            tryCount++;
        }
    },
    findImageAreaClick(fileName, x1, y1, x2, y2, threshold) {
        var result = tools.findImageArea(fileName, x1, y1, x2, y2, threshold);
        if (result.status && (result.img.x > 0 || result.img.y > 0)) {
            var x = result.img.x + result.size.w / 2 + random(-3, 3);
            var y = result.img.y + result.size.h / 2 + random(-3, 3);
            tools.click(x, y)
            return true
        } else {
            if (fileName != "closeBtn.png" && fileName != "closeBtn2.png" && fileName != "zuoguaiwuBtn.png" && fileName != "zuoguaiwumanxueBtn.png") {
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
            tools.click(x, y)
            return true
        } else {
            if (fileName != "closeBtn.png" && fileName != "closeBtn2.png") {
                tools.悬浮球描述(fileName + '找图失败')
            }
            return false
        }
    },
    matchTemplate: (picName, max, threshold) => {
        var w = device.width;
        var h = device.height;
        let img = captureScreen();
        var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${picName}`;
        var targetImg = images.read(targetImgPath);
        var r = images.matchTemplate(img, targetImg, {
            threshold: threshold,
            max: max
        });
        utils.recycleNull(img);
        utils.recycleNull(targetImg);
        if (r && r.matches && r.matches.length > 0) {
            return {
                r: r.matches,
                count: r.matches.length
            }
        } else {
            return {
                r: null,
                count: 0
            }
        }
    },
    matchTemplateForArea: (picName, max, threshold, region) => {
        var w = device.width;
        var h = device.height;
        let img = captureScreen();
        var targetImgPath = `/sdcard/Download/res/UI/${w}_${h}/${picName}`;
        var targetImg = images.read(targetImgPath);
        var r = images.matchTemplate(img, targetImg, {
            threshold: threshold,
            region: region,
            max: max
        });
        utils.recycleNull(img);
        utils.recycleNull(targetImg);
        if (r && r.matches && r.matches.length > 0) {
            return {
                status: true,
                r: r.matches,
                count: r.matches.length
            }
        } else {
            return {
                status: false,
                r: null,
                count: 0
            }
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
    },
    click: (x, y) => {
        while (isShowConfig) {
            tools.悬浮球描述("设置启动中,禁止点击");
            sleep(100);
        }
        var p = config.zuobiao.按钮集合[fbl].金令范围;
        var p1 = config.zuobiao.按钮集合[fbl].充值范围;

        if (x >= p.x1 && x <= p.x2 && y >= p.y1 && y <= p.y2) { //避免点到金令
            tools.悬浮球临时描述("金令坐标")
            var r = tools.findImageArea("jinlingtubiao.png", p.x1, p.y1, p.x2, p.y2, 0.8);
            if (r.status) {
                return false;
            }
        }
        else if (x >= p1.x1 && x <= p1.x2 && y >= p1.y1 && y <= p1.y2) { //避免点到充值
            var r = tools.findImageArea("chongBtn.png", p.x1, p.y1, p.x2, p.y2, 0.8);
            tools.悬浮球临时描述("充值坐标")
            if (r.status) {
                return false;
            }
        }
        var 时间差 = new Date().getTime() - 上一次点拾取时间;
        if (时间差 < 360) {
            //tools.悬浮球临时描述("上次拾取(" + 时间差 + ")");
            sleep(360 - 时间差);
        }
        click(x, y);
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
        }, 100);
        toastLog("10秒内执行重启")
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
        var 挂机地图大 = "";
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
                挂机地图大 = "骷髅洞";
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
                挂机地图大 = "石墓阵";
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
                挂机地图大 = "蜈蚣洞";
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
                if (挂机地图.indexOf("牛魔") >= 0) {
                    挂机地图大 = "牛魔";
                }
                else if (挂机地图.indexOf("骨魔") >= 0) {
                    挂机地图大 = "骨魔";
                }
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
                name: "灰毒药",
                num: win.t_HuiDu.getText(),
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
            沿途打怪: win.cbYanTuDaGuai.isChecked() ? 1 : 0,
            地牢回城: win.cbIsDiLao.isChecked() ? 1 : 0,
            装备实际未满下线: win.cbShiJiWeiManXiaXian.isChecked() ? 1 : 0,
            // 一波怪物死亡拾取: win.cbIsYiBoSiWangSiQu.isChecked() ? 1 : 0,
            首次用符攻击: win.cbIsFuGongJi.isChecked() ? 1 : 0,
            只打满血怪: win.cbManXue.isChecked() ? 1 : 0,

            替换魔鬼项链: win.cbTiHuanMoGui.isChecked() ? 1 : 0,
            替换翡翠项链: win.cbTiHuanFeiChui.isChecked() ? 1 : 0,
            替换明珠: win.cbTiHuanMingZhu.isChecked() ? 1 : 0,

            替换大手镯: win.cbTiHuanDaShou.isChecked() ? 1 : 0,
            替换坚固: win.cbTiHuanJianGu.isChecked() ? 1 : 0,
            替换死神: win.cbTiHuanSiShen.isChecked() ? 1 : 0,

            替换黑色戒指: win.cbTiHuanHeiSe.isChecked() ? 1 : 0,
            替换降妖: win.cbTiHuanXiangYao.isChecked() ? 1 : 0,
            替换道德: win.cbTiHuanDaoDe.isChecked() ? 1 : 0,


            替换道头: win.cbTiHuanDaoTou.isChecked() ? 1 : 0,

            替换凌风: win.cbTiHuanZhanMa.isChecked() ? 1 : 0,
            替换凝霜: win.cbTiHuanXiuLuo.isChecked() ? 1 : 0,

            替换男盔: win.cbTiHuanNanKui.isChecked() ? 1 : 0,
            替换女盔: win.cbTiHuanNvKui.isChecked() ? 1 : 0,

            地图轮询: win.cbDiTuLunXun.isChecked() ? 1 : 0,
            强制拾取: win.cbQiangZhiShiQu.isChecked() ? 1 : 0,


            备用男重盔: win.cbBeiYongNanZhongKui.isChecked() ? 1 : 0,
            备用女重盔: win.cbBeiYongNvZhongKui.isChecked() ? 1 : 0,
            备用凌风: win.cbBeiYongZhanMa.isChecked() ? 1 : 0,
            备用凝霜: win.cbBeiYongXiuLuo.isChecked() ? 1 : 0,

            无蓝回城: win.cbIsWuLanHuiCheng.isChecked() ? 1 : 0,
            无飞回城: win.cbIsWuFeiHuiCheng.isChecked() ? 1 : 0,
            隐身走动: win.cbYinShenZouDong.isChecked() ? 1 : 0,
            寻找宝宝数: parseInt(win.t_xunzhaoshuliang.getText()),
            攻击宝宝身边: parseInt(win.t_gongjishuliang.getText()),
            反跑地图: win.cbSuiJiPaoTu.isChecked() ? 1 : 0,
            存万年: win.cbIsCunWan.isChecked() ? 1 : 0,
            持久提醒: win.cbRenzhengDuanXin.isChecked() ? 1 : 0,
            认证自动识别: win.cbRenzhengShiBie.isChecked() ? 1 : 0,
            云码认证: win.cbRenzhengYunMa.isChecked() ? 1 : 0,
            捆雪霜包: win.cbKunxueshuangBao.isChecked() ? 1 : 0,
            召唤宝宝: win.cbzhaohuanBaoBao.isChecked() ? 1 : 0,

            地图拖动: win.cbDiTuTuoDong.isChecked() ? 1 : 0,
            跟随宝宝: win.cbIsGenSuiBaoBao.isChecked() ? 1 : 0,
            挂机地图: 挂机地图,
            挂机城市: 挂机城市,
            挂机地图大: 挂机地图大,
            拾取时长: parseInt(win.t_shiQuShiChang.getText()),

            拾取延时: parseInt(win.t_shiquyanshi.getText()),
            隐身数量: parseInt(win.t_YinShen.getText()),
            跟随几格: parseInt(win.t_gensuijuli.getText()),
            组队: win.t_zudui.getText(),
            机器标识: win.t_jiqibiaoshi.getText(),
            版本号: win.t_banbenhao.getText(),
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

        //是否有组队任务 = true;
        threads.start(function () {
            tools.人物移动.使用地牢()
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


    for (let i = 0; i < win.group1_3.getChildCount(); i++) {
        // let rb = win.group1_3.getChildAt(i);
        // rb.setTextSize(10);           // 缩小文字
        // rb.setPadding(5, 0, 5, 0);    // 缩小内边距
        // rb.setMinHeight(0);           // 取消最小高度
        // rb.setIncludeFontPadding(false); // 去掉文字额外上下边距

        let rb = win.group1_3.getChildAt(i);
        rb.setTextSize(9);
        rb.setPadding(0, 10, 0, 10);
        rb.setMinHeight(0);
        rb.setIncludeFontPadding(false);

        // 整体缩小
        // rb.setScaleX(0.7);  // 宽度缩小70%
        // rb.setScaleY(0.7);  // 高度缩小70%
    }
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
    let windowX = 0;
    let windowY = window.getY();
    let 偏移量 = 0;
    if (h == 720) {
        偏移量 = 30;
        windowX = 480;
    } else {
        偏移量 = 40;
        windowX = 810;
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
    win.btnStart.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));
    win.btnSave.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));
    win.btnClose.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));
    win.btnSetFouse.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));
    win.btnReset.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));
    win.btnBuJi.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));
    win.btnExit.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));
    win.btnRenZheng.setLayoutParams(android.widget.LinearLayout.LayoutParams(100, 60));

}

//sleep(2100)
//var zhengliBtn = tools.补给操作.整理背包(true);
// while (true) {
//     var r = tools.拾取.是否精品装备();
//     tools.悬浮球临时描述(JSON.stringify(r))
//     sleep(666);
// }
//启动程序
threads.start(function () {
    var 开启寻怪 = false;
    while (true) {
        // if (是否有组队任务) {
        //     tools.常用操作.组队好友();
        // }
        if (当前总状态 == 总状态.已启动) {
            var 打怪次数 = 0; //大于0则坐标移动过，需强制跑图
            if (!是否启动初始化过) {
                tools.常用方法.启动初始化();
                tools.挂机打怪.初始化挂机();
                是否启动初始化过 = true;
            }
            if (开启强行补给) {
                开启强行补给 = false;
                toastLog("强制回城补给")
                tools.挂机打怪.回城补给在挂机("强行补给");
            }

            var 当前地图 = tools.常用操作.获取人物地图();

            tools.执行时间戳.检测认证();
            var r = false;



            while (开启寻怪) {
                try {
                    if (当前地图 == "石墓阵") {
                        r = tools.挂机打怪.石墓阵打怪();
                    }
                    else {
                        r = tools.挂机打怪.寻找打怪(打怪次数);
                    }
                } catch (e) {
                    r = false;
                    let msg = typeof e === "object" && e.stack ? e.stack + "\n" + e.toString() : e.toString()
                    toastLog("打怪异常: \n" + msg);
                }
                if (r) {
                    打怪次数++;
                    tools.悬浮球描述("继续攻击")
                    continue;
                } else {
                    break;
                }
            }

            if (挂机参数.地图轮询 == 1 && 当前地图 == 挂机参数.挂机地图) {
                if (挂机参数.挂机地图大 == "蜈蚣洞") {
                    if (挂机参数.挂机地图.indexOf("地牢一层东") >= 0) {
                        挂机参数.挂机地图 = 挂机参数.轮询切换地图;
                    }
                    else {
                        挂机参数.轮询切换地图 = 当前地图;
                        挂机参数.挂机地图 = "地牢一层东";
                    }
                }
            }

            if (new Date().getTime() - 上次跑图时间 > 跑图时间戳) {
                开启寻怪 = true;
                if (当前地图 == "石墓阵") {
                    tools.挂机打怪.石墓阵跑图();
                }
                else if ((当前地图 == 挂机参数.挂机地图 || 挂机参数.挂机地图 == "比奇野外")) {
                    try {
                        tools.挂机打怪.点击挂机坐标(打怪次数 > 0 || 是否强制跑图 ? true : false);
                    } catch (e) {
                        tools.常用方法.错误日志("挂机坐标异常", 6)
                        toastLog('挂机坐标异常' + e);
                    }
                    var 扫描宝宝 = tools.挂机打怪.扫描宝宝();
                    if (扫描宝宝.status) {
                        宝宝最后位置信息 = {
                            p: {
                                x: 扫描宝宝.r.x,
                                y: 扫描宝宝.r.y,
                            },
                            time: new Date().getTime()
                        }
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
            分钟 = ((new Date().getTime() - 启动时间) / 1000 / 60 / 60).toFixed(1);
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