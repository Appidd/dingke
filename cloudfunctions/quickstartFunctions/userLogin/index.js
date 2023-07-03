const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID

        const result = await db.collection('userList').where({
            openid: openid
        }).get()

        if(result.data.length){
            // 用户已存在
           
            return openid
        }else{
            //用户不存在
            await db.collection('userList').add({
                data:{
                    openid,
                    isManager:false
                }
            })
            return openid
        }

   
};