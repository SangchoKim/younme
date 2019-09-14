import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBInput,MDBBtn,MDBCard} from 'mdbreact';
import Webcam from "react-webcam";

class TalkModalCamera extends PureComponent{

    

    
    
   

    
    
    render(){
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };
        return(
            <React.Fragment>
              {this.props.isReady&&
                <MDBRow>
                  <MDBCol md="12" >
                    <div className="text-center m-1">
                      <h3>카메라</h3>
                    </div>
                    <hr color="#000000" />
                  </MDBCol> 
                  <MDBCol md="2" >
                    </MDBCol> 
                      <MDBCol md="8">
                        <MDBCard>
                          <div className="text-center">                        
                          <Webcam 
                              height={600}
                              width={600}
                              style={{textAlign:"center"}}
                              ref={this.props.setRef}
                              screenshotFormat="image/jpeg"
                              videoConstraints={videoConstraints}
                              />
                            </div>
                          </MDBCard>
                              <div className="black-text">                                                                       
                              <MDBInput
                                label="이미지의 이름을 입력해주세요"
                                name="imageName"
                                value={this.props.imageName}
                                onChange = {this.props.onChangeCamera}
                                type="text"
                                /> 
                                </div> 
                                <div className="text-center">
                                  <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                                  <MDBBtn name="capture" color="info" onClick={this.props.capture} >촬영</MDBBtn> 
                                </div>                                         
                                </MDBCol>
                            </MDBRow>
                       }
                       {this.props.isCapture&&this.props.imageData&&
                        <form onSubmit={this.props.setCameraData}>
                          <MDBRow>
                                <MDBCol md="4" >
                                </MDBCol> 
                                  <MDBCol md="4">
                                  <div className="text-center">     
                                    <MDBCard className="text-center mt-3" >
                                    <img src={this.props.imageData} alt='' width="500" height="auto"></img>
                                      </MDBCard>
                                      </div>
                                      <div className="text-center mt-3">                                                                        
                                        <h4>이미지 이름: {this.props.imageName}</h4>                                                                                                                      
                                      </div>
                                  </MDBCol>
                                  <MDBCol md="4" >
                                  </MDBCol> 
                              </MDBRow>
                                <div className="text-center">
                                  <MDBBtn type="submit" name="save" color="success">저장</MDBBtn>
                                  <MDBBtn color="warning" onClick={this.props.onClickRetake} >재촬영</MDBBtn>
                                </div>
                          </form>
                       }            
            </React.Fragment>
        )
    }


}

export default TalkModalCamera;