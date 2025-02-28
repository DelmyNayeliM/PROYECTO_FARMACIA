import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { pacienteguardar, pacienteeditar, } from '../configuraciones/apiURLS';

const Formulariopaciente = ({ pacienteEditado }) => {
  const [tipo_paciente, setTipo_paciente] = useState('');
  const [tipo_empleado, setTipo_empleado] = useState('');
  const [nombre_completo, setNombre_completo] = useState('');
  const [clave_empleado, setClave_empleado] = useState('');
  const [clave_expediente, setClave_expediente] = useState('');
  const [foto_paciente, setFoto_paciente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [enfermedad_base, setEnfermedad] = useState('');
  const [id, setId] = useState('');
  const [fotoPreview, setFotoPreview] = useState(null); 

  useEffect(() => {
    if (pacienteEditado) {
      setTipo_paciente(pacienteEditado.tipo_paciente);
      setTipo_empleado(pacienteEditado.tipo_empleado);
      setNombre_completo(pacienteEditado.nombre_completo);
      setClave_empleado(pacienteEditado.clave_empleado);
      setClave_expediente(pacienteEditado.clave_expediente);
      setFoto_paciente(pacienteEditado.foto_paciente);
      setTelefono(pacienteEditado.telefono);
      setEdad(pacienteEditado.edad);
      setDireccion(pacienteEditado.direccion);
      setCorreo(pacienteEditado.correo);
      setEnfermedad(pacienteEditado.enfermedad_base);
      setId(pacienteEditado.id);
    }
  }, [pacienteEditado]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/guardarImagenPaciente', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error al subir la imagen', error);
      return null;  
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
      console.log('Por favor, complete todos los campos');
      return;
    }
    let fotoPacienteUrl = foto_paciente;
    if (foto_paciente && typeof foto_paciente !== 'string') {
      fotoPacienteUrl = await handleFileUpload(foto_paciente);
      if (!fotoPacienteUrl) {
        alert('Hubo un problema al subir la imagen');
        return;
      }
    }

    try {
      let response;
      if (id) {
        response = await axios.put(`${pacienteeditar}/${id}`, {
          tipo_paciente,
          tipo_empleado,
          nombre_completo,
          clave_empleado,
          clave_expediente,
          foto_paciente,
          telefono,
          edad,
          direccion,
          correo,
          enfermedad_base,
        });
      } else {
        response = await axios.post(pacienteguardar, {
          tipo_paciente,
          tipo_empleado,
          nombre_completo,
          clave_empleado,
          clave_expediente,
          foto_paciente,
          telefono,
          edad,
          direccion,
          correo,
          enfermedad_base,
        });
      }

      console.log(response.data); 
      setTipo_paciente('');
      setTipo_empleado('');
      setNombre_completo('');
      setClave_empleado('');
      setClave_expediente('');
      setFoto_paciente('');
      setTelefono('');
      setEdad('');
      setDireccion('');
      setCorreo('');
      setEnfermedad('');
      setFotoPreview(null);  
      alert('Paciente guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el paciente', error);
      alert('Hubo un error al realizar su accion. Inténtelo nuevamente.');
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
              width: 150px; /* Puedes ajustar el tamaño */
              height: 150px; /* Puedes ajustar el tamaño */
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
                      onChange={(e) => setTipo_paciente(e.target.value)}
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
                      onChange={(e) => setTipo_empleado(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Trabajador">Temporal</option>
                      <option value="Dependiente">Permanente</option>
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
                        onChange={(e) => setNombre_completo(e.target.value)}
                         title="Escribir el nombre completo"
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
                        onChange={(e) => setClave_empleado(e.target.value)}
                         title="MAX 5"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label className="text-black"  htmlFor="clave_expediente">Clave del Expediente:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="clave_expediente"
                        name="clave_expediente"
                        value={clave_expediente}
                        onChange={(e) => setClave_expediente(e.target.value)}
                        title="MAX 8"
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
                        title="solo numeros"
                      />
                    </div>

                    <div className="col-md-6">
                      <label  className="text-black" htmlFor="edad">Edad:</label>
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
                        title="@ que sea un correo válido"
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

                  <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">Guardar Paciente</button>
                    </div>
             {
             //<div className="col-md-4">
                      //<button type="submit" className="btn btn-primary btn-lg btn-block">Editar Paciente</button>
                    //</div>
                    //<div className="col-md-4">
                     // <button type="submit" className="btn btn-primary btn-lg btn-block">Eliminar Paciente</button>
                   // </div>
                  //</div>
            }   
              </div>
              </div>

                  <div className="form-group">
                  <div className="col-md-12">
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={imprimirFormulario}>Imprimir Datos</button>
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
