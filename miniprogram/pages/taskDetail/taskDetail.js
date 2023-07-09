// pages/taskDetail/taskDetail.js
import moment from 'moment';
import {
    method
} from "../../utils/api.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            id:options.id
        })
        this.getTaskDetail(options.id)
    },
    getTaskDetail(id) {
        const that = this
        wx.showLoading()
        method.cloudApi('getTaskDetail', {
            id
        }).then(res => {
            const taskObj = res.result.data
            taskObj.work_date = moment(taskObj.arrive_time).format('YYYY-MM-DD')
            taskObj.arrive_time = moment(taskObj.arrive_time).format('YYYY-MM-DD HH:mm')

            wx.hideLoading()

            that.setData({
                ...taskObj
            })
        }).catch(err => {
            console.log(err)
            wx.hideLoading()
        })

    },
    doneWork() {
      
            const that = this
            wx.showLoading({
                title:'确认中'
            })
            method.cloudApi('updateTask', {
                id:that.data.id,
                progress:1
            }).then(res => {
                console.log(res)
                wx.hideLoading()
                wx.showToast({
                  title: '已确认',
                })
               setTimeout(e=>{
                wx.navigateBack()
               },1000)
            }).catch(err => {
                console.log(err)
                wx.hideLoading()
            })
    
        
       
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})