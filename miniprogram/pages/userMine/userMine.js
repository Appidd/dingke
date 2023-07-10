// pages/userMine/userMine.js
import {
    method
} from "../../utils/api.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '',
        sexList: ['男', '女'],
        userName: '',
        sex: 1,
        iphone: '',
        idCard: '',
        address: '',
        contactsName: '',
        contactsPhone: '',
        idCardGh: '',
        idCardRx: '',
        specialCertifiName: '',
        specialCertifiList: [],
        pactiveName: '',
        cactiveName: '',
    },
    toEdit() {
        if(getApp().isLogin()){
            wx.navigateTo({
                url: '../userEdit/userEdit',
            })
        }else{
            wx.navigateTo({
              url: '../login/login',
            })
        }
       
    },
    toCarInfo() {
        if(getApp().isLogin()){
            wx.navigateTo({
                url: '../carInfo/carInfo',
            })
        }else{
            wx.navigateTo({
              url: '../login/login',
            })
        }
        
    },
    ponChange(event) {
        this.setData({
            pactiveName: event.detail,
        });
    },
    conChange(event) {
        this.setData({
            cactiveName: event.detail,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    getCarInfo() {
        const that = this
        wx.showLoading()
        method.cloudApi('getCarInfo').then(res => {
            wx.hideLoading()
            if (res.result.data.length) {
                const infoObj = res.result.data[0]
               console.log(infoObj)
                that.setData({
                    ...infoObj
                })
            }
        }).catch(err => {
            wx.hideLoading()
        })
    },
    getUserInfo() {
        const that = this
        wx.showLoading()
        method.cloudApi('getUserInfo').then(res => {
            wx.hideLoading()
            if (res.result.data.length) {
                const infoObj = res.result.data[0]
                const idCardGh = res.result.data[0].idCardImg[0]
                const idCardRx = res.result.data[0].idCardImg[1]
                that.setData({
                    idCardGh,
                    idCardRx,
                    ...infoObj
                })
            }
        }).catch(err => {
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
        if(getApp().isLogin()){
            this.getUserInfo()
            this.getCarInfo()
        }
       
        if (typeof this.getTabBar === 'function' &&
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