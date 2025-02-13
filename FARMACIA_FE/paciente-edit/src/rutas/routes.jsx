import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutersFromElements} from 'react-router-dom';

import form_medicamento from './paginas/medicamento';
import Formulariopaciente from './form_paciente';
import Formulariocitas from './paginas/form_citas';
import Acercade from '../paginas/acercade';
import Navbar from '../plantilla/navbar';



export const routers = createBrowserRouter(
    createRoutersFromElements(
        <Route>
            <Navbar />
            <Route path="/" element={<Navigate to="/form_medicamento" />} />
            <Route path='/medicamento' element={<form_medicamento />} />
            <Route path='/Formulariopaciente' element={<Formulariopaciente />} />
            <Route path='/Formulariocitas' element={<Formulariocitas />} />
            <Route path='/Acercade' element={<Acercade />} />
        </Route>
    ),
);

