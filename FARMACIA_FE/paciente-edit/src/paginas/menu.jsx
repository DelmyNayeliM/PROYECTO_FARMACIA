import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const menuItems = [
    { title: 'Citas', path: '/formulariocitas' },
    { title: 'Pacientes', path: '/formulariopaciente' },
    { title: 'Inventario', path: '/tablero' }
  ];

  return (
    <main className="site-wrapper">
      <div className="pt-table desktop-768">
        <div className="container">
          <div className="row">
            <div className="col-lg-offset-2">
              <div className="page-title home text-center"></div>

              <div className="hexagon-menu clear">
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

export default Inicio;
