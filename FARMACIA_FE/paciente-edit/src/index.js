import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './bootstrap.min.css';
import './css/aos.css';
import './css/bootstrap-grid.css';
import './css/bootstrap-reboot.css';
//import './css/bootstrap.css';
import './css/bootstrap.min.css.map';
//import './css/jquery-ui.css';
import './css/magnific-popup.css';
import './css/owl.carousel.min.css';
import './css/owl.theme.default.min.css';

import Form_medicamento from './paginas/medicamento';
import FormularioRegistro from './paginas/form_registro';
import Formulariopaciente from './paginas/form_paciente';
import Formulariocitas from './paginas/form_citas';
import Inventario from './paginas/inventario';
import Acercade from './paginas/acercade';
import Login from './paginas/Login';



const root = ReactDOM.createRoot(document.getElementById('root')); // Crea un root
root.render(
  <React.StrictMode>
    <Login/>
    <Formulariopaciente />
    <FormularioRegistro />
    <Form_medicamento />
    <Formulariocitas/>
    < Inventario/>
    <Acercade/>
  </React.StrictMode>
);
