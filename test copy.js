/**
 * 运行程序之前需要开启无障碍服务权限、设备存储读写权限、获取设备信息权限(电话权限)、悬浮窗运行权限、后台弹出权限
 * 作者QQ：806073526
 */

// 等待无障碍服务开启
auto.waitFor()

if (!$floaty.checkPermission()) {
    // 没有悬浮窗权限，提示用户并跳转请求
    $floaty.requestPermission();
}

// 配置类
let config = require("./common/config.js")
// 工具类
let utils = require("./common/utils.js")
// 公共储存对象
var commonStorage = storages.create("zjh336.cn" + config.commonScriptKey);
// 业务储存对象
var serviceStorage = storages.create("zjh336.cn" + config.serviceScriptKey);

// 不同品牌申请截图权限的文字描述不一样 可在这里修改
let 截图允许点击文字 = "允许";

// 点击立即开始
threads.start(function() {
    while (true) {
        let 立即开始 = text("立即开始").findOne(1000);
        if (立即开始) {
            立即开始.click();
        }
        let 点击文字 = text(截图允许点击文字).findOne(1000);
        if (点击文字) {
            点击文字.click();
        }
    }
});
sleep(1000)


// 初始化文字识别插件
let 文字识别插件 = commonStorage.get("文字识别插件") || "谷歌"
utils.initOcr(文字识别插件)
console.log("您正在使用华仔Autoj图色脚本示例项目，通过该项目，您可以查看工具箱提供的图色api封装演示效果，以及引入utils.js方案")
console.log("建议运行程序之前先开启无障碍服务权限、设备存储读写权限、获取设备信息权限(电话权限)、悬浮窗运行权限、后台弹出权限")
console.log("作者QQ：806073526")
console.log("项目开源地址: https://gitee.com/zjh336/hz_autojs_exampale_project")


// 开启调试模式 找图、找色、识字绘制效果
commonStorage.put("debugModel", true)

// 开启调试模式 绘制延时
commonStorage.put("debugSleep", 500)

// 目标小图 图片路径
let targetImgPath = commonStorage.get("targetImgPath") || './res/小米设置图标.png'

// api示例方法

let 官方api = {};

官方api.灰度化grayscale = () => {
    let img = captureScreen();
    let afterImg = images.grayscale(img);
    utils.recycleNull(img);
    let newFilepath = "/sdcard/autoJsTools/imageHandlerAfter.png";
    files.createWithDirs("/sdcard/autoJsTools/");
    files.remove(newFilepath);
    images.save(afterImg, newFilepath);
    toastLog("图片已存入本地:" + newFilepath)
    sleep(500);
    app.viewFile(newFilepath);
    utils.recycleNull(afterImg);
    utils.textFindOneClick("仅此一次", 2000);
}

官方api.阈值化threshold = () => {
    let img = captureScreen();
    let afterImg = images.threshold(img, 60, 255);
    utils.recycleNull(img);
    let newFilepath = "/sdcard/autoJsTools/imageHandlerAfter.png";
    files.createWithDirs("/sdcard/autoJsTools/");
    files.remove(newFilepath);
    images.save(afterImg, newFilepath);
    toastLog("图片已存入本地:" + newFilepath)
    sleep(500);
    app.viewFile(newFilepath);
    utils.recycleNull(afterImg);
    utils.textFindOneClick("仅此一次", 2000);
}

官方api.裁图clip = () => {
    let img = captureScreen();
    let afterImg = images.clip(img, 460, 135, 153, 147);
    utils.recycleNull(img);
    let newFilepath = "/sdcard/autoJsTools/imageHandlerAfter.png";
    files.createWithDirs("/sdcard/autoJsTools/");
    files.remove(newFilepath);
    images.save(afterImg, newFilepath);
    toastLog("图片已存入本地:" + newFilepath)
    sleep(500);
    app.viewFile(newFilepath);
    utils.recycleNull(afterImg);
    utils.textFindOneClick("仅此一次", 2000);
}

官方api.找图findImage = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    let options = {
        threshold: 0.7
    };
    let result = images.findImage(img, targetImg, options);
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

