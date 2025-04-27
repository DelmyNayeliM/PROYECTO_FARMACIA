import './App.css';
import React from 'react';
import { routers } from './rutas/routes';
import { RouterProvider } from 'react-router-dom';
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

function App() {
  return (
    <RouterProvider router={routers}>
    </RouterProvider>
  );
}

export default App;
