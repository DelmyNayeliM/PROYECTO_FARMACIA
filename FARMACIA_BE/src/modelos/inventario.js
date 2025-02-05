const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');
const inventario = db.define(
    'inventario',
    {
        categoria: {
            type: DataTypes.ENUM('medicamento', 'suplemento', 'material'),
            defaultValue: 'medicamento',
        },
        nombre_medicamento: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                len: [3, 75],  // El nombre debe tener entre 3 y 75 caracteres
            }
        },
        descripcion: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                len: [10, 455],  // Descripción entre 10 y 455 caracteres
            }
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),  // Precio con hasta 2 decimales
            allowNull: false
        },
    },
    {
        tableName: 'inventario',
        timestamps: true,
    }
);

module.exports = inventario;
