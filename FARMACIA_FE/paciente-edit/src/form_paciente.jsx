import React, { useState } from 'react';

const pacienteform = () => {
  const [formData, setFormData] = useState({
    tipo_paciente: '',
    tipo_empleado: '',
    nombre_completo: '',
    clave_empleado: '',
    clave_expediente: '',
    foto_paciente: '',
    telefono: '',
    edad: '',
    direccion:"",
    correo: '',
    enfermedad_base: ''
  });

/*const handleChange = (e) => {
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
        method: 'PO  ST',
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
  };*/

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tipo de Paciente:
        <input type="ENUM" name="tipo_paciente" value={formData.tipo_paciente} onChange={handleChange} required />
      </label>
      <label>
        Tipo de Empleado:
        <input type="ENUM" name="tipop_empleado" value={formData.tipo_empleado} onChange={handleChange} required />
      </label>
      <label>
        Nombre Completo:
        <input type="STRING" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required />
      </label>
      <label>
        Clave del Empleado:
        <input type="STRING" name="clave_empleado" value={formData.clave_empleado} onChange={handleChange} required />
      </label>
      <label>
        Clave del Expediente:
        <input type="STRING" name="clave_expediente" value={formData.clave_expediente} onChange={handleChange} required />
      </label>
      <label>
        Fotografia del Paciente:
        <input type="string" name="presion" value={formData.presion} onChange={handleChange} required />
      </label>
      <label>
        Telefono:
        <input type="STRING" name="foto_paciente" value={formData.foto_paciente} onChange={handleChange} required />
      </label>
      <label>
        Edad:
        <input type="INTEGER" name="edad" value={formData.edad} onChange={handleChange} required />
      </label>
      <label>
        Direccion:
        <input type="STRING" name="direccion" value={formData.direccion} onChange={handleChange} required />
      </label>
      <label>
        Correo electronico:
        <input type="STRING" name="correo" value={formData.correo} onChange={handleChange} required />
      </label>
      <label>
        Enfermeda de Base:
        <input type="STRING" name="enfermedad_base" value={formData.enfermedad_base} onChange={handleChange} required />
      </label>
 
      <button type="submit">Guardar paciente</button>
      <button type="submit">Editar paciente</button>
      <button type="submit">Eliminar paciente</button>
    </form>
  );
};

export default pacienteform;
