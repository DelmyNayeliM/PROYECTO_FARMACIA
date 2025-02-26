import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { citasguardar, citaseditar, citasbuscar } from '../configuraciones/apiURLS';
//import '../css/reporte.css';

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
  const [cantidadventa, setCantidadVenta] = useState('');
  const [id, setId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [citasResultados, setCitasResultados] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);

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
      setCantidadVenta(citasEditado.cantidadventa);
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
    setCantidadVenta(cita.cantidadventa);
    setId(cita.id);
    setCitasResultados([]); 
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
      nombre_medicamento === '' ||
      cantidadventa === ''
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
          cantidadventa,
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
          cantidadventa,
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
      setCantidadVenta('');
      alert('Cita guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la cita', error);
      alert('Hubo un error al guardar la cita. Inténtelo nuevamente.');
    }
  };

  const imprimirFormulario = () => {
    const fechaactual_cita = new Date().toLocaleDateString(); 
    const hora_cita = new Date().toLocaleTimeString();
  
    const contenido = `
      <html>
        <head>
          <title>Impresión de Cita Médica</title>
        </head>
        <body>
        <style>
        body {
  font-family: Arial, sans-serif;
  margin: 20px;
  color: #333;
}
h1 {
  text-align: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.logo {
  width: 100px;
  height: auto;
}
.fecha-hora {
  text-align: right;
  font-size: 14px;
}
.formulario {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.formulario td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  word-wrap: break-word;
  white-space: normal;
}
.formulario th {
  padding: 10px;
  background-color: #f4f4f4;
  text-align: left;
  border-bottom: 2px solid #ddd;
}
/* Hacemos que los campos de "Sintomas", "Receta", "Observaciones" sean autoajustables */
.auto-ajustable {
  max-width: 500px;
  min-width: 200px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
/* Permitir scroll si el contenido excede el límite */
.campo-largo {
  max-height: 150px;
  overflow-y: auto;
}
        </style>
          <div class="header">
            <img class="logo" src="https://www.enteoperador.org/wp-content/uploads/2024/10/ENEE-logo-1.png" alt="Logo">
            <div class="fecha-hora">
              <p><strong>Fecha:</strong> ${fechaactual_cita}</p>
              <p><strong>Hora:</strong> ${hora_cita}</p>
            </div>
          </div>
          
          <h1>Información de la Cita</h1>
          
          <table class="formulario">
            <tr>
              <th>Campo</th>
              <th>Detalle</th>
            </tr>
            <tr>
              <td div><strong>Fecha de la cita:</strong></td>
              <td>${fecha_cita}</td>
            </tr
            <tr>
              <td div><strong>Nombre del Doctor:</strong></td>
              <td>Dr. ${nombre_dr}</td>
            </tr>
            <tr>
              <td><strong>Nombre del Paciente:</strong></td>
              <td>${nombre_paciente}</td>
            </tr>
            <tr>
              <td><strong>Presión:</strong></td>
              <td>${presion}</td>
            </tr>
            <tr>
              <td><strong>Peso:</strong></td>
              <td>${peso} Kg</td>
            </tr>
            <tr>
              <td><strong>Ritmo Cardiaco:</strong></td>
              <td>${ritmo_cardiaco} lpm</td>
            </tr>
            <tr>
              <td><strong>Temperatura:</strong></td>
              <td>${temperatura} °</td>
            </tr>
            <tr>
              <td><strong>Sintomas:</strong></td>
              <td class="auto-ajustable campo-largo">${sintomas}</td>
            </tr>
            <tr>
              <td><strong>Receta:</strong></td>
              <td class="auto-ajustable campo-largo">${receta}</td>
            </tr>
            <tr>
              <td><strong>Observaciones:</strong></td>
              <td class="auto-ajustable campo-largo">${observaciones}</td>
            </tr>
            <tr>
              <td><strong>Nombre del Medicamento:</strong></td>
              <td>${nombre_medicamento}</td>
            </tr>
            <tr>
              <td><strong>Cantidad:</strong></td>
              <td>${cantidadventa}</td>
            </tr>
          </table>
        </body>
      </html>
    `;
    
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
          {citasResultados.length > 0 ? (
            citasResultados.map((cita) => (
              <li
                key={cita.id}
                className="list-group-item"
                onClick={() => handleSelectCita(cita)}
              >
                {cita.nombre_paciente} - {cita.nombre_dr} 
              </li>
            ))
          ) : (
            <li className="list-group-item">No se encontraron resultados</li>
          )}
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
                      title="Ingrese el nombre  del doctor"  
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
                        title="Ingrese el nombre  del paciente"  
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
                        title="Ejemplo 120/80"  
                      />
                    </div>
                    {/* Peso */}
                    <div className="col-md-6">
                      <label htmlFor="peso" className="text-black">
                        Peso: Kg<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="peso"
                        name="peso"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                         title="Ejemplo 70"
                      />
                    </div>
                  </div>

                  {/* Ritmo Cardiaco */}
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="ritmo_cardiaco" className="text-black">
                        Ritmo Cardiaco: lpm<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ritmo_cardiaco"
                        name="ritmo_cardiaco"
                        value={ritmo_cardiaco}
                        onChange={(e) => setRitmo_cardiaco(e.target.value)}
                         title="80 lpm"
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
                         title="MIN: 35 - MAX: 42"
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

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="nombre_medicamento" className="text-black">
                        Medicamento: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre_medicamento"
                        name="nombre_medicamento"
                        value={nombre_medicamento}
                        onChange={(e) => setNombre_medicamento(e.target.value)}
                        title="Debe tener entre 3-75 caracteres"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cantidadventa" className="text-black">
                        Cantidad: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="cantidadventa"
                        name="cantidadventa"
                        value={cantidadventa}
                        onChange={(e) => setCantidadVenta(e.target.value)}
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
