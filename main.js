/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Date: 2021-04-18 04:22:04
 * @Version: Auto.Js Pro
 * @Description: 
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-17 20:23:07
 */

'ui';
var w = 0;
var h = 0;
let tabCount = 3;
var padding_left = 0;
var padding_top = 0
let tabW = 0;
var btnW = 100;
var win = null;
function showWinConfig() {
    if (context.getResources().getConfiguration().orientation == 1) {
        w = parseInt(device.width * 0.96);
        h = parseInt(device.height * 0.9);
        padding_left = parseInt((device.width - w) / 2)
        padding_top = parseInt((device.height - h) / 2);
    }
    else {
        w = parseInt(device.height * 0.96);
        h = parseInt(device.width * 0.9);
        padding_left = parseInt((device.height - w) / 2)
        padding_top = parseInt((device.width - h) / 2);
    }
    tabW = parseInt((w / tabCount));
    // toast(context.getResources().getConfiguration().orientation)
    toast(tabW)
    win = floaty.rawWindow(
        <frame id="configFrame" gravity="center">

            <vertical w="{{w}}" h="{{h}}" bg="#55eeeeee">
                <horizontal id="tabs" w="*" bg="#eeeeee">
                    <vertical id="tab1" gravity="center">
                        <text id="text1" text="选地图" textSize="14sp" textColor="#000000" paddingBottom="5" gravity="center" />
                        <View id="line1" h="2" bg="#ff0000" visibility="visible" />
                    </vertical>
                    <vertical id="tab2" gravity="center">
                        <text id="text2" text="配补给" textSize="14sp" textColor="#888888" paddingBottom="5" gravity="center" />
                        <View id="line2" h="2" bg="#ff0000" visibility="gone" />

                    </vertical>
                    <vertical id="tab3" gravity="center">
                        <text id="text3" text="配卖修" textSize="14sp" textColor="#888888" paddingBottom="5" gravity="center" />
                        <View id="line3" h="2" bg="#ff0000" visibility="gone" />
                    </vertical>
                </horizontal>
                <vertical id="content" bg="#eeeeee">
                    <vertical id="view1" visibility="visible" gravity="center">
                        <horizontal>
                            <text textSize="16sp">比奇挂机</text>
                            <spinner id="sp1" entries="古墓一层|古墓二层|古墓三层" />
                        </horizontal>
                        <horizontal>
                            <text textSize="16sp">盟重挂机</text>
                            <spinner id="sp2" entries="石墓一层|石墓二层|石墓三层" />
                        </horizontal>
                        {/* <text text="这是view1" textColor="#000000" textSize="18sp" /> */}
                    </vertical>
                    <vertical id="view2" visibility="gone" gravity="center">
                        <text text="这是view2" textColor="#000000" textSize="18sp" />
                    </vertical>
                    <vertical id="view3" visibility="gone" gravity="center">
                        <text text="这是view3" textColor="#000000" textSize="18sp" />
                    </vertical>
                </vertical>
                <vertical w="*">
                    <button id="btnClose" text="保存配置" w="*" />
                </vertical>
            </vertical>

        </frame>
    );
    win.setSize(w, h);
    win.setPosition(padding_left, padding_top);
    win.setTouchable(true);    // 可交互
    win.tab1.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab2.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.tab3.setLayoutParams(android.widget.LinearLayout.LayoutParams(tabW, -2));
    win.btnClose.setLayoutParams(android.widget.LinearLayout.LayoutParams(w, -2));
    function switchTab(index) {
        for (let i = 1; i <= 3; i++) {
            let isActive = i === index;
            win["text" + i].setTextColor(colors.parseColor(isActive ? "#000000" : "#888888"));
            win["line" + i].setVisibility(isActive ? 0 : 8); // 0:VISIBLE, 8:GONE
            win["view" + i].setVisibility(isActive ? 0 : 8);
        }
    }
    // 监听点击
    win.tab1.setOnClickListener(() => switchTab(1));
    win.tab2.setOnClickListener(() => switchTab(2));
    win.tab3.setOnClickListener(() => switchTab(3));
    // win.tab1.click(() => {
    //     win.view1.visibility = 0; // visible
    //     win.view2.visibility = 8; // gone
    //     win.view3.visibility = 8; // gone
    // });
    // win.tab2.click(() => {
    //     win.view1.visibility = 8;
    //     win.view2.visibility = 0;
    //     win.view3.visibility = 8;
    // });
    // win.tab3.click(() => {
    //     win.view1.visibility = 8;
    //     win.view2.visibility = 8;
    //     win.view3.visibility = 0;
    // });
    // win.page1.click(() => {

    // });

    // win.page2.click(() => {
    //     win.view1.visibility = 8;
    //     win.view2.visibility = 0;
    //     win.view3.visibility = 8;
    // });

    // win.page3.click(() => {
    //     win.view1.visibility = 8;
    //     win.view2.visibility = 8;
    //     win.view3.visibility = 0;
    // });
    win.btnClose.click(() => {
        hideWindow()
    })
}

