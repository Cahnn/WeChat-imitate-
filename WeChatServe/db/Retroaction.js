const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('mysql://root:ths327010@localhost:3306/wechat')

class Retroaction extends Model {}

Retroaction.init({
    // 在这里定义模型属性
    advice: {
        type: DataTypes.STRING
        // allowNull: false
    },
    contact: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'Retroaction' // 我们需要选择模型名称
});

// (async() => {
//     await sequelize.sync({ force: true });
//     // 这里是代码
// })();

module.exports = Retroaction
