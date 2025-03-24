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

    </div>
  );
}

export default App;
