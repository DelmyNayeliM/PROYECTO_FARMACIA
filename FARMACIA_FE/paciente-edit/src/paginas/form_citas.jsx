import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { citasguardar, citaseditar } from '../configuraciones/apiURLS';

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

  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

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

  const handleSubmit = async (e, isEdit = false) => {
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
      nombre_medicamento === '' ||
      categoria === '' ||
      descripcion === '' ||
      precio === ''
    ) {
      console.log('Por favor, complete todos los campos');
      return;
    }

    try {
      let response;
      if (isEdit) {
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
      alert('Cita guardada exitosamente');
      resetForm();
    } catch (error) {
      console.error('Error al guardar la cita', error);
    }
  };

  const resetForm = () => {
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
    setCategoria('');
    setDescripcion('');
    setPrecio('');
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
              <form action="#" method="post">
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="fecha_cita" className="text-black">
                        Fecha de la cita: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="fecha_cita"
                        value={fecha_cita}
                        onChange={(e) => setFecha_cita(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="nombre_dr" className="text-black">
                        Nombre del Doctor: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_dr"
                        value={nombre_dr}
                        onChange={(e) => setNombre_dr(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="nombre_paciente" className="text-black">
                        Nombre del paciente: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_paciente"
                        value={nombre_paciente}
                        onChange={(e) => setNombre_paciente(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="presion" className="text-black">
                        Presión: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="presion"
                        value={presion}
                        onChange={(e) => setPresion(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="peso" className="text-black">
                        Peso: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="peso"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="ritmo_cardiaco" className="text-black">
                        Ritmo Cardiaco: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ritmo_cardiaco"
                        value={ritmo_cardiaco}
                        onChange={(e) => setRitmo_cardiaco(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="temperatura" className="text-black">
                        Temperatura: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="temperatura"
                        value={temperatura}
                        onChange={(e) => setTemperatura(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="sintomas" className="text-black">
                        Sintomas: <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="receta" className="text-black">
                        Receta: 
                      </label>
                      <textarea
                        className="form-control"
                        id="receta"
                        value={receta}
                        onChange={(e) => setReceta(e.target.value)}
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="observaciones" className="text-black">
                        Observaciones: 
                      </label>
                      <textarea
                        className="form-control"
                        id="observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="nombre_medicamento" className="text-black">
                        Nombre del Medicamento: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_medicamento"
                        value={nombre_medicamento}
                        onChange={(e) => setNombre_medicamento(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-6">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={(e) => handleSubmit(e, false)}
                      >
                        {citasEditado ? 'Editar Cita' : 'Guardar Cita'}
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
