// components/topNavigator/topNavigator.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userName: {
            type: String,
            value: '王琴'
        },
        isManage: {
            type: Boolean,
            value: false
        }
        
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    lifetimes: {
        attached() {
            const that = this
            let menuButtonInfo = wx.getMenuButtonBoundingClientRect()
            const {
                top,
                width,
                height,
                right
            } = menuButtonInfo
            wx.getSystemInfo({
                success: (res) => {
                    const {
                        statusBarHeight
                    } = res
                    const margin = top - statusBarHeight
                    let navHeight = (height + statusBarHeight + (margin * 2)) //导航栏总高
                    let searchMarginTop = statusBarHeight + margin // 状态栏 + 胶囊按钮边距
                    let searchHeight = height // 与胶囊按钮同高
                    let searchWidth = right - width // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度

                    that.setData({
                        navHeight,
                        searchMarginTop,
                        searchHeight,
                        searchWidth,
                        top
                    })
                },
            })

        }


    },
    /**
     * 组件的方法列表
     */
    methods: {
        
    }
})