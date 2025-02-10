import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutersFromElements } from 'react-router-dom';

import Medicamento from './paginas/medicamentos';
import Pacientes from './form_paciente';


export const routers = createBrowserRouter(
    createRoutersFromElements(
        <Route>
            <Route path="/" element={<Navigate to="/medicamentos" />} />
            <Route path='medicamentos' element={<Medicamento />} />
            <Route path='pacientes' element={<Pacientes />} />
        </Route>
    ),
);

