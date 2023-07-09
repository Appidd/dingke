const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command
// 创建集合云函数入口函数
exports.main = async (event, context) => {
    const progress=event.progress
    if(progress<2){
        const result = await db.collection('taskList').doc(event.id).update({
            data:{
                progress: _.inc(1)
            }
        })
        return {
            data: result.data,
            code: 1,
            message: 'ok',
          
        }
    }else{
        if(event.progress==2){
            event.progress+=1
        }
       
        const result = await db.collection('taskList').doc(event.id).update({
            data:{
            progress:event.progress,
            project_content:event.project_content,
            project_error:event.project_error,
            contact_person:event.contact_person,
            project_manager:event.project_manager,
            overtime_rule:event.overtime_rule,
            overtime_dianke:event.overtime_dianke,

            synergy_list_checked:_.set(event.synergy_list_checked),
            project_vehicle:event.project_vehicle,
            project_driver:event.project_driver,
            remark:event.remark,

            transportFeeList:_.set(event.transportFeeList),
            eateryFeelist:_.set(event.eateryFeelist),
            accommodationFeeList:_.set(event.accommodationFeeList),
            mechanicalFeeList:_.set(event.mechanicalFeeList),
            reimburseList:_.set(event.reimburseList),
            otherFeeList:_.set(event.otherFeeList)
            }
        })
        return {
            data: result,
            code: 1,
            message: 'ok',
          
        }
    }
    
};