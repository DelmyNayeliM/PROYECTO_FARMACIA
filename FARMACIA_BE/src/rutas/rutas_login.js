const { Router } = require('express');
const Cont_log = require('../controladores/controlador_login');
const rutas = Router();

rutas.post('/login', Cont_log.login);  

module.exports = rutas;
