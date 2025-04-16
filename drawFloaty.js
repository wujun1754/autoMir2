
let drawFloaty = {
    // 悬浮实例
    instacne: null,
    thread: null,
    toDraw: [],
    option: {
        statusBarHeight: 0
    },

    //获取顶部statusBar高度
    getStatusBarHeight: function () {
        let resources = context.getResources();
        let resourceId = resources.getIdentifier("status_bar_height", "dimen", "android");
        let height = resources.getDimensionPixelSize(resourceId);
        log("dbw", "Status height:" + height);
        return height;
    },

    // 初始化
    init: function (option) {
        if (!!this.instacne) return;

        if (option) {
            this.option.statusBarHeight = option.statusBarHeight || 0
        }

        let self = this;
        self.instacne = floaty.rawWindow(
            <frame>
                <canvas id="board" />
            </frame>
        );
        // console.log(self.instacne)
        ui.post(() => {
            self.instacne.setTouchable(false);
            self.instacne.setSize(-1, -1);
        });

        // 命中框画笔（绿）
        var paintGreen = new Paint();
        paintGreen.setAntiAlias(true); //抗锯齿
        paintGreen.setAlpha(255); //0~255透明度
        paintGreen.setFakeBoldText(true);
        paintGreen.setStrokeWidth(4);
        paintGreen.setStyle(Paint.Style.STROKE);
        // try {
        //     paintGreen.setColor(android.graphics.Color.pack(colors.parseColor("#00FF00")));
        // } catch (e) {
        //     paintGreen.setColor(colors.parseColor("#00FF00"));
        // };
        paintGreen.setColor(colors.parseColor("#00FF00") | 0);

        var paintGreen2 = new Paint();
        paintGreen2.setAntiAlias(true); //抗锯齿
        paintGreen2.setAlpha(150); //0~255透明度
        paintGreen2.setFakeBoldText(true);
        paintGreen2.setStrokeWidth(4);
        paintGreen2.setStyle(Paint.Style.FILL);
        // try {
        //     paintGreen2.setColor(android.graphics.Color.pack(colors.parseColor("#0000FF")));
        // } catch (e) {
        //     paintGreen2.setColor(colors.parseColor("#0000FF"));
        // };
        paintGreen2.setColor(colors.parseColor("#0000FF") | 0);

        // 未命中框画笔（红）
        var paintRed = new Paint();
        paintRed.setAntiAlias(true); //抗锯齿
        paintRed.setAlpha(255); //0~255透明度
        paintRed.setFakeBoldText(true);
        paintRed.setStrokeWidth(4);
        paintRed.setStyle(Paint.Style.STROKE);
        // try {
        //     paintRed.setColor(android.graphics.Color.pack(colors.parseColor("#FF3030")));
        // } catch (e) {
        //     paintRed.setColor(colors.parseColor("#FF3030"));
        // };
        paintRed.setColor(colors.parseColor("#FF3030") | 0);

        var paintRed2 = new Paint();
        paintRed2.setAntiAlias(true); //抗锯齿
        paintRed2.setAlpha(150); //0~255透明度
        paintRed2.setFakeBoldText(true);
        paintRed2.setStrokeWidth(4);
        paintRed2.setStyle(Paint.Style.FILL);
        // try {
        //     paintRed2.setColor(android.graphics.Color.pack(colors.parseColor("#FF3030")));
        // } catch (e) {
        //     paintRed2.setColor(colors.parseColor("#FF3030") | 0);
        // };
        paintRed2.setColor(colors.parseColor("#FF3030") | 0);

        // 点击区域画笔（橙）
        var paintOrange = new Paint();
        paintOrange.setAntiAlias(true); //抗锯齿
        paintOrange.setAlpha(255); //0~255透明度
        paintOrange.setFakeBoldText(true);
        paintOrange.setStrokeWidth(4);
        paintOrange.setStyle(Paint.Style.STROKE);
        // try {
        //     paintOrange.setColor(android.graphics.Color.pack(colors.parseColor("#963200")));
        // } catch (e) {
        //     paintOrange.setColor(colors.parseColor("#963200"));
        // };
        paintOrange.setColor(colors.parseColor("#963200") | 0);

        var paintOrange2 = new Paint();
        paintOrange2.setAntiAlias(true); //抗锯齿
        paintOrange2.setAlpha(255); //0~255透明度
        paintOrange2.setFakeBoldText(true);
        paintOrange2.setStrokeWidth(4);
        paintOrange2.setStyle(Paint.Style.STROKE);
        // try {
        //     paintOrange2.setColor(android.graphics.Color.pack(colors.parseColor("#963200")));
        // } catch (e) {
        //     paintOrange2.setColor(colors.parseColor("#963200"));
        // };
       // paintOrange2.setColor(colors.parseColor("#963200") | 0);

        var textPaint = new Paint();
        textPaint.setTextSize(36);
        // try {
        //     textPaint.setColor(android.graphics.Color.pack(colors.parseColor("#FFFFFF")));
        // } catch (e) {
        //     textPaint.setColor(colors.parseColor("#FFFFFF"));
        // };
        textPaint.setColor(colors.parseColor("#FFFFFF") | 0);

        self.instacne.board.on("draw", function (canvas) {
            canvas.drawColor(0, android.graphics.PorterDuff.Mode.CLEAR);
            let toDraw = self.toDraw || [];
            // if (toDraw.length) {
            //     console.log(`准备绘制：${JSON.stringify(toDraw)}`);
            // }
            let toMove = 0;
            let now = new Date().getTime();
            for (let item of toDraw) {
                if (item) {
                    if (now >= item.et) {
                        toMove++
                        continue;
                    }
                    let color = item.color;
                    let region = item.region;
                    let paint = null;
                    let paint2 = null;
                    switch (color) {
                        case 'green':
                            paint = paintGreen;
                            paint2 = paintGreen2;
                            break;
                        case 'red':
                            paint = paintRed;
                            paint2 = paintRed2;
                            break;
                        case 'orange':
                            paint = paintOrange;
                            paint2 = paintOrange2;
                            break;
                    }
                    if (!paint) return;
                    // console.log(`绘制：${JSON.stringify(item)}`);
                    canvas.drawRect.apply(canvas, region.concat(paint));
                    if (item.text) {
                        canvas.drawRect.apply(canvas, [region[0] - 2, region[1] - 60, region[0] + (item.text.length * 20), region[1] - 2, paint2]);
                        canvas.drawText(item.text, region[0], region[1] - 20, textPaint);
                    }
                }
            };
            self.toDraw.splice(0, toMove)
        });
        this.thread = threads.start(function () {
            //设置一个空的定时来保持线程的运行状态
            setInterval(function () { }, 1000);
        });
    },

    /**
     * 绘制数组
     * @param {*} arr 
     * @param {*} time 
     */
    draw: function (arr, time) {
        arr.forEach(i => {
            i.region[1] = i.region[1] - this.option.statusBarHeight;
            i.region[3] = i.region[3] - this.option.statusBarHeight;
            i.et = new Date().getTime() + time;
        });
        this.toDraw = this.toDraw.concat(arr);
    },

    // 销毁
    destroy: function () {
        if (this.instacne) {
            drawFloaty.draw([{ region: [0, 0, 0, 0], color: 'green', text: 'Auto.js' }], 0);
            this.instacne.close();
            this.instacne = null;
        }
        if (this.thread) {
            this.thread.interrupt();
            this.thread = null;
        }
    }
}
module.exports = drawFloaty;