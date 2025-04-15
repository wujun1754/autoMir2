

// 工具类
let utils = require("./utils.js")
let tools = {}





function getScreenDimensions() {
    let screenWidth, screenHeight;
    if (context.getResources().getConfiguration().orientation == 1) {
        // 竖屏
        screenWidth = device.width;
        screenHeight = device.height;
    } else {
        // 横屏
        screenWidth = device.height;
        screenHeight = device.width;
    }
    return { screenWidth, screenHeight };
}
module.exports = tools
