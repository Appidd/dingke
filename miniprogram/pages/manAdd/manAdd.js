import model from '../../utils/mock'
import moment from 'moment';
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
        from: 1,
        start_time: 0,
        end_time: 0,
        task_list: [],
        total: 0,
        show: false,
        isRefresh:false,
        minDate:moment().subtract(2, 'months').valueOf()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    refresh(){
        this.reSet()
        this.getRTaskList()
    },
    reSet() {
        this.setData({
            start_time: 0,
            end_time: 0,
            page_number: 0,
            page_size: 20,
            task_list: [],
            total: 0
        })
    },
    addTask(){
        wx.navigateTo({
          url: '../addTask/addTask',
        })
    },
    showCalendar() {
        this.setData({
            show: true
        })
    },
    onClose() {
        this.setData({
            show: false,
            start_time:0,
            end_time: 0
        })
    },
    onConfirm(e) {
        const dateList = e.detail
        let start_time = moment(dateList[0]).format('YYYY-MM-DD')
        let end_time = moment(dateList[1]).format('YYYY-MM-DD')

        this.setData({
            start_time,
            end_time,
            show: false,
            page_number: 0,
            page_size: 20,
            task_list: [],
            total: 0
        })
        this.getRTaskList()
    },
    getMore() {
        const page_number = this.data.page_number
        if (this.total > this.data.task_list.length) {
            this.setData({
                page_number: page_number + 1
            })
            this.getRTaskList()
        }
    },
    getRTaskList() {
        const that = this
        let task_list = this.data.task_list
        const {
            page_number,
            page_size,
            from,
            start_time,
            end_time
        } = this.data
        const fstart_time=moment(start_time).valueOf()
        const fend_time=moment(end_time).valueOf()
        wx.showLoading()
        method.cloudApi('getAddTaskList', {
            page_number,
            page_size,
            from,
            start_time:fstart_time,
            end_time:fend_time
        }).then(res => {
            console.log(res)
            wx.hideLoading()
            const res_list=res.result.data
            res_list.forEach(e=>{
                e.arrive_time=moment(e.arrive_time).format('YYYY-MM-DD HH:mm:ss')
            })
            const new_array = task_list.concat(res_list)
            console.log(new_array)
            that.setData({
                task_list: new_array,
                total: res.result.total,
                isRefresh:false
            })
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
        this.reSet()
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: "manAdd"
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