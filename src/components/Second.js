import React from 'react';
import { Link  } from'react-router-dom';
import {MDBContainer,MDBCard ,MDBRow,MDBCol,MDBInput, MDBCardBody, MDBBtn, MDBIcon, MDBFooter, MDBCardHeader} from 'mdbreact';
import'./App.css';

const font = {
    color:"black",
    fontWeight:"bold",
    marginRight:30,
    fontSize:17,
    fontFamily:"a다정다감"
  }

  const Second = () => {
    return(
      <React.Fragment>  
      <MDBContainer>
        <section style={font} className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold my-5">
              Second-Step
            </h2>
            <p className="w-responsive mx-auto mb-5">
                You&ME에 처음 오신 것을 환영합니다!<br></br>회원으로 가입해주세요.
            </p>
            <MDBRow>
             <MDBCol md="3">
              </MDBCol>
                <MDBCol md="6">
                  <MDBCard>
                  <MDBCardHeader className="purple-gradient">
                      <h4 className="font-weight-bold white-text">서로의 초대코드를 입력하여 연결해 주세요.</h4>
                  </MDBCardHeader>
                  <MDBCardBody>
                      <MDBInput
                        label="내 초대코드"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value="123"
                        readOnly
                      />
                      <MDBInput
                        label="전달받은 초대코드 입력"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                      
                        readonly
                      />
                      <Link to="/first"><MDBBtn color="danger">Back</MDBBtn></Link>
                      <Link to="/third"><MDBBtn color="primary">Connect</MDBBtn></Link>
                    </MDBCardBody>
                    <MDBFooter>
                      <p className="purple-text">
                        <MDBIcon icon="quote-left" className="pr-2" />
                        소중한 추억을, You&Me에서 간편하게 저장하세요.
                        <MDBIcon icon="quote-right" className="pl-2" />
                      </p>
                    </MDBFooter>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              </section>
        </MDBContainer>
      </React.Fragment>
    );
  }

export default Second;  