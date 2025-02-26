import React, { useState } from 'react';

const ImprimirFormulario = () => {
  // Definir los estados para los datos del formulario
  const [nombreDr, setNombreDr] = useState("Juan Pérez");
  const [nombrePaciente, setNombrePaciente] = useState("Ana Gómez");
  const [presion, setPresion] = useState("120/80");
  const [peso, setPeso] = useState("70 kg");
  const [ritmoCardiaco, setRitmoCardiaco] = useState("72 bpm");
  const [temperatura, setTemperatura] = useState("36.5°C");
  const [sintomas, setSintomas] = useState("Dolor de cabeza, mareo");
  const [receta, setReceta] = useState("Paracetamol 500mg");
  const [observaciones, setObservaciones] = useState("Reposo por 48 horas");
  const [nombreMedicamento, setNombreMedicamento] = useState("Paracetamol");

  // Función para imprimir el formulario
  const imprimirFormulario = () => {
    const fechaCita = new Date().toLocaleDateString();
    const horaCita = new Date().toLocaleTimeString();

    const contenido = `
      <html>
        <head>
          <title>Impresión de Cita Médica</title>
        </head>
        <body>
          <div class="header">
            <img class="logo" src="https://www.enteoperador.org/wp-content/uploads/2024/10/ENEE-logo-1.png" alt="Logo">
            <div class="fecha-hora">
              <p><strong>Fecha:</strong> ${fechaCita}</p>
              <p><strong>Hora:</strong> ${horaCita}</p>
            </div>
          </div>
          
          <h1>Información de la Cita</h1>
          
          <table class="formulario">
            <tr>
              <th>Campo</th>
              <th>Detalle</th>
            </tr>
            <tr>
              <td><strong>Nombre del Doctor:</strong></td>
              <td>Dr. ${nombreDr}</td>
            </tr>
            <tr>
              <td><strong>Nombre del Paciente:</strong></td>
              <td>${nombrePaciente}</td>
            </tr>
            <tr>
              <td><strong>Presión:</strong></td>
              <td>${presion}</td>
            </tr>
            <tr>
              <td><strong>Peso:</strong></td>
              <td>${peso}</td>
            </tr>
            <tr>
              <td><strong>Ritmo Cardiaco:</strong></td>
              <td>${ritmoCardiaco}</td>
            </tr>
            <tr>
              <td><strong>Temperatura:</strong></td>
              <td>${temperatura}</td>
            </tr>
            <tr>
              <td><strong>Sintomas:</strong></td>
              <td class="auto-ajustable campo-largo">${sintomas}</td>
            </tr>
            <tr>
              <td><strong>Receta:</strong></td>
              <td class="auto-ajustable campo-largo">${receta}</td>
            </tr>
            <tr>
              <td><strong>Observaciones:</strong></td>
              <td class="auto-ajustable campo-largo">${observaciones}</td>
            </tr>
            <tr>
              <td><strong>Nombre del Medicamento:</strong></td>
              <td>${nombreMedicamento}</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const ventana = window.open('', '', 'height=600,width=800');
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();
  };

  return (
    <div>
      <h2>Formulario de Cita Médica</h2>
      {/* Puedes agregar un formulario aquí para editar los valores */}
      <button onClick={imprimirFormulario}>Imprimir Cita Médica</button>
    </div>
  );
};

export default ImprimirFormulario;


{//const imprimirFormulario = (nombre_dr, nombre_paciente, presion, peso, ritmo_cardiaco, temperatura, sintomas, receta, observaciones, nombre_medicamento) => {
  const fecha_cita = new Date().toLocaleDateString(); 
  const hora_cita = new Date().toLocaleTimeString();

  const contenido = `
    <html>
      <head>
        <title>Impresión de Cita Médica</title>
        <style>
          /* Estilos aquí */
        </style>
      </head>
      <body>
        <div class="header">
          <img class="logo" src="https://www.enteoperador.org/wp-content/uploads/2024/10/ENEE-logo-1.png" alt="Logo">
          <div class="fecha-hora">
            <p><strong>Fecha:</strong> ${fecha_cita}</p>
            <p><strong>Hora:</strong> ${hora_cita}</p>
          </div>
        </div>

        <h1>Información de la Cita</h1>
        <table class="formulario">
          <tr>
            <th>Campo</th>
            <th>Detalle</th>
          </tr>
          <tr>
            <td><strong>Nombre del Doctor:</strong></td>
            <td>Dr. ${nombre_dr}</td>
          </tr>
          <tr>
            <td><strong>Nombre del Paciente:</strong></td>
            <td>${nombre_paciente}</td>
          </tr>
          <tr>
            <td><strong>Presión:</strong></td>
            <td>${presion}</td>
          </tr>
          <tr>
            <td><strong>Peso:</strong></td>
            <td>${peso}</td>
          </tr>
          <tr>
            <td><strong>Ritmo Cardiaco:</strong></td>
            <td>${ritmo_cardiaco}</td>
          </tr>
          <tr>
            <td><strong>Temperatura:</strong></td>
            <td>${temperatura}</td>
          </tr>
          <tr>
            <td><strong>Sintomas:</strong></td>
            <td class="auto-ajustable campo-largo">${sintomas}</td>
          </tr>
          <tr>
            <td><strong>Receta:</strong></td>
            <td class="auto-ajustable campo-largo">${receta}</td>
          </tr>
          <tr>
            <td><strong>Observaciones:</strong></td>
            <td class="auto-ajustable campo-largo">${observaciones}</td>
          </tr>
          <tr>
            <td><strong>Nombre del Medicamento:</strong></td>
            <td>${nombre_medicamento}</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const ventana = window.open('', '', 'height=600,width=800');
  ventana.document.write(contenido);
  ventana.document.close();
  ventana.print();
};

{
  //const imprimirFormulario = () => {
    //const contenido = `
      //<h1>Información de la Cita</h1>
     //<p><strong>Fecha de cita:</strong> ${fecha_cita}</p>
      //<p><strong>Nombre del Doctor: Dr.</strong> ${nombre_dr}</p>
     // <p><strong>Nombre del Paciente:</strong> ${nombre_paciente}</p>
     // <p><strong>Presion:</strong> ${presion}</p>
     // <p><strong>Peso:</strong> ${peso}</p>
     // <p><strong>Ritmo Cardiaco:</strong> ${ritmo_cardiaco}</p>
     // <p><strong>Temperatura:</strong> ${temperatura}</p>
     // <p><strong>Sintomas:</strong> ${sintomas}</p>
     // <p><strong>Receta:</strong> ${receta}</p>
      //<p><strong>Observaciones:</strong> ${observaciones}</p>
     // <p><strong>Nombre del Medicamento:</strong>${nombre_medicamento}</p>
    //`;
    
   // const ventana = window.open('', '', 'height=600,width=800');
   // ventana.document.write('<html><head><title>Impresión</title></head><body>');
  //  ventana.document.write(contenido);
   // ventana.document.write('</body></html>');
   // ventana.document.close();
    //ventana.print();
 // };

}