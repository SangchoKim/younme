import React from 'react';
import {MDBBtn} from 'mdbreact';

const Album_modal_cameraFirstBtn = (props) => {

    return (
        <React.Fragment>
            <div>
                <MDBBtn name="back" color="danger" onClick={props.onClick}>뒤로</MDBBtn>
                <MDBBtn name="capture" color="info" onClick={props.capture}>촬영</MDBBtn>
            </div>
        </React.Fragment>
    )
}
export default Album_modal_cameraFirstBtn;
