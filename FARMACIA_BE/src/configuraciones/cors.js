const cors = {
    origin: '*',  // Permite solicitudes de cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  // Habilita el uso de credenciales (cookies, autenticación, etc.)
};

module.exports = cors;
