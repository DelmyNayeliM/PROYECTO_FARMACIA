import React, { useState } from 'react';

const Tablero = () => {
  const [sortOrder, setSortOrder] = useState('sup'); // Controlar el orden de la categoría
  const data = [
    {
      categoria: "Figma",
      status: "Paid",
      nombre_medicamento: "Wirecard for figma",
      precio: "$0.99",
    },
    {
      categoria: "Car",
      status: "Failed",
      nombre_medicamento: "Altroz furry",
      precio: "$0.19",
    },
    {
      categoria: "Tech",
      status: "Paid",
      nombre_medicamento: "Apple Macbook air",
      precio: "$1.99",
    },
    {
      categoria: "Tech",
      status: "Paid",
      nombre_medicamento: "Apple Macbook Pro",
      precio: "$9.99",
    },
    {
      categoria: "Figma",
      status: "Paid",
      nombre_medicamento: "Wirecard for figma",
      precio: "$0.99",
    }
  ];

  // Función para ordenar por categoria
  const sortedData = data.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.categoria.localeCompare(b.categoria); // Orden ascendente
    } else {
      return b.categoria.localeCompare(a.categoria); // Orden descendente
    }
  });

  // Función para cambiar el orden
  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'sup' ? 'med' : 'sup'));
  };

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <div className="position-relative">
          <span className="position-absolute search">
            <i className="fa fa-search"></i>
          </span>
          <input className="form-control w-100" placeholder="Buscar por nombre" />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-responsive table-borderless">
          <thead>
            <tr className="bg-light">
              <th scope="col" width="5%">
                <input className="form-check-input" type="checkbox" />
              </th>
              <th scope="col" width="10%" className="text-black">Categoría</th>
              <th scope="col" width="10%" className="text-black">Estado</th>
              <th scope="col" width="20%" className="text-black">Nombre del Medicamento</th>
              <th scope="col" className="text-end" width="20%">
                <span className="text-black">Precio</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <th scope="row">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <td>{item.categoria}</td>
                <td>
                  <i className={`fa fa-${item.status === 'Paid' ? 'check-circle-o green' : 'dot-circle-o text-danger'}`}></i>
                  <span className="ms-1">{item.status}</span>
                </td>
                <td>{item.nombre_medicamento}</td>
                <td className="text-end">
                  <span className="fw-bolder">{item.precio}</span> <i className="fa fa-ellipsis-h ms-2"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tablero;