官方api.收集特征detectAndComputeFeatures = () => {
    let img = captureScreen();
    let options = {
        scale: 1
    };
    let result = images.detectAndComputeFeatures(img, options);
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
    utils.recycleNull(result);
}

官方api.特征匹配matchFeatures = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    let options1 = {
        scale: 1
    };
    let options2 = {
        scale: 1
    };
    let bigFeatures = images.detectAndComputeFeatures(img, options1);
    let smallFeatures = images.detectAndComputeFeatures(targetImg, options2);
    let newFilepath = "/sdcard/autoJsTools/imageHandlerAfter.png";
    files.createWithDirs("/sdcard/autoJsTools/");
    files.remove(newFilepath);
    let options3 = {
        drawMatches: newFilepath,
        thredshold: 0.7
    };
    let result = images.matchFeatures(bigFeatures, smallFeatures, options3);
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    utils.recycleNull(bigFeatures);
    utils.recycleNull(smallFeatures);
    toastLog(JSON.stringify(result));
    toastLog("图片已存入本地:" + newFilepath);
    sleep(500);
    app.viewFile(newFilepath);
    utils.textFindOneClick("仅此一次", 2000);
}

官方api.多点找色findMultiColors = () => {
    let img = captureScreen();
    let options = {
        threshold: 26
    }
    // 可利用工具箱生成点色数据进行测试
    let result = images.findMultiColors(img, "#FFFFFF", [
        [19, -2, "#3253B3"],
        [53, 35, "#1A1A23"],
        [10, 73, "#071865"],
        [-26, 92, "#263680"],
        [74, 107, "#1C1C24"]
    ], options);
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
}

官方api.MLKitOCR文字识别 = () => {
    let img = captureScreen();
    let MLKitOCR = $plugins.load("org.autojs.autojspro.plugin.mlkit.ocr");
    let googleOcr = new MLKitOCR();
    let resultMlk = googleOcr.detect(img);
    let contentMlkArr = Object.values(resultMlk).map(item => item.text) || [];
    utils.recycleNull(img);
    toastLog(JSON.stringify(contentMlkArr));
}

官方api.模板匹配matchTemplate = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    let matchingResult = images.matchTemplate(img, targetImg, {
        threshold: 0.7,
        max: 5,
        transparentMask: false,
    });
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(matchingResult));
}


let 基础api = {};

基础api.getConvertCoefficient = () => {
    let result = utils.getConvertCoefficient();
    toastLog(JSON.stringify(result));
}

基础api.按照分辨率缩放小图scaleSmallImg = () => {
    let img = captureScreen();
    let smallImg = utils.scaleSmallImg(img);
    let newFilepath = "/sdcard/autoJsTools/imageHandlerAfter.png";
    files.createWithDirs("/sdcard/autoJsTools/");
    files.remove(newFilepath);
    images.save(smallImg, newFilepath);
    toastLog("图片已存入本地:" + newFilepath)
    sleep(500);
    app.viewFile(newFilepath);
    utils.recycleNull(smallImg);
    utils.recycleNull(img);
    utils.textFindOneClick("仅此一次", 2000);
}

基础api.按照分辨率转换坐标convertXY = () => {
    /**
     * 转换坐标
     * @desc 用于转换不同分辨率下的x y值
     * @param {int} x 当前x坐标
     * @param {int} y 当前y坐标
     * @param {String} location 坐标位置
     * @returns {x:int,y:int} 转换后的坐标
     */
    let result = utils.convertXY(467, 140, "");
    toastLog(JSON.stringify(result));
}

基础api.图片特征匹配detectFeaturesScale = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 图片进行特征匹配
     * @param {Image} bigImg 大图
     * @param {Image} smallImg 小图
     * @param {float} bigScale 大图缩放比例 【0.1-1】
     * @param {float} smallScale 小图缩放比例 【0.1-1】
     * @param {float} featuresThreshold 特征相似度 【0.1-1】
     * @returns 返回匹配结果
     */
    let result = utils.detectFeaturesScale(img, targetImg, 1, 1, 0.7);
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

