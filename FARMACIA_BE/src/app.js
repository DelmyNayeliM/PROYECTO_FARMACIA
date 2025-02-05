const express = require('express');
const db = require('./configuraciones/conexionbd');
const rutasUsuario = require('./rutas/rutas_usuario'); // Importa las rutas de usuarios
const rutas_pacientes = require('./rutas/rutas_paciente');  // Importa las rutas de pacientes
const rutas_inventario = require('./rutas/rutas_inventario'); // Importa las rutas de inventario
const rutas_citas = require('./rutas/rutas_citas'); // Importa las rutas de la citas

const configurarModelos = require('./configurarmodelos');

const usuarios = require('./modelos/usuarios'); // Importa el modelo
const pacientes = require('./modelos/paciente');  
const inventario = require('./modelos/inventario');
const citas = require('./modelos/citas');

db.sync({ alter: true })  // Modifica la estructura sin borrar datos

    .then(() => {
        console.log('Base de datos sincronizada correctamente.');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });


// Conectar con la base de datos
db.authenticate().then(async () => {
    console.log("Conexión establecida");
    //await configurarmodelo(); // Descomenta si necesitas configuración de modelos adicional
}).catch((error) => {
    console.log("Error: " + error);
});

const app = express();

// Middleware para procesar JSON en solicitudes
app.use(express.json());

// Montar las rutas de usuario
app.use('/usuarios', rutasUsuario);
app.use('/citas', rutas_citas);
app.use('/pacientes', rutas_pacientes);
app.use('/inventario', rutas_inventario);

// Configurar el puerto y escuchar
app.set('port', 3003);
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});
