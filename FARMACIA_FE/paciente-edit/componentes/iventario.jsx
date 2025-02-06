import React from 'react';
import './App.css'; // Ensure this links to your custom CSS files (or import them accordingly)

const InventoryPage = () => {
  return (
    <div className="site-wrap">
      <div className="site-navbar py-2">
        <div className="search-wrap">
          <div className="container">
            <a href="#" className="search-close js-search-close">
              <span className="icon-close2"></span>
            </a>
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
                  <strong className="text-primary">DISPENSARIO MEDICO </strong>"EL CAJON"
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
                      <li><a href="#">Medicamentos</a></li>
                      <li><a href="#">Suplementos</a></li>
                      <li><a href="#">Material</a></li>
                    </ul>
                  </li>
                  <li><a href="about.html">Citas</a></li>
                  <li><a href="contact.html">Pacientes</a></li>
                </ul>
              </nav>
            </div>
            <div className="icons">
              <a href="#" className="icons-btn d-inline-block js-search-open">
                <span className="icon-search"></span>
              </a>
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
              <a href="index.html">Inicio</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Inventario</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
              <a href="shop-single.html">
                <h3 className="text-dark"><a href="shop-single.html">Bioderma</a></h3>
                <p className="price">$55.00</p>
              </a>
            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
              <a href="shop-single.html">
                <h3 className="text-dark"><a href="shop-single.html">Bioderma</a></h3>
                <p className="price">$55.00</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
