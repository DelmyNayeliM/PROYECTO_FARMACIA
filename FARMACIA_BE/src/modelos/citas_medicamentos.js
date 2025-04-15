const { DataTypes } = require('sequelize');
const db = require('../configuraciones/conexionbd');
const modeloinventario = require('./inventario');
const citas = require('./citas');

const citaMedicamentos = db.define(
  'cita_medicamentos',
  {
    cantidadmedicamento: {
      type: DataTypes.STRING(20),
      allowNull: false,  // Asegura que la cantidad es obligatoria
    }
  },
  {
    tableName: 'cita_medicamentos',
    timestamps: false,  // No necesitamos timestamps en esta tabla intermedia
  }
);

// Relación muchos a muchos entre citas e inventarios
citas.belongsToMany(modeloinventario, {
  through: citaMedicamentos, // Tabla intermedia
  foreignKey: 'citaId',
});
modeloinventario.belongsToMany(citas, {
  through: citaMedicamentos, // Tabla intermedia
  foreignKey: 'medicamentoId',
});

module.exports = citaMedicamentos;
