import '../css/tablero.css'; 
import React, { useState, useEffect } from 'react';

const Tablero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cita,setCita] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setMedicamentos([]); // Si no hay término de búsqueda, vaciar resultados
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3003/inventario/buscar?nombre_medicamento=${searchTerm}`);
      const data = await response.json();
  
      if (response.status === 200) {
        const cantidadVenta = cita.length > 0 ? parseInt(cita[0].cantidadventa) : 0; // Aseguramos que sea un número

        const medicamentosConCantidadRestante = data.map(medicamento => ({
          ...medicamento,
          cantidadRestante: medicamento.cantidad - cantidadVenta // Realizamos la resta correctamente
        }));
  
        // Asegurarnos de que la cantidad restante sea un número, en caso de algún error
        setMedicamentos(medicamentosConCantidadRestante);
      } else {
        setMedicamentos([]);
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda", error);
      setMedicamentos([]);
      setCita([]); // Limpiar también la cita en caso de error
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
  }, [searchTerm]);

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <div className="position-relative">
          <span className="position-absolute search">
            <i className="fa fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control search-input"
            placeholder="nombre medicamento"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr className="bg-light">
              <th scope="col">Categoría</th>
              <th scope="col">Nombre del Medicamento</th>
              <th scope="col">Descripción</th>
              <th scope="col">Fecha Vencimiento</th>
              <th scope="col" className="text-end">Precio</th>
              <th scope="col" className="text-end">Cantidad Restante</th>
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
