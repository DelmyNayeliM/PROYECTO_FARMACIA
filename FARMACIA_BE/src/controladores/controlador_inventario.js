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
    const { categoria, nombre_medicamento, descripcion, precio, cantidad, fecha_vence } = req.body;

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
            precio,
            cantidad,
            fecha_vence
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
    const { id } = req.query;
    const {
        categoria, 
        nombre_medicamento, 
        descripcion, 
        precio,
        cantidad,
        fecha_vence
    } = req.body;

    // Validar errores de Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        if (!id) {
            return res.status(400).json({ mensaje: "El ID es necesario" });
        }

        const Medicamento = await inventarios.findByPk(id);
        if (!Medicamento) {
            return res.status(404).json({ mensaje: "El medicamento no existe" });
        }

        if (nombre_medicamento) {
            const inventarioExistente = await inventarios.findOne({
                where: {
                    nombre_medicamento,
                    id: { [Op.ne]: id }
                }
            });
            if (inventarioExistente) {
                return res.status(400).json({ mensaje: "El nombre del medicamento ya está en uso" });
            }
        }

        Medicamento.categoria = categoria || Medicamento.categoria;
        Medicamento.nombre_medicamento = nombre_medicamento || Medicamento.nombre_medicamento;
        Medicamento.descripcion = descripcion || Medicamento.descripcion;
        Medicamento.precio = precio || Medicamento.descripcion;
        Medicamento.cantidad = cantidad || Medicamento.cantidad;
        Medicamento.fecha_vence = fecha_vence || Medicamento.fecha_vence;

        await Medicamento.save();

        res.json({ mensaje: "Medicamento actualizado correctamente", Medicamento });

    } catch (error) {
        console.error("Error al editar el medicaento:", error);
        res.status(500).json({ mensaje: "Error al editar el medicamento", error: error.message });
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
