const { Op } = require('sequelize'); 
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorinventarios = require('../controladores/controlador_inventario');
const Inventario = require('../modelos/inventario'); // Modelo 
const inventario = require('../modelos/inventario');



const rutas = Router();

// Ruta de inicio
rutas.get('/', controladorinventarios.inicio);

// Ruta para listar todos los usuarios
rutas.get('/listar', controladorinventarios.listar);

// Ruta para guardar un nuevo usuario
rutas.post('/guardar',
    body("nombre_medicamento")
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value) => {
            if (!value) {
                throw new Error("El nombre no permite valores nulos");
            }
            const buscarmedicamento = await Inventario.findOne({
                where: { nombre_medicamento: value }
            });
            if (buscarmedicamento) {
                throw new Error('El nombre del medicamento ya existe');
            }
        }),
    controladorinventarios.guardar
);

rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero"),
    body("nombre_medicamento")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value, { req }) => {
            const inventarioId = req.query.id; //tomamos el ID de la query
            const inventarioExistente = await inventario.findOne({
                where: { nombre_medicamento: value, id: { [Op.ne]:inventarioId } }
            });
            if (inventarioExistente) {
                throw new Error('El nombre del inventario ya existe');
            }
        }),
    controladorinventarios.editar
);



// Ruta para eliminar un usuario
rutas.delete('/eliminar',
    query("id")
        .isInt()
        .withMessage("El Id debe ser un número entero")
        .custom(async (value) => {
            const buscarmedicamento = await inventario.findOne({
                where: { id: value }
            });
            if (!buscarmedicamento) {
                throw new Error('El Id no existe');
            }
        }),
    controladorinventarios.eliminar
);

module.exports = rutas;
