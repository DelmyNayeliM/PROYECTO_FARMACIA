const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');

const modelopacientes = require('./paciente');
const modeloinventario = require('./inventario'); // este es el modelo que debes usar
// const modelocita = require('./citas'); // esto es circular, no necesitas importarlo aquí

const citas = db.define('citas', {
    fecha_cita: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isDate: true }
    },
    nombre_dr: {
        type: DataTypes.ENUM('Dr. Cristian Muñoz', 'Dr. Kevin Yanes'),
        allowNull: false,
    },
    presion: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            is: /^[0-9]+\/[0-9]+$/ // Formato 120/80
        }
    },
    peso: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        validate: { isNumeric: true }
    },
    ritmo_cardiaco: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    temperatura: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            isNumeric: true,
            min: 35,
            max: 42
        }
    },
    sintomas: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    receta: {
        type: DataTypes.TEXT,
    },
    observaciones: {
        type: DataTypes.TEXT,
    },
    cantidadventa: { // debería ser un número, no string
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medicamentoId: { // campo para relacionar con inventario
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'citas',
    timestamps: true,
    hooks: {
        async afterCreate(cita) {
            try {
                await modeloinventario.decrement('Cantidad', {
                    by: cita.cantidadventa,
                    where: { id: cita.medicamentoId }
                });
            } catch (error) {
                console.error('Error en afterCreate de cita:', error);
            }
        },
    
        async afterBulkCreate(citas) {
            try {
                for (const f of citas) {
                    await modeloinventario.decrement('Cantidad', {
                        by: f.cantidadventa,
                        where: { id: f.medicamentoId }
                    });
                }
            } catch (error) {
                console.error('Error en afterBulkCreate de citas:', error);
            }
        },
    
        async beforeUpdate(cita, options) {
            try {
                // Solo si la cantidadventa o el medicamentoId cambian
                if (cita.changed('cantidadventa') || cita.changed('medicamentoId')) {
                    const prevCita = await cita.constructor.findOne({ where: { id: cita.id } });
    
                    // Revertir la cantidad anterior del inventario
                    await modeloinventario.increment('Cantidad', {
                        by: prevCita.cantidadventa,
                        where: { id: prevCita.medicamentoId }
                    });
    
                    // Descontar la nueva cantidad del inventario
                    await modeloinventario.decrement('Cantidad', {
                        by: cita.cantidadventa,
                        where: { id: cita.medicamentoId }
                    });
                }
            } catch (error) {
                console.error('Error en beforeUpdate de cita:', error);
            }
        }
    }    
});

// Relación: un paciente tiene muchas citas
modelopacientes.hasMany(citas, { foreignKey: 'pacienteId' });
citas.belongsTo(modelopacientes, { foreignKey: 'pacienteId' });

// Relación: un medicamento (inventario) tiene muchas citas
modeloinventario.hasMany(citas, { foreignKey: 'medicamentoId' });
citas.belongsTo(modeloinventario, { foreignKey: 'medicamentoId' });

module.exports = citas;
