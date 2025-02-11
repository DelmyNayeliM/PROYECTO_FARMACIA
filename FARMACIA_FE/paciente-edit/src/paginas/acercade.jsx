const Acercade = () => {
  return (
    <div className="site-wrap">
      <div className="site-navbar py-2">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="main-nav d-none d-lg-block">
              <nav className="site-navigation text-right text-md-center" role="navigation">
                <ul className="site-menu js-clone-nav d-none d-lg-block">
                  <li className="has-children">
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto align-self-center">
              <div className="site-block-cover-content text-center">
                <h1 className="mb-0">Acerca del <strong className="text-primary">Dispensario</strong></h1>
                <div className="row justify-content-center mb-5">
                  <div className="col-lg-6 text-center">
                    <p>El dispensario fue creado para retribuir un poco de lo mucho que hacen nuestros colaboradores todos los días.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h3 className="text-black h4">¿Quiénes se benefician?</h3>
              <p>Nuestros colaboradores en primer lugar, ya sean permanentes o temporales, y lo hacen sus dependientes.</p>
            </div>
            <div className="col-lg-4">
              <h3 className="text-black h4">Historia</h3>
              <p>Nace a medida de las diferentes necesidades y accidentes que surgían entre los colaboradores, y cómo esto podría volver un riesgo para la planta.</p>
            </div>
            <div className="col-lg-4">
              <h3 className="text-black h4">Beneficiarios</h3>
              <p>+ 200 trabajadores y sus familias son de los muchos que han gozado de este beneficio que otorga la empresa.</p>
            </div>
          </div>
        </div>
      

        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="title-section text-center col-md-7">
              <h2>Nuestros <strong className="text-primary">Médicos</strong></h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="block-38 text-center">
                  <div className="block-38-header">
                    <h3 className="block-38-heading h4">1</h3>
                    <p className="block-38-subheading">Dr. Cristian Audatto Muñoz</p>
                  </div>
                  <div className="block-38-body">
                    <p>Egresado de la universidad:</p>
                    <p>Años de experiencia:</p>
                    <p>Especialidad:</p>
                  </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-5">
              <div className="block-38 text-center">
                  <div className="block-38-header">
                    <h3 className="block-38-heading h4">2</h3>
                    <p className="block-38-subheading">Dr. Kevin Heney Llanes</p>
                  </div>
                  <div className="block-38-body">
                    <p>Egresado de la universidad:</p>
                    <p>Años de experiencia:</p>
                    <p>Especialidad:</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      

      </div>
  );
};

export default Acercade;