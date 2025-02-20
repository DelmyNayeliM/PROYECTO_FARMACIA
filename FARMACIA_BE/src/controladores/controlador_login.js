const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const usuarios = require('../modelos/usuarios');

// Ruta de login
exports.login = async (req, res) => {
    const { nombre, password } = req.body;

    // Validación de los campos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Buscar al usuario por su nombre
        const usuario = await usuarios.findOne({ where: { nombre } });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const esValido = await usuario.verificarPassword(password); // Usa el método de verificar contraseña que agregamos en el modelo
        if (!esValido) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, responder con un mensaje de éxito
        res.status(200).json({ mensaje: 'Login exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al intentar hacer login', error });
    }
};
