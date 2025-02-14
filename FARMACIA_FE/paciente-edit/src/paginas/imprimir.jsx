import React from 'react';

const Formulario = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    imprimirFormulario();
  };

  const imprimirFormulario = () => {
    console.log('Datos del formulario:');
    window.print();
  };

  return (
    <div className="site-wrap">
      <div className="site-section">
      <div className="container">
      <div className="form-group">
        <div className="col-md-12">
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          onClick={(e) => handleSubmit(e, false)}
        >
        {'Imprimir Formulario'}
      </button>
    </div>
    </div>
    </div>
    </div>
</div>
  );
};

export default Formulario;

