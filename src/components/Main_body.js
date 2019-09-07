import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBInput,MDBModalHeader,MDBModalFooter} from 'mdbreact';
import Webcam from "react-webcam";
import { Link  } from'react-router-dom';
class Main_body extends PureComponent{

    render(){
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
        return(
            <React.Fragment>
            {this.props.mode==="main"&&
            // Main body 부분 
            <MDBRow style={this.props.font}>
                <MDBCol md="1" >
                </MDBCol> 
                <MDBCol md="10" >
                  <div style={this.props.layout} className="#b3e5fc #ff80ab #e8eaf6#fce4ec #f8bbd0#90caf9 blue lighten-3 text-center" >
                    <div className="p-1"><Link to="#"><button style={this.props.round} onClick={this.props.toggle}><MDBIcon icon="image fa-2x" /></button></Link><br></br>배경화면</div>
                    <div className="p-1"><Link to="/memorialday"><button style={this.props.round}><MDBIcon icon="american-sign-language-interpreting fa-2x" /></button></Link><br></br>기념일</div>
                    <div className="p-1"><Link to="/calendar"><button style={this.props.round}><MDBIcon icon="calendar-check fa-2x" /></button></Link><br></br>캘린더</div> 
                  </div>
                </MDBCol>
                <div>
                      <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                      <form onSubmit={this.props.setData}>
                      <MDBModalHeader toggle={this.props.toggle}>배경화면</MDBModalHeader>
                      <MDBModalBody>
                      <MDBRow>
                          <MDBCol md="12">
                          {!this.props.show &&
                              <div className="grey-text" style={this.props.list1}>
                                <MDBBtn color="unique" className="m-5" name="camera" onClick={this.props.onClick}><MDBIcon icon="camera-retro fa-2x" /><br></br>카메라</MDBBtn>
                                <MDBBtn color="unique"className="m-5" name="album" onClick={this.props.onClick}><MDBIcon icon="camera-retro fa-2x" /><br></br>앨범</MDBBtn>
                              </div>
                            }
                                <div>{(this.props.show && this.props.setting==='album') && <div className="custom-file">
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
                                                            </div>}
                                                            {
                                                              (this.props.show && this.props.setting==='camera') && !this.props.imageData &&
                                                              <div>
                                                                <MDBRow>
                                                                <MDBCol md="1" >
                                                                </MDBCol> 
                                                                  <MDBCol md="10">
                                                                  <MDBCard className="text-center">
                                                                    
                                                                    <Webcam 
                                                                      height={385}
                                                                      width={385}
                                                                      style={{textAlign:"center"}}
                                                                      ref={this.props.setRef}
                                                                      screenshotFormat="image/jpeg"
                                                                      videoConstraints={videoConstraints}
                                                                    />
                                                                </MDBCard>
                                                                    <div>                                                                        
                                                                      <MDBInput
                                                                        label="이미지의 이름을 입력해주세요"
                                                                        name="myImage"
                                                                        value={this.props.imageName}
                                                                        onChange = {this.props.onChangeCamera}
                                                                        type="text"
                                                                        width="100"
                                                                      />                                           
                                                                    </div>
                                                                </MDBCol>
                                                                <MDBCol md="1" >
                                                                </MDBCol>
                                                                
                                                            </MDBRow>
                                                            
                                                              </div>
                                                            }
                                                            {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                                                              <div>
                                                              <MDBRow>
                                                                <MDBCol md="1" >
                                                                </MDBCol> 
                                                                <MDBCol md="10">
                                                                <MDBCard className="text-center mt-3" >
                                                                  <img src={this.props.imageData} alt='' width="385" height="auto"></img>
                                                                </MDBCard>
                                                                <div className="text-center mt-3">                                                                        
                                                                  <h4>이미지 이름: {this.props.imageName}</h4>                                                                                                                      
                                                                </div>
                                                                </MDBCol>
                                                             </MDBRow>
                                                             </div>   
                                                            }
                                                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBModalBody>
                      <MDBModalFooter>
                        {this.props.show && this.props.setting==='album' &&
                          <div>
                            <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                            <MDBBtn type="submit" name="submit" color="info" >변경</MDBBtn>
                          </div>
                        }
                        {this.props.show && this.props.setting==='camera' && !this.props.imageData &&
                          <div>
                            <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                            <MDBBtn name="capture" color="info" onClick={this.props.capture} >촬영</MDBBtn> 
                          </div>
                        }
                        {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                            <div>
                              <MDBBtn type="submit" name="save" color="success">저장</MDBBtn>
                              <MDBBtn name="retake" color="warning" onClick={this.props.onClickRetake} >재촬영</MDBBtn>
                            </div>
                        }
                        <MDBBtn color="secondary" onClick={this.props.toggle}>닫기</MDBBtn>
                      </MDBModalFooter>
                      </form>
                  </MDBModal>
                </div> 
              </MDBRow>
            }
            </React.Fragment>
        )
    }


}

export default Main_body;