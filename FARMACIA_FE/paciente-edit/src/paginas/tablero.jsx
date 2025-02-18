import React, { useState } from 'react';

const Tablero = () => {
  const [sortOrder, setSortOrder] = useState('asc'); // Controlar el orden de la categoría
  const data = [
    {
      category: "Figma",
      status: "Paid",
      description: "Wirecard for figma",
      revenue: "$0.99",
    },
    {
      category: "Car",
      status: "Failed",
      description: "Altroz furry",
      revenue: "$0.19",
    },
    {
      category: "Tech",
      status: "Paid",
      description: "Apple Macbook air",
      revenue: "$1.99",
    },
    {
      category: "Tech",
      status: "Paid",
      description: "Apple Macbook Pro",
      revenue: "$9.99",
    },
    {
      category: "Figma",
      status: "Paid",
      description: "Wirecard for figma",
      revenue: "$0.99",
    }
  ];

  // Función para ordenar por categoría
  const sortedData = data.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.category.localeCompare(b.category); // Orden ascendente
    } else {
      return b.category.localeCompare(a.category); // Orden descendente
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
        <button className="btn btn-primary" onClick={toggleSortOrder}>
          Ordenar por categoría ({sortOrder === 'sup' ? 'Suplemento' : 'Medicamento'})
        </button>
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
              <th scope="col" width="20%" className="text-black">Descripción</th>
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
                <td>{item.category}</td>
                <td>
                  <i className={`fa fa-${item.status === 'Paid' ? 'check-circle-o green' : 'dot-circle-o text-danger'}`}></i>
                  <span className="ms-1">{item.status}</span>
                </td>
                <td>{item.description}</td>
                <td className="text-end">
                  <span className="fw-bolder">{item.revenue}</span> <i className="fa fa-ellipsis-h ms-2"></i>
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
