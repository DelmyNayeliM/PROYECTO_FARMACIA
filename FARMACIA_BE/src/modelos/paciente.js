const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const Pacientes = db.define(
    'Paciente',
    {
        tipo_paciente: {
            type: DataTypes.ENUM('trabajador', 'dependiente'),
            allowNull: false,
            defaultValue: 'trabajador',
        },
        tipo_empleado: {
            type: DataTypes.ENUM('temporal', 'permanente'),
            allowNull: false,
            defaultValue: 'permanente',
        },
        nombre_completo: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        clave_empleado: {
            type: DataTypes.STRING(5),
            allowNull: false,
            unique: true, // Asegura que no haya claves duplicadas
        },
        clave_expediente: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
        },
        foto_paciente: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        edad: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                min: 0,
                max: 110, // Edad máxima razonable
            },
        },
        direccion: {
            type: DataTypes.STRING(100), 
            allowNull: true,
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
                isEmail: true, // Valida que sea un correo válido
            },
        },
        enfermedad_base: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName: 'Pacientes',
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
    }
);

module.exports = Pacientes;
