import React from "react";

const FormularioPacientes = () => {
  return (
    <div className="site-wrap">
      <div className="site-navbar py-2">
        <div className="search-wrap">
          <div className="container">
            <a href="#" className="search-close js-search-close">
              <span className="icon-close2"></span>
            </a>
            <form action="#" method="post">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por el nombre del paciente"
              />
            </form>
          </div>
        </div>

        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div className="site-logo">
                <a href="index.html" className="js-logo-clone">
                  <strong className="text-primary">DISPENSARIO MEDICO </strong>
                  "EL CAJON"
                </a>
              </div>
            </div>
            <div className="main-nav d-none d-lg-block">
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li><a href="index.html">Inicio</a></li>
                  <li><a href="shop.html">Inventario</a></li>
                  <li className="has-children">
                    <a href="#">Categoria</a>
                    <ul className="dropdown">
                      <li><a href="#">Medicamentos</a></li>
                      <li><a href="#">Suplementos</a></li>
                      <li><a href="#">Material</a></li>
                    </ul>
                  </li>
                  <li><a href="shop.html">Citas</a></li>
                  <li><a href="shop.html">Pacientes</a></li>
                </ul>
              </nav>
            </div>
            <div className="icons">
              <a href="#" className="icons-btn d-inline-block js-search-open">
                <span className="icon-search"></span>
              </a>
              <a href="cart.html" className="icons-btn d-inline-block bag"></a>
              <a href="#" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
                <span className="icon-menu"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Inicio</a> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">Pacientes</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-5 text-black">Formulario de Registro de Pacientes</h2>
            </div>
            <div className="col-md-12">
              <form action="#" method="post">
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        Tipo de Paciente: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        Tipo de Empleado: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="c_fname" className="text-black">
                        Nombre completo del Paciente: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        Clave del Empleado: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        Clave de Expediente: <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        Teléfono: <span className="text-danger"></span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        Edad:<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_fname"
                        name="c_fname"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_subject" className="text-black">
                        Dirección:{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="c_subject"
                        name="c_subject"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_email" className="text-black">
                        Correo electrónico: <span className="text-danger"></span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="c_email"
                        name="c_email"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_message" className="text-black">
                        Enfermedad de Base:{" "}
                      </label>
                      <textarea
                        name="c_message"
                        id="c_message"
                        cols="30"
                        rows="7"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        value="Guardar el Paciente"
                      />
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

export default FormularioPacientes;
