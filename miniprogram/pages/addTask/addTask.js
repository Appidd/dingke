// pages/taskReport/taskReport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        synergyList:[{
            name:'张三',
            checked:false
        },
        {
            name:'李四',
            checked:false
        },
        {
            name:'王武',
            checked:false
        },
        {
            name:'张三',
            checked:false
        },
        {
            name:'李四',
            checked:false
        },
        {
            name:'王武',
            checked:false
        },
        {
            name:'张三',
            checked:false
        },
        {
            name:'李四',
            checked:false
        },
        {
            name:'王武',
            checked:true
        }
     ],
        show:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
  
    showSynergy(){
        const show=this.data.show
        this.setData({
            show:!show
        })
    },


    addTask(){
        wx.navigateBack()
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