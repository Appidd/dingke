// pages/mPeople/mPeople.js
import moment from 'moment';
import {
    method
} from "../../utils/api.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        car_list: [],
        isRefresh: false,
        keywords:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },
    onSearch(e) {
        console.log(e)
        const keywords = e.detail
        this.setData({
            keywords
        })
        this.getCarList()
    },
    refresh() {
        this.reSet()
        this.getCarList()
    },
    reSet() {
        this.setData({
            car_list: [],
            keywords:''
        })
    },

    getCarList() {
        const that = this
        const keywords = this.data.keywords
        wx.showLoading()
        method.cloudApi('getCarList', {
            keywords
        }).then(res => {
            wx.hideLoading()
            console.log(res)

            that.setData({
                isRefresh: false,
                car_list: res.result.data
            })

        }).catch(err => {
            wx.hideLoading()
        })
    },
    toCarInfo(e) {
        const id=e.currentTarget.dataset.id
      
        wx.navigateTo({
            url: '../mCarInfo/mCarInfo?id='+id,
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
        this.getCarList()
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