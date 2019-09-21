import React, { PureComponent } from 'react';
import {MDBBtn,MDBModalBody,MDBModal,MDBRow,MDBCol,MDBModalHeader,MDBListGroup,MDBListGroupItem,MDBModalFooter} from 'mdbreact';



class Talk_modal_Above extends PureComponent{
 
  
  state={
    stream: this.props.stream,
  }

 
  componentDidUpdate(){
    if(this.props.stream!==null){
      const stream = this.props.stream;
      try {
        this.myVideo.srcObject = stream;
      } catch (e) {
        // this.myVideo.src = URL.createObjectURL(stream);
      }
      this.myVideo.play();
    }
  }

  
    render(){
        return(
            <React.Fragment>
               {this.props.mode==="talk"&&
                      <MDBModal size="fluid" isOpen={this.props.modalIsOpen} toggle={this.props.modalTalk}>
                        <MDBModalHeader>
                          
                        </MDBModalHeader>
                        <MDBModalBody>
                          <MDBRow>
                            <MDBCol md="12" className="video-container">
                                <video id="myVideo" className="my-video" ref={(refs) => {this.myVideo = refs;}}/>
                                <video className="user-video" ref={(ref) => {this.userVideo = ref;}}/>
                            </MDBCol>
                          </MDBRow>
                        </MDBModalBody>    
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.props.modalTalk}>닫기</MDBBtn>
                </MDBModalFooter>
            </MDBModal>      
                }
            </React.Fragment>
        )
    }


}




export default Talk_modal_Above;