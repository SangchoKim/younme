import React,{PureComponent} from 'react';
import {MDBContainer,MDBCard ,MDBRow,MDBCol,MDBInput, MDBCardBody, MDBBtn, MDBIcon, MDBFooter, MDBCardHeader } from 'mdbreact';
import'./App.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const font = {
    color:"black",
    fontWeight:"bold",
    marginRight:30,
    fontSize:17,
    fontFamily:"a다정다감"
  }

const left ={
  textAlign:"left",
}

const sex ={
  display:"flex",
  flexDirection: "row",
  justifyContent: "center",
}
class Third extends PureComponent{ 

  render(){
    return(
      <React.Fragment>  
      <MDBContainer>
        <section style={font} className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold my-5">
              Third-Step
            </h2>
            <p className="w-responsive mx-auto mb-5">
                You&ME에 처음 오신 것을 환영합니다!<br></br>회원으로 가입해주세요.
            </p>
            <MDBRow>
             <MDBCol md="3">
              </MDBCol>
                <MDBCol md="6">
                  <MDBCard>
                  <MDBCardHeader className="aqua-gradient">
                      <h4 className="font-weight-bold white-text">연결성공!! 프로필을 입력해주세요.</h4>
                  </MDBCardHeader>
                  <MDBCardBody >
                    <form onSubmit={this.props.getData}>
                      <div style={sex}>    
                        <MDBInput
                            name="man"
                            icon="mars"
                            label="남성"
                            type="checkbox"
                            validate
                            error="wrong"
                            success="right"
                            value="1"
                            onChange={this.props.onChange} 
                          />
                          <MDBInput
                            name="women"
                            icon="venus"
                            label="여성"
                            type="checkbox"
                            validate
                            error="wrong"
                            success="right"
                            value="2"
                            onChange={this.props.onChange} 
                          />
                        </div>
                        <div style={left}>
                          <MDBInput
                            name="name"
                            label="이름"
                            icon="user"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange={this.props.onChange}  
                          />
                        </div>
                        
                        <div className="mb-3" style={left}>
                        <MDBIcon icon="birthday-cake fa-2x " /><span className="mr-3 ml-3">생일</span>
                        <DayPickerInput
                          onDayChange={day => {this.props.onDayChange(day,"birthday")}} 
                          />
                        </div>
                        <div className="mb-3" style={left}>
                        <MDBIcon icon="heart fa-2x " /><span className="mr-3 ml-3">처음 만난날</span>
                        <DayPickerInput
                          onDayChange={day => {this.props.onDayChange(day,"relday")}} 
                          />
                        </div>
                        <MDBBtn color="danger" onClick={this.props.backTosecond}>Back</MDBBtn>
                        <MDBBtn type="submit" color="primary">Start</MDBBtn>
                      </form>
                    </MDBCardBody>
                    <MDBFooter>
                      <p className="green-text">
                        <MDBIcon icon="quote-left" className="pr-2" />
                        한 마디도 놓치고 싶지 않은 목소리,<br></br>You&Me에서 선명한 무료 통화를 이용하세요.
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
}

export default Third;  