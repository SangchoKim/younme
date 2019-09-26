import React from 'react';
import {MDBBtn, MDBCol, MDBRow, MDBCard, MDBInput} from 'mdbreact';
import Webcam from "react-webcam";

const TalkModalCamera_isReady = (props) => {

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    return (
        <React.Fragment>
            <MDBRow>
                <MDBCol md="12">
                    <div className="text-center m-1">
                        <h3>카메라</h3>
                    </div>
                    <hr color="#000000"/>
                </MDBCol>
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
                            name="imageName"
                            value={props.imageName}
                            onChange={props.onChangeCamera}
                            type="text"/>
                    </div>
                    <div className="text-center">
                        <MDBBtn name="back" color="danger" onClick={props.onClick}>뒤로</MDBBtn>
                        <MDBBtn name="capture" color="info" onClick={props.capture}>촬영</MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>
        </React.Fragment>
    )
}
export default TalkModalCamera_isReady;
