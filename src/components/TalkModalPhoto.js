import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBBtn,MDBCard} from 'mdbreact';

class TalkModalPhoto extends PureComponent{  
    render(){
        return(
            <React.Fragment>
                <form onSubmit={this.props.setData}>
                     <MDBRow>
                        <MDBCol md="12" >
                          <div className="text-center m-1">
                            <h3>사진</h3>
                          </div>
                          <hr color="#000000" />
                        </MDBCol> 
                        <MDBCol md="4" >
                        </MDBCol> 
                          <MDBCol md="4">
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
                            </div>
                            </MDBCol>
                            </MDBRow>
                            <MDBRow>
                              <MDBCol md="4" >
                              </MDBCol> 
                              <MDBCol md="4">
                              <div className="text-center mt-3">
                                <MDBCard >
                                <img src={this.props.file} alt='' width="500" height="auto"></img>
                                </MDBCard>
                              </div>
                              <div className="text-center mt-3">
                                <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                                <MDBBtn type="submit" name="submit" color="info" >보내기</MDBBtn>
                              </div>
                              </MDBCol>
                          </MDBRow>
                      </form>
            </React.Fragment>
        )
    }
}

export default TalkModalPhoto;