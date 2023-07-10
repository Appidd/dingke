const getStatistics = require('./getStatistics/index');


// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'getStatistics':
            return await getStatistics.main(event, context);
    }
};