const { Op } = require('sequelize'); // Asegúrate de importar Op
const { validationResult } = require('express-validator');
const pacientes = require('../modelos/paciente');


// Ruta de inicio
exports.inicio = (req, res) => {
    const objeto = {
        titulo: 'Rutas de Pacientes',
    };
    res.json(objeto);
};

// Ruta para guardar un nuevo usuario
exports.guardar = async (req, res) => {
    const { tipo_paciente, tipo_empleado, nombre_completo, clave_empleado, clave_expediente, foto_paciente, telefono, edad, direccion, correo, enfermedad_base } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar si el usuario ya existe
        const pacienteExistente = await pacientes.findOne({ where: { nombre_completo } });
        if (pacienteExistente) {
            return res.status(400).json({ mensaje: 'El paciente ya existe' });
        }

        // Crear el nuevo usuario
        const nuevopaciente = await pacientes.create({
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
        });

        res.status(201).json(nuevopaciente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar el paciente', error });
    }
};

// Ruta para listar todos los usuarios
exports.listar = async (req, res) => {
    try {
        const listapacientes = await pacientes.findAll();
        res.status(200).json(listapacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pacientes', error });
    }
};

exports.editar = async (req, res) => {
    const { id } = req.query; // Obtener id de la query
    const { tipo_paciente, tipo_empleado, nombre_completo, clave_empleado, clave_expediente, foto_paciente, telefono, edad, direccion, correo, enfermedad_base } = req.body;

    // Validar errores de Express Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Buscar el paciente por ID
        const paciente = await pacientes.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ mensaje: "El paciente no existe" });
        }

        // Verificar si el nombre ya está en uso por otro paciente
        if (nombre_completo) {
            const pacienteExistente = await pacientes.findOne({
                where: {
                    nombre_completo,
                    id: { [Op.ne]: id } // Verifica que el nombre no pertenezca al mismo paciente
                }
            });
            if (pacienteExistente) {
                return res.status(400).json({ mensaje: "El nombre del paciente ya está en uso" });
            }
        }

        // Actualizar los campos
        paciente.tipo_paciente = tipo_paciente || paciente.tipo_paciente;
        paciente.tipo_empleado = tipo_empleado || paciente.tipo_empleado;
        paciente.nombre_completo = nombre_completo || paciente.nombre_completo;
        paciente.clave_empleado = clave_empleado || paciente.clave_empleado;
        paciente.clave_expediente = clave_expediente || paciente.clave_expediente;
        paciente.foto_paciente = foto_paciente || paciente.foto_paciente;
        paciente.telefono = telefono || paciente.telefono;
        paciente.edad = edad || paciente.edad;
        paciente.direccion = direccion || paciente.direccion;
        paciente.correo = correo || paciente.correo;
        paciente.enfermedad_base = enfermedad_base || paciente.enfermedad_base;

        await paciente.save();
        res.json({ mensaje: "Paciente actualizado correctamente", paciente });

    } catch (error) {
        console.error(error);
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
        const paciente = await pacientes.findByPk(id);
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
