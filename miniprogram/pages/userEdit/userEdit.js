// pages/userEdit/userEdit.js
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
        specialCertifiList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserInfo()
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
    saveUpdate() {
        wx.showLoading({
            title: '保存中...',
        })
        const {
            userName,
            sex,
            iphone,
            idCard,
            address,
            contactsName,
            contactsPhone,
            idCardGh,
            idCardRx,
            specialCertifiName,
            specialCertifiList,
            avatarUrl
        } = this.data
        const upDateObj = {
            userName,
            sex,
            iphone,
            idCard,
            address,
            contactsName,
            contactsPhone,
            idCardImg: [idCardGh, idCardRx],
            specialCertifiName,
            specialCertifiList,
            avatarUrl
        }
        method.cloudApi('updateUser', upDateObj).then(res => {
            wx.hideLoading()
            wx.showToast({
                title: '保存成功',
            })
            setTimeout(e => {
                wx.navigateBack()
            }, 1000)
        }).catch(err => {
            wx.hideLoading()
            wx.showToast({
                title: '保存失败',
            })
        })
    },
    deleteSpecial(e) {
        let specialCertifiList = this.data.specialCertifiList
        const index = e.detail.index
        specialCertifiList.splice(index, 1)
        console.log(e)
        const fileId = e.detail.file.url
        deleteObj.deleteFile(fileId)
        this.setData({
            specialCertifiList
        })
    },
    afterRead(e) {
        const that = this
        let specialCertifiList = this.data.specialCertifiList
        const url = e.detail.file.tempFilePath
        wx.showLoading()
        wx.cloud.uploadFile({
            cloudPath: `special/${moment().valueOf()}.png`,
            filePath: url,
            success: res => {
                const imgurl = res.fileID
                let imgObj = {
                    url: imgurl,
                    name: '图片2',
                    isImage: true,
                    deletable: true,
                }
                specialCertifiList.push(imgObj)
                that.setData({
                    specialCertifiList
                })
                wx.hideLoading()
            }
        })

    },
    deleteIdCardGh(e) {
        const fileId = e.currentTarget.dataset.fileid
        deleteObj.deleteFile(fileId)
        this.setData({
            idCardGh: ''
        })
    },
    deleteIdCardRx(e) {
        const fileId = e.currentTarget.dataset.fileid
        deleteObj.deleteFile(fileId)
        this.setData({
            idCardRx: ''
        })
    },
    confirmSex(e) {
        const value = parseInt(e.detail.value)
        this.setData({
            sex: value ? 0 : 1
        })
    },
    //选择头像
    onChooseAvatar(e) {
        const that = this
        wx.showLoading()
        const avatarUrl = e.detail.avatarUrl
        wx.cloud.uploadFile({
            cloudPath: `avatar/${moment().valueOf()}.png`,
            filePath: avatarUrl,
            success: res => {
                const imgurl = res.fileID
                that.setData({
                    avatarUrl: imgurl
                })
                wx.hideLoading()
            },
            fail: err => {
                wx.hideLoading()
            }
        })

    },
    //选择国徽面
    chooseIdCardGh() {
        wx.showLoading()
        const that = this
        wx.chooseImage({
            count: 1,
            success: e => {
                const tempUrl = e.tempFilePaths[0]
                wx.cloud.uploadFile({
                    cloudPath: `idCard/${moment().valueOf()}.png`,
                    filePath: tempUrl,
                    success: res => {
                        const imgurl = res.fileID
                        that.setData({
                            idCardGh: imgurl
                        })
                        wx.hideLoading()
                    }
                })

            },
            fail: err => {
                wx.hideLoading()
            }

        })
    },
    chooseIdCardRx() {
        wx.showLoading()
        const that = this
        wx.chooseImage({
            count: 1,
            success: e => {
                const tempUrl = e.tempFilePaths[0]
                wx.cloud.uploadFile({
                    cloudPath: `idCard/${moment().valueOf()}.png`,
                    filePath: tempUrl,
                    success: res => {
                        const imgurl = res.fileID
                        that.setData({
                            idCardRx: imgurl
                        })
                        wx.hideLoading()
                    }
                })

            },
            fail: err => {
                wx.hideLoading()
            }
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