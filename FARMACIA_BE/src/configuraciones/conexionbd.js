const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('farmacia', 'root', 'Nayelimeza20', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
});

module.exports = sequelize;
