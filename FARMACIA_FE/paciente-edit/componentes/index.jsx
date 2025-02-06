import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Formulario from './principal'; // Importa el componente App
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Formulario /> {/* Asegúrate de que el componente App esté siendo renderizado aquí */}
  </React.StrictMode>,
  document.getElementById('root') // Esto se asegura de que el componente se monte en el HTML
);

reportWebVitals();
