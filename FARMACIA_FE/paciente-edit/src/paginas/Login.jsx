import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Login = () => {
const [tipo_usuario, setTipo_usuario] = useState('');
const [nombre, setNombre] = useState('');
const [password, setPassword] = useState('');
//const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ tipo_usuario, nombre, password });
 
    try {
        const response = await axios.post("http://localhost:3007/Login", {
            tipo_usuario: tipo_usuario,
            nombre: nombre,  
            password: password
          });
          console.log(response.data);
          // Redirigir a una página tras el login exitoso
          //navigate("/form_paciente");  // O la ruta que prefieras
      } catch (error) {
        console.error('Error al ingresar', error);
        alert(`Hubo un error en el login: ${error.response?.data?.mensaje || 'Inténtelo nuevamente.'}`);
      }
    };
return (
  <div className="site-wrap d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
   
      <div className="login-container mt-4 p-4 border rounded shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="login-header text-center mb-4">
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
);
}

export default Login;
