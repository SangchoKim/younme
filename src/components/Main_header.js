import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard} from 'mdbreact';

class Main_header extends PureComponent{
    render(){
        return(
            <React.Fragment>
          {this.props.mode==="main"&&
            <MDBRow style={this.props.font}>
              <MDBCol md="1" >
              </MDBCol> 
                <MDBCol md="10">
                  <MDBCard>
                    <img src={this.props.imgUrl} alt="Logo" width="100%" height="" />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
          }
              </React.Fragment>
        )
    }


}

export default Main_header;