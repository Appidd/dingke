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
            if(getApp().isLogin()){

                wx.navigateTo({
                    url: '../../pages/addTask/addTask?id='+this.data.taskItem._id,
                  })
            }
            else{
                wx.navigateTo({
                  url: '../../pages/login/login',
                })
            }
        },
    }
})
