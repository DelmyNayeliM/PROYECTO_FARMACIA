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
    formData.append("file", file);

    try {
      const response = await axios.post('/upload-endpoint', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.imageUrl; // Suponiendo que la URL de la imagen es parte de la respuesta
    } catch (error) {
      console.error('Error al subir la imagen', error);
    }
  };

  // Maneja el envío del formulario para guardar o editar el paciente
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
      // Si foto_paciente es un archivo, sube la imagen
      fotoPacienteUrl = await handleFileUpload(foto_paciente);
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
          foto_paciente: fotoPacienteUrl,
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
          foto_paciente: fotoPacienteUrl,
          telefono,
          edad,
          direccion,
          correo,
          enfermedad_base,
        });
      }

      console.log(response.data);
      alert('Paciente guardado exitosamente');
      // Limpiar el formulario
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
    } catch (error) {
      console.error('Error al guardar el paciente', error);
    }
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
                    <label htmlFor="tipo_paciente" className="text-black">
                      Tipo de Paciente:
                    </label>
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
                    <label htmlFor="tipo_empleado" className="text-black">
                      Tipo de Empleado:
                    </label>
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
                        onChange={(e) => setFoto_paciente(e.target.files[0])}
                      />
                    </div>
                  </div>

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
                      <label htmlFor="correo">Correo Electrónico:</label>
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
                    <div className="col-md-6">
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

                  <div className="form-group row">
                    <div className="col-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">
                        {id ? 'Editar Paciente' : 'Guardar Paciente'}
                      </button>
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
