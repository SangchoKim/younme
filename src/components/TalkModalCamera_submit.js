import React from 'react';
import {MDBBtn, MDBCol, MDBRow, MDBCard} from 'mdbreact';

const TalkModalCamera_submit = (props) => {

    return (
        <React.Fragment>
            <form onSubmit={props.setCameraData}>
                <MDBRow>
                    <MDBCol md="4"></MDBCol>
                    <MDBCol md="4">
                        <div className="text-center">
                            <MDBCard className="text-center mt-3">
                                <img src={props.imageData} alt='' width="500" height="auto"></img>
                            </MDBCard>
                        </div>
                        <div className="text-center mt-3">
                            <h4>이미지 이름: {props.imageName}</h4>
                        </div>
                    </MDBCol>
                    <MDBCol md="4"></MDBCol>
                </MDBRow>
                <div className="text-center">
                    <MDBBtn type="submit" name="save" color="success">저장</MDBBtn>
                    <MDBBtn color="warning" onClick={props.onClickRetake}>재촬영</MDBBtn>
                </div>
            </form>
        </React.Fragment>
    )
}
export default TalkModalCamera_submit;
