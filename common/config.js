let config = {}
// 公共脚本key
config.commonScriptKey = "zijiefeiwuCommon";
// 业务脚本key
config.serviceScriptKey = "zijiefeiwuBus";
// appKey
config.appKey = "宁波字节飞舞科技"
// 分辨率 以竖屏标准看
config.screenWidth = 1080
config.screenHeight = 2400
config.youxiaoFBL = [{
    w: 1080,
    h: 1920
}, {
    w: 720,
    h: 1280
}]


config.zuobiao = {
    address: [{
        '1080_1920': { x1: 1656, x2: 1869, y1: 3, y2: 63 }
    }],
    jiaoSeBtn: { //中心坐标
        '1080_1920': { x: 1633, y: 320 },
        '720_1280': { x: 1096, y: 215 }
    },
    beiBaoBtn: [{
        '1080_1920': { x1: 1734, x2: 1767, y1: 310, y2: 335 }
    }],
    xiaoTuiBtn: [{
        '1080_1920': { x1: 1845, x2: 1875, y1: 415, y2: 435 }
    }],
    xiaoDiTu: [{
        '1080_1920': { x1: 1675, x2: 1875, y1: 80, y2: 200 }
    }],
    renWuTou: [{ //人物头（中心点）相对左边关闭按钮的距离
        '720_1280': { x: 194, y: 106 }
    }],
    renWuXiangLian: [{ //人物项链（中心点）相对左边关闭按钮的距离
        '720_1280': { x: 296, y: 101 }
    }],
    renWuWuQi: [{ //人物武器(中心点)相对左边关闭按钮的距离
        '720_1280': { x: 98, y: 123 }
    }],
    renWuShouZhuo1: [{ //人物左手镯(中心点)相对左边关闭按钮的距离
        '720_1280': { x: 84, y: 249 }
    }],
    renWuShouZhuo2: [{ //人物右手镯(中心点)相对左边关闭按钮的距离
        '720_1280': { x: 292, y: 249 }
    }],
    renWuJieZhi1: [{ //人物左戒指(中心点)相对左边关闭按钮的距离
        '720_1280': { x: 84, y: 315 }
    }],
    renWuJieZhi2: [{ //人物右戒指(中心点)相对左边关闭按钮的距离
        '720_1280': { x: 295, y: 311 }
    }],
    // 1674,78,#000000
    // 1872,84,#000000
    // 1683,206,#000000
    // 1884,206,#000000


}


// https://blog.csdn.net/wangsheng5454/article/details/117119402
// 安卓API版本  29 安卓10
config.SDK_API_VERSION = android.os.Build.VERSION.SDK_INT
module.exports = config