import React from 'react';
import ReactDOM from 'react-dom';
import Formulario from './imprimir'; 

const Formularios = () => {
  return (
    <div>
      <h1>Formulario de Login</h1>
      <Formulario />
    </div>
  );
};

ReactDOM.render(<Formularios />, document.getElementById('root'));

