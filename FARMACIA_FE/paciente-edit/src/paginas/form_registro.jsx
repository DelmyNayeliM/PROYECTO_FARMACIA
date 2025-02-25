import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { medicamentoguardar, medicamentoeditar, medicamentobuscarinve } from '../configuraciones/apiURLS';

const FormularioRegistro = ({ medicamentoEditado }) => {
  const [categoria, setCategoria] = useState('');
  const [nombre_medicamento, setNombre_Medicamento] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [id, setId] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [medicamentosResultados, setmedicamentosResultados] = useState([]); // Para almacenar los resultados de búsqueda

  useEffect(() => {
    if (medicamentoEditado) {
      setCategoria(medicamentoEditado.categoria);
      setNombre_Medicamento(medicamentoEditado.nombre_medicamento);
      setDescripcion(medicamentoEditado.descripcion);
      setPrecio(medicamentoEditado.precio);
      setCantidad(medicamentoEditado.cantidad);
      setId(medicamentoEditado._id);
    }
  }, [medicamentoEditado]);


  useEffect(() => {
    const fetchMedicamentos = async () => {
      if (searchTerm.trim() === '') {
        setmedicamentosResultados([]); // Limpiar resultados 
        return;
      }

      try {
        const response = await axios.get(`${medicamentobuscarinve}?search=${searchTerm}`);
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
    setCategoria(medicamento.categoria);
    setNombre_Medicamento(medicamento.nombre_medicamento);
    setDescripcion(medicamento.descripcion);
    setPrecio(medicamento.precio);
    setCantidad(medicamento.cantidad);
    setId(medicamento._id); // Asumí que el medicamento tiene un campo _id
  };

  // Maneja el envío del formulario para guardar o editar el medicamento
  const handleSubmit = async (e, action) => {
    e.preventDefault();

    if (categoria === '' || nombre_medicamento === '' || descripcion === '' || precio === '' || cantidad === '') {
      console.log('Por favor, complete todos los campos');
      return;
    }

    try {
      let response;
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

      console.log(response.data);
      setCategoria('');
      setNombre_Medicamento('');
      setDescripcion('');
      setPrecio('');
      setCantidad('');
      alert('Medicamento guardado o editado exitosamente');
    } catch (error) {
      console.error('Error al guardar o editar el medicamento', error);
    }
  };

  // Función para eliminar el medicamento
  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este medicamento?')) {
      try {
        const response = await axios.delete(`${medicamentoeditar}/${id}`);
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

            {/* Barra de búsqueda */}
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre del medicamento"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <ul className="list-group">
                {medicamentosResultados.map((medicamento) => (
                  <li
                    key={medicamento._id} 
                    className="list-group-item"
                    onClick={() => handleSelectmedicamento(medicamento)}
                  >
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
                    <input
                      type="text"
                      className="form-control"
                      id="categoria"
                      name="categoria"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      title="'Medicamento', 'Analgesicos', 'Material'"
                    />
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
