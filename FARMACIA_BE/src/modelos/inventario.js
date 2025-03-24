const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');
const inventario = db.define(
    'inventario',
    {
        categoria: {
            type: DataTypes.ENUM('Muestras medicas', 'Antibioticos adultos','Migraña', 'Parenterales', 
                'Cardiometabolicos', 'Anestesia', 'Cremas', 'Gotas', 'Ginecologicos', 'Gastrointestinales', 'Antigripal'
                , 'Alergias', 'Tos', 'Asma-gripe', 'Antibioticos niños', 'Analgesicos-antipirectico niños', 'Antipirectico adultos'),
            defaultValue: 'Alergias',
        },
        nombre_medicamento: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                len: [3, 75],  // El nombre debe tener entre 3 y 75 caracteres
            }
        },
        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [10, 200],  // Descripción entre 10 y 45 caracteres
            }
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),  // Precio con hasta 2 decimales
            allowNull: false
        },
        cantidad: {
            type: DataTypes.STRING(20), 
            allowNull: false
        },
        fecha_vence: {
            type: DataTypes.DATEONLY,  
            allowNull: false,      
            validate: {
                isDate: true,      
            }
        },
    },
    {
        tableName: 'inventario',
        timestamps: true,
    }
);

module.exports = inventario;
