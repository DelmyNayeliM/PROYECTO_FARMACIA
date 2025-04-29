import '../css/tablero.css';
import React, { useState, useEffect } from 'react';

const Tablero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cita, setCita] = useState({ actualizar: '' });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

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
  }, [searchTerm, cita.cantidadventa]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-5 px-2">
      {/* Buscador y botón: solo en pantalla */}
      <div className="no-print">
        <input
          type="text"
          className="form-control search-input"
          placeholder="nombre medicamento"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="my-3">
          <button className="btn btn-primary" onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </div>

      {/* Tabla completa para vista normal */}
      <div className="table-responsive no-print">
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

      {/* Tabla simplificada solo para impresión */}
      <div className="print-only">
  {/* Logo en la esquina superior derecha */}
  <img
    src="https://www.enteoperador.org/wp-content/uploads/2024/10/ENEE-logo-1.png"
    alt="Logo"
    className="print-logo"
  />

  {/* Fecha de generación */}
  <p style={{ marginBottom: '20px' }}>
    Reporte generado el {new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}
  </p>

  {/* Tabla simplificada */}
  <table className="table-print">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Fecha de Vencimiento</th>
        <th>Cantidad Restante</th>
      </tr>
    </thead>
    <tbody>
      {medicamentos.map((medicamento) => (
        <tr key={medicamento.id}>
          <td>{medicamento.id}</td>
          <td>{medicamento.nombre_medicamento}</td>
          <td>{medicamento.fecha_vence}</td>
          <td>{medicamento.cantidadRestante}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Tablero;
