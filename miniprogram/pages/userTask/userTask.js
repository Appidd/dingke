// pages/userTask/userTask.js
import model from '../../utils/mock'
Page({

    /**
     * 页面的初始数据
     */
    data: {
   taskList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
            selected: "userTask"
          })
        }
       this.getTaskList()
    },
   getTaskList(){
       const taskList=model.getTaskList()
       taskList.map(e=>{
           e.year='2023' //通过moment获取
           e.principals=e.principalList.join(',')

       })
       this.setData({
        taskList
       })
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