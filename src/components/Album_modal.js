import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBCard,MDBRow,MDBCol,MDBInput,MDBModalFooter} from 'mdbreact';
import Webcam from "react-webcam";

class Album_modal extends PureComponent{

    render(){
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
          };
        return(
            <React.Fragment>
               {this.props.mode==="album"&&
                     <div>  
                     <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle8(8)} fullHeight position="top">            
                     <form onSubmit={this.props.setData}>
                     <MDBModalBody>
                     {!this.props.show &&
                       <MDBCard style={this.props.modal} className="text-center">
                         <MDBBtn color="blue" name="camera" onClick={this.props.onClick}><MDBIcon icon="camera fa-2x" /> 카메라</MDBBtn>
                         <MDBBtn color="blue" name="album" onClick={this.props.onClick}><MDBIcon far icon="images fa-2x" /> 사진</MDBBtn>
                         <MDBBtn color="blue" name="video" ><MDBIcon icon="video fa-2x" /> 동영상</MDBBtn>
                         <MDBBtn color="blue" name="memo"><MDBIcon icon="sticky-note fa-2x" /> 메모</MDBBtn>
                       </MDBCard>
                       }
                      {(this.props.show && this.props.setting==='album') && 
                     <div>
                     <MDBRow>
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
                          <div className="text-center mt-3"  >
                            <MDBCard >
                            <img src={this.props.file} alt='' width="500" height="auto"></img>
                            </MDBCard>
                          </div>
                          </MDBCol>
                          </MDBRow>
                          </div>
                       }
                       {(this.props.show && this.props.setting==='camera') && !this.props.imageData 
                          &&
                        <div>
                         <MDBRow>
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
                                          name="myImage"
                                          value={this.props.imageName}
                                          onChange = {this.props.onChangeCamera}
                                          type="text"
                                          /> 
                                          </div>                                          
                                         </MDBCol>
                                     </MDBRow>
                                  </div>}
                      {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                        <div>
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
                              </MDBRow>
                             </div>}                      
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
                        <MDBBtn color="secondary" onClick={this.props.toggle8(8)}>닫기</MDBBtn>
                      </MDBModalFooter>
                      </form>
                   </MDBModal>
                 </div>    
                  }
            </React.Fragment>
        )
    }


}

export default Album_modal;