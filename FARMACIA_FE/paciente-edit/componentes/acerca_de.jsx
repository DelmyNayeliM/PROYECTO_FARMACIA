import React from 'react';
import './App.css'; // Import CSS file(s)

const DispensarioPage = () => {
  return (
    <div className="site-wrap">
      {/* Navbar Section */}
      <div className="site-navbar py-2">
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
              <a href="cart.html" className="icons-btn d-inline-block bag"></a>
              <a href="#" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
                <span className="icon-menu"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="site-blocks-cover overlay" style={{ backgroundImage: 'url("images/hero_bg_2.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto align-self-center">
              <div className="site-block-cover-content text-center">
                <h1 className="mb-0">Acerca del <strong className="text-primary">Dispensario</strong></h1>
                <div className="row justify-content-center mb-5">
                  <div className="col-lg-6 text-center">
                    <p>El dispensario fue creado para retribuir un poco de lo mucho que hacen nuestros colaboradores todos los dias.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="site-section py-5" data-aos="fade">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h3 className="text-black h4">¿Quienes se benefician?</h3>
              <p>Nuestros colaboradores en primer lugar, ya sean permanentes o temporales, lo hacen sus dependientes.</p>
            </div>
            <div className="col-lg-4">
              <h3 className="text-black h4">Historia</h3>
              <p>Nace a medida de las diferentes necesidades y accidentes que surgían entre los colaboradores y cómo esto se podría volver un riesgo para la planta.</p>
            </div>
            <div className="col-lg-4">
              <h3 className="text-black h4">Beneficiarios</h3>
              <p>+ 200 trabajadores y sus familias son de los muchos que han gozado de este beneficio que otorga la empresa.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="site-section bg-light custom-border-bottom" data-aos="fade">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="title-section text-center col-md-7">
              <h2>Nuestros <strong className="text-primary">Medicos</strong></h2>
            </div>
          </div>
          <div className="row">
            {[1, 2].map((id) => (
              <div key={id} className="col-md-6 col-lg-4 mb-5">
                <div className="block-38 text-center">
                  <div className="block-38-img">
                    <div className="block-38-header">
                      <h3 className="block-38-heading h4">{id}</h3>
                      <p className="block-38-subheading">Dr.</p>
                    </div>
                    <div className="block-38-body">
                      <p>
                        <br />Egresado de la universidad: <br />
                        Años de experiencia: <br />
                        Especialidad: <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Section (Optional) */}
      <div className="site-section site-section-sm site-blocks-1 border-0" data-aos="fade">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up">
              <div className="icon mr-4 align-self-start"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispensarioPage;
