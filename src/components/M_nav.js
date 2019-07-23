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
                        <Link to="/mypage"><MDBIcon icon="address-card fa-2x" /><br></br>마이페이지</Link>
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