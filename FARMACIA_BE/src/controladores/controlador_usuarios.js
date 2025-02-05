const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const usuarios = require('../modelos/usuarios');

// Ruta de inicio
exports.inicio = (req, res) => {
    const objeto = {
        titulo: 'Rutas de Usuarios',
    };
    res.json(objeto);
};

// Ruta para guardar un nuevo usuario
exports.guardar = async (req, res) => {
    const { tipo_usuario, nombre, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await usuarios.findOne({ where: { nombre } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Crear el nuevo usuario
        const nuevoUsuario = await usuarios.create({
            tipo_usuario,
            nombre,
            password,
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al guardar el usuario', error });
    }
};

// Ruta para listar todos los usuarios
exports.listar = async (req, res) => {
    try {
        const listaUsuarios = await usuarios.findAll();
        res.status(200).json(listaUsuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
    }
};

exports.editar = async (req, res) => {
    const { id } = req.query;
    const { nombre, password } = req.body;

    try {
        const usuario = await usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.password = password ? await bcrypt.hash(password, 10) : usuario.password;

        await usuario.save();
        res.json({ mensaje: "Usuario actualizado correctamente", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al editar el usuario", error });
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
        const usuario = await usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msj: 'El usuario no existe' });
        }

        await usuario.destroy();
        res.status(200).json({ msj: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Error al eliminar el usuario', error });
    }
};
