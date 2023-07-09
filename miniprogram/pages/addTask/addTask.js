// pages/taskReport/taskReport.js
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
        project_name: '',
        project_number: '',
        work_location: '',
        contact_person: '',
        project_manager: {
            name: '',
            openid: ''
        },
        synergy_list_checked: [],
        arrival_location: '',
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
        remark: ''
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
    /**
     * 生命周期函数--监听页面加载
     */
    //到达时间
    releaseTask() {
        console.log(moment(this.data.arrive_date + ' ' + this.data.arrive_time).valueOf());
    },
    getDate(e) {
        this.setData({
            arrive_date: e.detail.value
        })

    },
    getTime(e) {
        this.setData({
            arrive_time: e.detail.value
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
    onLoad(options) {
        const id=options.id
        this.setData({
            id:id
        })
        if(id){
this.getTaskDetail(id)
        }
        this.getUserList()
        this.getVehicleList()
    },
    getTaskDetail(id) {
        const that = this
        wx.showLoading()
        method.cloudApi('getTaskDetail', {
            id
        }).then(res => {
            console.log(res)
            const taskObj = res.result.data
            taskObj.arrive_date = moment(taskObj.arrive_time).format('YYYY-MM-DD')
            taskObj.arrive_time = moment(taskObj.arrive_time).format('HH:mm')

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



    addTask() {
        const {
            project_name,
            project_number,
            work_location,
            contact_person,
            project_manager,
            synergy_list_checked,
            arrival_location,
            project_vehicle,
            arrive_date,
            arrive_time,
            project_driver,
            remark,
            id
        } = this.data
        if (!project_name) {
            wx.showToast({
                title: '请输入项目名称',
                icon: 'error'
            })
            return
        }
        if (!project_number) {
            wx.showToast({
                title: '请输入项目编号',
                icon: 'error'
            })
            return
        }
        if (!work_location) {
            wx.showToast({
                title: '请输入工作地点',
                icon: 'error'
            })
            return
        }
        if (!contact_person) {
            wx.showToast({
                title: '请输入联系人',
                icon: 'error'
            })
            return
        }
        if (!project_manager) {
            wx.showToast({
                title: '请输入负责人',
                icon: 'error'
            })
            return
        }
        if (!synergy_list_checked.length) {
            wx.showToast({
                title: '请选择协同人员',
                icon: 'error'
            })
            return
        }
        if (!arrival_location) {
            wx.showToast({
                title: '请输入到达地点',
                icon: 'error'
            })
            return
        }
        if (!arrive_date) {
            wx.showToast({
                title: '请输入到达日期',
                icon: 'error'
            })
            return
        }
        if (!arrive_time) {
            wx.showToast({
                title: '请输入到达时间',
                icon: 'error'
            })
            return
        }
        wx.showLoading()
       if(id){
        method.cloudApi('addTaskUpdate', {
            type: 'addTaskUpdate',
            progress: 1,
            id,
            belongs: project_manager.openid,
            arrive_time: moment(arrive_date + ' ' + arrive_time).valueOf(),
            project_name,
            project_number,
            work_location,
            contact_person,
            project_manager,
            synergy_list_checked,
            arrival_location,
            project_vehicle,
            project_driver,
            remark
        }).then(res => {
            wx.hideLoading()
            wx.showToast({
                title: '发布成功',
            })
            setTimeout(e => {
                wx.navigateBack()
            }, 1000)
        }).catch(err => {
            wx.hideLoading()
        })
       }else{
        method.cloudApi('addTask', {
            type: 'addTask',
            progress: 1,
            belongs: project_manager.openid,
            arrive_time: moment(arrive_date + ' ' + arrive_time).valueOf(),
            project_name,
            project_number,
            work_location,
            contact_person,
            project_manager,
            synergy_list_checked,
            arrival_location,
            project_vehicle,
            project_driver,
            remark
        }).then(res => {
            wx.hideLoading()
            wx.showToast({
                title: '发布成功',
            })
            setTimeout(e => {
                wx.navigateBack()
            }, 1000)
        }).catch(err => {
            wx.hideLoading()
        })
       }

    },
    saveTask() {

        const {
            project_name,
            project_number,
            work_location,
            contact_person,
            project_manager,
            synergy_list_checked,
            arrival_location,
            project_vehicle,
            arrive_date,
            arrive_time,
            project_driver,
            remark,
            id
        } = this.data
     
        if (!project_name) {
            wx.showToast({
                title: '请输入项目名称',
                icon: 'error'
            })
            return
        }
        if (!project_number) {
            wx.showToast({
                title: '请输入项目编号',
                icon: 'error'
            })
            return
        }
        if (!work_location) {
            wx.showToast({
                title: '请输入工作地点',
                icon: 'error'
            })
            return
        }
        if (!contact_person) {
            wx.showToast({
                title: '请输入联系人',
                icon: 'error'
            })
            return
        }
        if (!project_manager) {
            wx.showToast({
                title: '请输入负责人',
                icon: 'error'
            })
            return
        }
        if (!synergy_list_checked.length) {
            wx.showToast({
                title: '请选择协同人员',
                icon: 'error'
            })
            return
        }
        if (!arrival_location) {
            wx.showToast({
                title: '请输入到达地点',
                icon: 'error'
            })
            return
        }
        if (!arrive_date) {
            wx.showToast({
                title: '请输入到达日期',
                icon: 'error'
            })
            return
        }
        if (!arrive_time) {
            wx.showToast({
                title: '请输入到达时间',
                icon: 'error'
            })
            return
        }
        wx.showLoading()
        if(id){
            method.cloudApi('addTaskUpdate', {
                type: 'addTaskUpdate',
                progress: 0,
                id,
                belongs: project_manager.openid,
                arrive_time: moment(arrive_date + ' ' + arrive_time).valueOf(),
                project_name,
                project_number,
                work_location,
                contact_person,
                project_manager,
                synergy_list_checked,
                arrival_location,
                project_vehicle,
                project_driver,
                remark
            }).then(res => {
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
            })
        }else{
            method.cloudApi('addTask', {
                type: 'addTask',
                progress: 0,
                belongs: project_manager.openid,
                arrive_time: moment(arrive_date + ' ' + arrive_time).valueOf(),
                project_name,
                project_number,
                work_location,
                contact_person,
                project_manager,
                synergy_list_checked,
                arrival_location,
                project_vehicle,
                project_driver,
                remark
            }).then(res => {
                wx.hideLoading()
                wx.showToast({
                    title: '保存成功',
                })
                setTimeout(e => {
                    wx.navigateBack()
                }, 1000)
            }).catch(err => {
                wx.hideLoading()
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