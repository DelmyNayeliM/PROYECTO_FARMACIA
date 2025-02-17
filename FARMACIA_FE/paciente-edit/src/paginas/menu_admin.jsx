import React from 'react';

const Inicio_admin = () => {
  return (
    <main className="site-wrapper">
      <div className="pt-table desktop-768">
        <div className="container">
          <div className="row justify-content-center"> 
            <div className="col-lg-8"> 
              <div className="page-title home text-center">
              </div>

              <div className="hexagon-menu clear d-flex justify-content-center flex-wrap"> 
                {['citas', 'PACIENTES', 'inventario', 'MEDICAMENTOS'].map((title, index) => (
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
                    <a className="hex-content">
                      <span className="hex-content-inner">
                        <span className="title">{title}</span>
                      </span>
                    </a>
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

export default Inicio_admin;
