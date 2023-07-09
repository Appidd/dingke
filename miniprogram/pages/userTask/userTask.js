// pages/userTask/userTask.js
import model from '../../utils/mock'
import moment from 'moment'
import {
    method
} from "../../utils/api.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page_number: 0,
        page_size: 20,
        from: 0,
        start_time: moment().startOf('day').valueOf(),
        task_list: [],
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    reSet(){
        this.setData({
            page_number: 0,
            page_size: 20,
            task_list: [],
            total: 0
        })
    },
    getTimestamp(e) {
        this.setData({
            start_time: e.detail,
            page_number: 0,
            page_size: 20,
            task_list: [],
            total: 0
        })
        this.getRTaskList()
    },
    getRTaskList() {
        const that = this
        let task_list = this.data.task_list
        const {
            page_number,
            page_size,
            from,
            start_time
        } = this.data
        wx.showLoading()
        method.cloudApi('getTaskList', {
            page_number,
            page_size,
            from,
            start_time
        }).then(res => {
            console.log(res)
            wx.hideLoading()
            const new_array = task_list.concat(res.result.data)
            console.log(new_array)
            that.setData({
                task_list: new_array,
                total: res.result.total
            })
        }).catch(err => {
            console.log(err)
            wx.hideLoading()
        })
    },
    getMore() {
        const page_number = this.data.page_number
        if (this.total > this.data.task_list.length) {
            this.setData({
                page_number:page_number+1
            })
            this.getRTaskList()
        }
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
        this.reSet()
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: "userTask"
            })
        }
        if (getApp().isLogin()) {

            this.getRTaskList()
        } 

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