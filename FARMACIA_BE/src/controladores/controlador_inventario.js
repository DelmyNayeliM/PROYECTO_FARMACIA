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
    const { categoria, nombre_medicamento, descripcion, precio, cantidad } = req.body;

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
            cantidad
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
        fecha_cita,
        nombre_dr,
        nombre_paciente,
        presion,
        peso,
        ritmo_cardiaco,
        temperatura,
        sintomas,
        receta,
        observaciones,
        nombre_medicamento,
        cantidadventa
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

        const cita = await Citas.findByPk(id);
        if (!cita) {
            return res.status(404).json({ mensaje: "La cita no existe" });
        }

        if (nombre_paciente) {
            const citaExistente = await cita.findOne({
                where: {
                    nombre_paciente,
                    id: { [Op.ne]: id }
                }
            });
            if (citaExistente) {
                return res.status(400).json({ mensaje: "El nombre del paciente ya está en uso" });
            }
        }

        cita.fecha_cita = fecha_cita || cita.fecha_cita;
        cita.nombre_dr = nombre_dr || cita.nombre_dr;
        cita.nombre_paciente = nombre_paciente || cita.nombre_paciente;
        cita.presion = presion || cita.presion;
        cita.peso = peso || cita.peso;
        cita.ritmo_cardiaco = ritmo_cardiaco || cita.ritmo_cardiaco;
        cita.temperatura = temperatura || cita.temperatura;
        cita.sintomas = sintomas || cita.sintomas;
        cita.receta = receta || cita.receta;
        cita.observaciones = observaciones || cita.observaciones;
        cita.nombre_medicamento = nombre_medicamento || cita.nombre_medicamento;
        cita.cantidadventa = cantidadventa || cita.cantidadventa;

        await cita.save();

        res.json({ mensaje: "Cita actualizada correctamente", cita });

    } catch (error) {
        console.error("Error al editar la cita:", error);
        res.status(500).json({ mensaje: "Error al editar la cita", error: error.message });
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
