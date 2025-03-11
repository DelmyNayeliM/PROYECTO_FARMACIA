const { Op, fn, col, where } = require('sequelize');
const { Router } = require('express');
const { body, query, validationResult} = require('express-validator');
const controladorinventarios = require('../controladores/controlador_inventario');
const Inventario = require('../modelos/inventario'); // Modelo 

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

rutas.get('/buscar', 
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
);

// Ruta para buscar medicamentos
rutas.get('/buscar-medicamentos', 
    query('nombre_medicamento')
        .optional()
        .isString()
        .withMessage("El nombre del medicamento debe ser una cadena de caracteres")
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre debe tener entre 3 a 50 caracteres'),

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


// Ruta GET para buscar un medicamento por su ID
rutas.get('/buscar/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Tomamos el ID desde los parámetros de la URL

    // Buscar el medicamento por ID usando `findByPk`
    const medicamentos = await Inventario.findByPk(id);

    // Si no se encuentra el medicamento, devolvemos un error 404
    if (!medicamentos) {
      return res.status(404).json({ error: 'Medicamento no encontrado' });
    }

    // Si encontramos el medicamento, lo devolvemos en la respuesta
    return res.status(200).json({ medicamentos });
  } catch (error) {
    console.error('Error al buscar medicamento:', error);
    return res.status(500).json({ error: 'Error al buscar medicamento' });
  }
});

module.exports = rutas;
