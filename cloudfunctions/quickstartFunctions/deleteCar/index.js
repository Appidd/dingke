const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command
// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const result = await db.collection('carList').doc(event.id).remove()
    return {
        data:result.data,
        code:1,
        message:'ok'
    }
};