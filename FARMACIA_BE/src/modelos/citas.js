const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const modelopacientes = require('./paciente');
const modeloinventario = require('./inventario');

const citas = db.define(
    'citas',
    {        
        fecha_cita: {
        type: DataTypes.DATEONLY,  
        allowNull: false,      
        validate: {
            isDate: true,      
        }
    },
        nombre_dr: {
            type: DataTypes.ENUM('Dr. Cristian Muñoz', 'Dr. Kevin Yanes'),
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
        cantidadventa: {
            type: DataTypes.STRING(20), 
            allowNull: false
        },
    },
    {
        tableName: 'citas',
        timestamps: true,  // Si es necesario
    }
);

// Relación de uno a muchos: Un paciente puede tener muchas citas
modelopacientes.hasMany(citas);  // Un paciente tiene muchas citas
citas.belongsTo(modelopacientes); // Cada cita pertenece a un solo paciente

// Relación de uno a muchos: Un inventario puede estar relacionado con muchas citas
modeloinventario.hasMany(citas);  // Un inventario puede estar relacionado con muchas citas
citas.belongsTo(modeloinventario); // Cada cita pertenece a un solo inventario (medicamento)


module.exports = citas;
