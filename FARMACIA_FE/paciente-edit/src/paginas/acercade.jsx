import React from 'react';

const Acercade = () => {
  return (
    <div className="site-wrap">
      <div className="site-navbar py-2">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="main-nav d-none d-lg-block">
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li className="has-children"></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12 mx-auto align-self-center">
            <div className="site-block-cover-content text-center">
              <h1 className="mb-4">Acerca del <strong className="text-primary">Dispensario</strong></h1>
              <p className="lead">El dispensario fue creado para retribuir un poco de lo mucho que hacen nuestros colaboradores todos los días.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-4 text-center">
            <h3 className="text-black">¿Quiénes se benefician?</h3>
            <p className="no-space">Nuestros colaboradores en primer lugar, ya sean permanentes o temporales, al igual que sus dependientes.</p>
          </div>
          <div className="col-md-4 text-center">
            <h3 className="text-black">Historia</h3>
            <p className="no-space">Nace a medida de las diferentes necesidades y accidentes que surgían entre los colaboradores, y cómo esto podría volver un riesgo para la planta.</p>
          </div>
          <div className="col-md-4 text-center">
            <h3 className="text-black">Beneficiarios</h3>
            <p className="no-space">+ 200 trabajadores y sus familias son de los muchos que han gozado de este beneficio que otorga la empresa.</p>
          </div>
        </div>
      </div>

      <div className="container py-5">
  <div className="row justify-content-center mb-4">
    <div className="title-section text-center col-md-8">
      <h2>Nuestro equipo de<strong className="text-primary">Trabajo</strong></h2>
    </div>
  </div>
  <div className="row gy-4 justify-content-center">
    <div className="col-md-6 col-lg-4">
      <div className="block-38 text-center">
        <div className="block-38-header">
          <p className="block-38 fw-bold h4 text-black">Dr. Cristian Audatto Muñoz</p>
        </div>
        <div className="block-38-body">
        <p className="no-space">
        <span className="fw-bold ">Egresado de la universidad:</span>
        <span className="text-gray-600 text-black"> Universidad</span>
        </p>
          <p className="no-space">
        <span className="fw-bold ">Especialidad:</span>
        <span className="text-gray-600 text-black"> Medico General</span>
      </p>
        </div>
      </div>
    </div>

    <div className="col-md-6 col-lg-4">
      <div className="block-38 text-center">
        <div className="block-38-header">
          <p className="block-38 fw-bold h4 text-black">Dr. Kevin Heney Llanes</p>
        </div>
        <div className="block-38-body">
        <p className="no-space">
        <span className="fw-bold ">Egresado de la universidad:</span>
        <span className="text-gray-600 text-black"> Universidad</span>
      </p>
      <p className="no-space">
        <span className="fw-bold ">Especialidad:</span>
        <span className="text-gray-600 text-black"> Medico General</span>
      </p>

      <div className="col-md-4 col-lg-4">
          <p className="block-38 fw-bold h4 text-black">Lic. Marleni Cantarero</p>
        </div>
        <div className="block-38-body">
    
        <span className="fw-bold ">Egresada de la universidad:</span>
        <span className="text-gray-600 text-black"> Universidad</span>
   
      <p className="no-space">
        <span className="fw-bold ">Especialidad:</span>
        <span className="text-gray-600 text-black"> Medico General</span>
      </p>
        </div>
      </div>
    </div>
    
    </div>
  </div>
</div>
</div>
  );
};

export default Acercade;
