import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { medicamentoguardar, medicamentoeditar, medicamentobuscar, medicamentoeliminar} from '../configuraciones/apiURLS';

const FormularioRegistro = ({ medicamentoid }) => {
  const [categoria, setCategoria] = useState('');
  const [nombre_medicamento, setNombre_Medicamento] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha_vence, setFechaV] = useState('');
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [medicamentosResultados, setmedicamentosResultados] = useState([]); // Para almacenar los resultados de búsqueda


  useEffect(() => {
    const fetchMedicamentos = async () => {
      if (!id || !medicamentoid) return; // Si no hay ID, no hacer nada
      try {
        const response = await axios.get(`${medicamentoid}/${id}`);
        if (response.status === 200) {
          const medicamento = response.data;
            if (medicamento) {
              setCategoria(medicamento.categoria);
              setNombre_Medicamento(medicamento.nombre_medicamento);
              setDescripcion(medicamento.descripcion);
              setPrecio(medicamento.precio);
              setCantidad(medicamento.cantidad);
              setFechaV(medicamento.fecha_vence);
            } else {
          }
      } else {
      }
  } catch (error) {
      console.error('Error al obtener el medicamento', error);
  }
};
  
fetchMedicamentos(); // Solo ejecutar si el ID es válido
}, [id, medicamentoid]); // Asegúrate de que id esté en las dependencias


  useEffect(() => {
    const fetchMedicamentos = async () => {
      if (searchTerm.trim() === '') {
        setmedicamentosResultados([]); // Limpiar resultados si la búsqueda está vacía
        return;
      }

      try {
        const response = await axios.get(`${medicamentobuscar}?search=${searchTerm}`);
        setmedicamentosResultados(response.data); // Asignar los resultados al estado
      } catch (error) {
        console.error('Error al buscar medicamentos', error);
      }
    };

    fetchMedicamentos();
  }, [searchTerm]); 

  // Maneja el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para seleccionar un medicamento de los resultados de búsqueda
  const handleSelectmedicamento = (medicamento) => {
    setId(medicamento.id);
    setCategoria(medicamento.categoria);
    setNombre_Medicamento(medicamento.nombre_medicamento);
    setDescripcion(medicamento.descripcion);
    setPrecio(medicamento.precio);
    setCantidad(medicamento.cantidad);
    setFechaV(medicamento.fecha_vence);
    setSearchTerm(''); // Limpiar el searchTerm para que desaparezca la lista
  }
  

  // Maneja el envío del formulario para guardar o editar el medicamento
  const handleSubmit = async (e, action) => {
    e.preventDefault();

    if (categoria === '' || nombre_medicamento === '' || descripcion === '' || precio === '' || cantidad === '' || fecha_vence=== '') {
        alert('Por favor, complete todos los campos');
        return;
    }

    try {
        let response;

        if (action === 'guardar') {
            response = await axios.post(medicamentoguardar, {
                categoria,
                nombre_medicamento,
                descripcion,
                precio: parseFloat(precio), // Asegúrate de que sea un número
                cantidad: parseInt(cantidad), // Asegúrate de que sea un número entero
                fecha_vence,
            });
            alert('Medicamento creado exitosamente');
        } else if (action === 'editar' && id && medicamentoeditar) {
          response = await axios.put(`${medicamentoeditar}?id=${id}`, {
                categoria,
                nombre_medicamento,
                descripcion,
                precio: parseFloat(precio),
                cantidad: parseInt(cantidad),
                fecha_vence,
            });
            if (response && response.data && response.data.success) {
              alert('Medicamento editado exitosamente');
          }
      } else {
          alert('No se puede editar el medicamento. Falta información.');
          return;
      }

        if (response && response.data) {
            console.log('Respuesta del servidor:',response.data);
            setId('');
            setCategoria('');
            setNombre_Medicamento('');
            setDescripcion('');
            setPrecio('');
            setCantidad('');
            setFechaV('');
            alert('Medicamento editado exitosamente');
        } else {
            console.error('La respuesta de la API no contiene "data"');
        }
    } catch (error) {
        console.error('Error al guardar o editar el medicamento', error);

        if (error.response) {
          alert(`Error ${error.response.status}: ${error.response.statusText}`);
          console.error('Respuesta del servidor:', error.response);

          if (error.response.data && error.response.data.errors) {
              error.response.data.errors.forEach((err) => {
                  console.error('Error específico:', err);
                  alert(`Error: ${err.message}`);
              });
          }
      } else if (error.request) {
          // Solicitud realizada, pero no se recibió respuesta
          alert('No se recibió respuesta del servidor');
          console.error('No se recibió respuesta del servidor:', error.request);
      } else {
          // Error al configurar la solicitud
          alert('Error al configurar la solicitud');
          console.error('Error al configurar la solicitud:', error.message);
      }
  }
};

