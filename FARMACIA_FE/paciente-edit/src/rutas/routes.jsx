import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Form_medicamento from './paginas/medicamento';
import Formulariopaciente from './form_paciente';
import Formulariocitas from './paginas/form_citas';
import Acercade from '../paginas/acercade';
import Navbar from '../plantilla/navbar';
import Tablero from '../paginas/tablero';
import Inicioadmin from '../paginas/menu_admin';
import LoginForm from '../paginas/Login';
import TableroPaciente from '../paginas/tablero_paciente';
import FormularioRegistro from '../paginas/form_registro';

export const routers = createBrowserRouter(
  createRoutesFromElements(
    // Rutas principales de la aplicación
    <>
      {/* Ruta Login, que no muestra Navbar */}
      <Route path="/login" element={<LoginForm />} />

      {/* Rutas protegidas que requieren el Navbar */}
      <Route element={<Navbar />}>
        <Route path="/" element={<Inicioadmin />} />
        <Route path="/medicamento" element={<Form_medicamento />} />
        <Route path="/form_paciente" element={<Formulariopaciente />} />
        <Route path="/form_citas" element={<Formulariocitas />} />
        <Route path="/acercade" element={<Acercade />} />
        <Route path="/tablero" element={<Tablero />} />
        <Route path="/tablero_paciente" element={<TableroPaciente />} />
        <Route path="/form_registro" element={<FormularioRegistro />} />
      </Route>

      {/* Redirección si no se encuentra una ruta específica */}
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);
