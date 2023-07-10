// components/topNavigator/topNavigator.js
import {
    method
} from "../../utils/api.js"
Component({
    /**
     * 组件的属性列表
     */
    properties: {
       
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        isManager:false,
        userName:'李四'
    },
    lifetimes: {
        attached() {
            console.log(222)
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
           
                method.cloudApi('getUserInfo').then(res=>{
                    console.log(res)
                    if(res.result.data.length){
                     let infoObj=res.result.data[0]
                     that.setData({
                        userName:infoObj.userName,
                        isManager:infoObj.isManager?true:false
                     })
                    }
                    
                }).catch(err=>{
                })
            
        }
        

    },
    /**
     * 组件的方法列表
     */
    methods: {
      
    }
})