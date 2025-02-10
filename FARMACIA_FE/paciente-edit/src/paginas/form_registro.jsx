import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { medicamentoguardar, medicamentoeditar } from '../configuraciones/apiURLS';

const FormularioRegistro = ({ medicamentoEditado }) => {
  const [categoria, setCategoria] = useState('');
  const [nombre_medicamento, setNombre_Medicamento] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [id, setId] = useState('');

  // useEffect para llenar el formulario si se edita un medicamento
  useEffect(() => {
    if (medicamentoEditado) {
      setCategoria(medicamentoEditado.categoria);
      setNombre_Medicamento(medicamentoEditado.nombre_medicamento);
      setDescripcion(medicamentoEditado.descripcion);
      setPrecio(medicamentoEditado.precio);
      setId(medicamentoEditado._id);
    }
  }, [medicamentoEditado]);

  // Maneja el envío del formulario para guardar o editar el medicamento
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoria === '' || nombre_medicamento === '' || descripcion === '' || precio === '') {
      console.log('Por favor, complete todos los campos');
      return;
    }

    try {
      let response;
      if (id) {
        response = await axios.put(`${medicamentoeditar}/${id}`, {
          categoria,
          nombre_medicamento,
          descripcion,
          precio,
        });
      } else {
        // Si no existe un id, se hace un POST para guardar un nuevo medicamento
        response = await axios.post(medicamentoguardar, {
          categoria,
          nombre_medicamento,
          descripcion,
          precio,
        });
      }

      console.log(response.data);
      setCategoria('');
      setNombre_Medicamento('');
      setDescripcion('');
      setPrecio('');
      alert('Medicamento guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el medicamento', error);
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
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
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
                    ></textarea>
                  </div>

                  <div className="form-group row">
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
                    />
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">
                        {id ? 'Editar Medicamento' : 'Guardar Medicamento'}
                      </button>
                    </div>
                    {id && (
                      <div className="col-lg-4">
                        <button
                          type="button"
                          className="btn btn-danger btn-lg btn-block"
                          onClick={handleEliminar}
                        >
                          Eliminar Medicamento
                        </button>
                      </div>
                    )}
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
