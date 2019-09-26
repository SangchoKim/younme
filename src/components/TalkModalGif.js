import React, {PureComponent} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard} from 'mdbreact';
class TalkModalGif extends PureComponent {

    state = {
        gif: [
            {
                'aniName': 'annimation1',
                'imgPath': 'annimation1.png'
            }, {
                'aniName': 'annimation2',
                'imgPath': 'annimation2.png'
            }, {
                'aniName': 'annimation3',
                'imgPath': 'annimation3.png'
            }, {
                'aniName': 'annimation4',
                'imgPath': 'annimation4.png'
            }
        ]
    }

    render() {
        const gif = this.state.gif;
        console.log(gif);
        const animation = gif.map((data, index) => {
            return (
                <MDBCol key={index + Date()} md="2">
                    <div><img
                        src={`/lottie/${data.imgPath}`}
                        alt="Logo"
                        width="100%"
                        height=""
                        className="img-fluid z-depth-1 p-2"/></div>
                    <div className="text-center">
                        <MDBBtn name={data.aniName} onClick={this.props.setGifData}>사용</MDBBtn>
                    </div>
                </MDBCol>
            )
        })
        return (
            <React.Fragment>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                            <div className="text-center m-1">
                                <h3>이모티콘</h3>
                            </div>
                            <hr color="#000000"/>
                        </MDBCol>
                        {animation}
                    </MDBRow>
                    <div className="text-center mt-3">
                        <MDBBtn name="back" color="danger" onClick={this.props.onClick}>뒤로</MDBBtn>
                    </div>
                </MDBContainer>
            </React.Fragment>
        )
    }

}

export default TalkModalGif;