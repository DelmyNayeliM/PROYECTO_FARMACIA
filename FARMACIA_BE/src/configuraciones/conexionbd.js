const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('farmacia', 'root', 'Luis12345%', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

module.exports = sequelize;
