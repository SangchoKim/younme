import React from 'react';
import {MDBCol,MDBRow,MDBCard,MDBInput} from 'mdbreact';
import Webcam from "react-webcam";

const Album_modal_camera = (props) => {

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    return (
    <React.Fragment>
        <div>
            <MDBRow>
                <MDBCol md="2"></MDBCol>
                <MDBCol md="8">
                    <MDBCard>
                        <div className="text-center">
                            <Webcam
                                height={600}
                                width={600}
                                style={{
                                    textAlign: "center"
                                }}
                                ref={props.setRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}/>
                        </div>
                    </MDBCard>
                    <div className="black-text">
                        <MDBInput
                            label="이미지의 이름을 입력해주세요"
                            name="myImage"
                            value={props.imageName}
                            onChange={props.onChangeCamera}
                            type="text"/>
                    </div>
                </MDBCol>
            </MDBRow>
        </div>
    </React.Fragment>
    )
}
export default Album_modal_camera;

