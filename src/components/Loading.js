import React, {Component} from 'react'; 
import {MDBContainer ,MDBRow,MDBCol } from 'mdbreact';
  
class Loading extends Component {
  

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

