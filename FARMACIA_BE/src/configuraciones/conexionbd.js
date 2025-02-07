const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('farmacia', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

module.exports = sequelize;
