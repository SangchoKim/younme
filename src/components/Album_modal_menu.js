import React from 'react';
import {MDBBtn,MDBIcon,MDBCard} from 'mdbreact';

const Album_modal_menu = (props) => {
    return(
      <React.Fragment>
        <MDBCard style={props.modal} className="text-center">
          <MDBBtn color="blue" name="camera" onClick={props.onClick}><MDBIcon icon="camera fa-2x" /> 카메라</MDBBtn>
          <MDBBtn color="blue" name="album" onClick={props.onClick}><MDBIcon far icon="images fa-2x" /> 사진</MDBBtn>
          <MDBBtn color="blue" name="video" ><MDBIcon icon="video fa-2x" /> 동영상</MDBBtn>
          <MDBBtn color="blue" name="memo"><MDBIcon icon="sticky-note fa-2x" /> 메모</MDBBtn>
        </MDBCard>
      </React.Fragment>
    )
}
export default Album_modal_menu;

