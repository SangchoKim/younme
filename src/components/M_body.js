import React, { Component } from 'react';
import {MDBContainer ,MDBRow,MDBCol,MDBIcon,MDBCard,MDBBtn, MDBInput, MDBModal, MDBModalBody,MDBModalFooter,MDBModalHeader } from 'mdbreact';
import { Link  } from'react-router-dom';

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
    modal: false
  };

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }


  render(){
    return(
      <React.Fragment >
       
      <MDBContainer>
            <MDBRow>
            <MDBCol md="1" >
            </MDBCol> 
              <MDBCol md="10">
                <MDBCard>
                   <img src={this.props.imgUrl} alt="Logo" width="100%" height=""></img >
                </MDBCard>
              </MDBCol>
            </MDBRow>
            
    
            {this.props.mode==="album"?
              <MDBRow>
                
              </MDBRow>
            :
            this.props.mode==="talk"?
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
            :
            // Main body 부분 
            <MDBRow style={font}>
                <MDBCol md="1" >
                </MDBCol> 
                <MDBCol md="10" >
                  <div style={layout} className="#b3e5fc #ff80ab #e8eaf6#fce4ec #f8bbd0#90caf9 blue lighten-3 text-center" >
                    <div className="p-1"><Link to="#"><button style={round} onClick={this.toggle}><MDBIcon icon="image fa-2x" /></button></Link><br></br>배경화면</div>
                    <div className="p-1"><Link to="/memorialday"><button style={round}><MDBIcon icon="american-sign-language-interpreting fa-2x" /></button></Link><br></br>기념일</div>
                    <div className="p-1"><Link to="/calendar"><button style={round}><MDBIcon icon="calendar-check fa-2x" /></button></Link><br></br>캘린더</div> 
                  </div>
                </MDBCol>
                <div>
                      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                      <MDBModalHeader toggle={this.toggle}>배경화면</MDBModalHeader>
                      <MDBModalBody>
                      <MDBRow>
                          <MDBCol md="12">
                            
                              <div className="grey-text" style={list1}>
                                <MDBBtn color="unique" className="m-5"><MDBIcon icon="camera-retro fa-2x" /><br></br>카메라</MDBBtn>
                                <MDBBtn color="unique"className="m-5"><MDBIcon icon="camera-retro fa-2x" /><br></br>앨범</MDBBtn>
                              </div>
                            
                          </MDBCol>
                        </MDBRow>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>닫기</MDBBtn>
                      </MDBModalFooter>
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