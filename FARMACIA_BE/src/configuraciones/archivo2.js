const multer = require("multer");
const path = require("path");
const sharp = require('sharp');

exports.resizeImage = async (file) => {
    const { buffer } = file; const { size } = buffer;
    const maxSize = 1 * 1024 * 1024; // 1MB 
    if (size > maxSize) { // Redimensiona la imagen si es mayor a 1MB 
        const resizedBuffer = await sharp(buffer).resize({ width: 800 }) // Puedes ajustar el tamaño según tus necesidades 
            .toBuffer(); return resizedBuffer;
    }
    return buffer;
};

const diskStoragePacientes = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/paciente"));
    },

    filename: (req, file, cb) => {
        if (
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg"
        ) {
            const uniqueSuffix = Math.round(Math.random() * (99998 - 10001)) + 10001;

            cb(
                null,
                "paciente-" +
                Date.now() +
                uniqueSuffix +
                "-" +
                file.mimetype.replace("/", ".")
            );
        }
    },
});

exports.uploadImagenPaciente = multer({
    storage: diskStoragePacientes,
    fileFilter: (req, file, cb) => {

        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Solo archivos png, jpeg o jpg"));
        }
    },
    limits: {
        fileSize: 1000000, // 1MB
    },
}).single("imagen");