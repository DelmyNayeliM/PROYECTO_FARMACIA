const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const citas = require('../modelos/citas');
//const citaMedicamentos = require('../modelos/citas_medicamentos');
//const moment = require('moment');

// Ruta de inicio
exports.inicio = (req, res) => {
    const objeto = { titulo: 'Rutas de citas' };
    res.json(objeto);
};

// Ruta para guardar una nueva cita
exports.guardar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            fecha_cita,
            nombre_dr,
            pacienteId,
            presion,
            peso,
            ritmo_cardiaco,
            temperatura,
            sintomas,
            receta,
            observaciones,
            medicamentoId,
            cantidadventa
        } = req.body;

        // Validar si ya existe una cita para el mismo paciente en la misma fecha
        const citaExistente = await citas.findOne({
            where: {
                fecha_cita,
                pacienteId
            }
        });

        if (citaExistente) {
            return res.status(400).json({
                mensaje: "Este paciente ya tiene una cita registrada en esa fecha"
            });
        }

        const nuevaCita = await citas.create({
            fecha_cita,
            nombre_dr,
            pacienteId,
            presion,
            peso,
            ritmo_cardiaco,
            temperatura,
            sintomas,
            receta,
            observaciones,
            medicamentoId,
            cantidadventa
        });

        res.status(201).json(nuevaCita);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar la cita', error });
    }
};

// Ruta para listar todas las citas
exports.listar = async (req, res) => {
    try {
        const listacitas = await citas.findAll();
        res.status(200).json(listacitas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las citas', error });
    }
};

// Ruta para editar una cita
exports.editar = async (req, res) => {
    const { id } = req.query;  // Se obtiene el id de la query string
    const { fecha_cita, nombre_dr, PacienteId, presion, peso, ritmo_cardiaco, temperatura, sintomas, receta, observaciones, inventarioId, cantidadventa } = req.body;

    // Validar que el id esté presente y sea un número
    if (!id || isNaN(id)) {
        return res.status(400).json({ mensaje: "El ID es obligatorio y debe ser un número entero" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const cita = await citas.findByPk(id);
        if (!cita) {
            return res.status(404).json({ mensaje: "La cita no existe" });
        }

        if (fecha_cita) {
            const citaExistente = await citas.findOne({
                where: {
                    fecha_cita,
                    PacienteId,
                    id: { [Op.ne]: id }
                }
            });
            if (citaExistente) {
                return res.status(400).json({ mensaje: "Este paciente ya tiene una cita en esa fecha" });
            }
        }

        // Actualización de la cita
        cita.fecha_cita = fecha_cita || cita.fecha_cita;
        cita.nombre_dr = nombre_dr || cita.nombre_dr;
        cita.PacienteId = PacienteId || cita.PacienteId;
        cita.presion = presion || cita.presion;
        cita.peso = peso || cita.peso;
        cita.ritmo_cardiaco = ritmo_cardiaco || cita.ritmo_cardiaco;
        cita.temperatura = temperatura || cita.temperatura;
        cita.sintomas = sintomas || cita.sintomas;
        cita.receta = receta || cita.receta;
        cita.observaciones = observaciones || cita.observaciones;
        cita.inventarioId = inventarioId || cita.inventarioId;
        cita.cantidadventa = cantidadventa || cita.cantidadventa;

        await cita.save();
        res.status(200).json({ mensaje: "Cita actualizada correctamente", cita });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al editar la cita", error });
    }
};

// Ruta para eliminar una cita
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
        const cita = await citas.findByPk(id);
        if (!cita) {
            return res.status(404).json({ msj: 'La cita no existe' });
        }

        await cita.destroy();
        res.status(200).json({ msj: 'Cita eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al eliminar la cita', error });
    }
};