基础api.灰度化阈值化特征匹配matchingFeatures = () => {

    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 灰度化阈值化特征匹配
     * @param {Image} bigImg 大图
     * @param {Image} smallImg 小图
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {float} bigScale  大图缩放比例 【0.1-1】
     * @param {float} smallScale 小图缩放比例 【0.1-1】
     * @param {float} featuresThreshold 特征相似度 【0.1-1】
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘制信息
     * @returns 返回中心坐标
     */
    let result = utils.matchingFeatures(img, targetImg, 60, 255, 0.7, 1, 1, 0.7, false, false, "");
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));

}

基础api.随机点击randomClick = () => {
    /**
     * 随机点击
     * @desc 随机点击方法 支持偏移随机数
     * @param {int} x x坐标值
     * @param {int} y y坐标值
     * @param {int} randomNum 随机数 0~当前随机数 
     * @param {boolean} needConvertXy 是否需要转换坐标
     */
    utils.randomClick(467, 140, 5, false);
}

基础api.灰度化阈值化图片grayscaleAndThreshold2 = () => {
    let img = captureScreen();
    /**
     * 灰度化、阈值化图片2
     * @desc 图片处理的基本方法
     * @param {Image} img 需要处理的图片对象
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @returns {Image} 处理后的图片对象 
     */
    let result = utils.grayscaleAndThreshold2(img, 60, 255, 0.7, false, false);
    let newFilepath = "/sdcard/autoJsTools/imageHandlerAfter.png";
    files.createWithDirs("/sdcard/autoJsTools/");
    files.remove(newFilepath);
    images.save(result, newFilepath);
    toastLog("图片已存入本地:" + newFilepath)
    sleep(500);
    app.viewFile(newFilepath);
    utils.recycleNull(result);
    utils.recycleNull(img);
    utils.textFindOneClick("仅此一次", 2000);
}

基础api.灰度化阈值化找图grayThresholdFindImg2 = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 灰度化、阈值化找图2
     * @desc 灰度化、阈值化后 从大图中找小图
     * @param {Image} bigImg 原始大图对象
     * @param {Image} smallImg 原始小图对象
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {int} imgThreshold 找图相似度
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @returns {Object} 返回找图结果 images.findImage的返回结果
     */
    let result = utils.grayThresholdFindImg2(img, targetImg, 60, 255, 0.7, false, false);
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

基础api.灰度化阈值化多点找色grayThresholdFindMultipleColor2 = () => {
    let img = captureScreen();
    /**
     * 灰度化、阈值化多点找色
     * @desc 基于灰度化阈值化的多点找色
     * @param {Image} bigImg 大图对象
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {string} color 目标颜色值(第一个点的颜色值)
     * @param {Array} colorOther 其他颜色数组 例如：[[35, 30, "#FFFFFF"], [-28, -2, "#000000"], [-23, 20, "#000000"]]
     * @param {int} colorThreshold 颜色相似度
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @returns {Object} 返回找色结果 images.findMultiColors的返回结果
     */
    let result = utils.grayThresholdFindMultipleColor2(img, 60, 255, "#AC6035", [
        [32, 12, "#845339"],
        [69, 36, "#634032"],
        [100, 41, "#523328"],
        [56, 89, "#D0A18B"],
        [27, 74, "#774836"],
        [27, 102, "#404639"],
        [33, 96, "#FFFFFF"],
        [66, 94, "#FFFFFF"]
    ], 26, false, false);
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
}

基础api.ocr获取文字识别内容字符串结果ocrGetContentStr = () => {
    let img = captureScreen();
    /**
     * ocr获取文字识别内容字符串结果
     * @param {*} img 
     */
    let result = utils.ocrGetContentStr(img);
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
}

基础api.ocr获取文字识别内容并绘图ocrGetResultToCanvas = () => {
    let img = captureScreen();
    /**
     * ocr获取文字识别内容结果(canvas绘画专用)
     * @param {*} img 
     * @param {Function} callback 回调函数
     */
    let result = utils.ocrGetResultToCanvas(img);
    utils.recycleNull(img);
    let newFilepath = "/sdcard/autoJsTools/imageHandlerAfter.png";
    files.createWithDirs("/sdcard/autoJsTools/");
    files.remove(newFilepath);
    images.save(result, newFilepath);
    toastLog("图片已存入本地:" + newFilepath)
    sleep(500);
    app.viewFile(newFilepath);
    utils.recycleNull(result);
    utils.recycleNull(img);
    utils.textFindOneClick("仅此一次", 2000);
}

