import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { pacienteguardar, pacienteeditar, pacienteeliminar, pacientebuscar } from '../configuraciones/apiURLS';

const Formulariopaciente = ({ pacienteid }) => {
  const [tipo_paciente, setTipoPaciente] = useState('');
  const [tipo_empleado, setTipoEmpleado] = useState('');
  const [nombre_completo, setNombreComp] = useState('');
  const [clave_empleado, setClaveEmpl] = useState('');
  const [clave_expediente, setClaveExpe] = useState('');
  const [foto_paciente, setFotopaciente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [enfermedad_base, setEnfermedad] = useState('');
  const [id, setId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pacienteResultados, setPacienteResultados] = useState([]);
  const [fotoPreview, setFotoPreview] = useState(null); // Estado para la vista previa de la foto

  useEffect(() => {
    const fetchPacientes = async () => {
      if (!id) return; // Si no hay ID, no hacer nada
      try {
        const response = await axios.get(`${pacienteid}/${id}`);
        if (response.status === 200) {
          const paciente = response.data;
          setTipoPaciente(paciente.tipo_paciente);
          setTipoEmpleado(paciente.tipo_empleado);
          setNombreComp(paciente.nombre_completo);
          setClaveEmpl(paciente.clave_empleado);
          setClaveExpe(paciente.clave_expediente);
          setFotopaciente(paciente.foto_paciente);
          setTelefono(paciente.telefono);
          setEdad(paciente.edad);
          setDireccion(paciente.direccion);
          setCorreo(paciente.correo);
          setEnfermedad(paciente.enfermedad_base);
        } else {
          console.error("No se encontró el paciente");
        }
      } catch (error) {
        console.error('Error al obtener el paciente', error);
        alert('No se encontró el paciente con ese ID');
      }
    };

    if (id) fetchPacientes(); // Solo ejecutar si el ID es válido
  }, [id]); // Asegúrate de que id y pacienteid estén en las dependencias

  useEffect(() => {
    console.log('Término de búsqueda:', searchTerm);
    const fetchPacientes = async () => {
      if (searchTerm.trim().length < 2) { 
        console.log('Búsqueda demasiado corta, no se realiza.');
        setPacienteResultados([]); 
        return;
      }
  
      try {
        const response = await axios.get(`${pacientebuscar}?search=${searchTerm}`);
        console.log('Resultados:', response.data);
        setPacienteResultados(response.data); 
      } catch (error) {
        console.error('Error al buscar pacientes', error);
      }
    };
  
    fetchPacientes();
  }, [searchTerm]);
  
  
  // Maneja el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para seleccionar un paciente de los resultados de búsqueda
  const handleSelectpacientes = (pacientes) => {
    setTipoPaciente(pacientes.tipo_paciente);
    setTipoEmpleado(pacientes.tipo_empleado);
    setNombreComp(pacientes.nombre_completo);
    setClaveEmpl(pacientes.clave_empleado);
    setClaveExpe(pacientes.clave_expediente);
    setTelefono(pacientes.telefono);
    setEdad(pacientes.edad);
    setDireccion(pacientes.direccion);
    setCorreo(pacientes.correo);
    setEnfermedad(pacientes.enfermedad_base);
    setId(pacientes.id);
    setSearchTerm(''); // Limpiar el searchTerm para que desaparezca la lista
  }

  const handleSubmit = async (e, action) => {
    e.preventDefault();
  
    if (
      tipo_paciente === '' ||
      tipo_empleado === '' ||
      nombre_completo === '' ||
      clave_empleado === '' ||
      clave_expediente === '' ||
      telefono === '' ||
      edad === '' ||
      direccion === '' ||
      correo === '' ||
      enfermedad_base === ''
    ) {
      alert('Por favor, complete todos los campos');
      return;
    }
  
    try {
      let response;
  
      if (action === 'guardar') {
        response = await axios.post(pacienteguardar, {
          tipo_paciente,
          tipo_empleado,
          nombre_completo,
          clave_empleado,
          clave_expediente,
          foto_paciente,
          telefono: parseInt(telefono), 
          edad: parseInt(edad), 
          direccion,
          correo,
          enfermedad_base
        });
      } else if (action === 'editar' && id) {
        response = await axios.put(`${pacienteeditar}?id=${id}`, {
          tipo_paciente,
          tipo_empleado,
          nombre_completo,
          clave_empleado,
          clave_expediente,
          foto_paciente,
          telefono: parseInt(telefono),
          edad: parseInt(edad),
          direccion,
          correo,
          enfermedad_base
        });
      }
  
      if (response && response.data) {
        setTipoPaciente('');
        setTipoEmpleado('');
        setNombreComp('');
        setClaveEmpl('');
        setClaveExpe('');
        setFotopaciente('');
        setTelefono('');
        setEdad('');
        setDireccion('');
        setCorreo('');
        setEnfermedad('');
        setId('');
        alert('Paciente guardado o editado exitosamente');
      } else {
        console.error('La respuesta de la API no contiene "data"');
      }
    } catch (error) {
      console.error('Error al guardar o editar el paciente', error);
  
      if (error.response) {
        // Ver el detalle de la respuesta del servidor
        console.error('Error Response:', error.response);
        alert(`Error ${error.response.status}: ${error.response.statusText}`);
        
        if (error.response.data && error.response.data.errors) {
          // Mostrar los errores específicos si están disponibles
          error.response.data.errors.forEach((err) => {
            console.error('Error específico:', err);
            alert(`Error: ${err.message}`);
          });
        }
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        alert('No se recibió respuesta del servidor');
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        // Algo ocurrió al configurar la solicitud
        alert('Error al configurar la solicitud');
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  };
  
  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este Paciente?')) {
      try {
        const response = await axios.delete(`${pacienteeliminar}?id=${id}`);
        console.log(response.data);
        alert('Paciente eliminado exitosamente');
      } catch (error) {
        console.error('Error al eliminar el paciente', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotopaciente(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result); // Mostrar la vista previa de la imagen
      };
      reader.readAsDataURL(file);
    }
  };

 const imprimirFormulario = () => {

  // Obtener fecha y hora actual
  const fechaHora = new Date();
  const fecha = `${fechaHora.getDate()}/${fechaHora.getMonth() + 1}/${fechaHora.getFullYear()}`;
  const hora = `${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}`;

  // Contenido HTML del expediente
  const contenido = `
    <html>
      <head>
        <title>Expediente Médico</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 10px;
          }
          h1 {
            text-align: center;
            font-size: 24px;
          }
          p {
            font-size: 16px;
          }
          .logo {
            display: block;
            text-align: center;
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 10px;
          }
          .footer {
            font-size: 14px;
            text-align: right;
            margin-top: 30px;
          }
          .foto-container {
            text-align: center;
            margin-bottom: 20px;
          }
          .foto-container img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 2px solid #000;
          }
        </style>
      </head>
      <body>
        <div class="logo">
            <img src="https://www.enteoperador.org/wp-content/uploads/2024/10/ENEE-logo-1.png" alt="Logo" width="150"/>
        </div>
        
        <div class="foto-container">
          <img src="${foto_paciente}" alt="Foto del Paciente" />
        </div>
  
        <h1>Expediente del Paciente</h1>
  
        <p class="info"><strong>Tipo de Paciente:</strong> ${tipo_paciente}</p>
        <p class="info"><strong>Tipo de Empleado:</strong> ${tipo_empleado}</p>
        <p class="info"><strong>Nombre Completo:</strong> ${nombre_completo}</p>
        <p class="info"><strong>Clave de Empleado:</strong> ${clave_empleado}</p>
        <p class="info"><strong>Clave de Expediente:</strong> ${clave_expediente}</p>
        <p class="info"><strong>Teléfono:</strong> ${telefono}</p>
        <p class="info"><strong>Edad:</strong> ${edad}</p>
        <p class="info"><strong>Dirección:</strong> ${direccion}</p>
        <p class="info"><strong>Correo:</strong> ${correo}</p>
        <p class="info"><strong>Enfermedad Base:</strong> ${enfermedad_base}</p>
  
        <!-- Fecha y Hora de la impresión -->
        <div class="footer">
          <p><strong>Fecha:</strong> ${fecha}</p>
          <p><strong>Hora:</strong> ${hora}</p>
        </div>
      </body>
    </html>
  `;

  // Crear ventana para imprimir
  const ventana = window.open('', '', 'height=600,width=800');
  ventana.document.write(contenido);
  ventana.document.close();
  ventana.print();
};

  return (
    <div className="site-wrap">
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-5 text-black">Formulario de Registro de Pacientes</h2>
            </div>

             {/* Campo para ingresar ID */}
             <div className="col-md-12">
              <label htmlFor="pacienteid" className="text-black">
              </label>
              <input
                type="text"
                className="form-control"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

              {/* Barra de búsqueda */}
              <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre del paciente"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul>
              {
                pacienteResultados.length > 0 && (
                  <ul>
                    {pacienteResultados.map((paciente) => (
                      <li key={paciente.id} onClick={() => handleSelectpacientes(paciente)}>
                        {paciente.nombre_completo}
                      </li>
                    ))}
                  </ul>
                )
              }
              </ul>
            </div>

            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <label htmlFor="tipo_paciente" className="text-black">Tipo de Paciente:</label>
                    <select
                      className="form-control"
                      id="tipo_paciente"
                      name="tipo_paciente"
                      value={tipo_paciente}
                      onChange={(e) => setTipoPaciente(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Trabajador">Trabajador</option>
                      <option value="Dependiente">Dependiente</option>
                    </select>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="tipo_empleado" className="text-black">Tipo de Empleado:</label>
                    <select
                      className="form-control"
                      id="tipo_empleado"
                      name="tipo_empleado"
                      value={tipo_empleado}
                      onChange={(e) => setTipoEmpleado(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Temporal">Temporal</option>
                      <option value="Permanente">Permanente</option>
                    </select>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label className="text-black" htmlFor="nombre_completo">Nombre Completo:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_completo"
                        name="nombre_completo"
                        value={nombre_completo}
                        onChange={(e) => setNombreComp(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="text-black" htmlFor="clave_empleado">Clave del Empleado:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="clave_empleado"
                        name="clave_empleado"
                        value={clave_empleado}
                        onChange={(e) => setClaveEmpl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label className="text-black" htmlFor="clave_expediente">Clave del Expediente:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="clave_expediente"
                        name="clave_expediente"
                        value={clave_expediente}
                        onChange={(e) => setClaveExpe(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="text-black" htmlFor="foto_paciente">Foto del Paciente:</label>
                      <input
                        type="file"
                        className="form-control"
                        id="foto_paciente"
                        name="foto_paciente"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {fotoPreview && (
                    <div className="form-group row">
                      <div className="col-md-12">
                        <h5>Vista Previa de la Foto:</h5>
                        <img src={fotoPreview} alt="Vista previa" className="img-thumbnail" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                      </div>
                    </div>
                  )}

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label className="text-black" htmlFor="telefono">Teléfono:</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="text-black" htmlFor="edad">Edad:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="edad"
                        name="edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label className="text-black" htmlFor="direccion">Dirección:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="text-black" htmlFor="correo">Correo:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="correo"
                        name="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label className="text-black" htmlFor="enfermedad_base">Enfermedad Base:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="enfermedad_base"
                        name="enfermedad_base"
                        value={enfermedad_base}
                        onChange={(e) => setEnfermedad(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={(e) => handleSubmit(e, id ? 'editar' : 'guardar')}>Guardar Paciente</button>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <button type="button" className="btn btn-danger btn-lg btn-block" onClick={handleEliminar}>Eliminar Paciente</button>
                    </div>
                    <div className="form-group">
                  <div className="col-md-12">
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={imprimirFormulario}>Imprimir Datos</button>
                  </div>
                  </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulariopaciente;
