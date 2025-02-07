import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';

function App() {
  return (
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://www.bing.com/images/search?view=detailV2&ccid=gcaQ7OB3&id=78A02115C3DCF6E184501655BB1647A916DC2F79&thid=OIP.gcaQ7OB3jaU3bOQpmzzJEwHaCL&mediaurl=https%3a%2f%2fsso.enee.hn%2fimg%2flogoENEE.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.81c690ece0778da5376ce4299b3cc913%3frik%3deS%252fcFqlHFrtVFg%26pid%3dImgRaw%26r%3d0&exph=3249&expw=11014&q=enee+logo&simid=607992217044334963&FORM=IRPRST&ck=305B6CD44E414FCEF5242987C900614A&selectedIndex=0&itb=1&idpp=overlayview&ajaxhist=0&ajaxserp=0)', height: '300px'}}></div>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">REGISRARSE</h2>

          <MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Tipo de Usuario' id='form1' type='text'/>
            </MDBCol>

            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Nombre' id='form1' type='text'/>
            </MDBCol>
          </MDBRow>

          <MDBInput wrapperClass='mb-4' label='Contraseña' id='form1' type='password'/>

          <MDBBtn className='w-100 mb-4' size='md'>Ingresar</MDBBtn>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;