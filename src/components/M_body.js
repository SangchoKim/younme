import React, { Component } from 'react';
import {MDBContainer ,MDBRow,MDBCol,MDBIcon,MDBCard,MDBBtn, MDBInput, MDBModal, MDBModalBody,MDBModalFooter,MDBModalHeader,MDBView} from 'mdbreact';
import { Link  } from'react-router-dom';
import Webcam from "react-webcam";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }

 const layout = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'center',
  padding:'1em'
 }

 const round = {
  backgroundColor: "black",
  borderRadius: "50%"
 }

 const modal ={

  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: "row",
  alignItems :"center",
  justifyContent: 'space-around',
  padding:'1em'
}

const list1 = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'center',
  alignItems:'center',
  height:'250px'
 }



class M_body extends Component{

  state = {
    modal6: false,
    modal7: false,
    modal: false,
    photoIndex: 0,
    isOpen: false,
    images: []
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  

  m = () => {
    this.props.check && this.setState({images:this.props.imgUrls});
  }

  render(){
   
    const { photoIndex, isOpen } = this.state;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return(
      <React.Fragment >
      <MDBContainer>
      {this.props.mode==="main"&&
          <MDBRow style={font}>
              <MDBCol md="1" >
              </MDBCol> 
                <MDBCol md="10">
                  <MDBCard>
                    <img src={this.props.imgUrl} alt="Logo" width="100%" height="" />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
         }
            {this.props.mode==="album"&&!this.props.defautImgeHave&&
              <MDBRow style={font}>
              <MDBCol md="1" >
              </MDBCol> 
                <MDBCol md="10" >
                  
                  <MDBCard className="p-2">
                    {this.props.check&& 
                      <div>
                      {this.props.imgUrls.map((image,index) => {
                      console.log("_imgUrls:",image);
                      return <img key={index} src={`/uploadsAlbum/${image}`} onClick={() => this.setState({ isOpen: true })} alt="Logo" width="33.3%" height="" className="img-fluid z-depth-1 p-2"/>
                      })}
                      </div> 
                    }
                  </MDBCard>
                </MDBCol>
                {isOpen && 
                (
                <Lightbox
                  mainSrc={"/uploadsAlbum/"+ this.props.imgUrls[photoIndex]}
                  nextSrc={this.props.imgUrls[(photoIndex + 1) % this.props.image.length]}
                  prevSrc={this.props.imgUrls[(photoIndex + this.props.image.length - 1) % this.props.image.length]}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + this.props.image.length - 1) % this.props.image.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % this.props.image.length,
                    })
                  }
                />
              )}
              </MDBRow>
            }
            {this.props.mode==="album"&&this.props.defautImgeHave&&
              <MDBRow style={font}>
              <MDBCol md="1" >
              </MDBCol> 
                <MDBCol md="10">
                  <MDBCard>
                    <img src={this.props.defautImge} alt="Logo" width="100%" height="" />
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            }
            {this.props.mode==="talk"&&
            // Talk body 부분 
            <MDBRow style={font}>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="1" >
                <MDBBtn outline color="danger" onClick={this.toggle(8)}><MDBIcon icon="plus-circle fa-lg" /></MDBBtn>
                <MDBModal isOpen={this.state.modal8} toggle={this.toggle(8)} fullHeight position="bottom">            
                        <MDBModalBody>
                          <MDBCard style={modal} className="text-center">
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
            {this.props.mode==="main"&&
            // Main body 부분 
            <MDBRow style={font}>
                <MDBCol md="1" >
                </MDBCol> 
                <MDBCol md="10" >
                  <div style={layout} className="#b3e5fc #ff80ab #e8eaf6#fce4ec #f8bbd0#90caf9 blue lighten-3 text-center" >
                    <div className="p-1"><Link to="#"><button style={round} onClick={this.props.toggle}><MDBIcon icon="image fa-2x" /></button></Link><br></br>배경화면</div>
                    <div className="p-1"><Link to="/memorialday"><button style={round}><MDBIcon icon="american-sign-language-interpreting fa-2x" /></button></Link><br></br>기념일</div>
                    <div className="p-1"><Link to="/calendar"><button style={round}><MDBIcon icon="calendar-check fa-2x" /></button></Link><br></br>캘린더</div> 
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
                              <div className="grey-text" style={list1}>
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
        </MDBContainer>
      </React.Fragment>

    )
  }
}
export default M_body;  