import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import './bootstrap.min.css';
import './owl.carousel.min.css';
import './magnific-popup.css';
import './owl.theme.default.min.css';
import './aos.css';
import './bootstrap.css';
import Medicamento from './medicamento';


const root = ReactDOM.createRoot(document.getElementById('root')); // Crea un root
root.render(
  <React.StrictMode>
    <Medicamento />
  </React.StrictMode>
);
