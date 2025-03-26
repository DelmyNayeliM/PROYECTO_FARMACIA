const multer =require('multer');
const path =require('path');

const almacenaPaciente = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../../public/img/paciente'))
    },
    filename: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
            const random = Math.round(Math.random() * (99998 - 10001)) + 10001;
            cb(null, 
                'paciente' + Date.now() + '-' + random + '-' + req.query.id + path.extname(file.originalname));  // Corregir la extensión del archivo
        }
    }    
});
exports.guardarImagenPaciente = multer({
    storage: almacenaPaciente,
    limits: {
        fileSize: 1000000,
    }
}).single('img');
