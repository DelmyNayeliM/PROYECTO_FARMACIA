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
            const inventarioExistente = await Inventario.findOne({
                where: { nombre_medicamento: value, id: { [Op.ne]:inventarioId } }
            });
            if (inventarioExistente) {
                throw new Error('El nombre del inventario ya existe');
            }
        }),
    controladorinventarios.editar
);

rutas.delete('/eliminar',
    query("id")
        .isInt().withMessage("El ID debe ser un número entero"), // Validación del ID como número entero
        controladorinventarios.eliminar
);

// Ruta para eliminar un usuario
/*rutas.delete('/eliminar',
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
);*/

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
    query("nombre_medicamento")
        .isString()
        .withMessage("El nombre del medicamento debe ser una cadena de caracteres")
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres"),
        async (req, res) => {
            try {
                const { nombre_medicamento } = req.query;
    
                // Construir condiciones de búsqueda dinámicamente
                const whereConditions = {};
    
                if (nombre_medicamento) {
                    whereConditions.nombre_medicamento = nombre_medicamento.toLowerCase(); // Búsqueda exacta
                }
                // Realizar la búsqueda en la base de datos con Sequelize
                const Inventarios = await Inventario.findAll({
                    where: whereConditions
                });
    
                if (Inventarios.length === 0) {
                    return res.status(404).json({ message: "No se encontro el medicamento" });
                }
    
                return res.status(200).json(Inventarios);
            } catch (error) {
                console.error("Error al buscar medicamentos:", error); // Imprime el error
                return res.status(500).json({ message: "Hubo un error al buscar los medicamentos " });
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

  
rutas.get('/buscar/vence/:fecha', async (req, res) => {
    try {
      const { fecha } = req.params;  // Tomamos la fecha desde los parámetros de la URL
  
      // Verificar si el formato de la fecha es válido (YYYY-MM-DD)
      const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
      if (!regexFecha.test(fecha)) {
        return res.status(400).json({ error: 'Formato de fecha no válido. Use el formato YYYY-MM-DD.' });
      }
  
      // Convertir la fecha a un objeto Date local
      const [year, month, day] = fecha.split('-');
      const fechaFormateada = new Date(year, month - 1, day);  // Mes es 0 indexado (enero es 0)
  
      // Aseguramos que la hora sea a medianoche en la zona horaria local
      fechaFormateada.setHours(0, 0, 0, 0);
  
      console.log('Fecha convertida:', fechaFormateada);
  
      // Buscar los medicamentos con la fecha de vencimiento proporcionada
      const medicamentos = await Inventario.findAll({
        where: {
          fecha_vence: fechaFormateada // Buscamos medicamentos cuyo 'fecha_vence' coincida con la fecha
        }
      });
  
      // Si no se encuentran medicamentos, devolvemos un error 404
      if (medicamentos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron medicamentos con esa fecha de vencimiento' });
      }
  
      // Si encontramos medicamentos, los devolvemos en la respuesta
      return res.status(200).json({ medicamentos });
    } catch (error) {
      console.error('Error al buscar medicamentos por fecha de vencimiento:', error);
      return res.status(500).json({ error: 'Error al buscar medicamentos por fecha de vencimiento' });
    }
  });
  
  
  
  
module.exports = rutas;
