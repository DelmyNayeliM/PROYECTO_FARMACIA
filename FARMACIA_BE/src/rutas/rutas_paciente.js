const { Op } = require('sequelize'); // Asegúrate de importar Op
const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorPacientes = require('../controladores/controlador_paciente');
const Paciente = require('../modelos/paciente'); // Modelo de usuario
const { guardarImagenPaciente } = require('../configuraciones/archivo');

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
            const buscarpacientes = await Paciente.findOne({
                where: { nombre_completo: value }
            });
            if (buscarpacientes) {
                throw new Error('El nombre del paciente ya existe');
            }
        }),
    body("tipo_paciente")
        .optional()
        .isIn(['Trabajador', 'Dependiente'])
        .withMessage('El tipo de paciente debe ser "Trabajador" o "Depedediente"'),
    body("tipo_empleado")
        .optional()
        .isIn(['Temporal', 'Permanente'])
        .withMessage('El tipo de empleado debe ser "Temporal" o "Permanente"'),
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
            const pacienteExistente = await Paciente.findOne({
                where: { nombre_completo: value, id: { [Op.ne]: pacienteId } }
            });
            if (pacienteExistente) {
                throw new Error('El nombre del paciente ya existe');
            }
        }),
    body("tipo_paciente")
        .optional()
        .isIn(['Trabajador', 'Dependiente'])
        .withMessage('El tipo de paciente debe ser "trabajador" o "dependiente"'),
    body("tipo_empleado")
        .optional()
        .isIn(['Temporal', 'Permanente'])
        .withMessage('El tipo de empleado debe ser "temporal" o "permanente"'),
    controladorPacientes.editar
);



// Ruta para eliminar un paciente

rutas.delete('/eliminar',
    query("id")
        .isInt()
        .withMessage("El Id debe ser un número entero")
        .custom(async (value) => {
            const buscarpacientes = await Paciente.findOne({
                where: { id: value }
            });
            if (!buscarpacientes) {
                throw new Error('El Id no existe');
            }
        }),
    controladorPacientes.eliminar
);

// Ruta para buscar pacientes
rutas.get('/buscarpacientes', async (req, res) => {
  const { expediente, nombre, clave } = req.query;

  try {
    const whereConditions = {};

    // Filtrar por número de expediente
    if (expediente) {
      whereConditions.clave_expediente = expediente;
    }

    // Filtrar por nombre completo
    if (nombre) {
      whereConditions.nombre_completo = {
        [Op.like]: `%${nombre}%`, // Se usa LIKE para búsqueda parcial
      };
    }

    // Filtrar por clave de trabajador
    if (clave) {
      whereConditions.clave_empleado = clave;
    }

    // Buscar pacientes en la base de datos
    const pacientes = await Paciente.findAll({
      where: whereConditions,
    });

    // Verificar si no se encontraron pacientes
    if (pacientes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pacientes.' });
    }

    // Enviar la respuesta con los pacientes encontrados
    return res.json(pacientes);
  } catch (error) {
    // Manejar el error y devolver un mensaje más detallado
    console.error('Error al buscar pacientes:', error);
    return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
});

rutas.post('/guardarImagenPaciente', guardarImagenPaciente, async (req, res) => {
    try {
        // Verificar si no se ha subido ninguna imagen
        if (!req.file) {
            return res.status(400).json({ mensaje: 'No se ha subido ninguna imagen' });
        }

        // Obtener la ruta de la imagen cargada
        const rutaImagen = req.file.path; // ruta completa en el sistema de archivos

        // Guardar la ruta en la base de datos
        const paciente = await Paciente.update(
            { foto_paciente: rutaImagen },
            { where: { id: req.query.id } }
        );

        if (paciente[0] === 0) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        res.status(200).json({ mensaje: 'Imagen subida correctamente', ruta: rutaImagen });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al subir la imagen', error: error.message });
    }
});


module.exports = rutas;
