// pages/userMine/userMine.js
import moment from 'moment';
import {
    method
} from "../../utils/api.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
       id:''
      },
      
     
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id=options.id
       this.setData({
           id
       })
       this. getUserInfo(id)
    },
    getUserInfo(id) {
        const that = this
        wx.showLoading()
        method.cloudApi('getUserInfo',{id}).then(res => {
            wx.hideLoading()
            const infoObj=res.result.data
            that.setData({
                ...infoObj
            })
            console.log(res)
        }).catch(err => {
            wx.hideLoading()
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    deletePerson(){
        const that = this
        wx.showLoading({
            title:'删除中'
        })
        const id=this.data.id
        method.cloudApi('deletePerson',{id}).then(res => {
            wx.hideLoading()
            wx.showToast({
              title: '删除成功',
            })
           setTimeout(e=>{
               wx.navigateBack()
           },1000)
        }).catch(err => {
            wx.hideLoading()
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if(typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: "userMine"
          })
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