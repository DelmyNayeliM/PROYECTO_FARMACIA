const { Op } = require('sequelize'); // Asegúrate de importar Op
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorcitas = require('../controladores/controlador_citas');
const cita = require('../modelos/citas'); // Modelo 

const rutas = Router();

// Ruta de inicio
rutas.get('/', controladorcitas.inicio);

// Ruta para listar todos las citas
rutas.get('/listar', controladorcitas.listar);

// Ruta para guardar una nueva cita
rutas.post('/guardar',
    body("fecha_cita")
        .isISO8601()
        .withMessage('Debe ingresar una fecha válida en formato YYYY-MM-DD')
        .custom(async (value) => {
            if (!value) {
                throw new Error("La fecha de la cita no puede estar vacía");
            }
            const buscarcita = await cita.findOne({
                where: { fecha_cita: value }
            });
            if (buscarcita) {
                throw new Error('Ya existe una cita programada en esta fecha');
            }
        }),
        controladorcitas.guardar
);

rutas.put('/editar',
    body("id")
        .isInt()
        .withMessage("El ID debe ser un número entero")
        .custom(async (value) => {
            const citaExistente = await cita.findOne({
                where: { id: value }
            });
            if (!citaExistente) {
                throw new Error('La cita con el ID proporcionado no existe');
            }
        }),

    body("nombre_completo")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres'),

    controladorcitas.editar
);


// Ruta para eliminar un usuario
rutas.delete('/eliminar',
    query("id")
        .isInt()
        .withMessage("El Id debe ser un número entero")
        .custom(async (value) => {
            const buscarcita = await cita.findOne({
                where: { id: value }
            });
            if (!buscarcita) {
                throw new Error('El Id no existe');
            }
        }),
    controladorcitas.eliminar
);

module.exports = rutas;