基础api.绘制方框canvasRect = () => {
    /**
     * 绘制方框
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {*} type 消息类型 img chart color
     * @param {*} msg 消息内容
     * @returns 
     */
    utils.canvasRect(100, 100, 600, 600, "img", "绘图");
}


let 进阶api = {};

进阶api.区域找图regionalFindImg2 = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 灰度化、阈值化区域找图2  支持不开启灰度化 阈值化
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后,寻找目标图片,并返回基于大图的坐标
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {Image} targetImg 目标图对象
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {int} imgThreshold 图片相似度
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘制消息
     * @returns {x:int,y:int} 找图坐标对象
     */
    let result = utils.regionalFindImg2(img, targetImg, 28, 1013, 1053, 1596, 60, 255, 0.7, false, false, "区域找图测试代码");
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

进阶api.区域找图点击regionalClickImg2 = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 灰度化、阈值化 区域点击图片2
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后 再进行区域找图 寻找与目标图片匹配的坐标位置 再点击坐标
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {int} x1 区域坐标x1 
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {String} matchingImgPath 匹配图片路径
     * @param {String} imgThreshold 图片相似度
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {Function} successCall 成功回调
     */
    utils.regionalClickImg2(img, 28, 1013, 1053, 1596, 60, 255, tempImgPath, 0.7, false, false, () => {
        toastLog("找到图片")
    });
    utils.recycleNull(img);
}

进阶api.区域识字获取文字regionalAnalysisChart2 = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 灰度化、阈值化区域识别文字2
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后 再进行文字识别
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {int} x1 区域坐标x1 
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘制消息
     * @returns {Array} 文字识别内容
     */
    let result = utils.regionalAnalysisChart2(img, 28, 1013, 1053, 1596, 60, 255, false, false, "区域识字测试代码");
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
}

进阶api.区域识字获取坐标regionalAnalysisChartPosition2 = () => {
    let img = captureScreen();
    /**
     * 灰度化、阈值化区域识别文字获取坐标2
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后 再进行文字识别 寻找与目标内容匹配的坐标位置
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {int} x1 区域坐标x1 
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {String} matchingContent 匹配内容
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @returns {x:int,y:int} 匹配文字的坐标
     */
    let result = utils.regionalAnalysisChartPosition2(img, 28, 1013, 1053, 1596, 60, 255, "工具箱", false, false);
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
}

进阶api.区域识字点击regionalClickText2 = () => {
    let img = captureScreen();
    /**
     * 灰度化、阈值化 区域点击文字
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后 再进行文字识别 寻找与目标内容匹配的坐标位置 再点击坐标
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {int} x1 区域坐标x1 
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {String} matchingContent 匹配内容
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {Function} successCall 成功回调
     */
    utils.regionalClickText2(img, 28, 1013, 1053, 1596, 60, 255, "工具箱", false, false, () => {
        toastLog("找到文字")
    });
    utils.recycleNull(img);
}

进阶api.区域模板匹配regionalMatchTemplate2 = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 区域获取匹配图片2
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后,寻找目标图片,并返回基于大图的匹配结果,传入回调函数处理结果
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {Image} targetImg 目标图对象 
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {int} imgThreshold 图片相似度
     * @param {int} matchingCount 匹配数量
     * @param {Boolean} transparentMask 是否开启透明模板找图
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘图消息
     * @return matcingResult
     * first()取第一个匹配结果
     * last()取最后一个匹配结果
     * leftmost()取最左匹配结果
     * topmost()取最上匹配结果
     * rightmost()取最右匹配结果
     * bottommost()取最下匹配结果
     * best()取最高匹配结果
     * worst()取最低匹配结果
     * sortBy(cmp)匹配结果位置排序 指定方向 top-left 从上到下 从左到右
     */
    let result = utils.regionalMatchTemplate2(img, targetImg, 28, 1013, 1053, 1596, 60, 255, 0.7, 5, false, false, false, "区域模板匹配测试代码");
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

