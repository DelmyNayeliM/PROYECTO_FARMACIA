import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { citasguardar, citaseditar, citasbuscar } from '../configuraciones/apiURLS';

const Formulariocitas = ({ citasEditado }) => {
  const [fecha_cita, setFecha_cita] = useState('');
  const [nombre_dr, setNombre_dr] = useState('');
  const [nombre_paciente, setNombre_paciente] = useState('');
  const [presion, setPresion] = useState('');
  const [peso, setPeso] = useState('');
  const [ritmo_cardiaco, setRitmo_cardiaco] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [receta, setReceta] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [nombre_medicamento, setNombre_medicamento] = useState('');
  const [id, setId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [citasResultados, setCitasResultados] = useState([]);

  useEffect(() => {
    if (citasEditado) {
      setFecha_cita(citasEditado.fecha_cita);
      setNombre_dr(citasEditado.nombre_dr);
      setNombre_paciente(citasEditado.nombre_paciente);
      setPresion(citasEditado.presion);
      setPeso(citasEditado.peso);
      setRitmo_cardiaco(citasEditado.ritmo_cardiaco);
      setTemperatura(citasEditado.temperatura);
      setSintomas(citasEditado.sintomas);
      setReceta(citasEditado.receta);
      setObservaciones(citasEditado.observaciones);
      setNombre_medicamento(citasEditado.nombre_medicamento);
      setId(citasEditado.id);
    }
  }, [citasEditado]);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    try {
      const response = await axios.get(`${citasbuscar}?query=${e.target.value}`);
      setCitasResultados(response.data);
    } catch (error) {
      console.error('Error al buscar citas', error);
    }
  };

  const handleSelectCita = (cita) => {
    setFecha_cita(cita.fecha_cita);
    setNombre_dr(cita.nombre_dr);
    setNombre_paciente(cita.nombre_paciente);
    setPresion(cita.presion);
    setPeso(cita.peso);
    setRitmo_cardiaco(cita.ritmo_cardiaco);
    setTemperatura(cita.temperatura);
    setSintomas(cita.sintomas);
    setReceta(cita.receta);
    setObservaciones(cita.observaciones);
    setNombre_medicamento(cita.nombre_medicamento);
    setId(cita.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      fecha_cita === '' ||
      nombre_dr === '' ||
      nombre_paciente === '' ||
      presion === '' ||
      peso === '' ||
      ritmo_cardiaco === '' ||
      temperatura === '' ||
      sintomas === '' ||
      receta === '' ||
      observaciones === '' ||
      nombre_medicamento === ''
    ) {
      console.log('Por favor, complete todos los campos');
      return;
    }

    try {
      let response;
      if (id) {
        response = await axios.put(`${citaseditar}/${id}`, {
          fecha_cita,
          nombre_dr,
          nombre_paciente,
          presion,
          peso,
          ritmo_cardiaco,
          temperatura,
          sintomas,
          receta,
          observaciones,
          nombre_medicamento,
        });
      } else {
        response = await axios.post(citasguardar, {
          fecha_cita,
          nombre_dr,
          nombre_paciente,
          presion,
          peso,
          ritmo_cardiaco,
          temperatura,
          sintomas,
          receta,
          observaciones,
          nombre_medicamento,
        });
      }
      console.log(response.data);
      setFecha_cita('');
      setNombre_dr('');
      setNombre_paciente('');
      setPresion('');
      setPeso('');
      setRitmo_cardiaco('');
      setTemperatura('');
      setSintomas('');
      setReceta('');
      setObservaciones('');
      setNombre_medicamento('');
      alert('Cita guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la cita', error);
      alert('Hubo un error al guardar la cita. Inténtelo nuevamente.');
    }
  };

  const imprimirFormulario = () => {
    const contenido = `
      <h1>Información de la Cita</h1>
      <p><strong>Fecha de cita:</strong> ${fecha_cita}</p>
      <p><strong>Nombre del Doctor: Dr.</strong> ${nombre_dr}</p>
      <p><strong>Nombre del Paciente:</strong> ${nombre_paciente}</p>
      <p><strong>Presion:</strong> ${presion}</p>
      <p><strong>Peso:</strong> ${peso}</p>
      <p><strong>Ritmo Cardiaco:</strong> ${ritmo_cardiaco}</p>
      <p><strong>Temperatura:</strong> ${temperatura}</p>
      <p><strong>Sintomas:</strong> ${sintomas}</p>
      <p><strong>Receta:</strong> ${receta}</p>
      <p><strong>Observaciones:</strong> ${observaciones}</p>
      <p><strong>Nombre del Medicamento:</strong> ${nombre_medicamento}</p>
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
              <h2 className="h3 mb-5 text-black">Formulario de Registro de Citas</h2>
            </div>
            
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar cita por nombre de paciente o doctor"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul className="list-group">
                {citasResultados.map((cita) => (
                  <li
                    key={cita.id}
                    className="list-group-item"
                    onClick={() => handleSelectCita(cita)}
                  >
                    {cita.nombre_paciente} - {cita.nombre_dr}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="p-3 p-lg-5 border">
                  {/* Fecha de la cita */}
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="fecha_cita" className="text-black">
                        Fecha de la cita: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="fecha_cita"
                        name="fecha_cita"
                        value={fecha_cita}
                        onChange={(e) => setFecha_cita(e.target.value)}
                      />
                    </div>
                    {/* Nombre del Doctor */}
                    <div className="col-md-6">
                      <label htmlFor="nombre_dr" className="text-black">
                        Nombre del Doctor: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_dr"
                        name="nombre_dr"
                        value={nombre_dr}
                        onChange={(e) => setNombre_dr(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Nombre del Paciente */}
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="nombre_paciente" className="text-black">
                        Nombre del paciente: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_paciente"
                        name="nombre_paciente"
                        value={nombre_paciente}
                        onChange={(e) => setNombre_paciente(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Presión */}
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="presion" className="text-black">
                        Presión: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="presion"
                        name="presion"
                        value={presion}
                        onChange={(e) => setPresion(e.target.value)}
                      />
                    </div>
                    {/* Peso */}
                    <div className="col-md-6">
                      <label htmlFor="peso" className="text-black">
                        Peso: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="peso"
                        name="peso"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Ritmo Cardiaco */}
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="ritmo_cardiaco" className="text-black">
                        Ritmo Cardiaco: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ritmo_cardiaco"
                        name="ritmo_cardiaco"
                        value={ritmo_cardiaco}
                        onChange={(e) => setRitmo_cardiaco(e.target.value)}
                      />
                    </div>
                    {/* Temperatura */}
                    <div className="col-md-6">
                      <label htmlFor="temperatura" className="text-black">
                        Temperatura: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="temperatura"
                        name="temperatura"
                        value={temperatura}
                        onChange={(e) => setTemperatura(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Sintomas */}
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="sintomas" className="text-black">
                        Sintomas: <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="sintomas"
                        name="sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Receta */}
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="receta" className="text-black">
                        Receta: <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="receta"
                        name="receta"
                        value={receta}
                        onChange={(e) => setReceta(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Observaciones */}
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="observaciones" className="text-black">
                        Observaciones: <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="observaciones"
                        name="observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Nombre del Medicamento */}
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="nombre_medicamento" className="text-black">
                        Nombre del Medicamento: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_medicamento"
                        name="nombre_medicamento"
                        value={nombre_medicamento}
                        onChange={(e) => setNombre_medicamento(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">
                        Guardar Cita
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={imprimirFormulario}
                      >
                        Imprimir Datos
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

export default Formulariocitas;
