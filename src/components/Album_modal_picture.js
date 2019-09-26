import React from 'react';
import {MDBCol, MDBRow, MDBCard} from 'mdbreact';

const Album_modal_picture = (props) => {

    return (
        <React.Fragment>
            <div>
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
                </MDBRow>
            </div>
        </React.Fragment>
    )
}
export default Album_modal_picture;

