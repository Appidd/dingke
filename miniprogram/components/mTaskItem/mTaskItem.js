// components/taskItem/taskItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        taskItem:{
            type:Object,
            value:{}
        },
        taskIndex:{
            type:Number,
            value:0
        },
        type:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        toDetail(){
            wx.navigateTo({
              url: '../../pages/taskDetail/taskDetail',
            })
        },
    }
})