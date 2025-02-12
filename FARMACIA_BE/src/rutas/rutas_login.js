const { Router } = require('express');
const controladorlogin = require('../controladores/controlador_login');
const rutas  = Router();

rutas.post('/login', controladorlogin);

module.exports= rutas;