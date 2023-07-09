const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const keywords=event.keywords
    if(keywords){
     //模糊查询
     const result = await db.collection('carList').where({
        carTypeNum: db.RegExp({
            regexp: keywords,
            options: 'i' // i表示不区分大小写
      
          })
     }).get()
     return {
         data:result.data,
         code:1,
         message:'ok'
     }
    }else{
        const result = await db.collection('carList').get()
        return {
            data:result.data,
            code:1,
            message:'ok'
        }
    }
        
};