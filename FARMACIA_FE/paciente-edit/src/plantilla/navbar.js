import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const Navbar = () => {
  return (
  <>
    <div className="site-navbar py-2">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <Link to="/" className="js-logo-clone">
                <strong className="text-primary">DISPENSARIO MEDICO </strong>
                "EL CAJON"
              </Link>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav className="site-navigation text-right text-md-center" role="navigation">
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li>
                  <Link to="/admin">Inicio</Link>
                </li>
                <li>
                  <Link to="/tablero">Inventario</Link>
                </li>
                <li>
                  <Link to="/form_registro">Medicamentos</Link>
                </li>
                <li>
                  <Link to="/form_citas">Citas</Link>
                </li>
                <li>
                  <Link to="/form_paciente">Pacientes</Link>
                </li>
                <li>
                  <Link to="/Acercade">Acerca de...</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <Outlet/>
  </>
  );
};

export default Navbar;
