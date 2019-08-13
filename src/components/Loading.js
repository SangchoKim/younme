import React, {PureComponent} from 'react'; 
import {MDBContainer ,MDBRow,MDBCol } from 'mdbreact';
  
class Loading extends PureComponent {
  

   render() {
        return(
          <React.Fragment>
            <MDBContainer>
              <MDBRow>
              <MDBCol md="4" >
              </MDBCol> 
                <MDBCol md="4">
                <div id="animation"></div>
              </MDBCol>
              </MDBRow>
            </MDBContainer>
          </React.Fragment>
        );
    }
}

export default Loading;

