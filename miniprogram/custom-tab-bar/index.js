// custom-tab-bar/index.js
import {
    method
} from "../utils/api.js"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        barIndex: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        selected: 0,
        selectedColor: "#3161ff",
        allList: [
            [{
                    "pagePath": "/pages/userTask/userTask",
                    "text": "工作任务",
                    "iconPath": "../images/tabbar/task.png",
                    "selectedIconPath": "../images/tabbar/task_active.png",
                    "selected": "userTask",
                    "onlyImg": false
                },
                {
                    "pagePath": "/pages/userSum/userSum",
                    "text": "任务汇总",
                    "iconPath": "../images/tabbar/summary.png",
                    "selectedIconPath": "../images/tabbar/summary_active.png",
                    "selected": "userSum",
                    "onlyImg": false
                },
                {
                    "pagePath": "/pages/userMine/userMine",
                    "text": "个人信息",
                    "iconPath": "../images/tabbar/mine.png",
                    "selectedIconPath": "../images/tabbar/mine_active.png",
                    "selected": "userMine",
                    "onlyImg": false
                }
            ],
            [{
                    "pagePath": "/pages/userTask/userTask",
                    "text": "工作任务",
                    "iconPath": "../images/tabbar/task.png",
                    "selectedIconPath": "../images/tabbar/task_active.png",
                    "selected": "userTask",
                    "onlyImg": false
                },
                {
                    "pagePath": "/pages/userSum/userSum",
                    "text": "任务汇总",
                    "iconPath": "../images/tabbar/summary.png",
                    "selectedIconPath": "../images/tabbar/summary_active.png",
                    "selected": "userSum",
                    "onlyImg": false
                },
                {
                    "pagePath": "/pages/manAdd/manAdd",
                    "text": "",
                    "iconPath": "../images/tabbar/add.png",
                    "selectedIconPath": "../images/tabbar/add.png",
                    "selected": "manAdd",
                    "onlyImg": true
                },
                {
                    "pagePath": "/pages/manLook/manLook",
                    "text": "信息看板",
                    "iconPath": "../images/tabbar/look.png",
                    "selectedIconPath": "../images/tabbar/look_active.png",
                    "selected": "manLook",
                    "onlyImg": false
                },
                {
                    "pagePath": "/pages/userMine/userMine",
                    "text": "个人信息",
                    "iconPath": "../images/tabbar/mine.png",
                    "selectedIconPath": "../images/tabbar/mine_active.png",
                    "selected": "userMine",
                    "onlyImg": false
                }
            ]
        ],
        selectList: []
    },
    /**
     * 生命周期方法
     */
    attached() {
        const that = this
        const timer = setInterval(() => {
            if (getApp().globalData.appReady) {
                if(getApp().globalData.isManager){
                    that.setData({
                        selectList: this.data.allList[1]
                    })
                }else{
                    that.setData({
                        selectList: this.data.allList[0]
                    })
                }
              clearInterval(timer);
            }
          }, 20);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e) {
            let path = e.currentTarget.dataset.path;
            let selected = e.currentTarget.dataset.selected
            console.log(selected)

            wx.switchTab({
                url: path,
            })
        }
    }
})