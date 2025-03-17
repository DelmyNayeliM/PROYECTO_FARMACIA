import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { citasguardar, citaseditar, citasbuscar, citasbuscarid, citaseliminar} from '../configuraciones/apiURLS';

const Formulariocitas = ({ citaid }) => {
  const [fecha_cita, setFechaCita] = useState("");
  const [nombre_dr, setNombreDR] = useState('');
  const [nombre_paciente, setNombrepaciente] = useState('');
  const [presion, setPresion] = useState('');
  const [peso, setPeso] = useState('');
  const [ritmo_cardiaco, setRitmo] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [receta, setReceta] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [nombre_medicamento, setNombreM] = useState('');
  const [cantidadventa, setCantidadv] = useState('');
  const [id, setId] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [citasResultados, setcitasResultados] = useState([]); // Para almacenar los resultados de búsqueda

useEffect(() => {
  const fetchCita = async () => {
    if (!id) return; // Si no hay ID, no hacer nada
    try {
      const response = await axios.get(`${citasbuscarid}/${id}`);
      if (response.status === 200) {
        const cita = response.data;
        setFechaCita(cita.fecha_cita);
        setNombreDR(cita.nombre_dr);
        setNombrepaciente(cita.nombre_paciente);
        setPresion(cita.presion);
        setPeso(cita.peso);
        setRitmo(cita.ritmo_cardiaco);
        setTemperatura(cita.temperatura);
        setSintomas(cita.sintomas);
        setReceta(cita.receta);
        setObservaciones(cita.observaciones);
        setNombreM(cita.nombre_medicamento);
        setCantidadv(cita.cantidadventa);
      } else {
        console.error("No se encontró la cita");
      }
    } catch (error) {
      console.error('Error al obtener la cita', error);
      alert('No se encontró la cita con ese ID');
    }
  };

  if (id) fetchCita(); // Solo ejecutar si el ID es válido
}, [id]); // Asegúrate de que id esté en las dependencias

  useEffect(() => {
    const fetchCita = async () => {
      if (searchTerm.trim() === '') {
        setcitasResultados([]); // Limpiar resultados si la búsqueda está vacía
        return;
      }

      try {
        const response = await axios.get(`${citasbuscar}?search=${searchTerm}`);
        setcitasResultados(response.data); // Asignar los resultados al estado
      } catch (error) {
        console.error('Error al buscar la cita', error);
      }
    };

    fetchCita();
  }, [searchTerm]); 

  // Maneja el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para seleccionar una cita de los resultados de búsqueda
  const handleSelectcita = (cita) => {
    setFechaCita(cita.fecha_cita);
    setNombreDR(cita.nombre_dr);
    setNombrepaciente(cita.nombre_paciente);
    setPresion(cita.presion);
    setPeso(cita.peso);
    setRitmo(cita.ritmo_cardiaco);
    setTemperatura(cita.temperatura);
    setSintomas(cita.sintomas);
    setReceta(cita.receta);
    setObservaciones(cita.observaciones);
    setNombreM(cita.nombre_medicamento);
    setCantidadv(cita.cantidadventa);
    setId(cita.id); 
    setSearchTerm('');
  };

  // Maneja el envío del formulario para guardar o editar el medicamento
  const handleSubmit = async (e, action) => {
    e.preventDefault();

    if (fecha_cita === '' || nombre_dr === '' || nombre_paciente === '' || presion === '' || peso === '' || ritmo_cardiaco === '' || temperatura === '' || sintomas === '' || receta === '' || observaciones === '' || nombre_medicamento === '' || cantidadventa === '') {
      console.log('Por favor, complete todos los campos');
      return;
    }

    try {
      let response;
      if (action === 'guardar') {
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
        console.log('Respuesta del servidor:', response);
      } else if (action === 'editar' && id) {
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
          cantidadventa
        });
        console.log('Cita editada:', response.data);
      }
  
      console.log(response.data);
      setFechaCita('');
      setNombreDR('');
      setNombrepaciente('');
      setPresion('');
      setPeso('');
      setRitmo('');
      setTemperatura('');
      setSintomas('');
      setReceta('');
      setObservaciones('');
      setNombreM('');
      setCantidadv('');
      setId(''); // Limpiamos el ID
      alert('Cita guardada o editada exitosamente');
    } catch (error) {
      console.error('Error al guardar o editar la cita', error);
    }
  };
  
  // Función para eliminar el medicamento (en realidad parece ser para eliminar una cita)
