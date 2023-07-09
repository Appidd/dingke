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
    
    if(event.progress==0){
        //存草稿
        const result = await db.collection('taskList').doc(event.id).update({
            data:{
                progress:0,
                project_name:event.project_name,
                project_number:event.project_number,
                work_location:event.work_location,
                contact_person:event.contact_person,
                project_manager:event.project_manager,
                synergy_list_checked:_.set(event.synergy_list_checked),
                arrival_location:event.arrival_location,
                project_vehicle:event.project_vehicle,
                arrive_date:event.arrive_date,
                arrive_time:event.arrive_time,
                project_driver:event.project_driver,
                remark:event.remark
            }
        })
        
        return 'ok'
    }else{
        //添加任务，并通知
        const result = await db.collection('taskList').doc(event.id).update({
            data:{
                progress:1,
                project_name:event.project_name,
                project_number:event.project_number,
                work_location:event.work_location,
                contact_person:event.contact_person,
                project_manager:event.project_manager,
            
                synergy_list_checked:_.set(event.synergy_list_checked),
                arrival_location:event.arrival_location,
                project_vehicle:event.project_vehicle,
                arrive_date:event.arrive_date,
                arrive_time:event.arrive_time,
                project_driver:event.project_driver,
                remark:event.remark
            }
        })
        
        return 'ok'
    }
   
      

   
};