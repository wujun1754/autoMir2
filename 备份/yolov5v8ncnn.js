

runtime.images.initOpenCvIfNeeded();
importClass("org.opencv.imgproc.Imgproc");
importClass("org.opencv.imgcodecs.Imgcodecs");
importClass("org.opencv.core.Point");
importClass("org.opencv.core.Scalar");
let _s = {
    
    cpugpu:0,
    labels : [
    "person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light",
    "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow",
    "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee",
    "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard",
    "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich",
    "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed",
    "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave", "oven",
    "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"
    ],
    


    yolov5:function(model,target_size){
        var ncnnParam = files.cwd()+"/model/"+model+".param";
        var ncnnBin = files.cwd()+"/model/"+model+".bin";
        var dexPath = files.cwd()+"/dex/mengxin_yolov8ncnn.dex";
        var soDir = files.cwd()+"/lib/" + android.os.Build.CPU_ABI + "/";
    
        var dcl = _s.getDexClassLoader(dexPath, soDir);
        var yolo = dcl.loadClass("com.mengxin.ncnn.Yolov8Ncnn").newInstance();
        yolo.yolov5(ncnnParam, ncnnBin,target_size, _s.cpugpu);
        return yolo;
    },
    yolov8:function(model,target_size){
        var ncnnParam = files.cwd()+"/model/"+model+".param";
        var ncnnBin = files.cwd()+"/model/"+model+".bin";
        var dexPath = files.cwd()+"/dex/mengxin_yolov8ncnn.dex";
        var soDir = files.cwd()+"/lib/" + android.os.Build.CPU_ABI + "/";
    
        var dcl = _s.getDexClassLoader(dexPath, soDir);
        var yolo = dcl.loadClass("com.mengxin.ncnn.Yolov8Ncnn").newInstance();
        yolo.yolov8(ncnnParam, ncnnBin,target_size, _s.cpugpu);
        return yolo;
    },
    getDexClassLoader: function(dexPath, soDir) {
        if(this.dcl!=null){
            return this.dcl;
        }
        var dirDir = context.getDir("dex", android.app.Activity.MODE_PRIVATE).getAbsolutePath(); //  /data/user/0/org.autojs.autojspro/app_dex
        var jniDir = context.getDir("libs", android.app.Activity.MODE_PRIVATE); //  /data/user/0/org.autojs.autojspro/app_libs
        files.removeDir(jniDir);

        var newjniDir = jniDir + "/" + (new Date() - 0) + "/"; // 转时间戳
        files.createWithDirs(newjniDir); //创建文件夹

        var soList = files.listDir(soDir, function(f) { // 遍历目录的so文件 /sdcard/脚本/ncnn//lib/arm64-v8a
            return f.endsWith(".so");
        });

        for (var i = 0; i < soList.length; i++) {
            var f1 = new java.io.File(soDir, soList[i]).getAbsolutePath(); //  /sdcard/脚本/ncnn/lib/arm64-v8a/libmx.so
            var f2 = new java.io.File(newjniDir, soList[i]).getAbsolutePath(); //  /data/user/0/org.autojs.autojspro/app_libs/1695914766343/libmx.so
            files.copy(f1, f2);
        }
        var dcl = new Packages.dalvik.system.DexClassLoader(dexPath, dirDir, newjniDir, java.lang.ClassLoader.getSystemClassLoader());
        this.dcl = dcl;
        return this.dcl;
    },
    drawAndSave: function(bbox, img) {
        //var mat = Imgcodecs.imread(imgPath);
        let mat = img.mat;
        Imgproc.cvtColor(mat,mat,Imgproc.COLOR_BGR2RGB);
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
        
        Imgcodecs.imwrite("/storage/emulated/0/脚本/ncnn/yolo.jpg", mat);
    },
    //获取顶部statusBar高度
    getStatusBarHeight: function() {
        let resources = context.getResources();
        let resourceId = resources.getIdentifier("status_bar_height", "dimen", "android");
        let height = resources.getDimensionPixelSize(resourceId);
        log("dbw", "Status height:" + height);
        return height;

    },
}

module.exports = _s;


