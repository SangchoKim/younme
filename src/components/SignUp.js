import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import {MDBContainer,MDBBtn,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter,MDBRow,MDBCol,MDBInput,MDBIcon} from 'mdbreact';
import'./App.css';
import { Link  } from'react-router-dom';


const font = {
  color:"black",
  fontWeight:"bold",
  marginRight:30,
  fontSize:17,
  fontFamily:"a다정다감"
}

class SignUp extends PureComponent {
  
  state = {
    modal: false,
    email:'',
    password:''
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

   onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value});
  }

   getdata = (e) => {
    e.preventDefault();
    const url = '/loading';
    const { email, password } = this.state;
    console.log("email:",email);
    console.log("password:",password);
    if(!email){
      alert('이메일을 입력해주세요');
      return;
    }
    if(!password){
      alert('비밀번호를 입력해주세요');
      return;
    }
    fetch("/api/login",{method: "post",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({'email':email,'password':password})})
    .then(res => res.json())
    .then((res) =>{
      console.log(res.result);
      if(res.result===1){
      console.log('move to main');
      alert('You&ME에 접속합니다.');
      this.props.history.push({
        pathname: url,
        state: { mycode: email}
      });
      }else if(res.result===2){
        alert(res.fMsg.error[0]);
      }else if(res.result===5){
        console.log('상대방이 가입하기 전입니다.');
        alert('상대방이 가입하기 전입니다.');
      }else{
        console.log('에러발생');
      }
     });
  }

    render() {
      const { password, email } = this.state;
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
                <form onSubmit={this.getdata}>
                <MDBModalBody>
                <MDBRow>
                    <MDBCol md="12">
                        <div className="grey-text">
                          <MDBInput
                            name="email"
                            label="Type your email"
                            icon="envelope"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                            value={email}
                            onChange={this.onChange}
                          />
                          <MDBInput
                            name="password"
                            label="Type your password"
                            icon="lock"
                            group
                            type="password"
                            validate
                            value={password}
                            onChange={this.onChange}
                          />
                        </div>
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.toggle}>닫기</MDBBtn>
                  <MDBBtn type="submit" color="primary">로그인</MDBBtn>
                </MDBModalFooter>
                </form>
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
