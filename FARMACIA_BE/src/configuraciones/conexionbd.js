const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('farmacia', 'root', 'Nayelimeza20', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;


/*const sequelize = require('sequelize');
const db = new sequelize(
    'farmacia', //nombre base de datos
    'root', // usuario base de datos
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);
module.exports = db;*/