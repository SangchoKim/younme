import React from 'react';
import {MDBCol, MDBRow, MDBCard} from 'mdbreact';

const Album_modal_album = (props) => {
    return (
        <React.Fragment>
            <div>
                <MDBRow>
                    <MDBCol md="4"></MDBCol>
                    <MDBCol md="4">
                        <div className="custom-file">
                            <input
                                name="myImage"
                                onChange={props.onChangePhoto}
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                Choose file
                            </label>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4"></MDBCol>
                    <MDBCol md="4">
                        <div className="text-center mt-3">
                            <MDBCard >
                                <img src={props.file} alt='' width="500" height="auto"></img>
                            </MDBCard>
                        </div>
                    </MDBCol>
                </MDBRow>
            </div>
        </React.Fragment>
    )
}
export default Album_modal_album;

