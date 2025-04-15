const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Definir la subida de imágenes para el campo foto_paciente
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/pacientes/'); // Directorio donde se almacenarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único a la imagen
    }
});

const upload = multer({ storage: storage });

// Modelo de Pacientes
const Pacientes = db.define('Paciente', {
    
    tipo_paciente: {
        type: DataTypes.ENUM('Trabajador', 'Dependiente'),
        allowNull: false,
    },
    tipo_empleado: {
        type: DataTypes.ENUM('Temporal', 'Permanente'),
        allowNull: false,
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
    imagen: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            isNumeric: true, // Asegura que solo se ingrese un número
        },
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
}, {
    tableName: 'Pacientes',
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

module.exports = Pacientes;                    