import React, { useState } from 'react';

const Tablero = () => {
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
              </th>
              <th scope="col" width="10%" className="text-black">Categoría</th>
              <th scope="col" width="10%" className="text-black">Nombre del Medicamento</th>
              <th scope="col" width="10%" className="text-black">Descripcion</th>
              <th scope="col" className="text-end" width="20%">
                <span className="text-black">Precio</span>
              </th>
            </tr>
          </thead>

          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tablero;
