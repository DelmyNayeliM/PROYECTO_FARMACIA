import React, { useState, useEffect } from 'react';

const Tablero = () => {
  // Estado para el valor de búsqueda y los medicamentos
  const [searchTerm, setSearchTerm] = useState('');
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para hacer la solicitud de búsqueda
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setMedicamentos([]); // Si no hay término de búsqueda, vaciar resultados
      return;
    }

    try {
      setLoading(true); // Mostrar carga mientras se hace la solicitud
      const response = await fetch(`http://localhost:3003/inventario/buscar?nombre_medicamento=${searchTerm}`);
      const data = await response.json();

      if (response.status === 200) {
        setMedicamentos(data); // Si la búsqueda tiene éxito, actualiza los medicamentos
      } else {
        setMedicamentos([]); // Si no hay resultados, limpiar la lista
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda", error);
      setMedicamentos([]); // Limpiar en caso de error
    } finally {
      setLoading(false); // Terminar carga
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      handleSearch();
    } else {
      setMedicamentos([]); // Limpiar los resultados si el campo está vacío
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
            className="form-control w-100"
            placeholder="Buscar por nombre del medicamento"
            value={searchTerm}
            onChange={handleSearchChange} // Captura el texto de la búsqueda
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-responsive table-borderless">
          <thead>
            <tr className="bg-light">
              <th scope="col" width="5%"></th>
              <th scope="col" width="10%" className="text-black">Categoría</th>
              <th scope="col" width="10%" className="text-black">Nombre del Medicamento</th>
              <th scope="col" width="10%" className="text-black">Descripción</th>
              <th scope="col" className="text-end" width="20%">
                <span className="text-black">Precio</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">Cargando...</td>
              </tr>
            ) : medicamentos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron resultados</td>
              </tr>
            ) : (
              medicamentos.map((medicamento) => (
                <tr key={medicamento.id}>
                  <td></td>
                  <td>{medicamento.categoria}</td>
                  <td>{medicamento.nombre_medicamento}</td>
                  <td>{medicamento.descripcion}</td>
                  <td className="text-end">L.{medicamento.precio}</td>
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
