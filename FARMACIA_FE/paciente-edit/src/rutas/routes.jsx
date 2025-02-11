import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutersFromElements } from 'react-router-dom';

import Medicamento from './paginas/medicamentos';
import Pacientes from './form_paciente';
import citas from './paginas/form_citas';
import Acercade from '../paginas/acercade';


export const routers = createBrowserRouter(
    createRoutersFromElements(
        <Route>
            <Route path="/" element={<Navigate to="/medicamentos" />} />
            <Route path='medicamentos' element={<Medicamento />} />
            <Route path='pacientes' element={<Pacientes />} />
            <Route path='citas' element={<citas />} />
            <Route path='acercade' element={<Acercade />} />
        </Route>
    ),
);

