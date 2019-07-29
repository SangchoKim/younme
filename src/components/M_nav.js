import React, { Component } from 'react';
import {MDBNavbar,MDBContainer,MDBNavbarToggler,MDBCollapse, MDBNavbarNav, MDBNavItem, MDBIcon,MDBBadge } from 'mdbreact';
import { Link  } from'react-router-dom';



const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:25,
    fontFamily:"a다정다감",
    // width:100%
  }

const layout ={
  disPlay: "flex",
  flexDirection: "row",
  justifyContent: "center",
  color:"white",
  fontSize:"15px"
}

class M_nav extends Component{

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  getdata = (e) => {
    e.preventDefault();
    const url = '/mypage';
    fetch("/api/mypage",{method: "get",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                        })
    .then(res => res.json())
    .then(res => {
      console.log(res.result);
      console.log(res.user_info);
      if(res.result===1){
      console.log('move to mypage');
      const _name = res.user_info.name;
      const _email = res.user_info.email;
      const _birthday = res.user_info.birthday;
      const _gender = res.user_info.gender;
      this.props.onMoveToPage(_email,_name,_birthday,_gender);
      this.props.history.push({
        pathname: url,
        state:{
          name:res.user_info.name,
          email:res.user_info.email,
          birthday:res.user_info.birthday,
          gender:res.user_info.gender
        }
      });
      }else{
        console.log(res.error);
      }
     });
  }

  render(){
    return(
      <React.Fragment>  
       <MDBNavbar dark expand="md" style={font} >
                <MDBContainer>
                    <div>
                      <strong>You&Me</strong>
                    </div>      
                  <MDBNavbarToggler onClick={this.onClick} />
                  <MDBCollapse isOpen={this.state.collapse} navbar>
                    <MDBNavbarNav style={layout} className="text-center">
                      <MDBNavItem active  >
                        <Link to="/main"><MDBIcon icon="home fa-2x" /><br></br>홈</Link>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link to="/album"><MDBIcon icon="image fa-2x" /><br></br>앨범</Link>
                      </MDBNavItem>
                      <MDBNavItem >
                        <Link to="/talk"><MDBIcon icon="sms fa-3x"  /><br></br></Link>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link to="/alert"><MDBIcon icon="bell fa-2x" /><br></br>알림</Link><MDBBadge pill color="danger">5</MDBBadge>
                      </MDBNavItem>
                      <MDBNavItem>
                        <Link to="#" onClick={this.getdata}><MDBIcon icon="address-card fa-2x" /><br></br>마이페이지</Link>
                      </MDBNavItem>
                    </MDBNavbarNav>
                  </MDBCollapse>
                </MDBContainer>
              </MDBNavbar> 
      </React.Fragment>
    );
  };

  
}

  

export default M_nav;  