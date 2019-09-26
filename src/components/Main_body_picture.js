import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard} from 'mdbreact';

class Main_body_picture extends PureComponent{

    render(){
        return(
            <React.Fragment>
               <div>
                  <MDBRow>
                    <MDBCol md="1" >
                    </MDBCol> 
                    <MDBCol md="10">
                    <MDBCard className="text-center mt-3" >
                      <img src={this.props.imageData} alt='Logo' width="385" height="auto"></img>
                    </MDBCard>
                    <div className="text-center mt-3">                                                                        
                      <h4>이미지 이름: {this.props.imageName}</h4>                                                                                                                      
                    </div>
                    </MDBCol>
                  </MDBRow>
                </div>          
            </React.Fragment>
        )
    }
}
export default Main_body_picture;