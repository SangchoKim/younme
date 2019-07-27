import React,{Component} from 'react';
import {MDBContainer,MDBCard ,MDBRow,MDBCol,MDBInput, MDBCardBody, MDBBtn, MDBIcon, MDBFooter, MDBCardHeader} from 'mdbreact';

import'./App.css';



    const font = {
      color:"black",
      fontWeight:"bold",
      marginRight:30,
      fontSize:17,
      fontFamily:"a다정다감"
    }



  class First extends Component{ 

    constructor() {
      super();
      this.state = {
        email: '',
        password: ''
        
      };
    }

    onChange = (e) => {
      console.log(e.target.name);
      console.log(e.target.value);
      this.setState({[e.target.name]:e.target.value});
    }

    getdata = (e) => {
      e.preventDefault();
      const url = '/second';
      const { password, email } = this.state;
      console.log("email:",email,"password:",password);
      if(!email){
        alert('이메일을 입력해주세요');
        return;
      }
      if(!password){
        alert('패스워드를 입력해주세요');
        return;
      }
      fetch("/api/first",{method: "POST",
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({'password':password,'email':email})})
      .then(res => res.json())
      .then((res) =>{
        console.log(res);
        if(res.result===1){
        console.log('move to second')
        const _mycode = res.mycode;
          if(_mycode)
            this.props.history.push({
              pathname: url,
              state: { mycode: _mycode}
            });
          else
            this.props.history.push({
              pathname: url
            });
        }else{
          console.log(res.error);
        }
       });
    }

    backTohome = () =>{
      const url = '/';
      fetch("/api/home",{method: "POST",
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({'order':'deleteSession'})})
      .then(res => res.json())
      .then((res) =>{
        console.log(res);
        if(res.result===1){
        console.log('delete to session')
        this.props.history.push(url);
        }else{
          console.log(res.error);
        }
       }); 
    }

    componentWillMount (){
      console.log("props.location:",this.props.location);
      if(this.props.location.state){
        // this.setState({email:this.props.location.state.email});
        const _email = this.props.location.state.email;
        this.setState({email:_email});
        console.log("reloadEmail:",_email);
      }
    }

  render(){
    const { password, email } = this.state;
    return(
      <React.Fragment>  
      <MDBContainer>
        <section style={font} className="text-center my-5">
            <h2 className="h1-responsive font-weight-bold my-5">
              First-Step
            </h2>
            <p className="w-responsive mx-auto mb-5">
              You&ME에 처음 오신 것을 환영합니다!<br></br>회원으로 가입해주세요.
            </p>
            <MDBRow>
             <MDBCol md="3">
              </MDBCol>
                <MDBCol md="6">
                  <MDBCard>
                  <MDBCardHeader className="blue-gradient">
                      <h4 className="font-weight-bold white-text">E-mail과 Password를 입력해주세요</h4>
                  </MDBCardHeader>
                  <MDBCardBody>
                      <form onSubmit={this.getdata}> 
                      <MDBInput
                        name="email"
                        label="Type your email"
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
                        group
                        type="password"
                        validate
                        value={password}
                        onChange={this.onChange}
                      />
                      
                      <MDBBtn color="danger" onClick={this.backTohome}>Back</MDBBtn>
                      <MDBBtn type="submit" color="primary">Next-Step</MDBBtn>
                      </form>
                      
                      
                    </MDBCardBody>
                    <MDBFooter>
                      <p className="pink-text">
                        <MDBIcon icon="quote-left" className="pr-2" />
                        사랑스러운 둘만의 대화, You&Me에서 사랑스럽게 대화하세요.
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
export default First;  