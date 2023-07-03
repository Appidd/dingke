const getOpenId = require('./getOpenId/index');
const updateUser = require('./updateUser/index');
const getUserInfo = require('./getUserInfo/index');
const updateCar = require('./updateCar/index');
const getCarInfo = require('./getCarInfo/index');
const userLogin = require('./userLogin/index');


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
  }
};
