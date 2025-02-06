import React from 'react';
import './App.css'; // Import your CSS styles here

const App = () => {
  return (
    <div className="site-wrap">

      <div className="site-navbar py-2">

        <div className="search-wrap">
          <div className="container">
            <a href="#" className="search-close js-search-close"><span className="icon-close2"></span></a>
            <form action="#" method="post">
              <input type="text" className="form-control" placeholder="Buscar por nombre del producto" />
            </form>
          </div>
        </div>

        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div className="site-logo">
                <a href="index.html" className="js-logo-clone">
                  <strong className="text-primary">DISPENSARIO MEDICO</strong> "EL CAJON"
                </a>
              </div>
            </div>
            <div className="main-nav d-none d-lg-block">
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li><a href="index.html">Inicio</a></li>
                  <li className="active"><a href="shop.html">Inventario</a></li>
                  <li className="has-children">
                    <a href="#">Categoria</a>
                    <ul className="dropdown">
                      <li><a href="#">Medicamento</a></li>
                      <li><a href="#">Suplemento</a></li>
                      <li><a href="#">Material</a></li>
                    </ul>
                  </li>
                  <li><a href="about.html">Citas</a></li>
                  <li><a href="contact.html">Pacientes</a></li>
                </ul>
              </nav>
            </div>
            <div className="icons">
              <a href="#" className="icons-btn d-inline-block js-search-open"><span className="icon-search"></span></a>
              <a href="#" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"><span className="icon-menu"></span></a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0"><a href="index.html">Inicio</a> <span className="mx-2 mb-0">/</span> <a href="shop.html">Medicamentos</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Ibuprofen Tablets, 200mg</strong></div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-5 mr-auto"></div>
            <div className="col-md-6">
              <h2 className="text-black">Ibuprofen Tablets, 200mg</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores iusto! Molestiae expedita veritatis nesciunt doloremque sint asperiores fuga voluptas, distinctio, aperiam, ratione dolore.</p>

              <strong className="text-primary h4">$55.00</strong>

              <div className="mb-5">
                <div className="input-group mb-3" style={{ maxWidth: '220px' }}>
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                  </div>
                  <input type="text" className="form-control text-center" value="1" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <ul className="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Descripcion del medicamento</a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th>Categoria</th>
                          <th>Nombre del medicamento</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">OTC022401</th>
                          <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                        </tr>
                        <tr>
                          <th scope="row">OTC022401</th>
                          <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                        </tr>
                        <tr>
                          <th scope="row">OTC022401</th>
                          <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
