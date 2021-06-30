const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('mysql://root:ths327010@localhost:3306/wechat')

class User extends Model {}

User.init({
    // 在这里定义模型属性
    name: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    companyName: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    img: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    },
    mess: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User' // 我们需要选择模型名称
});

// 定义的模型是类本身
console.log(User === sequelize.models.User); // true

//模型同步
// User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
// (async () => {
//     await sequelize.sync({ force: true });
//     // 这里是代码
// })();
// console.log("用户模型表刚刚(重新)创建！");

module.exports = User
