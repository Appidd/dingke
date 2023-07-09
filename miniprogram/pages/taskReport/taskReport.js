// pages/taskReport/taskReport.js
import moment from 'moment';
import {
    deleteObj
} from "../../utils/deleteFile";
import {
    method
} from "../../utils/api.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        project_name: '',
        project_number: '',
        work_location: '',
        project_content: '', //工作内容
        project_error: '', //异常汇报
        overtime_rule: '', //加班时间常规
        overtime_dianke: '', //加班时间电科
        contact_person: '',
        project_manager: {
            name: '',
            openid: ''
        },
        synergy_list_checked: [],

        project_vehicle: {
            belongs: '',
            carTypeNum: ''
        },
        project_driver: {},
        user_list: [],
        vehicle_list: [],
        user_list_string: '',

        show: false,
        arrive_date: '',
        arrive_time: '',
        remark: '',
        transportFeeList: [{
            id: moment().valueOf(),
            type: 'carfare',
            fee: '',
            detail: ''
        }], //交通费
        eateryFeelist: [{
            id: moment().valueOf(),
            type: 'eatery',
            fee: '',
            detail: ''
        }], //餐饮费用

        accommodationFeeList: [{
            id: moment().valueOf(),
            type: 'accommodation',
            fee: '',
            detail: ''
        }], //住宿费
        mechanicalFeeList: [{
            id: moment().valueOf(),
            type: 'mechanical',
            fee: '',
            detail: ''
        }], //机械台班费
        otherFeeList: [{
            id: moment().valueOf(),
            type: 'other',
            fee: '',
            detail: ''
        }], //其他费用
        reimburseList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            id: options.id
        })
        this.getTaskDetail(options.id)
        this.getUserList()
        this.getVehicleList()
    },
    // 点击按钮，增加输入框

    onAddInput(e) {
        const type = e.currentTarget.dataset.type
        const transportFeeList = this.data.transportFeeList
        const eateryFeelist = this.data.eateryFeelist

        const accommodationFeeList = this.data.accommodationFeeList
        const mechanicalFeeList = this.data.mechanicalFeeList
        const otherFeeList = this.data.otherFeeList

        switch (type) {
            case 'carfare':
                transportFeeList.push({
                    id: moment().valueOf(),
                    type: type,
                    fee: '',
                    detail: ''
                });
                console.log(transportFeeList)
                break;
            case 'eatery':
                eateryFeelist.push({
                    id: moment().valueOf(),
                    type: type,
                    fee: '',
                    detail: ''
                });
                break;
            case 'accommodation':
                accommodationFeeList.push({
                    id: moment().valueOf(),
                    type: type,
                    fee: '',
                    detail: ''
                });
                break;
            case 'mechanical':
                mechanicalFeeList.push({
                    id: moment().valueOf(),
                    type: type,
                    fee: '',
                    detail: ''
                });
                break;
            case 'other':
                otherFeeList.push({
                    id: moment().valueOf(),
                    type: type,
                    fee: '',
                    detail: ''
                });
                break;
        }
        this.setData({
            transportFeeList,
            eateryFeelist,
            accommodationFeeList,
            mechanicalFeeList,
            otherFeeList
        });

    },

    // 输入框内容变化时的事件处理函数

    onInputFee(e) {
        console.log(e)

        const id = e.currentTarget.dataset.item.id;
        const type = e.currentTarget.dataset.item.type
        const value = e.detail.value;
        const transportFeeList = this.data.transportFeeList;
        const eateryFeelist = this.data.eateryFeelist;
        const accommodationFeeList = this.data.accommodationFeeList
        const mechanicalFeeList = this.data.mechanicalFeeList
        const otherFeeList = this.data.otherFeeList
        switch (type) {
            case 'carfare':
                transportFeeList.forEach(e => {

                    if (e.id == id) {

                        e.fee = value
                    }
                })
                break;
            case 'eatery':
                eateryFeelist.forEach(e => {
                    if (e.id == id) {
                        e.fee = value
                    }
                })
                break;
            case 'accommodation':
                accommodationFeeList.forEach(e => {
                    if (e.id == id) {
                        e.fee = value
                    }
                })
                break;
            case 'mechanical':
                mechanicalFeeList.forEach(e => {
                    if (e.id == id) {
                        e.fee = value
                    }
                })
                break;
            case 'other':
                otherFeeList.forEach(e => {
                    console.log(e)
                    if (e.id == id) {
                        e.fee = value
                    }
                })
                break;

        }


        this.setData({
            transportFeeList,
            eateryFeelist,
            accommodationFeeList,
            mechanicalFeeList,
            otherFeeList
        });
    },
    onInputDetail(e) {
        console.log(e)
        const id = e.currentTarget.dataset.item.id;
        const type = e.currentTarget.dataset.item.type
        const value = e.detail.value;
        const transportFeeList = this.data.transportFeeList;
        const eateryFeelist = this.data.eateryFeelist;
        const accommodationFeeList = this.data.accommodationFeeList
        const mechanicalFeeList = this.data.mechanicalFeeList
        const otherFeeList = this.data.otherFeeList
        switch (type) {
            case 'carfare':
                transportFeeList.forEach(e => {
                    if (e.id == id) {
                        e.detail = value
                    }
                })
                break;
            case 'eatery':
                eateryFeelist.forEach(e => {
                    if (e.id == id) {
                        e.detail = value
                    }
                })
                break;
            case 'accommodation':
                accommodationFeeList.forEach(e => {
                    if (e.id == id) {
                        e.detail = value
                    }
                })
                break;
            case 'mechanical':
                mechanicalFeeList.forEach(e => {
                    if (e.id == id) {
                        e.detail = value
                    }
                })
                break;
            case 'other':
                otherFeeList.forEach(e => {
                    if (e.id == id) {
                        e.detail = value
                    }
                })
                break;
        }


        this.setData({
            transportFeeList,
            eateryFeelist,
            accommodationFeeList,
            mechanicalFeeList,
            otherFeeList
        });
    },

    // 点击删除按钮，删除对应的输入框

    onDeleteInput(e) {
        const type = e.currentTarget.dataset.type
        const transportFeeList = this.data.transportFeeList
        const eateryFeelist = this.data.eateryFeelist
        const accommodationFeeList = this.data.accommodationFeeList
        const mechanicalFeeList = this.data.mechanicalFeeList
        const otherFeeList = this.data.otherFeeList
        switch (type) {
            case 'carfare':
                transportFeeList.splice(-1, 1);
                break;
            case 'eatery':
                eateryFeelist.splice(-1, 1);
                break;
            case 'accommodation':
                accommodationFeeList.splice(-1, 1);
                break;
            case 'mechanical':
                mechanicalFeeList.splice(-1, 1);
                break;
            case 'other':
                otherFeeList.splice(-1, 1);
                break;
        }
        this.setData({
            transportFeeList,
            eateryFeelist,
            accommodationFeeList,
            mechanicalFeeList,
            otherFeeList
        });
    },
    getProjectManager(e) {
        const user_list = this.data.user_list
        const index = parseInt(e.detail.value)
        this.setData({
            project_manager: user_list[index]
        })

    },
    getProjectDriver(e) {
        const user_list = this.data.user_list
        const index = parseInt(e.detail.value)
        this.setData({
            project_driver: user_list[index]
        })
    },
    getProjectVehicle(e) {
        const vehicle_list = this.data.vehicle_list
        const index = parseInt(e.detail.value)
        this.setData({
            project_vehicle: vehicle_list[index]
        })
    },
    checkSynergies(e) {
        const item = e.currentTarget.dataset.item
        let user_list = this.data.user_list
        user_list.forEach(e => {
            if (e.openid == item.openid) {
                e.checked = !e.checked
            }
        })
        this.setData({
            user_list
        })
        let synergy_list_checked = user_list.filter(e => {
            return e.checked == true
        })
        let checked_list = synergy_list_checked.map(e => {
            return e.name
        })
        console.log(checked_list)
        this.setData({
            synergy_list_checked: checked_list,
            user_list_string: checked_list.join('、')
        })

    },
    getTaskDetail(id) {
        const that = this
        wx.showLoading()
        method.cloudApi('getTaskDetail', {
            id
        }).then(res => {
            console.log(res)
            const taskObj = res.result.data
            taskObj.work_date = moment(taskObj.arrive_time).format('YYYY-MM-DD')
            taskObj.arrive_time = moment(taskObj.arrive_time).format('YYYY-MM-DD HH:mm')

            wx.hideLoading()
            let user_list_string = taskObj.synergy_list_checked.join('、')
            that.setData({
                ...taskObj,
                user_list_string
            })
        }).catch(err => {
            console.log(err)
            wx.hideLoading()
        })

    },
    getVehicleList() {
        const that = this
        let vehicle_list = []
        wx.showLoading()
        method.cloudApi('getVehicleList').then(res => {
            console.log(res)
            wx.hideLoading()
            const vehicleListOrigin = res.result.data
            if (vehicleListOrigin.length) {
                vehicleListOrigin.forEach(e => {
                    let obj = {
                        belongs: e.belongs || '',
                        carTypeNum: e.carTypeNum || '',

                    }
                    vehicle_list.push(obj)
                })
            }
            console.log(vehicle_list)
            that.setData({
                vehicle_list
            })

        }).catch(err => {
            wx.hideLoading()
        })
    },
    getUserList() {
        const that = this
        let user_list = []
        wx.showLoading()
        method.cloudApi('getUserList').then(res => {
            wx.hideLoading()
            const userListOrigin = res.result.data
            if (userListOrigin.length) {
                userListOrigin.forEach(e => {
                    let obj = {
                        openid: e.openid || '',
                        name: e.userName || '微信用户',
                        checked: false
                    }
                    user_list.push(obj)
                })
            }
            that.setData({
                user_list
            })

        }).catch(err => {
            wx.hideLoading()
        })
    },
    showSynergy() {
        const show = this.data.show
        this.setData({
            show: !show
        })
    },
    report() {
        const {
            id,
            progress,
            project_name,
            project_number,
            work_location,
            project_content,
            project_error,
            contact_person,
            project_manager,
            overtime_rule,
            overtime_dianke,
            synergy_list_checked,
            project_vehicle,
            project_driver,
            remark,
            transportFeeList,
            eateryFeelist,
            accommodationFeeList,
            mechanicalFeeList,
            reimburseList,
            otherFeeList
        } = this.data
        const that = this
        wx.showLoading({
            title: '汇报中'
        })
        console.log(that.data)
        method.cloudApi('updateTask', {
            id,
            progress,
            project_name,
            project_number,
            work_location,
            project_content,
            project_error,
            contact_person,
            project_manager,
            overtime_rule,
            overtime_dianke,
            synergy_list_checked,
            project_vehicle,
            project_driver,
            remark,
            transportFeeList,
            eateryFeelist,
            accommodationFeeList,
            mechanicalFeeList,
            reimburseList,
            otherFeeList
        }).then(res => {
            console.log(res)

            wx.hideLoading()
            wx.showToast({
                title: '已汇报',
            })
            setTimeout(e => {
                wx.navigateBack()
            }, 1000)
        }).catch(err => {
            console.log(err)
            wx.hideLoading()
        })
    },
    afterRead(e) {
        const that = this
        let reimburseList = this.data.reimburseList
        const url = e.detail.file.tempFilePath
        wx.showLoading()
        wx.cloud.uploadFile({
            cloudPath: `reimburse/${moment().valueOf()}.png`,
            filePath: url,
            success: res => {
                const imgurl = res.fileID
                let imgObj = {
                    url: imgurl,
                    name: '报销凭证',
                    isImage: true,
                    deletable: true,
                }
                reimburseList.push(imgObj)
                that.setData({
                    reimburseList
                })
                wx.hideLoading()
            }
        })
    },
    deleteSpecial(e) {
        let reimburseList = this.data.reimburseList
        const index = e.detail.index
        reimburseList.splice(index, 1)
        console.log(e)
        const fileId = e.detail.file.url
        deleteObj.deleteFile(fileId)
        this.setData({
            reimburseList
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