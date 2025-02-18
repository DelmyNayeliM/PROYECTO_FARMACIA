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
import './css/menu.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Form_medicamento from './paginas/medicamento';
import Formulariopaciente from './paginas/form_paciente';
import Formulariocitas from './paginas/form_citas';
import Acercade from './paginas/acercade';
import Login from './paginas/Login';
import Navbar from './plantilla/navbar';
import Formulario from './paginas/imprimir';
import Inicio from './paginas/menu';
import Tablero from './paginas/tablero';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>  
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/medicamento" element={<Form_medicamento />} />
          <Route path="/formulariopaciente" element={<Formulariopaciente />} />
          <Route path="/formulariocitas" element={<Formulariocitas />} />
          <Route path="/acercade" element={<Acercade />} />
          <Route path="/tablero" element={<Tablero />} />
          <Route path="/formulario" element={<Formulario />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
