const getOpenId = require('./getOpenId/index');
const updateUser = require('./updateUser/index');
const getUserInfo = require('./getUserInfo/index');
const updateCar = require('./updateCar/index');
const getCarInfo = require('./getCarInfo/index');
const userLogin = require('./userLogin/index');
const getUserList = require('./getUserList/index');
const getVehicleList = require('./getVehicleList/index')
const addTask = require('./addTask/index')
const getTaskList = require('./getTaskList/index')
const getAddTaskList = require('./getAddTaskList/index')
const getTaskDetail = require('./getTaskDetail/index')
const updateTask = require('./updateTask/index')
const addTaskUpdate = require('./addTaskUpdate/index')
const deletePerson = require('./deletePerson/index')
const getCarList = require('./getCarList/index')
const deleteCar = require('./deleteCar/index')
// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'getOpenId':
            return await getOpenId.main(event, context);
        case 'updateUser':
            return await updateUser.main(event, context);
        case 'getUserInfo':
            return await getUserInfo.main(event, context);
        case 'updateCar':
            return await updateCar.main(event, context);
        case 'getCarInfo':
            return await getCarInfo.main(event, context);
        case 'userLogin':
            return await userLogin.main(event, context);
        case 'getUserList':
            return await getUserList.main(event, context);
        case 'getVehicleList':
            return await getVehicleList.main(event, context);
        case 'addTask':
            return await addTask.main(event, context);
        case 'getTaskList':
            return await getTaskList.main(event, context);
        case 'getAddTaskList':
            return await getAddTaskList.main(event, context);
        case 'getTaskDetail':
            return await getTaskDetail.main(event, context);
        case 'updateTask':
            return await updateTask.main(event, context);
        case 'addTaskUpdate':
            return await addTaskUpdate.main(event, context);
        case 'deletePerson':
            return await deletePerson.main(event, context);
        case 'getCarList':
            return await getCarList.main(event, context);

        case 'deleteCar':
            return await deleteCar.main(event, context);

    }
};