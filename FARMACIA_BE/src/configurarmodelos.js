const modelopacientes = require('./modelos/paciente');
const modeloinventario = require('./modelos/inventario');
const modelocitas = require('./modelos/citas');
const modelousuarios = require('./modelos/usuarios');
const modelocm = require('./modelos/citas');


const sequelize = require('./configuraciones/conexionbd');

exports.configurarModelos = async () => {

    await modelousuarios.sync().then(() => {
        console.log('Modelo usuario creado correctamente');
    })
        .catch((er) => {
            console.log("Error al crear el modelo usuario");
            console.log(er);
        });
        await modeloinventario.sync().then(() => {
            console.log('Modelo inventario creado correctamente');
        })
            .catch((er) => {
                console.log("Error al crear el modelo usuario");
                console.log(er);
            
            });
            await modelopacientes.sync().then(() => {
                console.log('Modelo pacientes creado correctamente');
            })
                .catch((er) => {
                    console.log("Error al crear el modelo usuario");
                    console.log(er);
                
                });
                await modelocitas.sync().then(() => {
                    console.log('Modelo citas creado correctamente');
                })
                    .catch((er) => {
                        console.log("Error al crear el modelo usuario");
                        console.log(er);
                    
                    });
                    await modelocm.sync().then(() => {
                        console.log('Modelo citas_medicamento creado correctamente');
                    })
                        .catch((er) => {
                            console.log("Error al crear el modelo usuario");
                            console.log(er);
                        
                        });
}

