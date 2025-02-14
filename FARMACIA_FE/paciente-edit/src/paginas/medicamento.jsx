const form_medicamento = () => {
  return (
    <div className="site-wrap">

      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0"><a href="index.html">Inicio</a> <span className="mx-2 mb-0">/</span> <a href="shop.html">Medicamentos</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Ibuprofen Tablets, 200mg</strong></div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className=""></div>
            <div className="col-md-6">
              <h2 className="text-black">Ibuprofen Tablets, 200mg</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores iusto! Molestiae expedita veritatis nesciunt doloremque sint asperiores fuga voluptas, distinctio, aperiam, ratione dolore.</p>

              <strong className="text-primary h4">L.55.00</strong>

              <div className="mb-5">
                <div className="input-group mb-3" style={{ maxWidth: '220px' }}>
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-primary js-btn-minus" type="button"> &minus;</button>
                  </div>
                  <input type="text" className="form-control text-center" value="10" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <ul className="nav nav-pills mb-3 custom-pill" id="pills-tab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Descripcion del medicamento</a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <table className="table custom-table">
                      <thead>
                        <tr>
                          <th>Categoria</th>
                          <th>Nombre del medicamento</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">OTC022401</th>
                          <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                        </tr>
                        <tr>
                          <th scope="row">OTC022401</th>
                          <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                        </tr>
                        <tr>
                          <th scope="row">OTC022401</th>
                          <td>Pain Management: Acetaminophen PM Extra-Strength Caplets, 500 mg, 100/Bottle</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default form_medicamento;
