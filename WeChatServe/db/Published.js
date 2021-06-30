const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('mysql://root:ths327010@localhost:3306/wechat')

class Published extends Model {}

Published.init({
    // 在这里定义模型属性
    input_content: {
        type: DataTypes.STRING
        // allowNull: false
    },
    imageList: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'Published' // 我们需要选择模型名称
});

// (async() => {
//     await sequelize.sync({ force: true });
//     // 这里是代码
// })();

module.exports = Published
