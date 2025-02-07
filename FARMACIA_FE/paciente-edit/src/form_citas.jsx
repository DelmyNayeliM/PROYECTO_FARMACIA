import React from 'react';
import './App.css'; // Importa tus estilos CSS aquí

const FormularioRegistro = () => {
  return (
    <div className="site-wrap">
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-5 text-black">Formulario de Registro de Medicamentos</h2>
            </div>
            <div className="col-md-12">
              <form action="#" method="post">
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">Categoría: <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="c_fname" name="c_fname" />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="c_fname" className="text-black">Nombre completo del Medicamento: <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="c_fname" name="c_fname" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_message" className="text-black">Descripción<span className="text-danger">*</span></label>
                      <textarea name="c_message" id="c_message" cols="30" rows="7" className="form-control"></textarea>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">Precio: <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="c_fname" name="c_fname" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input type="submit" className="btn btn-primary btn-lg btn-block" value="Guardar Medicamento" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input type="submit" className="btn btn-primary btn-lg btn-block" value="Editar Medicamento" />
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
