// pages/carInfo/carInfo.js
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
        carTypeNum: '',
        belongs: '',
        startDate: '',
        endDate: '',
        drivingLicenceList: [],
        insuranceList: [],

    },


    getstartDate(e) {
        console.log(e)
        this.setData({
            startDate: e.detail.value
        })

    },
    getendDate(e) {
        console.log(e)
        this.setData({
            endDate: e.detail.value
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    this.getCarInfo()
    },
    getCarInfo() {
        const that = this
        wx.showLoading()
        method.cloudApi('getUserInfo').then(res => {
            wx.hideLoading()
            if (res.result.data.length) {
                const infoObj = res.result.data[0]
               
                that.setData({
                    ...infoObj
                })
            }
        }).catch(err => {
            wx.hideLoading()
        })
    },
    saveUpdate() {
        wx.showLoading({
            title: '保存中...',
        })
        const {
            carTypeNum,
            belongs,
            startDate,
            endDate,
            drivingLicenceList,
            insuranceList,

        } = this.data
        const upDateObj = {
            carTypeNum,
            belongs,
            startDate,
            endDate,
            drivingLicenceList,
            insuranceList,
        }
        method.cloudApi('updateCar', upDateObj).then(res => {
            console.log(res)
            wx.hideLoading()
            wx.showToast({
                title: '保存成功',
            })
            setTimeout(e => {
                wx.navigateBack()
            }, 1000)
        }).catch(err => {
            console.log(err)
            wx.hideLoading()
            wx.showToast({
                title: '保存失败',
            })
        })
    },
    afterReadLicence(e) {
        const that = this
        let drivingLicenceList = this.data.drivingLicenceList
        const url = e.detail.file.tempFilePath
        wx.showLoading()
        wx.cloud.uploadFile({
            cloudPath: `licence/${moment().valueOf()}.png`,
            filePath: url,
            success: res => {
                const imgurl = res.fileID
                let imgObj = {
                    url: imgurl,
                    name: '',
                    isImage: true,
                    deletable: true,
                }
                drivingLicenceList.push(imgObj)
                that.setData({
                    drivingLicenceList
                })
                wx.hideLoading()
            }
        })

    },
    deleteDriver(e) {
        let drivingLicenceList = this.data.drivingLicenceList
        const index = e.detail.index
        drivingLicenceList.splice(index, 1)
        console.log(e)
        const fileId = e.detail.file.url
        deleteObj.deleteFile(fileId)
        this.setData({
            drivingLicenceList
        })
    },

    afterReadinsurance(e) {
        const that = this
        let insuranceList = this.data.insuranceList
        const url = e.detail.file.tempFilePath
        wx.showLoading()
        wx.cloud.uploadFile({
            cloudPath: `insurance/${moment().valueOf()}.png`,
            filePath: url,
            success: res => {
                const imgurl = res.fileID
                let imgObj = {
                    url: imgurl,
                    name: '',
                    isImage: true,
                    deletable: true,
                }
                insuranceList.push(imgObj)
                that.setData({
                    insuranceList
                })
                wx.hideLoading()
            }
        })

    },
    deleteInsurance(e) {
        let insuranceList = this.data.insuranceList
        const index = e.detail.index
        insuranceList.splice(index, 1)
        console.log(e)
        const fileId = e.detail.file.url
        deleteObj.deleteFile(fileId)
        this.setData({
            insuranceList
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