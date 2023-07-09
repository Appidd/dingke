const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
        const result = await db.collection('userList').get()
        return {
            data:result.data,
            code:1,
            message:'ok'
        }
};