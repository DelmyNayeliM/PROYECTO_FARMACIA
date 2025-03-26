const modelopacientes = require('./modelos/paciente');
const modeloinventario = require('./modelos/inventario');
const modelocitas = require('./modelos/citas');

const sequelize = require('./configuraciones/conexionbd');

async function configurarModelos() {
    try {
        // Relación de uno a muchos: Un paciente puede tener muchas citas
        modelopacientes.hasMany(modelocitas, { foreignKey: 'nombre_completo' });  // Un paciente tiene muchas citas
        modelocitas.belongsTo(modelopacientes, { foreignKey: 'nombre_paciente' }); // Cada cita pertenece a un solo paciente

        // Relación de uno a muchos: Un inventario puede estar relacionado con muchas citas
        modeloinventario.hasMany(modelocitas, { foreignKey: 'nombre_medicamento' });  // Un inventario puede estar relacionado con muchas citas
        modelocitas.belongsTo(modeloinventario, { foreignKey: 'nombre_medicamento' }); // Cada cita pertenece a un solo inventario (medicamento)

        // Sincronizar todos los modelos con la base de datos
        await sequelize.sync();
        console.log("Modelos generados exitosamente");
        
    } catch (error) {
        console.error("Error al configurar los modelos:", error);
        throw error; 
    }
}

module.exports = configurarModelos;
