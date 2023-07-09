const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID
    
    if(event.progress==0){
        //存草稿
        await db.collection('taskList').add({
            data:{
                openid,
                ...event
            }
        })
        return 'ok'
    }else{
        //添加任务，并通知
        await db.collection('taskList').add({
            data:{
                openid,
                ...event
            }
        })
        return 'ok'
    }
   
      

   
};