const handleEliminar = async () => {
  if (window.confirm('¿Estás seguro de que deseas eliminar este medicamento?')) {
    try {
      const response = await axios.delete(`${medicamentoeliminar}?id=${id}`);
      console.log(response.data);
      alert('Medicamento eliminado exitosamente');
      
      // Resetear los campos del formulario
      setId('');
      setCategoria('');
      setNombre_Medicamento('');
      setDescripcion('');
      setPrecio('');
      setCantidad('');
      setFechaV('');
      // Resetear otros campos...
      setId(null); // Si tienes un estado para el ID
    } catch (error) {
      console.error('Error al eliminar el medicamento', error);
    }
  }
};


  return (
    <div className="site-wrap">
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-5 text-black">Formulario de Registro de Medicamentos</h2>
            </div>

            {/* Campo para ingresar ID */}
              <div className="col-md-12">
              <label htmlFor="medicamentoid" className="text-black">
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
                placeholder="Buscar por nombre del medicamento"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul>
                {medicamentosResultados.map((medicamento) => (
                  <li key={medicamento.id} onClick={() => handleSelectmedicamento(medicamento)}>
                    {medicamento.nombre_medicamento}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-12">
              
              <form>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <label htmlFor="categoria" className="text-black">
                      Categorías: <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      id="categoria"
                      name="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Muestras medicas">Muestras Medicas</option>
                      <option value="Antibioticos adultos">Antibioticos adultos</option>
                      <option value="Migraña">Migraña</option>
                      <option value="Parenterales">Parenterales</option>
                      <option value="Cardiometabolicos">Cardiometabolicos</option>
                      <option value="Anestesia">Anestesia</option>
                      <option value="Cremas">Cremas</option>
                      <option value="Gotas">Gotas</option>
                      <option value="Ginecologicos">Ginecologicos</option>
                      <option value="Gastrointestinales">Gastrointestinales</option>
                      <option value="Alergias">Alergias</option>
                      <option value="Tos">Tos</option>
                      <option value="Asma-gripe">Asma-gripe</option>
                      <option value="Antibioticos niños">Antibioticos niños</option>
                      <option value="Analgesicos-antipirectico niños">Analgesicos-antipirectico niños</option>
                    </select>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="nombre_medicamento" className="text-black">
                      Nombre del Medicamento: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre_medicamento"
                      name="nombre_medicamento"
                      value={nombre_medicamento}
                      onChange={(e) => setNombre_Medicamento(e.target.value)}
                      placeholder="El nombre debe tener entre 3 y 75 caracteres"
                    />
                  </div>

                  <div className="form-group row">
                    <label htmlFor="descripcion" className="text-black">
                      Descripción: <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="descripcion"
                      id="descripcion"
                      cols="30"
                      rows="7"
                      className="form-control"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Entre 10 y 200 caracteres"
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                      <label htmlFor="fecha_vence" className="text-black">
                        Fecha de vencimiento: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="fecha_vence"
                        name="fecha_vence"
                        value={fecha_vence}
                        onChange={(e) => setFechaV(e.target.value)}
                      />
                    </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="precio" className="text-black">
                        Precio: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="precio"
                        name="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        placeholder="Ejemplo 100.00"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cantidad" className="text-black">
                        Cantidad: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="cantidad"
                        name="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                      />
                    </div>
                  </div>

              <div className="form-group">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-around">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={(e) => handleSubmit(e, 'guardar')}>
                            Guardar Medicamento
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={(e) => handleSubmit(e, 'editar')}
                            disabled={!id}  // Deshabilitar si no hay un ID 
                        >
                            Editar Medicamento
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger btn-lg"
                            onClick={(e) => handleEliminar(e, 'eliminar')}
                            disabled={!id}  // Deshabilitar si no hay un ID
                        >
                            Eliminar Medicamento
                        </button>
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

export default FormularioRegistro;
