import React from 'react';
import {MDBBtn} from 'mdbreact';

const Album_modal_cameraSecondBtn = (props) => {

    return (
        <React.Fragment>
            <div>
                <MDBBtn type="submit" name="save" color="success">저장</MDBBtn>
                <MDBBtn name="retake" color="warning" onClick={props.onClickRetake}>재촬영</MDBBtn>
            </div>
        </React.Fragment>
    )
}
export default Album_modal_cameraSecondBtn;
