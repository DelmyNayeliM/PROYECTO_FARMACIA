import React, { useState, useEffect } from 'react';

const TableroPaciente = () => {
  // Estado para el valor de búsqueda y los pacientes
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nombre_completo, setNombre_completo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [foto_paciente, setFoto_paciente] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto_paciente(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nombre_completo === '' ||
      telefono === '' ||
      edad === '' ||
      direccion === '' ||
      correo === ''
    ) {
      console.log('Por favor, complete todos los campos');
      return;
    }

    try {
      let fotoPacienteUrl = foto_paciente;
      if (foto_paciente && typeof foto_paciente !== 'string') {
        const formData = new FormData();
        formData.append('file', foto_paciente);
        const response = await fetch('/guardarImagenPaciente', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        fotoPacienteUrl = data.imageUrl;
      }

      const pacienteData = {
        nombre_completo,
        telefono,
        edad,
        direccion,
        correo,
        foto_paciente: fotoPacienteUrl,
      };

      const response = await fetch('http://localhost:3003/guardarPaciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteData),
      });

      if (response.ok) {
        alert('Paciente registrado correctamente');
        setNombre_completo('');
        setTelefono('');
        setEdad('');
        setDireccion('');
        setCorreo('');
        setFoto_paciente(null);
        setFotoPreview(null);
      } else {
        alert('Hubo un error al registrar el paciente');
      }
    } catch (error) {
      console.error("Error al guardar paciente", error);
      alert('Hubo un error al guardar el paciente');
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
            ) : pacientes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron resultados</td>
              </tr>
            ) : (
              pacientes.map((paciente) => (
                <tr key={paciente.id}>
                  <td></td>
                  <td>{paciente.tipo_paciente}</td>
                  <td>{paciente.tipo_empleado}</td>
                  <td>{paciente.nombre_completo}</td>
                  <td>{paciente.clave_empleado}</td>
                  <td>{paciente.clave_expediente}</td>
                  <td>
                    {paciente.foto_paciente && (
                      <img
                        src={paciente.foto_paciente}
                        alt="Foto paciente"
                        style={{ width: '50px', height: '50px' }}
                      />
                    )}
                  </td>
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

      {/* Formulario para agregar o editar pacientes */}
      <div className="mt-5">
        <h3>Registrar Paciente</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input
              type="text"
              className="form-control"
              value={nombre_completo}
              onChange={(e) => setNombre_completo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Edad:</label>
            <input
              type="number"
              className="form-control"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              className="form-control"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Foto del Paciente:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          {fotoPreview && (
            <div className="form-group">
              <h5>Vista Previa de la Foto:</h5>
              <img src={fotoPreview} alt="Vista previa" className="img-thumbnail" style={{ maxWidth: '200px' }} />
            </div>
          )}
          <button type="submit" className="btn btn-primary">Registrar Paciente</button>
        </form>
      </div>
    </div>
  );
};

export default TableroPaciente;
