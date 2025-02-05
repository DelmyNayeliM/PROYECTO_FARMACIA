const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const inventarios = require('../modelos/inventario');


// Ruta de inicio
exports.inicio = (req, res) => {
    const objeto = {
        titulo: 'Rutas de Inventarios',
    };
    res.json(objeto);
};

// Ruta para guardar un nuevo Inventario
exports.guardar = async (req, res) => {
    const { categoria, nombre_medicamento, descripcion, precio } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar si el Inventario ya existe
        const inventarioExistente = await inventarios.findOne({ where: { nombre_medicamento } });
        if (inventarioExistente) {
            return res.status(400).json({ mensaje: 'El medicamento ya existe' });
        }

        // Crear el nuevo Inventario
        const nuevoinventario= await inventarios.create({
            categoria, 
            nombre_medicamento, 
            descripcion, 
            precio
        });

        res.status(201).json(nuevoinventario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar el inventario', error });
    }
};

// Ruta para listar todos los inventarios
exports.listar = async (req, res) => {
    try {
        const listainventarios = await inventarios.findAll();
        res.status(200).json(listainventarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los inventarios', error });
    }
};

exports.editar = async (req, res) => {
    const { id } = req.query; // Obtener id de la query
    const { categoria, nombre_medicamento, descripcion, precio } = req.body;

    // Validar errores de Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar si el id es válido
        if (!id) {
            return res.status(400).json({ mensaje: "El ID es necesario" });
        }

        // Buscar el inventario por ID
        const inventario = await inventarios.findByPk(id);
        if (!inventario) {
            return res.status(404).json({ mensaje: "El inventario no existe" });
        }

        // Verificar si el nombre ya está en uso por otro medicamento
        if (nombre_medicamento) {
            const inventarioExistente = await inventarios.findOne({ // Cambié inventario por inventarios
                where: {
                    nombre_medicamento,
                    id: { [Op.ne]: id } // Verifica que el nombre no pertenezca al mismo medicamento
                }
            });
            if (inventarioExistente) {
                return res.status(400).json({ mensaje: "El nombre del medicamento ya está en uso" });
            }
        }

        // Actualizar los campos
        inventario.categoria = categoria || inventario.categoria;
        inventario.nombre_medicamento = nombre_medicamento || inventario.nombre_medicamento;
        inventario.descripcion = descripcion || inventario.descripcion;
        inventario.precio = precio || inventario.precio;

        // Guardar los cambios
        await inventario.save();

        // Responder con el inventario actualizado
        res.json({ mensaje: "Inventario actualizado correctamente", inventario });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al editar el inventario", error });
    }
};


// Ruta para eliminar un Inventario
exports.eliminar = async (req, res) => {
    const { id } = req.query;

    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        let msjerror = '';
        errors.errors.forEach((r) => {
            msjerror += r.msg + '. ';
        });
        return res.status(400).json({ msj: 'Hay errores en la petición', error: msjerror });
    }

    try {
        const inventario = await inventarios.findByPk(id);
        if (!inventario) {
            return res.status(404).json({ msj: 'El inventario no existe' });
        }

        await inventario.destroy();
        res.status(200).json({ msj: 'Inventario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al eliminar el inventario', error });
    }
};
