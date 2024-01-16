const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'FutureSmile_DB',
    '',
    {
        dialect: 'mysql',
        host: 'localhost',
    }
);

module.exports = sequelize
