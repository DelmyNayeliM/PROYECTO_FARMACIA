import '../css/tablero.css'; 
import React, { useState, useEffect } from 'react';

const Tablero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cita, setCita] = useState({ actualizar: '' }); // Cambia a objeto

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleCantidadVentaChange = (e) => {
    setCita({ ...cita, actualizar: e.target.value });
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setMedicamentos([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3003/inventario/buscar?nombre_medicamento=${searchTerm}`);
      const data = await response.json();

      if (response.status === 200) {
        const cantidadVenta = parseInt(cita.cantidadventa) || 0;
        const medicamentosConCantidadRestante = data.map(medicamento => ({
          ...medicamento,
          cantidadRestante: medicamento.cantidad - cantidadVenta
        }));
        setMedicamentos(medicamentosConCantidadRestante);
      } else {
        setMedicamentos([]);
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda", error);
      setMedicamentos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      handleSearch();
    } else {
      setMedicamentos([]);
    }
  }, [searchTerm, cita.cantidadventa]); // <-- Aquí

  return (
    <div className="container mt-5 px-2">
      {/* Campo de búsqueda */}
      <input
        type="text"
        className="form-control search-input"
        placeholder="nombre medicamento"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Tabla de resultados */}
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr className="bg-light">
              <th>Categoría</th>
              <th>Nombre del Medicamento</th>
              <th>Descripción</th>
              <th>Fecha Vencimiento</th>
              <th>Precio</th>
              <th className="text-end">Cantidad Restante</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">Cargando...</td>
              </tr>
            ) : medicamentos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No se encontraron resultados</td>
              </tr>
            ) : (
              medicamentos.map((medicamento) => (
                <tr key={medicamento.id}>
                  <td>{medicamento.categoria}</td>
                  <td>{medicamento.nombre_medicamento}</td>
                  <td>{medicamento.descripcion}</td>
                  <td>{medicamento.fecha_vence}</td>
                  <td>L.{medicamento.precio}</td>
                  <td className="text-end">{medicamento.cantidadRestante}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tablero;