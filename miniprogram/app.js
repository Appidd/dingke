// app.js
import * as storage from './utils/storage.js'
import {
    method
} from "./utils/api.js"
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-5gas3y4y377ea414',
        traceUser: true,
      });
    }
    method.cloudApi('userLogin').then(res=>{
        this.globalData.isManager=res.result.data[0].isManager?true:false
        this.globalData.appReady=true
    }).catch(err=>{
        this.globalData.appReady=true
        this.globalData.isManager=false
    })
  
  },
  globalData: {
    appReady: false,
    isManager:false
  },
  isLogin() {
    return storage.get('token') ? true : false
},
});
