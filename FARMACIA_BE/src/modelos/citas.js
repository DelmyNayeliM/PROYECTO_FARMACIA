const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const citas = db.define(
    'citas',
    {        
        fecha_cita: {
        type: DataTypes.DATE,  
        allowNull: false,      
        validate: {
            isDate: true,      
        }
    },
        nombre_dr: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
        nombre_paciente: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
        presion: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                is: /^[0-9]+\/[0-9]+$/,  // Formato de presión arterial (ej. 120/80)
            }
        },        
        peso: {
            type: DataTypes.DECIMAL(6, 2),  // 5 dígitos en total, 2 después del punto decimal
            allowNull: false,
            validate: {
                isNumeric: true,  // Asegura que sea un número
            }
        },
        ritmo_cardiaco: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        temperatura: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                isNumeric: true,  // Asegura que sea un número
                min: 35,          // Rango mínimo (en grados Celsius)
                max: 42           // Rango máximo (en grados Celsius)
            }
        },
        sintomas: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        receta: {
            type: DataTypes.TEXT,
        },
        observaciones: {
            type: DataTypes.TEXT,
        },
        nombre_medicamento: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                len: [3, 75],  // El nombre debe tener entre 3 y 75 caracteres
            }
        },
    },
    {
        tableName: 'citas',
        timestamps: true,  // Si es necesario
    }
);

module.exports = citas;
