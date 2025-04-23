const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const Pacientes = require('../modelos/paciente');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const db = require('../configuraciones/conexionbd');
const { uploadImagenPaciente } = require('../configuraciones/archivo2');

// Ruta de inicio
exports.inicio = (req, res) => {
    const objeto = {
        titulo: 'Rutas de Pacientes',
    };
    res.json(objeto);
};

// Ruta para listar todos los usuarios
exports.listar = async (req, res) => {
    try {
        const listapacientes = await Pacientes.findAll();
        res.status(200).json(listapacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pacientes', error });
    }
};

exports.validarImagenPaciente = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    else {
        uploadImagenPaciente(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({ msj: "Hay errores al cargar la imagen", error: err });
            }
            else if (err) {
                res.status(400).json({ msj: "Hay errores al cargar la imagen", error: err });
            }
            else {
                next();
            }
        });
    }
};

exports.createPaciente = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const t = await db.transaction();
    try {
        const { tipo_paciente,
            tipo_empleado,
            nombre_completo,
            clave_empleado,
            clave_expediente,
            foto_paciente,
            telefono,
            edad,
            direccion,
            correo,
            enfermedad_base } = req.body;
        const imagen = req.file ? (fs.existsSync(path.join(__dirname, '../../public/img/paciente/', req.file.filename)) ? req.file.filename : null) : null;
        const nuevoP = await Pacientes.create({
            tipo_paciente,
            tipo_empleado,
            nombre_completo,
            clave_empleado,
            clave_expediente,
            foto_paciente,
            telefono,
            edad,
            direccion,
            correo,
            enfermedad_base,
            imagen: imagen
        }, { transaction: t });
        await t.commit();
        res.status(201).json(nuevoP);
    } catch (error) {
        await t.rollback();
        console.error("Error al crear un paciente:", error);
        res.status(500).json({ error: "Error al crear el tipo de producto" });
    }
};

exports.editar = async (req, res) => {
    const { id } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const t = await db.transaction();
    try {
        const paciente = await Pacientes.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ mensaje: "El paciente no existe" });
        }

        const {
            tipo_paciente,
            tipo_empleado,
            nombre_completo,
            clave_empleado,
            clave_expediente,
            foto_paciente,
            telefono,
            edad,
            direccion,
            correo,
            enfermedad_base
        } = req.body;

        // Verifica duplicado de nombre
        if (nombre_completo) {
            const pacienteExistente = await Pacientes.findOne({
                where: {
                    nombre_completo,
                    id: { [Op.ne]: id }
                }
            });
            if (pacienteExistente) {
                return res.status(400).json({ mensaje: "El nombre del paciente ya está en uso" });
            }
        }

        // Imagen nueva si se subió
        let imagenNueva = paciente.imagen;
        if (req.file) {
            const imagenPath = path.join(__dirname, '../../public/img/paciente/', req.file.filename);

            if (fs.existsSync(imagenPath)) {
                imagenNueva = req.file.filename;

                // Si ya tenía una imagen anterior, eliminarla
                if (paciente.imagen) {
                    const rutaAnterior = path.join(__dirname, '../../public/img/paciente/', paciente.imagen);
                    if (fs.existsSync(rutaAnterior)) {
                        fs.unlinkSync(rutaAnterior); // Eliminar imagen anterior
                    }
                }
            }
        }

        // Actualización
        await paciente.update({
            tipo_paciente: tipo_paciente ?? paciente.tipo_paciente,
            tipo_empleado: tipo_empleado ?? paciente.tipo_empleado,
            nombre_completo: nombre_completo ?? paciente.nombre_completo,
            clave_empleado: clave_empleado ?? paciente.clave_empleado,
            clave_expediente: clave_expediente ?? paciente.clave_expediente,
            foto_paciente: foto_paciente ?? paciente.foto_paciente,
            telefono: telefono ?? paciente.telefono,
            edad: edad ?? paciente.edad,
            direccion: direccion ?? paciente.direccion,
            correo: correo ?? paciente.correo,
            enfermedad_base: enfermedad_base ?? paciente.enfermedad_base,
            imagen: imagenNueva
        }, { transaction: t });

        await t.commit();
        res.json({ mensaje: "Paciente actualizado correctamente", paciente });

    } catch (error) {
        await t.rollback();
        console.error("Error al editar paciente:", error);
        res.status(500).json({ mensaje: "Error al editar el paciente", error });
    }
};

// Ruta para eliminar un usuario
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
        const paciente = await Pacientes.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ msj: 'El paciente no existe' });
        }

        await paciente.destroy();
        res.status(200).json({ msj: 'Paciente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al eliminar el paciente', error });
    }
};