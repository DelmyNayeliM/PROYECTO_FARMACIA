import React, { useState } from 'react';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    imprimirFormulario();
  };

  const imprimirFormulario = () => {
    console.log('Datos del formulario:', formData);
    window.print();
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleChange} />
    </div>
    <div>
      <label htmlFor="correo">Correo:</label>
      <input type="email" name="correo" id="correo" value={formData.correo} onChange={handleChange} />
    </div>
    <div>
      <label htmlFor="mensaje">Mensaje:</label>
      <textarea name="mensaje" id="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
    </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
