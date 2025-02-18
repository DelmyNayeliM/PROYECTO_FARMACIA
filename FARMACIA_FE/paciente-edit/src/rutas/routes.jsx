import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Form_medicamento from './paginas/medicamento';
import Formulariopaciente from './form_paciente';
import Formulariocitas from './paginas/form_citas';
import Acercade from '../paginas/acercade';
import Navbar from '../plantilla/navbar';
import Inicio from '../paginas/menu';
import Tablero from '../paginas/tablero';

export const routers = createBrowserRouter(
    createRoutesFromElements(
    <Route element={<Navbar />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/" element={<Navigate to="/medicamento" />} /> 
        <Route path="/medicamento" element={<Form_medicamento />} />
        <Route path="/Formulariopaciente" element={<Formulariopaciente />} />
        <Route path="/Formulariocitas" element={<Formulariocitas />} />
        <Route path="/Acercade" element={<Acercade />} />
        <Route path="/Tablero" element={<Tablero />} />
    </Route>
    )
);
