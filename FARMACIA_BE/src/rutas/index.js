const { Router } = require("express");
const rutas = Router();
rutas.get('/', (req,res)=>{
    res.send('Ruta de prueba funcional.');
});
module.exports = rutas;