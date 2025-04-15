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


// 初始化文字识别插件(必须初始化才生效)
let 文字识别插件 = commonStorage.get("文字识别插件") || "谷歌"
utils.initOcr(文字识别插件)

// 开启调试模式 找图、找色、识字绘制效果
commonStorage.put("debugModel", true)

// 开启调试模式 绘制延时
commonStorage.put("debugSleep", 500)
try {
    images.stopScreenCapture()
    images.requestScreenCapture()
} catch (error) {
    toast("请求截图错误");
    exit();
}

let Utils = org.opencv.android.Utils;  // 引入 Utils
let Imgproc = org.opencv.imgproc.Imgproc;  // 引入 Imgproc
let SIFT = org.opencv.features2d.SIFT;
let FeatureDetector = org.opencv.features2d.FeatureDetector;
let MatOfKeyPoint = org.opencv.core.MatOfKeyPoint;
let MatOfDMatch = org.opencv.core.MatOfDMatch;
let DescriptorMatcher = org.opencv.features2d.DescriptorMatcher;
let Core = org.opencv.core.Core;
// 读取图片
let img1 = images.read("./res/UI/1080_1920/loginBegin.png");
let img2 = images.captureScreen();  // 或者加载第二张图像
if (!img1 || !img2) {
    toast("图片加载失败");
    exit();
}

let result = new org.opencv.core.Mat();
let template = img1;  // 目标图像
let image = img2;  // 大图

// 转换为 Mat
let mat1 = new org.opencv.core.Mat();
let mat2 = new org.opencv.core.Mat();
Utils.bitmapToMat(template.getBitmap(), mat1);
Utils.bitmapToMat(image.getBitmap(), mat2);

// 使用模板匹配
Imgproc.matchTemplate(mat2, mat1, result, Imgproc.TM_CCOEFF_NORMED);

// 找到最佳匹配点
let minMaxLoc = Core.minMaxLoc(result);
let bestMatchLocation = minMaxLoc.maxLoc;

// 输出最佳匹配的坐标
toastLog("最佳匹配位置: (" + bestMatchLocation.x + ", " + bestMatchLocation.y + ")");



// let Size = org.opencv.core.Size;
// toastLog(Size)
// let img = captureScreen();
// let targetImgPath = "./res/UI/1080_1920/loginBegin.png";
// let targetImg =images.read(targetImgPath);
// let options = { threshold: 0.7 };
// let result = images.findImage(img, targetImg, options);
// utils.recycleNull(img);
// utils.recycleNull(targetImg);
// toastLog(result)


// 屏幕截图 & 模板图加载
// // 获取原生Bitmap
// let bmp1 = screen.getBitmap();
// let bmp2 = template.getBitmap();
// // 使用 ImageWrapper 封装成OpenCV Mat
// let img1 = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(bmp1);
// let img2 = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(bmp2);
// toastLog(Object.getOwnPropertyNames(Object.getPrototypeOf(img1)));
// 使用SIFT匹配（假设API叫 matchTemplateBySift，部分版本中这样封装）
// let result = img1.matchTemplateBySift(img2);

// if (result && result.points) {
//     let point = result.points[0]; // 取第一个匹配点
//     toastLog("匹配成功，坐标：", point.x, point.y);
//     // click(point.x, point.y);
// } else {
//     toastLog("匹配失败！");
// }

// toastLog(JSON.stringify(result));




// let targetImgPath = "./res/UI/test1.png";
// let img = images.read(targetImgPath);
// let result = utils.grayscaleAndThreshold2(img, 60, 255, false, false);
// let newFilepath = "/sdcard/autoJsTools/cccc.png";
// files.createWithDirs("/sdcard/autoJsTools/");
// files.remove(newFilepath);
// images.save(result, newFilepath);
// toastLog("图片已存入本地:" + newFilepath)
// sleep(500);
// app.viewFile(newFilepath);
// utils.recycleNull(result);
// utils.recycleNull(img);
// utils.textFindOneClick("仅此一次", 2000);