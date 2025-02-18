import React from 'react';
import { Link } from 'react-router-dom';

const Inicioadmin = () => {
  const menuItems = [
    { title: 'Citas', path: '/form_citas' },
    { title: 'Pacientes', path: '/form_paciente' },
    { title: 'Inventario', path: '/tablero' },
    { title: 'Medicamentos', path: '/form_registro' }
  ];

  return (
    <main className="site-wrapper">
      <div className="pt-table desktop-768">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title home text-center"></div>

              <div className="hexagon-menu">
                {menuItems.map((item, index) => (
                  <div className="hexagon-item" key={index}>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <Link to={item.path} className="hex-content">
                      <span className="hex-content-inner text-black">
                        <span className="title">{item.title}</span>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Inicioadmin;
