const { Op, fn, col, where } = require('sequelize');
const { Router } = require('express');
const { body, query, validationResult } = require('express-validator');
const controladorcitas = require('../controladores/controlador_citas');
const Cita = require('../modelos/citas'); // Modelo de Citas
const inventario = require('../modelos/inventario'); // Modelo de Inventario
const Paciente = require('../modelos/paciente'); //Modelo de paciente
const citas = require('../modelos/citas');

const rutas = Router();

// Ruta de inicio
rutas.get('/', controladorcitas.inicio);

// Ruta para listar todas las citas
rutas.get('/listar', controladorcitas.listar);

// Ruta para guardar una nueva cita
rutas.post('/guardar',
    // Validar fecha_cita
    body("fecha_cita")
        .isISO8601().withMessage('Debe ingresar una fecha válida en formato YYYY-MM-DD'),
    // Validar PacienteId
    body('pacienteId')
        .isInt({ min: 1 }).withMessage('El ID del paciente debe ser un número entero')
        .custom(async (value) => {
            const paciente = await Paciente.findByPk(value);
            if (!paciente) {
                throw new Error('El paciente con este ID no existe');
            }
        }),

    // Validar inventarioId
    body('medicamentoId')
        .optional()
        .isInt({ min: 1 }).withMessage('El ID del medicamento debe ser un número entero')
        .custom(async (value) => {
            const item = await inventario.findByPk(value);
            if (!item) {
                throw new Error('El medicamento con este ID no existe');
            }
        }),

    controladorcitas.guardar
);
// Ruta para editar una cita
rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero"),
    body("nombre_completo")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres')
        .custom(async (value, { req }) => {
            const citaID = req.query.id; // tomamos el ID de la query
            const citaExistente = await citas.findOne({
                where: { nombre_completo: value, id: { [Op.ne]: citaID } }
            });
            if (citaExistente) {
                throw new Error('El nombre del paciente ya existe');
            }
        }),
    controladorcitas.editar
);

// Ruta para eliminar una cita
rutas.delete('/eliminar',
    query("id")
        .isInt()
        .withMessage("El Id debe ser un número entero")
        .custom(async (value) => {
            const buscarcita = await Cita.findOne({
                where: { id: value }
            });
            if (!buscarcita) {
                throw new Error('El Id no existe');
            }
        }),
    controladorcitas.eliminar
);

// Ruta para buscar medicamentos
/*rutas.get('/buscar-medicamentos', 
    query("nombre_medicamento")
        .isString()
        .withMessage("El nombre del medicamento debe ser una cadena de caracteres")
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres"),
    async (req, res) => {
        try {
            const { nombre_medicamento } = req.query;

            // Realizamos la búsqueda con LIKE (insensible a mayúsculas/minúsculas en MySQL)
            const medicamentos = await Inventario.findAll({
                where: where(
                    fn('LOWER', col('nombre_medicamento')),
                    'LIKE',
                    `%${nombre_medicamento.toLowerCase()}%`
                )
            });

            if (medicamentos.length === 0) {
                return res.status(404).json({ message: "No se encontraron medicamentos con ese nombre" });
            }

            return res.status(200).json(medicamentos);
        } catch (error) {
            console.error("Error al buscar medicamento:", error); // Imprime el error
            return res.status(500).json({ message: "Hubo un error al buscar el medicamento" });
        }
    }
);*/

// Ruta para buscar citas
rutas.get('/buscar-citas', 
    query('nombre_dr')
        .optional()
        .isString()
        .withMessage("El nombre del doctor debe ser una cadena de caracteres")
        .isLength({ min: 3 })
        .withMessage("El nombre del doctor debe tener al menos 3 caracteres"),
    
    query('nombre_paciente')
        .optional()
        .isString()
        .withMessage("El nombre del paciente debe ser una cadena de caracteres")
        .isLength({ min: 3 })
        .withMessage("El nombre del paciente debe tener al menos 3 caracteres"),

    async (req, res) => {
        // Verificar si la validación 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { nombre_dr, nombre_paciente } = req.query;

            // Construir condiciones de búsqueda dinámicamente
            const whereConditions = {};

            if (nombre_dr) {
                whereConditions.nombre_dr = {
                    [Op.like]: `%${nombre_dr.toLowerCase()}%`
                };
            }

            if (nombre_paciente) {
                whereConditions.nombre_paciente = {
                    [Op.like]: `%${nombre_paciente.toLowerCase()}%`
                };
            }

            // Realizar la búsqueda en la base de datos con Sequelize
            const citas = await Cita.findAll({
                where: whereConditions
            });

            if (citas.length === 0) {
                return res.status(404).json({ message: "No se encontraron citas con esos criterios" });
            }

            return res.status(200).json(citas);
        } catch (error) {
            console.error("Error al buscar citas:", error); // Imprime el error
            return res.status(500).json({ message: "Hubo un error al buscar las citas" });
        }
    }
);

// Ruta GET para buscar un cita por su ID
rutas.get('/buscarid/:id', async (req, res) => {
    try {
      const { id } = req.params;  // Tomamos el ID desde los parámetros de la URL
    
        // Buscar el medicamento por ID usando `findByPk`
        const citas = await Cita.findByPk(id);
    
        // Si no se encuentra la cita, devolvemos un error 404
        if (!citas) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }
    
        // Si encontramos la cita, lo devolvemos en la respuesta
        return res.status(200).json({ citas });
        } catch (error) {
        console.error('Error al buscar la cita:', error);
        return res.status(500).json({ error: 'Error al buscar cita' });
        }
    });
module.exports = rutas;
