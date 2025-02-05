const modelopacientes = require('./modelos/paciente');
const modeloinventario = require('./modelos/inventario');
const modelocitas = require('./modelos/citas');

const sequelize = require('./configuraciones/conexionbd');

async function configurarModelos() {
    try {
        // Relación de uno a muchos: Un paciente puede tener muchas citas
        modelopacientes.hasMany(modelocitas);  // Un paciente tiene muchas citas
        modelocitas.belongsTo(modelopacientes); // Cada cita pertenece a un solo paciente

        // Relación de uno a muchos: Un inventario puede estar relacionado con muchas citas
        modeloinventario.hasMany(modelocitas);  // Un inventario puede estar relacionado con muchas citas
        modelocitas.belongsTo(modeloinventario); // Cada cita pertenece a un solo inventario (medicamento)

        // Sincronizar todos los modelos
        await sequelize.sync();
        console.log("Modelos generados exitosamente");
        
    } catch (error) {
        console.error("Error al configurar los modelos:", error);
    }
}

module.exports = configurarModelos;
