<div className="container mt-5 px-2">
  <div className="mb-2 d-flex justify-content-between align-items-center">
    <div className="position-relative">
      <span className="position-absolute search">
        <i className="fa fa-search"></i>
      </span>
      <input className="form-control w-100" placeholder="Search by order#, name..." />
    </div>

    <div className="px-2">
      <span>Filters <i className="fa fa-angle-down"></i></span>
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
          <th scope="col" width="20%">Date</th>
          <th scope="col" width="10%">Status</th>
          <th scope="col" width="20%">Customer</th>
          <th scope="col" width="20%">Purchased</th>
          <th scope="col" className="text-end" width="20%">
            <span>Revenue</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">
            <input className="form-check-input" type="checkbox" />
          </th>
          <td>12</td>
          <td>1 Oct, 21</td>
          <td>
            <i className="fa fa-check-circle-o green"></i>
            <span className="ms-1">Paid</span>
          </td>
          <td>
            <img src="https://i.imgur.com/VKOeFyS.png" width="25" alt="Customer" />
            Althan Travis
          </td>
          <td>Wirecard for figma</td>
          <td className="text-end">
            <span className="fw-bolder">$0.99</span> <i className="fa fa-ellipsis-h ms-2"></i>
          </td>
        </tr>

        <tr>
          <th scope="row">
            <input className="form-check-input" type="checkbox" />
          </th>
          <td>14</td>
          <td>12 Oct, 21</td>
          <td>
            <i className="fa fa-dot-circle-o text-danger"></i>
            <span className="ms-1">Failed</span>
          </td>
          <td>
            <img src="https://i.imgur.com/nmnmfGv.png" width="25" alt="Customer" />
            Tomo arvis
          </td>
          <td>Altroz furry</td>
          <td className="text-end">
            <span className="fw-bolder">$0.19</span> <i className="fa fa-ellipsis-h ms-2"></i>
          </td>
        </tr>

        <tr>
          <th scope="row">
            <input className="form-check-input" type="checkbox" />
          </th>
          <td>17</td>
          <td>1 Nov, 21</td>
          <td>
            <i className="fa fa-check-circle-o green"></i>
            <span className="ms-1">Paid</span>
          </td>
          <td>
            <img src="https://i.imgur.com/VKOeFyS.png" width="25" alt="Customer" />
            Althan Travis
          </td>
          <td>Apple Macbook air</td>
          <td className="text-end">
            <span className="fw-bolder">$1.99</span> <i className="fa fa-ellipsis-h ms-2"></i>
          </td>
        </tr>

        <tr>
          <th scope="row">
            <input className="form-check-input" type="checkbox" />
          </th>
          <td>90</td>
          <td>19 Oct, 21</td>
          <td>
            <i className="fa fa-check-circle-o green"></i>
            <span className="ms-1">Paid</span>
          </td>
          <td>
            <img src="https://i.imgur.com/VKOeFyS.png" width="25" alt="Customer" />
            Travis head
          </td>
          <td>Apple Macbook Pro</td>
          <td className="text-end">
            <span className="fw-bolder">$9.99</span> <i className="fa fa-ellipsis-h ms-2"></i>
          </td>
        </tr>

        <tr>
          <th scope="row">
            <input className="form-check-input" type="checkbox" />
          </th>
          <td>12</td>
          <td>1 Oct, 21</td>
          <td>
            <i className="fa fa-check-circle-o green"></i>
            <span className="ms-1">Paid</span>
          </td>
          <td>
            <img src="https://i.imgur.com/nmnmfGv.png" width="25" alt="Customer" />
            Althan Travis
          </td>
          <td>Wirecard for figma</td>
          <td className="text-end">
            <span className="fw-bolder">$0.99</span> <i className="fa fa-ellipsis-h ms-2"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
