import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon,MDBModalBody,MDBModal,MDBCard} from 'mdbreact';


class TalkModalGif extends PureComponent{

    render(){
        return(
            <React.Fragment>
               {this.props.mode==="talk" &&
                      <div>                      
                        <MDBBtn outline color="light-blue" onClick={this.props.toggle}><MDBIcon icon={this.props.caretDown} /></MDBBtn>
                        <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle} fullHeight position="top">            
                        <form> 
                        <MDBModalBody>
                          <MDBCard style={this.props.modal} className="text-center">
                            <MDBBtn color="white"><MDBIcon far icon="images fa-2x" /> 사진 모아보기</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> 러브레터 보관함</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                            <MDBBtn color="white"><MDBIcon icon="envelope fa-2x" /> S/T</MDBBtn>
                          </MDBCard>
                        </MDBModalBody>
                        </form>
                      </MDBModal>
                    </div>
                  }
            </React.Fragment>
        )
    }


}

export default TalkModalGif;