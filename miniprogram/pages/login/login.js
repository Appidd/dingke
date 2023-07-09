// pages/login/login.js
import * as storage from '../../utils/storage.js'
import {
    deleteObj
} from "../../utils/deleteFile"
import {
    method
} from "../../utils/api.js"
import moment from "moment"
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

    },
    userLogin(){
        wx.showLoading({
          title: '登陆中...',
        })
        storage.set('token',true)
        setTimeout(res=>{
            wx.hideLoading()
            wx.showToast({
              title: '登陆成功',
            })
        },1000)
        setTimeout(res=>{
            wx.navigateBack()
        },1000)
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