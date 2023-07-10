// pages/manLook/manLook.js
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
    tomPeople(){
        if(getApp().isLogin()){
            wx.navigateTo({
                url: '../mPeople/mPeople',
              })
        }else{
            wx.navigateTo({
              url: '../login/login',
            })
        }
    },
    tomCar(){
        if(getApp().isLogin()){
            wx.navigateTo({
                url: '../mCar/mCar',
              })
        }else{
            wx.navigateTo({
              url: '../login/login',
            })
        }
       
    },
    toStatistic(){
        if(getApp().isLogin()){
            wx.navigateTo({
                url: '../statistic/statistic',
              })
        }else{
            wx.navigateTo({
              url: '../login/login',
            })
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
        if(typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
          this.getTabBar().setData({
            selected: "manLook"
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