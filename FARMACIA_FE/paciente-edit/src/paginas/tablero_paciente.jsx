import React, { useState, useEffect } from 'react';

const TableroPaciente = () => {
  // Estado para el valor de búsqueda y los pacientes
  const [searchTerm, setSearchTerm] = useState('');
  const [Paciente, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para hacer la solicitud de búsqueda
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setPacientes([]); // Si no hay término de búsqueda, vaciar resultados
      return;
    }

    try {
      setLoading(true); // Mostrar carga mientras se hace la solicitud
      const response = await fetch(`http://localhost:3003/paciente=${searchTerm}`);
      const data = await response.json();

      if (response.status === 200) {
        setPacientes(data); // Si la búsqueda tiene éxito, actualiza los pacientes
      } else {
        setPacientes([]); // Si no hay resultados, limpiar la lista
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda", error);
      setPacientes([]); // Limpiar en caso de error
    } finally {
      setLoading(false); // Terminar carga
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      handleSearch();
    } else {
      setPacientes([]); // Limpiar los resultados si el campo está vacío
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
            placeholder="Buscar por nombre del paciente"
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
              <th scope="col" width="10%" className="text-black">Tipo Paciente</th>
              <th scope="col" width="10%" className="text-black">Tipo Empleado</th>
              <th scope="col" width="10%" className="text-black">Nombre Completo</th>
              <th scope="col" width="10%" className="text-black">Clave empleado</th>
              <th scope="col" width="10%" className="text-black">Clave expediente</th>
              <th scope="col" width="10%" className="text-black">Foto paciente</th>
              <th scope="col" width="10%" className="text-black">Telefono</th>
              <th scope="col" width="10%" className="text-black">Edad</th>
              <th scope="col" width="10%" className="text-black">Dirección</th>
              <th scope="col" width="10%" className="text-black">Correo</th>
              <th scope="col" className="text-end" width="20%">
                <span className="text-black">Enfermedad base</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">Cargando...</td>
              </tr>
            ) : Paciente.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron resultados</td>
              </tr>
            ) : (
              Paciente.map((paciente) => (
                <tr key={paciente.id}>
                  <td></td>
                  <td>{paciente.tipo_paciente}</td>
                  <td>{paciente.tipo_empleado}</td>
                  <td>{paciente.nombre_completo}</td>
                  <td>{paciente.clave_empleado}</td>
                  <td>{paciente.clave_expediente}</td>
                  <td>{paciente.foto_paciente}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.edad}</td>
                  <td>{paciente.direccion}</td>
                  <td>{paciente.correo}</td>
                  <td className="text-end">{paciente.enfermedad_base}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableroPaciente;
