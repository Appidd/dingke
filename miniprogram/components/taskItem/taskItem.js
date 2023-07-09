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
            if(getApp().isLogin()&&this.data.type===0){
                wx.navigateTo({
                    url: '../../pages/taskDetail/taskDetail?id='+this.data.taskItem._id,
                  })
            }else if(getApp().isLogin()&&this.data.type===1){
                wx.navigateTo({
                    url: '../../pages/taskReport/taskReport?id='+this.data.taskItem._id,
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
