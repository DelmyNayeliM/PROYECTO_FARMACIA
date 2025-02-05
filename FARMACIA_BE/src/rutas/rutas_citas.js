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
    query("id")
        .isInt()
        .withMessage("El ID debe ser un número entero"),
    
    body("nombre_completo")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value, { req }) => {
            if (!value) return true; // No validamos si no se envió un nuevo nombre

            const pacienteId = parseInt(req.query.id, 10);
            if (isNaN(pacienteId)) {
                throw new Error("El ID del paciente es inválido");
            }

            const pacienteExistente = await paciente.findOne({
                where: { nombre_completo: value, id: { [Op.ne]: pacienteId } }
            });

            if (pacienteExistente) {
                throw new Error('El nombre del paciente ya existe');
            }
        }),
    
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
