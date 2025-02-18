import React from 'react';

const Tablero = () => {
  const data = [
    {
      id: 12,
      date: "1 Oct, 21",
      status: "Paid",
      //customer: "Althan Travis",
      purchase: "Wirecard for figma",
      revenue: "$0.99",
      //customerImg: "https://i.imgur.com/VKOeFyS.png",
    },
    {
      id: 14,
      date: "12 Oct, 21",
      status: "Failed",
      //customer: "Tomo arvis",
      purchase: "Altroz furry",
      revenue: "$0.19",
      //customerImg: "https://i.imgur.com/nmnmfGv.png",
    },
    {
      id: 17,
      date: "1 Nov, 21",
      status: "Paid",
      //customer: "Althan Travis",
      purchase: "Apple Macbook air",
      revenue: "$1.99",
      //customerImg: "https://i.imgur.com/VKOeFyS.png",
    },
    {
      id: 90,
      date: "19 Oct, 21",
      status: "Paid",
      //customer: "Travis head",
      purchase: "Apple Macbook Pro",
      revenue: "$9.99",
      //customerImg: "https://i.imgur.com/VKOeFyS.png",
    },
    {
      id: 12,
      date: "1 Oct, 21",
      status: "Paid",
      //customer: "Althan Travis",
      purchase: "Wirecard for figma",
      revenue: "$0.99",
      //customerImg: "https://i.imgur.com/nmnmfGv.png",
    }
  ];

  return (
    <div className="container mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <div className="position-relative">
          <span className="position-absolute search">
            <i className="fa fa-search"></i>
          </span>
          <input className="form-control w-100" placeholder="Buscar por nombre" />
        </div>

        <div className="px-2">
          <i className="fa fa-ellipsis-h ms-3"></i>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-responsive table-borderless">
          <thead>
            <tr className="bg-light">
              <th scope="col" width="5%">
                <input className="form-check-input" type="checkbox" />
              </th>
              <th scope="col" width="5%">#</th>
              <th scope="col" width="10%">Fecha</th>
              <th scope="col" width="10%">Estado</th>
              <th scope="col" width="20%">Medicamento</th>
              <th scope="col" className="text-end" width="20%">
                <span>Precio</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>
                  <i className={`fa fa-${item.status === 'Paid' ? 'check-circle-o green' : 'dot-circle-o text-danger'}`}></i>
                  <span className="ms-1">{item.status}</span>
                </td>
                <td>{item.purchase}</td>
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
