import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard,MDBInput} from 'mdbreact';
import Webcam from "react-webcam";

class Main_body_camera extends PureComponent{
render() {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    return (
        <React.Fragment>
            <div>
                <MDBRow>
                    <MDBCol md="1"></MDBCol>
                    <MDBCol md="10">
                        <MDBCard className="text-center">
                            <Webcam
                                height={385}
                                width={385}
                                style={{
                                    textAlign: "center"
                                }}
                                ref={this.props.setRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}/>
                        </MDBCard>
                        <div>
                            <MDBInput
                                label="이미지의 이름을 입력해주세요"
                                name="myImage"
                                value={this.props.imageName}
                                onChange={this.props.onChangeCamera}
                                type="text"
                                width="100"/>
                        </div>
                    </MDBCol>
                    <MDBCol md="1"></MDBCol>
                </MDBRow>
            </div>
        </React.Fragment>
    )
}
}
export default Main_body_camera;