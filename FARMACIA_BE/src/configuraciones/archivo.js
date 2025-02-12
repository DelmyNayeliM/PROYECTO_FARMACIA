const multer =require('multer');
const path =require('path');

const almacenamientoPaciente = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../publica/imagen/pacientes'))
    },
    filename: (req,file, cb)=>{
        if(file.mimetype == 'imagen/jpeg' || file.mimetype =='imagen/png' || file.mimetype=='imagen/jpg'){
            const randon = Math.round(Math.random()*(99998-10001))+10001;
            cb(null,
                'paciente'+ Date.now()+'-'+randon+'-'+req.query.id+'-'+file.mimetype.replace('/','.'));
        }
    }
});
exports.guardarImagenPaciente = multer({
    storage: almacenamientoPaciente,
    limits: {
        filesize: 1000000,
    }
});