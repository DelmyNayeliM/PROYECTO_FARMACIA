import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [tipo_usuario, setTipo_usuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook de redirección

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const userData = {
      nombre,
      password,
    };

    try {
      const response = await fetch('http://localhost:3003/inicio/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login exitoso:', data);
        navigate('/admin'); // Redirige al formulario de paciente
      } else {
        throw new Error(data.error || 'Credenciales incorrectas o error en la API');
      }
    } catch (err) {
      console.error('Error durante el login:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card p-4 shadow-sm">
              <div className="card-body">
                <h3 className="text-center mb-4">Inicio de sesion</h3>
                <form onSubmit={handleSubmit}>

                  {/* Logo con URL externa */}
                <div className="text-center mt-4">
                  <img 
                    src="https://www.enteoperador.org/wp-content/uploads/2024/10/ENEE-logo-1.png" // URL de tu logo
                    alt="Logo" 
                    style={{ width: '150px', height: 'auto' }} 
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
                      placeholder="(min 8 caracteres)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                  </button>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
