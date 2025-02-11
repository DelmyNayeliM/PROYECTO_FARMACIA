import React from 'react';

const Inventario = () => {
  return (
    <div className="site-wrap">
      <div className="site-navbar py-2">
        <div className="search-wrap">
          <div className="container">

            <form action="#" method="post">
              <input type="text" className="form-control" placeholder="Buscar por nombre del producto " />
            </form>
          </div>
        </div>

        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo">
              <div className="site-logo">
                <strong className="text-primary">DISPENSARIO MEDICO </strong>"EL CAJON"
              </div>
            </div>
            <div className="main-nav d-none d-lg-block">
              <nav className="site-navigation text-right text-md-center" role="navigation">
              </nav>
            </div>
            <div className="icons">
              <span className="icon-search"></span>
              <span className="icon-menu"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <span className="mx-2 mb-0">/</span> <strong className="text-black">Inventario</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">

            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
              
                <h3 className="text-dark">Bioderma</h3>
                <p className="price">$55.00</p>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventario;
