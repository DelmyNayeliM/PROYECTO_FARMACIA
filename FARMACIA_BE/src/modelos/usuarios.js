const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');
const bcrypt = require('bcrypt');

const Usuarios = db.define(
    'usuarios',
    {
        tipo_usuario: {
            type: DataTypes.ENUM('administrador', 'medico'),
            defaultValue: 'medico',
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },        
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100],  // Contraseña de entre 8 y 100 caracteres
            }
        },        
    },
    {
        tableName: 'usuarios',
        timestamps: true,  // Si necesitas createdAt y updatedAt
    }
);

// Encripta la contraseña antes de guardar un usuario
Usuarios.beforeCreate(async (usuario, options) => {
    if (usuario.password) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
    }
});

module.exports = Usuarios;
