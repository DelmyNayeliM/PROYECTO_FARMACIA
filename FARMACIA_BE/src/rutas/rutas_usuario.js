const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuario = require('../controladores/controlador_usuarios');
const usuarios = require('../modelos/usuarios'); // Modelo de usuario



const rutas = Router();

// Ruta de inicio
rutas.get('/', controladorUsuario.inicio);

// Ruta para listar todos los usuarios
rutas.get('/listar', controladorUsuario.listar);

// Ruta para guardar un nuevo usuario
rutas.post('/guardar',
    body("nombre")
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value) => {
            if (!value) {
                throw new Error("El nombre no permite valores nulos");
            }
            const buscarUsuario = await usuarios.findOne({
                where: { nombre: value }
            });
            if (buscarUsuario) {
                throw new Error('El nombre de usuario ya existe');
            }
        }),
    body("password")
        .isLength({ min: 8, max: 100 })
        .withMessage('La contraseña debe tener entre 8 a 100 caracteres'),
    body("tipo_usuario")
        .optional()
        .isIn(['administrador', 'medico'])
        .withMessage('El tipo de usuario debe ser "administrador" o "medico"'),
    controladorUsuario.guardar
);

rutas.put('/editar',
    query("id")
        .isInt()
        .withMessage("El Id debe ser un número entero")
        .custom(async (value) => {
            const usuario = await usuarios.findOne({
                where: { id: value }
            });
            if (!usuario) {
                throw new Error('El usuario no existe');
            }
        }),
    body("nombre")
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value, { req }) => {
            if (!value) {
                throw new Error("El nombre no permite valores nulos");
            }
            const usuarioId = req.query.id; // Cambié aquí para que use query
            const usuarioExistente = await usuarios.findOne({
                where: { nombre: value, id: { [Op.ne]: usuarioId } }
            });
            if (usuarioExistente) {
                throw new Error('El nombre de usuario ya existe');
            }
        }),
    body("password")
        .optional()
        .isLength({ min: 8, max: 100 })
        .withMessage('La contraseña debe tener entre 8 a 100 caracteres'),
    body("tipo_usuario")
        .optional()
        .isIn(['administrador', 'medico'])
        .withMessage('El tipo de usuario debe ser "administrador" o "medico"'),

    controladorUsuario.editar
);

// Ruta para eliminar un usuario
rutas.delete('/eliminar',
    query("id")
        .isInt()
        .withMessage("El Id debe ser un número entero")
        .custom(async (value) => {
            const buscarUsuario = await usuarios.findOne({
                where: { id: value }
            });
            if (!buscarUsuario) {
                throw new Error('El Id no existe');
            }
        }),
    controladorUsuario.eliminar
);

module.exports = rutas;