// 隐藏窗口（通过关闭）
function hideWindow() {
    win.close();
}

// ui.statusBarColor(colors.parseColor('#426e6d'));
// ui.layout(
//     <relative w='*' h='*' bg='#426e6d'>
//         <vertical w='*'>
//             <toolbar title='字节飞舞科技' >

//                 <button id='btn' w='auto' text='启 动' textColor='#FFFFFF' textStyle='bold' backgroundTint='#41A4F5'
//                     marginRight='20' padding='15 0' layout_gravity='right' />
//             </toolbar>
//             <vertical padding='20 5'>

//             </vertical>
//         </vertical>
//     </relative>
// );
// ui.isShow.on('check', checked => {
//     ui.isShow.setText('悬浮按钮 : ' + (checked ? '开启' : '关闭'));
//     checked ? fb.show() : fb.hide();
//     ui.menu.setEnabled(checked);
// });

// ui.menu.on('check', checked => {
//     ui.seekbar.setEnabled(!checked);
//     fb.setMenuOpen(checked); //改变菜单状态
// });

// ui.seekbar.setOnSeekBarChangeListener({
//     onProgressChanged: function(seekBar, progress) {
//         ui.time.setText('定时关闭 : ' + progress + '秒');
//         fb.setAutoCloseMenuTime(progress * 1000);
//     }
// });
//按钮联动
// ui.btn.on('click', view => {
//     //获取指定按钮的值
//     // let mUtil = fb.getViewUtil('Btns_1');
//     // let value = !mUtil.getChecked();
//     // mUtil.setChecked(value);
//     // view.setText(value ? '停 止' : '启 动');
//     // view.attr('backgroundTint', value ? '#ED524E' : '#41A4F5');
//     fb.show()


//     var Intent = android.content.Intent;
//     var intent = new Intent(Intent.ACTION_MAIN);
//     intent.addCategory(Intent.CATEGORY_HOME);
//     intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//     context.startActivity(intent);
//     //app.startActivity("home");
// });

/**
 * Auto Js 悬浮球
 */

//导入FloatButton模块
var {
    FloatButton,
    FloatButtonConfig
} = require('./FloatButton/init');
let fb = new FloatButton();

//修改停靠动画时间
FloatButtonConfig.time.direction = 510;

/**
 * 悬浮球创建事件
 */
