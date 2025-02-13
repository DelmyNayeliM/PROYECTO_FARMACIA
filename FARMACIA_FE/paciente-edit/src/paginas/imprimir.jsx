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
    <div className="form-group row">
      <div className="col-lg-6">
        <button
          type="submit"
          className="btn btn-primary btn-lg btn-block"
          onClick={(e) => handleSubmit(e, false)}
        >
        {'Imprimir Formulario'}
      </button>
    </div>
</div>
  );
};

export default Formulario;

