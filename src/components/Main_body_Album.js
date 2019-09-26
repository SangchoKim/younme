import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard} from 'mdbreact';

class Main_body_Album extends PureComponent{

    render(){
        return(
            <React.Fragment>
               <div className="custom-file">
                  <input
                    name="myImage"
                    onChange = {this.props.onChangePhoto}
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">
                    Choose file
                  </label>
                  <MDBRow>
                    <MDBCol md="2" >
                    </MDBCol> 
                      <MDBCol md="8">
                  <MDBCard className="text-center mt-3" >
                    <img src={this.props.file} alt='' width="300" height="auto"></img>
                  </MDBCard>
                  </MDBCol>
                </MDBRow>
                </div>             
            </React.Fragment>
        )
    }
}
export default Main_body_Album;