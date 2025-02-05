import React, { useState } from 'react';

const citaform = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fecha_cita: '',
    nombre_dr: '',
    nombre_paciente: '',
    presion: '',
    peso: '',
    ritmo_cardiaco: '',
    temperatura: '',
    sintomas: '',
    recetas: '',
    observaciones: '',
    nombre_medicamento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('<su cita ha sido guardada con exito >!');
      } else {
        alert('<Error al guardar la cita>. Intentelo nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrio un error al guardar su cita.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Fecha de la Cita:
        <input type="date" name="fecha_cita" value={formData.fecha_cita} onChange={handleChange} required />
      </label>
      <label>
        Nombre del Doctor:
        <input type="string" name="nombre_dr" value={formData.nombre_dr} onChange={handleChange} required />
      </label>
      <label>
        Nombre del Paciente:
        <input type="string" name="nombre_paciente" value={formData.nombre_paciente} onChange={handleChange} required />
      </label>
      <label>
        Presion:
        <input type="string" name="presion" value={formData.presion} onChange={handleChange} required />
      </label>
      <label>
        Peso:
        <input type="decimal" name="peso" value={formData.peso} onChange={handleChange} required />
      </label>
      <label>
        Ritmo Cardiaco:
        <input type="string" name="ritmo_cardiaco" value={formData.ritmo_cardiaco} onChange={handleChange} required />
      </label>
      <label>
        Temperatura:
        <input type="string" name="temperatura" value={formData.temperatura} onChange={handleChange} required />
      </label>
      <label>
        Sintomas:
        <textarea name="sintomas" value={formData.sintomas} onChange={handleChange} required />
      </label>
      <label>
        Recetas:
        <textarea name="recetas" value={formData.recetas} onChange={handleChange} required />
      </label>
      <label>
        Observaciones:
        <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} required />
      </label>
      <label>
        Nombre del Medicamento:
        <input type="string" name="nombre_medicamento" value={formData.nombre_medicamento} onChange={handleChange} required />
      </label>
      <button type="submit">Guardar cita</button>
    </form>
  );
};

export default citaform;
