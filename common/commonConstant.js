// 公共设置key
let commonSettingKey = [
    { key: 'debugModel', type: "开关" },
    { key: 'debugSleep', type: "输入框" },
    { key: 'webSocketLog', type: "开关" },
    { key: '自动运行', type: "开关" },
    { key: '连续同一页面次数', type: "下拉框" },
    { key: '连续无匹配页面次数', type: "下拉框" },
    { key: "select业务", type: "下拉框" }
]

// 公共设置值域
let commonSettingRange = {
    "select业务": ["单人任务"], // 业务名称值域列表
    "连续同一页面次数": [15, 20, 25, 30, 35, 40],
    "连续无匹配页面次数": [15, 20, 25, 30, 35, 40]
}

// 坐标偏移系数
let positionOffset = {
    "1080_1920": {// 标准分辨率不偏移
        "offsetX": 0,
        "offsetY": 0
    },
    "1080_2400": {
        "offsetX": 5,
        "offsetY": 0
    }
}

// 命名规则 pageSetting_ + 业务名称
let pageSetting_单人任务 = {
    "登录页": {
        "1080_2400": {
            "relation": { "total": "or", "analysisChart": "or", "multipleColor": "or", "multipleImg": "or" },
            "analysisChart": [{ "threshold": 60, "maxVal": 255, "imgThreshold": 0.7, "colorThreshold": 26, "bigScale": 1, "smallScale": 1, "isOpenGray": 0, "isOpenThreshold": 0, "position": ["886", "233", "1078", "297"], "featuresThreshold": 0.7, "context": "WAR", "matchingType": "contains", "canvasMsg": "WAR" }],
            "multipleColor": [],
            "multipleImg": []
        }
    }
}


// 业务操作参数
let serviceOperateParam = {
    "广告页": {
        "广告关闭_找图点击": {
            "1080_2400": { "threshold": "60", "maxVal": 255, "imgThreshold": 0.7, "pathName": "./res/1080_2400/广告关闭.png", "colorThreshold": 26, "bigScale": 1, "smallScale": 1, "isOpenGray": 0, "isOpenThreshold": 0, "position": ["1586", "122", "1989", "409"], "featuresThreshold": 0.7 }
        },
        "广告关闭1_找图点击": {
            "1080_2400": { "threshold": "220", "maxVal": 255, "imgThreshold": 0.7, "colorThreshold": 26, "bigScale": 1, "smallScale": 1, "isOpenGray": 0, "isOpenThreshold": 0, "position": ["1886", "891", "2145", "1071"], "featuresThreshold": 0.7, "pathName": "./res/1080_2400/广告关闭1.png" }
        }
    }
}

// 默认逻辑关系
const relationDeafult = { "total": "or", "analysisChart": "or", "multipleColor": "or", "multipleImg": "or" }


let constant = {
    'commonSettingKey': commonSettingKey,
    'commonSettingRange': commonSettingRange,
    'positionOffset': positionOffset,
    'serviceOperateParam': serviceOperateParam,
    'relationDeafult': relationDeafult
}

let select业务 = commonSettingRange.select业务
select业务.forEach((item) => {
    let key = 'pageSetting_' + item;
    constant[key] = this[key]
})
module.exports = constant