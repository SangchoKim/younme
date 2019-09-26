import React from 'react';
import {MDBRow, MDBCol, MDBCard} from 'mdbreact';

const Album_body_default = (props) => {

    return (
        <React.Fragment>
            <MDBRow style={props.font}>
                <MDBCol md="1"></MDBCol>
                <MDBCol md="10">
                    <MDBCard>
                        <img src={props.defautImge} alt="Logo" width="100%" height=""/>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </React.Fragment>
    )
}
export default Album_body_default;
