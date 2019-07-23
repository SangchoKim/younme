import React from 'react';
import PropTypes from 'prop-types';
import {MDBContainer,MDBBtn,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter,MDBRow,MDBCol,MDBInput,MDBIcon} from 'mdbreact';
import'./App.css';
import { Link  } from'react-router-dom';

class SignUp extends React.Component {
  
  state = {
    modal: false
  }

  
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

    // 안드로이드 or 아이폰 클릭시 해당 페이지로 이동 
    handleClick = (e) => {
      let c = e.target.id;
      const android = "https://play.google.com/store";
      const iPhone ="https://www.apple.com/ios/app-store/";
      c?window.location.href=android:window.location.href=iPhone;
   }

   check = ()=>{
     const firstPage = "/first"
    window.location.href = firstPage;
   }

    render() {
     const font = {
        color:"black",
        fontWeight:"bold",
        marginRight:30,
        fontSize:17,
        fontFamily:"a다정다감"
      }
  
        return(
          <React.Fragment>
          <div className="_SignupButton">
            <div>
              <span style={font}> {this.props.name} </span>
              <button id="_SignupButton" style={font}  onClick={this.toggle} >로그인</button>
              <Link to="/first"><button id="_SignupButton" style={font}>회원가입</button></Link>
            </div>
            <div>
            <span style={font}>You&Me 다운로드</span>
              <button className="_button" id="_button" onClick={this.handleClick} style={font}><MDBIcon fab icon="android" className="pr-2"></MDBIcon>Android</button>
              <button className="_button" id="_button" onClick={this.handleClick} style={font}><MDBIcon fab icon="apple" className="pr-2"></MDBIcon>iPhone</button>
            </div>
          </div>
          <MDBContainer>
              <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle}>로그인</MDBModalHeader>
                <MDBModalBody>
                <MDBRow>
                    <MDBCol md="12">
                      <form>
                        <div className="grey-text">
                          <MDBInput
                            label="Type your email"
                            icon="envelope"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                          />
                          <MDBInput
                            label="Type your password"
                            icon="lock"
                            group
                            type="password"
                            validate
                          />
                        </div>
                      </form>
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.toggle}>닫기</MDBBtn>
                  <Link to="/main"><MDBBtn color="primary">로그인</MDBBtn></Link>
                </MDBModalFooter>
            </MDBModal>
            </MDBContainer>
          </React.Fragment>
        );
    }
}

SignUp.propTypes = {
  name: PropTypes.string
};

SignUp.defaultProps = {
  name: 'You&Me 시작하기'
};


export default SignUp;
