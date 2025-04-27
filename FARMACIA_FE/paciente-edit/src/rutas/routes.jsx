import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Form_medicamento from '../paginas/medicamento';
import Formulariopaciente from '../paginas/form_paciente';
import Formulariocitas from '../paginas/form_citas';
import Acercade from '../paginas/acercade';
import Navbar from '../plantilla/navbar';
import Tablero from '../paginas/tablero';
import Inicioadmin from '../paginas/menu_admin';
import LoginForm from '../paginas/Login';
import TableroPaciente from '../paginas/tablero_paciente';
import FormularioRegistro from '../paginas/form_registro';

export const routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Ruta Login */}
      <Route path="/login" element={<LoginForm />} />

      {/* Redirigir raíz al login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rutas protegidas que requieren Navbar */}
      <Route element={<Navbar />}>
        {/* Estas rutas protegidas deben tener un prefijo, por ejemplo, /admin */}
        <Route path="admin" element={<Inicioadmin />} />
        <Route path="form_paciente" element={<Formulariopaciente />} />
        <Route path="form_citas" element={<Formulariocitas />} />
        <Route path="acercade" element={<Acercade />} />
        <Route path="tablero" element={<Tablero />} />
        <Route path="tablero_paciente" element={<TableroPaciente />} />
        <Route path="form_registro" element={<FormularioRegistro />} />
      </Route>

      {/* Redirección si no encuentra ruta */}
      <Route path="*" element={<Navigate to="/login" />} />
    </>
  )
);