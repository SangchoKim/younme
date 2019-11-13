import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import {MDBContainer,MDBBtn,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter,MDBRow,MDBCol,MDBInput,MDBIcon} from 'mdbreact';
import'./App.css';
import { Link  } from'react-router-dom';
import { connect } from 'react-redux';
import * as MainAction from '../store/modules/Main';

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
    this.setState({[e.target.name]:e.target.value});
  }

   getdata = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const userInfo = {
        email,password
        }
    const {mainRequest} = this.props;
    if(!email){
      alert('이메일을 입력해주세요');
      return;
    }
    if(!password){
      alert('비밀번호를 입력해주세요');
      return;
    }
    mainRequest(userInfo);
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate(){
    let {mainState,result,errMessage,reason} = this.props;
    if(mainState==="isSuccess"){
      if(result === 2){
        alert(reason);
        result = 10;
      }else if(result === 5){
        alert('상대방이 가입하기 전입니다.');
        result = 10;
      }else if(result === 10){
      }else {
        const url = '/main';
        this.props.history.push({
              pathname: url,
        });
      }
    }else if("isFail"){
    }
  }

  componentWillUnmount(){
    const {mainOut} = this.props;
    mainOut();
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


const mapStateToProps = (state) => ({
  mainState: state.Main.mainState,
  errMessage: state.Main.errMessage,
  result: state.Main.result,
  reason: state.Main.reason,
});

const mapDispatchToProps = (dispatch) => ({
  mainRequest: (userInfo) => dispatch(MainAction.mainRequest(userInfo)),
  mainOut: () => dispatch(MainAction.mainOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
