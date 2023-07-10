const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command
// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID
    const startDate=event.startDate
    const endDate=event.endDate
    if(event.startDate){
        const result = await  db.collection('taskList').where({
            arrive_time:_.gte(startDate).and(_.lte(endDate))
        }).get()
        
        return {
            data: result,
            code: 1,
            message: 'ok'
        }
    }else{
        const result = await  db.collection('taskList').get()
        return {
            data: result,
            code: 1,
            message: 'ok'
        }
    }
    






};