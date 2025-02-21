const imprimirFormulario = () => {
    const contenido = `
      <h1>Información de la Cita</h1>
      <p><strong>Fecha de cita:</strong> ${fecha_cita}</p>
      <p><strong>Nombre del Doctor: Dr.</strong> ${nombre_dr}</p>
      <p><strong>Nombre del Paciente:</strong> ${nombre_paciente}</p>
      <p><strong>Presion:</strong> ${presion}</p>
      <p><strong>Peso:</strong> ${peso}</p>
      <p><strong>Ritmo Cardiaco:</strong> ${ritmo_cardiaco}</p>
      <p><strong>Temperatura:</strong> ${temperatura}</p>
      <p><strong>Sintomas:</strong> ${sintomas}</p>
      <p><strong>Receta:</strong> ${receta}</p>
      <p><strong>Observaciones:</strong> ${observaciones}</p>
      <p><strong>Nombre del Medicamento:</strong>${nombre_medicamento}</p>
    `;
    
    const ventana = window.open('', '', 'height=600,width=800');
    ventana.document.write('<html><head><title>Impresión</title></head><body>');
    ventana.document.write(contenido);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
  };