进阶api.区域特征匹配regionalMatchingFeatures = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 区域特征匹配
     * @param {Image} img 大图
     * @param {Image} targetImg 小图
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {float} bigScale  大图缩放比例 【0.1-1】
     * @param {float} smallScale 小图缩放比例 【0.1-1】
     * @param {float} featuresThreshold 特征相似度 【0.1-1】
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘制信息
     * @returns 
     */
    let result = utils.regionalMatchingFeatures(img, targetImg, 28, 1013, 1053, 1596, 60, 255, 1, 1, 0.7, false, false, "区域特征匹配测试代码");
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

进阶api.区域特征匹配模板regionalMatchFeaturesTemplate = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 区域特征匹配模板图片
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后,寻找目标图片,并返回基于大图的匹配结果,传入回调函数处理结果
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {Image} targetImg 目标图对象 
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {float} bigScale  大图缩放比例 【0.1-1】
     * @param {float} smallScale 小图缩放比例 【0.1-1】
     * @param {float} featuresThreshold 特征相似度 【0.1-1】
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘制信息
     * @return frameArr
     */
    let result = utils.regionalMatchFeaturesTemplate(img, targetImg, 28, 1013, 1053, 1596, 60, 255, 1, 1, 0.7, false, false, 5, "区域特征匹配测试代码");
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

进阶api.区域特征匹配点击regionalClickFeatures = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 区域特征匹配点击
     * @param {Image} img 大图
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {String} matchingImgPath 匹配图片路径
     * @param {float} bigScale  大图缩放比例 【0.1-1】
     * @param {float} smallScale 小图缩放比例 【0.1-1】
     * @param {float} featuresThreshold 特征相似度 【0.1-1】
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {*} successCall 成功回调
     */
    utils.regionalClickFeatures(img, 28, 1013, 1053, 1596, 60, 255, tempImgPath, 1, 1, 0.7, false, false, () => {
        toastLog("找到特征")
    });
    utils.recycleNull(img);
}

进阶api.区域多点找色regionalFindMultipleColor2 = () => {
    let img = captureScreen();
    /**
     * 灰度化、阈值化区域多点找色2
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后,寻找匹配的多点颜色, 并返回基于大图的坐标
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {int} x1 区域坐标x1 
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {String} color 目标颜色值(第一个点的颜色值)
     * @param {Array} colorOther 其他颜色数组 例如：[[35, 30, "#FFFFFF"], [-28, -2, "#000000"], [-23, 20, "#000000"]]
     * @param  {int} colorThreshold 颜色相似度
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘图消息
     * @returns {x:int,y:int} 找色坐标对象
     */
    let result = utils.regionalFindMultipleColor2(img, 34, 87, 1055, 375, 60, 255, "#FEFEFE", [
        [21, 0, "#3152B0"],
        [57, 13, "#0E0E37"],
        [2, 74, "#041A7C"],
        [50, 109, "#1C1C24"]
    ], 26, false, false, "区域多点找色测试代码");
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
}

进阶api.区域多点找色点击regionalClickColor2 = () => {
    let img = captureScreen();
    /**
     * 灰度化、阈值化 区域点击多点颜色
     * @desc 在大图的区域坐标范围内,进行灰度化阈值化处理后 再进行多点颜色 寻找与目标内容匹配的坐标位置 再点击坐标
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {int} x1 区域坐标x1 
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {String} color 目标颜色值(第一个点的颜色值)
     * @param {Array} colorOther 其他颜色数组 例如：[[35, 30, "#FFFFFF"], [-28, -2, "#000000"], [-23, 20, "#000000"]]
     * @param  {int} colorThreshold 颜色相似度
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {Function} successCall 成功回调
     */
    utils.regionalClickColor2(img, 34, 87, 1055, 375, 60, 255, "#FEFEFE", [
        [21, 0, "#3152B0"],
        [57, 13, "#0E0E37"],
        [2, 74, "#041A7C"],
        [50, 109, "#1C1C24"]
    ], 26, false, false, () => {
        toastLog("找到多点颜色")
    });
    utils.recycleNull(img);
}

