const { Router } = require('express');
const Cont_log = require('../controladores/controlador_login');
const { contextsKey } = require('express-validator/lib/base');
const rutas=Router();

rutas.post('/login', Cont_log.login);

module.exports=rutas;