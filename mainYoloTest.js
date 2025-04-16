


// if (!requestScreenCapture()) {
//     toast("请求截图失败");
//     exit();
// }


let _s = require('./yolov5v8ncnn');
_s.cpugpu = 0; //0为cpu，1为gpu
let drawFloaty = require('./drawFloaty');
drawFloaty.init({
    statusBarHeight: _s.getStatusBarHeight()
});






//  请正确选择yolo5和yolov8模型，
//  如需要自己训练模型，请先安装好yolo环境，再按教程转换并修改成ncnn格式

// 参数1：模型名称，请放在 ./model目录下
// 参数2：输入的尺寸，可根据自己需求填入，
var yolo = _s.yolov8("yolo8wugong", 640);
//可同时使用多个模型
/*
var yolo2 = _s.yolov5("yolov5s", 640); // yolov5模型
var yolo3 = _s.yolov8("yolov8n", 640); //可以调成320，越小速度越快，但越不能识别小物体
*/
//




console.show();
var p = "./res/wugong/7.png";

log(yolo.getOutputC(p));
log(yolo.getOutputD(p));
log(yolo.getOutputH(p));
log(yolo.getOutputW(p));

if (yolo.getOutputW(p) == 0) {
    log("模型错误，请检查路径或者参数");
    exit();
}

var prob_threshold = 0.3; //预测值，返回大于该值的锚框，该值越大返回的锚框数量越少
var nms_thresh = 0.9; //非极大值抑制，返回的锚框中重合面积不大于该值，该值越大返回的锚框重合率越高

var img = images.read(p);
var bbox = yolo.detect(img.mat, prob_threshold, nms_thresh);
log(bbox)
let mat = img.mat.clone();
Imgproc.cvtColor(mat, mat, Imgproc.COLOR_BGR2RGB);
for (let i = 0; i < bbox.length; i++) {
    let box = bbox[i];
    let x1 = box[0];
    let y1 = box[1];
    let x2 = box[2];
    let y2 = box[3];
    let prob = box[4];
    let label = box[5];
    Imgproc.rectangle(mat, Point(x1, y1), Point(x2, y2), Scalar(255, 255, 0));
}
let result = Imgcodecs.imwrite("/sdcard/appSync/tempRemoteScript/mir/res/yolo.jpg", mat);
if (result) {
    log("图片保存成功：yolo.jpg");
} else {
    log("图片保存失败：yolo.jpg");
}
// do {
//     i++;
//     img = captureScreen();

//     var t1 = new Date();
//     bbox = yolo.detect(img.mat, prob_threshold, nms_thresh);
//     log("预测:" + i + "次", "用时:" + (new Date() - t1), "找到:" + bbox.length);
//     /*
//     t1 = new Date();
//     bbox = yolo2.detect(img.mat, prob_threshold, nms_thresh);
//     log("预测:" + i + "次", "用时:" + (new Date() - t1), "找到:" + bbox.length);

//     t1 = new Date();
//     bbox = yolo3.detect(img.mat, prob_threshold, nms_thresh);
//     log("预测:" + i + "次", "用时:" + (new Date() - t1), "找到:" + bbox.length);
//     */


//     bboxDraw(bbox);//在屏幕上画识别框
//     //_s.drawAndSave(bbox, img);//保存图片到本地

//     //break;
// } while (true);



// 在屏幕上画出对应锚框
function bboxDraw(bbox) {
    drawFloaty.t1 = drawFloaty.t1 || new Date();
    let toDraw = [];
    for (let i2 = 0; i2 < bbox.length; i2++) {
        let box = bbox[i2];
        let x1 = box[0];
        let y1 = box[1];
        let x2 = box[2];
        let y2 = box[3];
        let prob = box[4];
        let label = box[5];
        toDraw.push({
            region: [x1, y1, x2, y2],
            color: 'red',
            text: _s.labels[label] + ' ' + sixNum(prob, 3)
        });

    }
    drawFloaty.t2 = new Date();
    drawFloaty.draw(toDraw, (drawFloaty.t2 - drawFloaty.t1));
    drawFloaty.t1 = drawFloaty.t2;
}
log("end");
//drawFloaty.destroy();
// exit();

function sixNum(num, retain) {
    var cont = Math.pow(10, retain);
    return parseInt(num * cont) / cont;
}









/*
runtime.images.initOpenCvIfNeeded();
importClass(org.opencv.core.Mat);
importClass(org.opencv.imgproc.Imgproc);
importClass(org.opencv.imgcodecs.Imgcodecs);
importClass(org.opencv.core.Point);Z
importClass(org.opencv.core.Scalar);
*/