进阶api.区域找图或者特征匹配regionalFindImgOrFeatures = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 区域找图或者特征匹配
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {Image} targetImg 目标图对象
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {int} imgThreshold 图片相似度
     * @param {float} bigScale  大图缩放比例 【0.1-1】
     * @param {float} smallScale 小图缩放比例 【0.1-1】
     * @param {float} featuresThreshold 特征相似度 【0.1-1】
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {*} canvasMsg 
     */
    let result = utils.regionalFindImgOrFeatures(img, targetImg, 28, 1013, 1053, 1596, 60, 255, 0.7, 1, 1, 0.7, false, false, "区域找图或者特征匹配测试代码");
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

进阶api.区域模板匹配或者特征匹配模板regionalMatchTemplateOrMatchFeatures = () => {
    let img = captureScreen();
    // 可自行换个能找到的小图
    let targetImg = images.read(targetImgPath);
    /**
     * 区域模板匹配或者特征匹配模板
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {Image} targetImg 目标图对象 
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {int} imgThreshold 图片相似度
     * @param {int} matchingCount 匹配数量
     * @param {Boolean} transparentMask 是否开启透明模板找图
     * @param {float} bigScale  大图缩放比例 【0.1-1】
     * @param {float} smallScale 小图缩放比例 【0.1-1】
     * @param {float} featuresThreshold 特征相似度 【0.1-1】
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     * @param {String} canvasMsg 绘制信息
     * @returns 
     */
    let result = utils.regionalMatchTemplateOrMatchFeatures(img, targetImg, 28, 1013, 1053, 1596, 60, 255, 0.7, 5, false, 1, 1, 0.7, false, false, "区域模板匹配或者特征匹配模板测试代码");
    utils.recycleNull(img);
    utils.recycleNull(targetImg);
    toastLog(JSON.stringify(result));
}

进阶api.区域灰度化阈值化找圆regionalFindCircles2 = () => {
    let img = captureScreen();
    /**
     * 区域灰度化阈值化找圆2
     * @param {Image} img 大图对象(一般为截全屏的图片对象)
     * @param {int} x1 区域坐标x1
     * @param {int} y1 区域坐标y1
     * @param {int} x2 区域坐标x2
     * @param {int} y2 区域坐标y2
     * @param {int} threshold 阈值化相似度
     * @param {int} maxVal 阈值化最大值
     * @param {boolean} isOpenGray 是否开启灰度化
     * @param {boolean} isOpenThreshold 是否开启阈值化
     */
    let result = utils.regionalFindCircles2(img, 0, 0, 1080, 2400, 60, 255, false, false);
    utils.recycleNull(img);
    toastLog(JSON.stringify(result));
}



var window = floaty.window(
    <frame>
        <button id="action" text="点我API示例演示" w="150" h="40" bg="#77ffffff"/>
    </frame>
);

function onClick() {
    let apiOptions = ["官方api", "基础api", "进阶api", "开启控制台", "设置小图路径", "退出脚本"]
    dialogs.select("请选择操作", apiOptions).then(i => {
        if (i >= 0) {

            if (i === 3) {
                threads.start(() => {
                    console.hide();
                    sleep(100);
                    console.show();
                    console.setPosition(0, 100);
                })
                return;
            } else if (i === 4) {
                threads.start(() => {
                    let tempPath = commonStorage.get("targetImgPath") || './res/小米设置图标.png';
                    dialogs.rawInput("请输入您要找图的小图路径(可设置绝对路径或者相对路径)可为空", tempPath, (inputPath) => {
                        commonStorage.put("targetImgPath", inputPath);
                        toastLog("设置完成");
                    });
                })
                return;
            } else if (i === 5) {
                window.close();
            }

            // 获取详情选项
            let apiDetailOptions = Object.keys(this[apiOptions[i]])

            dialogs.select("请选择API", apiDetailOptions).then(d => {

                if (d >= 0) {

                    threads.start(() => {
						// 请求截图权限
						try {
							images.stopScreenCapture()
							images.requestScreenCapture()
						} catch (error) {
							console.error("请求截图错误", error)
						}
						
						sleep(1500)
                        toastLog("开始执行【" + apiDetailOptions[d] + "】")

                        this[apiOptions[i]][apiDetailOptions[d]]();

                        sleep(100)
                        toastLog("【" + apiDetailOptions[d] + "】执行完成");
                    })

                }
            });
        }
    });
}


var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});


setInterval(() => {}, 1000);