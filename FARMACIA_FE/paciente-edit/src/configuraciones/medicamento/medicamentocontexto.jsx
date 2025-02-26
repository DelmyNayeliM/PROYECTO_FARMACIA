import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const MedicamentoContext = createContext();

// Proveedor del contexto
export const MedicamentoProvider = ({ children }) => {
  const [nombre_medicamento, setNombre_medicamento] = useState('');

  return (
    <MedicamentoContext.Provider value={{ nombre_medicamento, setNombre_medicamento }}>
      {children}
    </MedicamentoContext.Provider>
  );
};

// Hook para usar el contexto
export const useMedicamento = () => {
  const context = useContext(MedicamentoContext);
  if (!context) {
    throw new Error('useMedicamento debe ser usado dentro de un MedicamentoProvider');
  }
  return context;
};
