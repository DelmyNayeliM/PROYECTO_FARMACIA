


module.exports= rutas;

app.post('/login', (req, res) => {
    const { nombre, password } = req.body;
  
    if (nombre === 'admin' && password === '1234') {
      return res.json({ success: true, message: 'Login exitoso' });
    } else {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
  