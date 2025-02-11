import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [tipo_usuario, setTipo_usuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  //let navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ tipo_usuario, nombre, password });
 
    try {
        const response = await axios.post("http://localhost:3003/usuarios/login", {
            nombre: tipo_usuario,   // Revisa que este valor no sea undefined
            contraseña: password
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error de login:', error.response ? error.response.data : error.message);
    }
};
  return (
    <div className="site-wrap">
      <div className="site-section"></div>
    <div className="container">
      <div className="login-container mt-4">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tipo_usuario" className="form-label">Tipo de Usuario</label>
            <input
              type="text"
              className="form-control"
              id="tipo_usuario"
              placeholder="(Administrador o Medico)"
              value={tipo_usuario}
              onChange={(e) => setTipo_usuario(e.target.value)}
              required
            />
          </div>
        
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del Usuario</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingrese su contraseña (min 8 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

        
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
</div>
  );
};

export default Login;
