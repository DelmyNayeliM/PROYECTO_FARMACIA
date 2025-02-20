import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioRegistro from './FormularioRegistro';
import Tablero from './tablero';  // Asumiendo que el componente Tablero ya está creado

import { medicamentoguardar } from '../configuraciones/apiURLS';

const MedicamentosApp = () => {
const [medicamentos, setMedicamentos] = useState([]);  // Inicializa como un array vacío
const [medicamentoEditado, setMedicamentoEditado] = useState(null);

  // Cargar los medicamentos desde el backend cuando el componente se monta
  useEffect(() => {
    const obtenerMedicamentos = async () => {
      try {
        const response = await axios.get('http://localhost:3003/inventario');
        setMedicamentos(response.data);
      } catch (error) {
        console.error('Error al obtener medicamentos:', error);
      }
    };

    obtenerMedicamentos();
  }, []);

  // Función para agregar un medicamento al estado
  const agregarMedicamento = (nuevoMedicamento) => {
    setMedicamentos([...medicamentos, nuevoMedicamento]);
  };

  // Función para editar un medicamento en el estado
  const editarMedicamento = (medicamentoEditado) => {
    setMedicamentoEditado(medicamentoEditado);
  };

  // Función para eliminar un medicamento en el estado
  const eliminarMedicamento = (id) => {
    setMedicamentos(medicamentos.filter(med => med._id !== id));
  };

  return (
    <div>
      <h1>Gestión de Medicamentos</h1>

      {/* Componente de formulario */}
      <FormularioRegistro
        medicamentoEditado={medicamentoEditado}
        agregarMedicamento={agregarMedicamento}
        editarMedicamento={editarMedicamento}
        eliminarMedicamento={eliminarMedicamento}
      />

      {/* Componente Tablero */}
      <Tablero medicamentos={medicamentos} eliminarMedicamento={eliminarMedicamento} />
    </div>
  );
};

export default MedicamentosApp;
