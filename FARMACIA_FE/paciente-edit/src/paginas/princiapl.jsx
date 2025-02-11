import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  return (
    <div className="site-wrap">
      <div className="site-navbar py-2">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div className="site-logo">
                <Link to="/" className="js-logo-clone"><strong className="text-primary">DISPENSARIO MEDICO </strong>"EL CAJON"</Link>
              </div>
            </div>
            <div className="main-nav d-none d-lg-block">
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li><Link to="/principal">Inicio</Link></li>
                  <li><Link to="/medicamento">Inventario</Link></li>
                  <li className="has-children">
                    <Link to="#">Categoria</Link>
                    <ul className="dropdown">
                      <li><Link to="/medicamento">Medicamentos</Link></li>
                      <li><Link to="/medicamento">Suplementos</Link></li>
                      <li><Link to="/medicamento">Material</Link></li> 
                    </ul>
                  </li>
                  <li><Link to="/citas">Citas</Link></li>
                  <li><Link to="/contact">Pacientes</Link></li>
                  <li><Link to="/about">Acerca de...</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="owl-carousel owl-single px-0">
        <div className="site-blocks-cover overlay" style={{ backgroundImage: 'url("images/hero_bg.jpg")' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mx-auto align-self-center">
                <div className="site-block-cover-content text-center">
                  <h1 className="mb-0"><strong className="text-primary">DISPENSARIO MEDICO </strong><br />"EL CAJON" <br /></h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-blocks-cover overlay" style={{ backgroundImage: 'url("images/hero_bg_2.jpg")' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mx-auto align-self-center">
                <div className="site-block-cover-content text-center">
                  <h1 className="mb-0">HORARIOS DE ATENCION <br />Lunes a Viernes<br />6 AM - 1 PM <br /> 1PM - 7 PM</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2>MEDICAMENTOS <strong className="text-primary">DISPONIBLES</strong></h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 block-3 products-wrap">
              <div className="nonloop-block-3 owl-carousel">
                <div className="text-center item mb-4 item-v2">
                  <h3 className="text-dark"><Link to="/shop-single">Umcka Cold Care</Link></h3>
                  <p className="price">$120.00</p>
                </div>

                <div className="text-center item mb-4 item-v2">
                  <h3 className="text-dark"><Link to="/shop-single">Umcka Cold Care</Link></h3>
                  <p className="price">$120.00</p>
                </div>

                <div className="text-center item mb-4 item-v2">
                  <h3 className="text-dark"><Link to="/shop-single">Umcka Cold Care</Link></h3>
                  <p className="price">$120.00</p>
                </div>

                <div className="text-center item mb-4 item-v2">
                  <h3 className="text-dark"><Link to="/shop-single">Umcka Cold Care</Link></h3>
                  <p className="price">$120.00</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="js/jquery-3.3.1.min.js"></script>
      <script src="js/jquery-ui.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/owl.carousel.min.js"></script>
      <script src="js/jquery.magnific-popup.min.js"></script>
      <script src="js/aos.js"></script>
      <script src="js/main.js"></script>
    </div>
  );
}

export default App;
