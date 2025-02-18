exports.login = async (req, res) => {
    const { nombre, password } = req.body;

    console.log('Intentando iniciar sesión con usuario:', nombre); // Log para verificar

    try {
        const buscarusuario = await usuario.findOne({
            where: { nombre: nombre }
        });

        if (!buscarusuario) {
            console.log("Usuario no encontrado");
            return res.status(400).json({ error: "Usuario incorrecto" });
        }

        console.log('Usuario encontrado:', buscarusuario); // Log de usuario encontrado

        const passwordMatch = await bcrypt.compare(password, buscarusuario.password);
        if (!passwordMatch) {
            console.log("Contraseña incorrecta");
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        console.log("Login exitoso");
        return res.status(200).json({ mensaje: "Inicio de sesión exitoso", usuario: buscarusuario }); // Respuesta clara
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
