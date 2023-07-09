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
    const from = event.from
    const page_number = event.page_number
    const page_size = event.page_size
    const userInfo = await db.collection('userList').where({
        openid: openid
    }).get()
    if (userInfo.data[0].isManager) {
        if (from) {
            if(event.start_time){
                const result = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                    arrive_time:_.and(_.gte(event.start_time),_.lte(event.end_time+86400000))
                }).skip(page_number * page_size).limit(page_size).get()
                const total = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                    arrive_time:_.and(_.gte(event.start_time),_.lte(event.end_time+86400000))
                }).count()
                return {
                    data: result.data,
                    code: 1,
                    message: 'ok',
                    total:total.total
                }
            }else{
                const result = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                   
                }).skip(page_number * page_size).limit(page_size).get()
                const total = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                    
                }).count()
                return {
                    data: result.data,
                    code: 1,
                    message: 'ok',
                    total:total.total
                }
            }
           
        } else {
            const result = await db.collection('taskList').where({
                progress: _.neq(0),
                arrive_time:_.and(_.gte(event.start_time),_.lte(event.start_time+86400000))
            }).skip(page_number * page_size).limit(page_size).get()
            const total = await db.collection('taskList').where({
                progress: _.neq(0),
                arrive_time:_.and(_.gte(event.start_time),_.lte(event.start_time+86400000))
            }).count()
            return {
                data: result.data,
                code: 1,
                message: 'ok',
                total:total.total
            }
        }


    } else {
        if (from) {
            if(event.start_time){
                const result = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                    belongs: openid,
                    arrive_time:_.and(_.gte(event.start_time),_.lte(event.end_time+86400000))
                }).skip(page_number * page_size).limit(page_size).get()
                const total = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                    belongs: openid,
                    arrive_time:_.and(_.gte(event.start_time),_.lte(event.end_time+86400000))
                }).count()
                return {
                    data: result.data,
                    code: 1,
                    message: 'ok',
                    total:total.total
                }
            }else{
                const result = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                    belongs: openid,
                   
                }).skip(page_number * page_size).limit(page_size).get()
                const total = await db.collection('taskList').where({
                    progress: _.and(_.neq(0), _.neq(1)),
                    belongs: openid,
                    
                }).count()
                return {
                    data: result.data,
                    code: 1,
                    message: 'ok',
                    total:total.total
                }
            }
            
        } else {
            const result = await db.collection('taskList').where({
                progress: _.neq(0),
                belongs: openid,
                arrive_time:_.and(_.gte(event.start_time),_.lte(event.start_time+86400000))
            }).skip(page_number * page_size).limit(page_size).get()
            const total = await db.collection('taskList').where({
                progress: _.neq(0),
                belongs: openid,
                arrive_time:_.and(_.gte(event.start_time),_.lte(event.start_time+86400000))
            }).count()
            return {
                data: result.data,
                code: 1,
                message: 'ok',
                total:total.total
            }
        }

    }

};