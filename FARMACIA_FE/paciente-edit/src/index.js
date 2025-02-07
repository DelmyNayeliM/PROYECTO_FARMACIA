import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './bootstrap.min.css';
import Form_medicamento from './medicamento';


const root = ReactDOM.createRoot(document.getElementById('root')); // Crea un root
root.render(
  <React.StrictMode>
    <Form_medicamento />
  </React.StrictMode>
);
