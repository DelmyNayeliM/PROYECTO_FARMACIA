const usuario  = require('../modelos/usuarios');

exports.login=async(req, res )=>{
    const {tipo_usuario, nombre, password } = req.body;
    try{
        const buscarusuario = await usuario.findOne({
            where:{nombre:nombre}
        });
        if(!buscarusuario){
            console.log(msj,"Usuario no encontrado");
            res.json({error:"Usuario incorrecto"});
        }
        if(buscarusuario.contrasena!=password){
            console.log(msj,"contraseña no encontrado");
            res.json({error:"contraseña incorrecta"});
        }
    }
};