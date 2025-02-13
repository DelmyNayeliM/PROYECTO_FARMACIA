import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { pacienteguardar, pacienteeditar } from '../configuraciones/apiURLS';

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
  const [fotoPreview, setFotoPreview] = useState(null); // Estado para la vista previa de la foto

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

  // Función para manejar la subida de la foto del paciente
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
      return null;  // Devuelve null si no se pudo cargar la imagen
    }
  };

  // Función para manejar el cambio en el archivo de la foto y generar la vista previa
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto_paciente(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result); // Establecer la URL de la imagen para la vista previa
      };
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null); // Limpiar la vista previa si no hay archivo
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos estén completos
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

    // Subir la foto del paciente si es necesario
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
        // Editar paciente existente
        response = await axios.put(`${pacienteeditar}/${id}`, {
          tipo_paciente,
          tipo_empleado,
          nombre_completo,
          clave_empleado,
          clave_expediente,
          foto_paciente: fotoPacienteUrl,
          telefono,
          edad,
          direccion,
          correo,
          enfermedad_base,
        });
      } else {
        // Guardar un nuevo paciente
        response = await axios.post(pacienteguardar, {
          tipo_paciente,
          tipo_empleado,
          nombre_completo,
          clave_empleado,
          clave_expediente,
          foto_paciente: fotoPacienteUrl,
          telefono,
          edad,
          direccion,
          correo,
          enfermedad_base,
        });
      }

      // Respuesta exitosa
      console.log(response.data);
      alert('Paciente guardado exitosamente');
      
      // Limpiar los campos después de guardar
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
      setFotoPreview(null);  // Limpiar la vista previa de la foto
    } catch (error) {
      console.error('Error al guardar el paciente', error);
      alert('Hubo un error al guardar el paciente. Inténtelo nuevamente.');
    }
  };

  const imprimirFormulario = () => {
    const contenido = `
      <h1>Información del Paciente</h1>
      <p><strong>Tipo de Paciente:</strong> ${tipo_paciente}</p>
      <p><strong>Tipo de Empleado:</strong> ${tipo_empleado}</p>
      <p><strong>Nombre Completo:</strong> ${nombre_completo}</p>
      <p><strong>Clave de Empleado:</strong> ${clave_empleado}</p>
      <p><strong>Clave de Expediente:</strong> ${clave_expediente}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Edad:</strong> ${edad}</p>
      <p><strong>Dirección:</strong> ${direccion}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Enfermedad Base:</strong> ${enfermedad_base}</p>
      <p><strong>Enfermedad Base:</strong> ${foto_paciente}</p>
    `;
    
    const ventana = window.open('', '', 'height=600,width=800');
    ventana.document.write('<html><head><title>Impresión</title></head><body>');
    ventana.document.write(contenido);
    ventana.document.write('</body></html>');
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
                    <input
                      type="text"
                      className="form-control"
                      id="tipo_paciente"
                      name="tipo_paciente"
                      value={tipo_paciente}
                      onChange={(e) => setTipo_paciente(e.target.value)}
                    />
                  </div>

                  <div className="form-group row">
                    <label htmlFor="tipo_empleado" className="text-black">Tipo de Empleado:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tipo_empleado"
                      name="tipo_empleado"
                      value={tipo_empleado}
                      onChange={(e) => setTipo_empleado(e.target.value)}
                    />
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="nombre_completo">Nombre Completo:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_completo"
                        name="nombre_completo"
                        value={nombre_completo}
                        onChange={(e) => setNombre_completo(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="clave_empleado">Clave del Empleado:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="clave_empleado"
                        name="clave_empleado"
                        value={clave_empleado}
                        onChange={(e) => setClave_empleado(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="clave_expediente">Clave del Expediente:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="clave_expediente"
                        name="clave_expediente"
                        value={clave_expediente}
                        onChange={(e) => setClave_expediente(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="foto_paciente">Foto del Paciente:</label>
                      <input
                        type="file"
                        className="form-control"
                        id="foto_paciente"
                        name="foto_paciente"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* Aquí se muestra la vista previa de la foto si existe */}
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
                      <label htmlFor="telefono">Teléfono:</label>
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
                      <label htmlFor="edad">Edad:</label>
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
                      <label htmlFor="direccion">Dirección:</label>
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
                      <label htmlFor="correo">Correo:</label>
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
                      <label htmlFor="enfermedad_base">Enfermedad Base:</label>
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
                    <button type="submit" className="btn btn-primary">Guardar</button>
                  </div>

                  <div className="form-group">
                    <button type="button" className="btn btn-secondary" onClick={imprimirFormulario}>Imprimir Datos</button>
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