fb.on('create', function () {
    //设置logo图标
    fb.setIcon('@drawable/ic_android_black_48dp');
    //设置logo图标着色
    fb.setTint('#828282');
    //设置logo背景颜色
    fb.setColor('#00000000');//8个0表示透明
    fb.setMenuRadius(45);//设置菜单半径
    //设置所有按钮大小 默认40
    fb.setAllButtonSize(25);
    //设置所有按钮内边距 默认8
    fb.setAllButtonPadding(0);

    //添加菜单按钮
    // fb.addItem('按钮1')
    //     //设置图标
    //     .setIcon('https://pic.lemeifenqi.com/222.jpg')
    //     .setColor('#00000000')
    //     // .setIcon('@drawable/ic_looks_one_black_48dp')
    //     // .setText('启动')
    //     //图标着色
    //     // .setTint('#FFFFFF')
    //     // //背景颜色
    //     // .setColor('#019581')
    //     //点击事件
    //     .onClick((view, name) => {
    //         toastLog('onClick:' + name)
    //         let path = files.path('@drawable/ic_looks_one_black_48dp');

    //         toast('图标路径: ' + path);
    //         //返回 true:保持菜单开启 false:关闭菜单
    //         return false;
    //     });

    fb.addItem('Btns_1')
        //启用复选框属性
        .toCheckbox(mUtil => {
            //未选中样式
            mUtil.icon1('@drawable/ic_play_arrow_black_48dp').tint1('#FFFFFF').color1('#41A4F5');
            //选中样式
            mUtil.icon2('@drawable/ic_stop_black_48dp').tint2('#FFFFFF').color2('#ED524E');
        })
        .onClick((view, name, state) => {
            toastLog('名称 : ' + name + '\n状态 : ' + state);
            if (state) {
                fb.setTint('#4BFF4C');
                toast('开启辅助');
                return false;
            }
            else {
                toast('暂停辅助');
                fb.setTint('#828282');
                return true;
            }
            // ui.btn.setText(state ? '停 止' : '启 动');
            // ui.btn.attr('backgroundTint', state ? '#ED524E' : '#41A4F5');
            //返回 true:保持菜单开启 false:关闭菜单

        });
    //设置按钮属性为选中
    // fb.getViewUtil('按钮2').setChecked(true);
    //获取按钮选中状态
    // log('按钮2选中状态:', fb.getViewUtil('按钮2').getChecked());

    fb.addItem('Btns_2')
        .setIcon('@drawable/ic_settings_black_48dp')
        .setTint('#858585')
        .setColor('#FFFFFF')
        .onClick((view, name, state) => {
            //获取指定按钮的值
            let mUtil = fb.getViewUtil('Btns_1');
            let state = mUtil.getChecked();
            if (state) {
                toast('请先暂停');
                return true;
            }
            else {
                showWinConfig()
                // win.setPosition(padding_left, padding_top);
                // win.setVisibility(View.VISIBLE); // 显示窗口Z
                //mToast.show();
                // mToast.show();
                // app.startActivity({
                //     action: "android.intent.action.MAIN",
                //     category: "android.intent.category.DEFAULT",
                //     packageName: context.getPackageName(),
                // });
                // app.startActivity({
                //     packageName: context.getPackageName(),
                //     className: "org.autojs.autojs.external.open.RunIntentActivity"
                // });
                // fb.hide()
                return false
            }
            // mUtil.setChecked(value);
            // view.setText(value ? '停 止' : '启 动');
            // view.attr('backgroundTint', value ? '#ED524E' : '#41A4F5');

            // ui.btn.setText(state ? '停 止' : '启 动');
            // ui.btn.attr('backgroundTint', state ? '#ED524E' : '#41A4F5');
            //返回 true:保持菜单开启 false:关闭菜单

        });


    fb.addItem('按钮4')
        .setIcon('@drawable/ic_person_outline_black_48dp')
        .setTint('#FFFFFF')
        .setColor('#FCD633');

    fb.addItem('按钮5')
        .setIcon('@drawable/ic_notifications_active_black_48dp')
        .setTint('#FFFFFF')
        .setColor('#BFBFBF');

    //在无操作一段时间后自动关闭菜单
    fb.setAutoCloseMenuTime(0);
});

//菜单按钮点击事件
fb.on('item_click', (view, name, state) => {
    //如果在addItem中添加了onClick事件 则不会在这里触发
    toastLog('item_click:' + name);
    //返回 true:保持菜单开启 false:关闭菜单
    return false;
});

//UI联动
//菜单状态改变事件
// fb.on('menu_state_changed', value => {
//     ui.menu.setText('菜单状态 : ' + (value ? '开启' : '关闭'));
//     ui.menu.setChecked(value);
// });

//停靠方向改变事件
fb.on('direction_changed', value => {
    toast(value ? '右侧' : '左侧')
    //ui.direction.setText('停靠方向 : ' + (value ? '右侧' : '左侧'));
});

//屏幕方向改变事件
fb.on('orientation_changed', value => {
    toast(value ? '右侧' : '左侧')
});

//按钮显示事件
fb.on('show', () => {
    //log('悬浮窗显示');
});

//按钮隐藏事件
fb.on('hide', () => {
    // log('悬浮窗隐藏');
});


fb.show();
var Intent = android.content.Intent;
var intent = new Intent(Intent.ACTION_MAIN);
intent.addCategory(Intent.CATEGORY_HOME);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
context.startActivity(intent);