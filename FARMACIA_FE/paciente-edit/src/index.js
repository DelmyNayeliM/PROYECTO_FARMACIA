import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './bootstrap.min.css';
import './css/aos.css';
import './css/bootstrap-grid.css';
import './css/bootstrap-reboot.css';
import './css/bootstrap.min.css.map';
import './css/magnific-popup.css';
import './css/owl.carousel.min.css';
import './css/owl.theme.default.min.css';

import { BrowserRouter } from 'react-router-dom';  // Importa BrowserRouter

import Form_medicamento from './paginas/medicamento';
import FormularioRegistro from './paginas/form_registro';
import Formulariopaciente from './paginas/form_paciente';
import Formulariocitas from './paginas/form_citas';
import Inventario from './paginas/inventario';
import Acercade from './paginas/acercade';
import Login from './paginas/Login';
import Navbar from './plantilla/navbar';
import Formulario from './paginas/imprimir';
import Home from './plantilla/home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>  
      <div>
      <Home />
        <Login />
        <Navbar />
          <Formulariopaciente />
        <Navbar />
          <FormularioRegistro />
        <Navbar />
          <Form_medicamento />
        <Navbar />
          <Formulariocitas />
        <Inventario />
        <Acercade />
        <Formulario />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
