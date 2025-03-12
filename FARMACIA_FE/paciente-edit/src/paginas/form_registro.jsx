import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { medicamentoguardar, medicamentoeditar, medicamentobuscar, medicamentoeliminar} from '../configuraciones/apiURLS';

const FormularioRegistro = ({ medicamentoid }) => {
  const [categoria, setCategoria] = useState('');
  const [nombre_medicamento, setNombre_Medicamento] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [id, setId] = useState();
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [medicamentosResultados, setmedicamentosResultados] = useState([]); // Para almacenar los resultados de búsqueda


  useEffect(() => {
    const fetchMedicamentos = async () => {
      if (!id) return; // Si no hay ID, no hacer nada
      try {
        const response = await axios.get(`${medicamentoid}/${id}`);
        if (response.status === 200) {
          const medicamento = response.data;
          setId(medicamento.id);
          setCategoria(medicamento.categoria);
          setNombre_Medicamento(medicamento.nombre_medicamento);
          setDescripcion(medicamento.descripcion);
          setPrecio(medicamento.precio);
          setCantidad(medicamento.cantidad);
        } else {
          console.error("No se encontró el medicamento");
        }
      } catch (error) {
        console.error('Error al obtener el medicamento', error);
        alert('No se encontró el medicamento con ese ID');
      }
    };
  
    if (id) fetchMedicamentos(); // Solo ejecutar si el ID es válido
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
    setSearchTerm(''); // Limpiar el searchTerm para que desaparezca la lista
  }
  

  // Maneja el envío del formulario para guardar o editar el medicamento
  const handleSubmit = async (e, action) => {
    e.preventDefault();
  
    if (categoria === '' || nombre_medicamento === '' || descripcion === '' || precio === '' || cantidad === '') {
      console.log('Por favor, complete todos los campos');
      return;
    }
  
    try {
      let response;
  
      // Comprobación de las URLs para verificar si están correctas
      console.log('URL de guardar medicamento:', medicamentoguardar);
      console.log('URL de editar medicamento:', medicamentoeditar);
  
      if (action === 'guardar') {
        response = await axios.post(medicamentoguardar, {
          categoria,
          nombre_medicamento,
          descripcion,
          precio,
          cantidad,
        });
      } else if (action === 'editar' && id) {
        response = await axios.put(`${medicamentoeditar}/${id}`, {
          categoria,
          nombre_medicamento,
          descripcion,
          precio,
          cantidad,
        });
      } 
        console.log('Medicamento Editado:', response.data);
  
      // Verificación de que la respuesta tiene la propiedad "data"
      if (response && response.data) {
        console.log(response.data); // Muestra los datos de la respuesta
        setCategoria('');
        setNombre_Medicamento('');
        setDescripcion('');
        setPrecio('');
        setCantidad('');
        alert('Medicamento guardado o editado exitosamente');
      } else {
        console.error('La respuesta de la API no contiene "data"');
      }
    } catch (error) {
      console.error('Error al guardar o editar el medicamento', error);
    
      if (error.response) {
        // El servidor respondió, pero con un código de error
        console.error('Respuesta del servidor:', error.response);
        console.error('Datos del error:', error.response.data); // Aquí puedes ver más detalles de la respuesta del servidor
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        // Algo ocurrió al configurar la solicitud
        console.error('Error al configurar la solicitud:', error.message);
      }
    }
  };
    
  
  
  // Función para eliminar el medicamento
  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este medicamento?')) {
      try {
        const response = await axios.delete(`${medicamentoeliminar}/${id}`);
        console.log(response.data);
        alert('Medicamento eliminado exitosamente');
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
                      Categoría: <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      id="categoria"
                      name="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Medicameto">Medicameto</option>
                      <option value="Analgesicos">Analgesicos</option>
                      <option value="Material">Material</option>
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
                      title="El nombre debe tener entre 3 y 75 caracteres"
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
                      title="Entre 10 y 45 caracteres"
                    ></textarea>
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
                        title="Ejemplo 100.00"
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
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                          onClick={(e) => handleSubmit(e, 'guardar')}
                        >
                          Guardar Medicamento
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                          onClick={(e) => handleSubmit(e, 'editar')}
                        >
                          Editar Medicamento
                        </button>
                      </div>

                      <div className="col-md-4">
                        {id && (
                          <button
                            type="button"
                            className="btn btn-danger btn-lg btn-block"
                            onClick={handleEliminar}
                          >
                            Eliminar Medicamento
                          </button>
                        )}
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
