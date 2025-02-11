import React, { useState } from 'react';

const Login = () => {
  const [tipo_usuario, setTipo_usuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ tipo_usuario, nombre, password });
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
