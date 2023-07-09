const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command
// 创建集合云函数入口函数
exports.main = async (event, context) => {

    const page_number = event.page_number
    const page_size = event.page_size
   
    if(event.start_time){
        const result = await db.collection('taskList').where({
            arrive_time:_.and(_.gte(event.start_time),_.lte(event.end_time+86400000))
        }).orderBy('arrive_time', 'desc').skip(page_number * page_size).limit(page_size).get()
        const total = await db.collection('taskList').where({
          
            arrive_time:_.and(_.gte(event.start_time),_.lte(event.end_time+86400000))
        }).count()
        return {
            data: result.data,
            code: 1,
            message: 'ok',
            total:total.total
        }
    }else{
        const result = await db.collection('taskList').orderBy('arrive_time', 'desc').skip(page_number * page_size).limit(page_size).get()
        const total = await db.collection('taskList').count()
        return {
            data: result.data,
            code: 1,
            message: 'ok',
            total:total.total
        }
    }
   

};