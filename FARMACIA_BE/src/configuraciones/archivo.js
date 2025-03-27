const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/paciente'));
    },
    filename: (req, file, cb) => {
        const userid = req.params.id || 'default-user';
        const extension = path.extname(file.originalname).toLowerCase();

        const fileName = `user-${Date.now()}-${userid}${extension}`;

        console.log('Archivo guardado como:', fileName);

        cb(null, fileName);
    }    
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato no válido, solo se permiten imágenes'), false);
    }
};

// Configuración de Multer
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter
}).single('img');

module.exports = upload;




{/*exports.guardarImagenPaciente = multer({
    storage: almacenaPaciente,
    limits: {
        fileSize: 1000000,
    }
}).single('img');
*/}

{/*const multer =require('multer');
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
*/}