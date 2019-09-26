import React from 'react';
import {MDBBtn, MDBRow, MDBCol, MDBCard, MDBInput} from 'mdbreact';
import Cropper from '../lib/cropper'

const Album_body_update = (props) => {

    return (
        <React.Fragment>
            <form onSubmit={props.setData}>
                <MDBRow style={props.font}>
                    <MDBCol md="1"></MDBCol>
                    <MDBCol md="10">
                        <MDBCard style={props.img}>
                            <Cropper
                                imageName={props.imageName}
                                imgUrls={props.imgUrlss}
                                onChange={props.onChange}/>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="1"></MDBCol>
                    <MDBCol md="12">
                        <div className="text-center">
                            <MDBInput type="hidden" id="data" name="myImage" value={props.data}/>
                            <MDBBtn type="submit" name="save" color="success">수정</MDBBtn>
                            <MDBBtn color="secondary" name="update" onClick={props.onClick}>닫기</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </form>
        </React.Fragment>
    )
}
export default Album_body_update;
