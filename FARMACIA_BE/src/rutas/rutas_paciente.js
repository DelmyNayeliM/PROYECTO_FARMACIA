const { Op } = require('sequelize'); // Asegúrate de importar Op
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPacientes = require('../controladores/controlador_paciente');
const paciente = require('../modelos/paciente'); // Modelo de usuario

const rutas = Router();

// Ruta de inicio
rutas.get('/', controladorPacientes.inicio);

// Ruta para listar todos los usuarios
rutas.get('/listar', controladorPacientes.listar);

// Ruta para guardar un nuevo usuario
rutas.post('/guardar',
    body("nombre_completo")
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value) => {
            if (!value) {
                throw new Error("El nombre no permite valores nulos");
            }
            const buscarpacientes = await paciente.findOne({
                where: { nombre_completo: value }
            });
            if (buscarpacientes) {
                throw new Error('El nombre del paciente ya existe');
            }
        }),
    body("tipo_paciente")
        .optional()
        .isIn(['trabajador', 'dependiente'])
        .withMessage('El tipo de paciente debe ser "trabajador" o "depedediente"'),
    body("tipo_empleado")
        .optional()
        .isIn(['temporal', 'permanente'])
        .withMessage('El tipo de empleado debe ser "temporal" o "permanente"'),
    controladorPacientes.guardar
);

rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero"),
    body("nombre_completo")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value, { req }) => {
            const pacienteId = req.query.id; // tomamos el ID de la query
            const pacienteExistente = await paciente.findOne({
                where: { nombre_completo: value, id: { [Op.ne]: pacienteId } }
            });
            if (pacienteExistente) {
                throw new Error('El nombre del paciente ya existe');
            }
        }),
    body("tipo_paciente")
        .optional()
        .isIn(['trabajador', 'dependiente'])
        .withMessage('El tipo de paciente debe ser "trabajador" o "dependiente"'),
    body("tipo_empleado")
        .optional()
        .isIn(['temporal', 'permanente'])
        .withMessage('El tipo de empleado debe ser "temporal" o "permanente"'),
    controladorPacientes.editar
);



// Ruta para eliminar un usuario
rutas.delete('/eliminar',
    query("id")
        .isInt()
        .withMessage("El Id debe ser un número entero")
        .custom(async (value) => {
            const buscarpacientes = await paciente.findOne({
                where: { id: value }
            });
            if (!buscarpacientes) {
                throw new Error('El Id no existe');
            }
        }),
    controladorPacientes.eliminar
);

module.exports = rutas;
