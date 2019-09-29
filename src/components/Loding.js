import React from 'react';
import Lottie from 'lottie-react-web';
import Lodings from '../lotties/61-octopus.json';
import {MDBRow,MDBCol,MDBContainer} from 'mdbreact';
const Loding = (props) => {

    return (
        <React.Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="2"></MDBCol>
                    <MDBCol md="8">
                        <Lottie
                            options={{
                                animationData: Lodings,
                                loop: true,
                                autoplay: true
                            }}/>
                    </MDBCol>
                    <MDBCol md="2"></MDBCol>
                    <MDBCol md="12" className="text-center">
                        <h1><strong>{props.comment}</strong></h1>  
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </React.Fragment>
    )
}

Loding.defaultProps = {
    comment:'로딩중입니다...',
}

export default Loding;
