import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter} from 'mdbreact';
import { Link  } from'react-router-dom';
import MainBodyContents from './Main_body_contents';
import MainBodyAlbum from './Main_body_Album';
import MainBodyCamera from './Main_body_camera';
import MainBodyPicture from './Main_body_picture';
import MainBodyFooterFirstbtn from './Main_body_footer_albumBtn';
import MainBodyFooterCameraFirstBtn from './Main_body_footer_cameraFirstBtn';
import MainBodyFooterCameraSecondBtn from './Main_body_footer_cameraSecondBtn';
class Main_body extends PureComponent{

    render(){
      
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
                              <MainBodyContents
                              list1 = {this.props.list1}
                              onClick = {this.props.onClick}
                              />
                            }
                            <div>
                            {this.props.show && this.props.setting==='album'&& 
                               <MainBodyAlbum
                                onChangePhoto = {this.props.onChangePhoto}
                                file = {this.props.file}
                               /> 
                            }
                            {(this.props.show && this.props.setting==='camera') && !this.props.imageData &&
                              <MainBodyCamera
                                setRef ={this.props.setRef}
                                imageName ={this.props.imageName}
                                onChangeCamera = {this.props.onChangeCamera}
                              />
                            }
                            {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                              <MainBodyPicture
                                imageData = {this.props.imageData}
                                imageName = {this.props.imageName}
                              />   
                            }
                          </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBModalBody>
                      <MDBModalFooter>
                        {this.props.show && this.props.setting==='album' &&
                          <MainBodyFooterFirstbtn
                          onClick = {this.props.onClick}
                          />
                        }
                        {this.props.show && this.props.setting==='camera' && !this.props.imageData &&
                         <MainBodyFooterCameraFirstBtn
                           onClick = {this.props.onClick}
                           capture = {this.props.capture}
                         />
                        }
                        {this.props.imageData && this.props.show && this.props.setting==='camera' &&
                          <MainBodyFooterCameraSecondBtn
                           onClickRetake = {this.props.onClickRetake}
                          />
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