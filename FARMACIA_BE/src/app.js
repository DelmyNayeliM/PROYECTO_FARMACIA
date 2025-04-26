const express = require('express');
const db = require('./configuraciones/conexionbd');
const rutasUsuario = require('./rutas/rutas_usuario'); // Importa las rutas de usuarios
const rutas_pacientes = require('./rutas/rutas_paciente');  // Importa las rutas de pacientes
const rutas_inventario = require('./rutas/rutas_inventario'); // Importa las rutas de inventario
const rutas_citas = require('./rutas/rutas_citas'); // Importa las rutas de citas
const rutasLogin = require('./rutas/rutas_login');
const path = require('path');
const cors = require('cors');
const { configurarModelos } = require('../src/configurarmodelos');

const corsOptions = {
    origin: 'http://localhost:3000',  // Origen permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  
};
const app = express();

// Middleware para procesar JSON en solicitudes
app.use(express.json());
app.use(cors(corsOptions)); // CORS debe ir antes de las rutas
app.use("/imagenes", express.static(path.join(__dirname, "../public/img")));

//Sincronización y conexión a la base de datos

db.sync({ alter: true })  
    .then(() => console.log('Base de datos sincronizada correctamente.'))
    .catch(error => console.error('Error al sincronizar la base de datos:', error));

db.authenticate()
    .then(() => {console.log("Conexión establecida");configurarModelos();
})
.catch(error => console.log("Error: " + error));

// Montar las rutas
app.use('/usuarios', rutasUsuario);
app.use('/citas', rutas_citas);
app.use('/pacientes', rutas_pacientes);
app.use('/inventario', rutas_inventario);
app.use("/inicio", rutasLogin);

// Configurar el puerto y escuchar
app.set('port', 3003);
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});
