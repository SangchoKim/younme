import React, { Component } from 'react';
import {MDBContainer ,MDBRow,MDBCol,MDBIcon,MDBListGroup,MDBListGroupItem, MDBCard} from 'mdbreact';
import { Link  } from'react-router-dom';

const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }

 const list1 = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems:'center'
 }


class Memory_secondBody extends Component{
  render(){
    return(
      <React.Fragment >
       
      <MDBContainer>
            <MDBRow style={font}>
                <MDBCol md="2" >
                </MDBCol> 
                <MDBCol md="8" >
                  <div className="p-2">
                    <h6>우리 기념일</h6>
                  </div>
                  <MDBCard>
                    <MDBListGroup className=" border-dark">   
                      <MDBListGroupItem style={list1} hover color="info" >
                        <div className="ml-2"><Link to="#"><MDBIcon icon="plus-circle fa-2x" className="mr-2"/>기념일 추가</Link></div>
                      </MDBListGroupItem>
                      <MDBListGroupItem style={list1}>
                        <div className="ml-2"><MDBIcon fab icon="gratipay fa-2x" className="mr-2"/>{this.props.firstDay}</div>
                        <div className="ml-2">{this.props.SeeingDay}</div>
                      </MDBListGroupItem>
                      <MDBListGroupItem style={list1}>
                        <div className="ml-2"><MDBIcon icon="birthday-cake fa-2x" className="mr-2"/>{this.props.guyName}</div>
                        <div className="ml-2">{this.props.guyBirthday}</div>
                      </MDBListGroupItem>
                      <MDBListGroupItem style={list1}>
                        <div className="ml-2"><MDBIcon icon="birthday-cake fa-2x" className="mr-2"/>{this.props.girlName}</div>
                        <div className="ml-2">{this.props.girlBirthday}</div>
                      </MDBListGroupItem>
                    </MDBListGroup>
                </MDBCard>
                </MDBCol>
              </MDBRow> 
        </MDBContainer>
      </React.Fragment>
    )
  }
}
export default Memory_secondBody;  