const handleEliminar = async () => {
  // Verificar si el 'id' y la URL para eliminar están definidos
  if (!id || !citaseliminar) {
    console.error('Faltan datos necesarios: id o citaseliminar no están definidos.');
    alert('No se puede eliminar, datos faltantes.');
    return;
  }

  // Confirmar la eliminación de la cita
  if (window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
    try {
      // Realizar la solicitud DELETE
      const response = await axios.delete(`${citaseliminar}/${id}`);

      // Comprobar si la respuesta es exitosa
      if (response.status === 200) {
        console.log('Cita eliminada:', response.data);
        alert('Cita eliminada exitosamente');
        // Aquí podrías actualizar la lista de citas si es necesario
      } else {
        // Si el servidor responde con algo distinto a 200, manejarlo aquí
        console.error('Error al eliminar la cita:', response.data);
        alert('Hubo un problema al eliminar la cita.');
      }
    } catch (error) {
      // Capturar y mostrar el error si algo falla en la solicitud
      console.error('Error al eliminar la cita', error);
      if (error.response) {
        // Si hay una respuesta del servidor, mostrarla
        console.error('Error del servidor:', error.response.data);
        alert('Ocurrió un error al intentar eliminar la cita. Intenta de nuevo más tarde.');
      } else {
        // Si no hay respuesta del servidor, mostrar el error general
        console.error('Error general:', error.message);
        alert('Ocurrió un error al intentar eliminar la cita. Intenta de nuevo más tarde.');
      }
    }
  }
}



  const imprimirFormulario = () => {
    const fechaactual_cita = new Date().toLocaleDateString();
    const hora_cita = new Date().toLocaleTimeString();

    const fecha_cita = document.getElementById('fecha_cita').value;  // Si el valor proviene de un campo de formulario
    const nombre_dr = document.getElementById('nombre_dr').value;
    const nombre_paciente = document.getElementById('nombre_paciente').value;
    const presion = document.getElementById('presion').value;
    const peso = document.getElementById('peso').value;
    const ritmo_cardiaco = document.getElementById('ritmo_cardiaco').value;
    const temperatura = document.getElementById('temperatura').value;
    const sintomas = document.getElementById('sintomas').value;
    const receta = document.getElementById('receta').value;
    const observaciones = document.getElementById('observaciones').value;
    const nombre_medicamento = document.getElementById('nombre_medicamento').value;
    const cantidadventa = document.getElementById('cantidadventa').value;

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
        .auto-ajustable {
          max-width: 500px;
          min-width: 200px;
          white-space: normal;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
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
              <td><strong>Fecha de la cita:</strong></td>
              <td>${fecha_cita}</td>
            </tr>
            <tr>
              <td><strong>Nombre del Doctor:</strong></td>
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
            {/* Campo para ingresar ID */}
            <div className="col-md-12">
              <label htmlFor="citaid" className="text-black">
                Ingrese ID de la Cita:
              </label>
              <input
                type="text"
                className="form-control"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
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
                onClick={() => handleSelectcita(cita)}
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
                        onChange={(e) => setFechaCita(e.target.value)}
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
                      onChange={(e) => setNombreDR(e.target.value)}
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
                        onChange={(e) => setNombrepaciente(e.target.value)}
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
                        onChange={(e) => setRitmo(e.target.value)}
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
                        onChange={(e) => setNombreM(e.target.value)}
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
                        onChange={(e) => setCantidadv(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                  <div className="row">
                    <div className="col-md-4">
                      <button 
                      type="button" 
                      className="btn btn-primary btn-lg btn-block" 
                      onClick={(e) => handleSubmit(e, 'guardar')}>
                        Guardar Cita
                      </button>
                    </div>
                    <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                          onClick={(e) => handleSubmit(e, 'editar')}
                        >
                          Editar cita
                        </button>
                      </div> 

                      <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-danger btn-lg btn-block"
                      onClick={handleEliminar} // Llamar a la función de eliminar
                    >
                      Eliminar Cita
                    </button>
                  </div>  
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



