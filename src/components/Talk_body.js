import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBInput} from 'mdbreact';


class Talk_body extends PureComponent{

    render(){
        return(
            <React.Fragment>
               {this.props.mode==="talk"&&
            // Talk body 부분 
            <MDBRow style={this.props.font}>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="1" >
                <MDBBtn outline color="danger" onClick={this.props.toggle}><MDBIcon icon="plus-circle fa-lg" /></MDBBtn>
                <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle} fullHeight position="bottom">            
                        <MDBModalBody>
                          <MDBCard style={this.props.modal} className="text-center">
                            <MDBBtn color="cyan"><MDBIcon far icon="images fa-2x" /><br></br>사진</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="video fa-2x" /> <br></br>동영상</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="camera-retro fa-2x" /> <br></br>카메라</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="grin-beam fa-2x" /> <br></br>움짤</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="microphone fa-2x" /> <br></br>음성</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="envelope-open fa-2x" /> <br></br>러브레터</MDBBtn>
                          </MDBCard>
                        </MDBModalBody>
                      </MDBModal>
              </MDBCol>    
              <MDBCol md="8">
                <div className="ml-4">
                  <MDBInput 
                    input="text"
                    label="메세지를 입력해주세요"
                    group
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
              </MDBCol>
              <MDBCol>
                <MDBBtn outline color="light-blue">전송</MDBBtn>
              </MDBCol>
            </MDBRow>
            }
            </React.Fragment>
        )
    }


}

export default Talk_body;