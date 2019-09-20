import React, { PureComponent } from 'react';
import {MDBContainer ,MDBRow,MDBCol,MDBListGroup,MDBListGroupItem, MDBCard,MDBIcon} from 'mdbreact';

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
 }


class Memory_firstBody extends PureComponent{
  render(){
    return(
      <React.Fragment >
       
      <MDBContainer>
            <MDBRow style={font}>
                <MDBCol md="2" >
                </MDBCol> 
                <MDBCol md="8" >
                <MDBCard className="mt-2" >
                <MDBListGroup className="border-dark">
                  <MDBListGroupItem style={list1}>
                      <React.Fragment >
                        <div className="ml-2">{this.props.firstSpaceDay}</div>
                        <div className="ml-2">{this.props.firstSpaceLeftDay}</div>
                      </React.Fragment >
                  </MDBListGroupItem>
                  <MDBListGroupItem style={list1}>
                      <React.Fragment >
                        <div className="ml-2">{this.props.secondSpaceDay}</div>
                        <div className="ml-2">{this.props.secondSpaceLeftDay}</div>
                      </React.Fragment >
                  </MDBListGroupItem>
                  <MDBListGroupItem style={list1}>
                      <React.Fragment >
                        <div className="ml-2">{this.props.thirdSpaceDay}</div>
                        <div className="ml-2">{this.props.thirdSpaceLeftDay}</div>
                      </React.Fragment >  
                  </MDBListGroupItem>
                  <MDBListGroupItem style={list1}>
                      <React.Fragment >
                        <div className="ml-2">{this.props.forthSpaceDay}</div>
                        <div className="ml-2">{this.props.forthSpaceLeftDay}</div>
                      </React.Fragment > 
                  </MDBListGroupItem>
                </MDBListGroup>
                </MDBCard>
                <hr className="border-dark"></hr>
                </MDBCol>
              </MDBRow> 
        </MDBContainer>
      </React.Fragment>
    )
  }
}
export default Memory_firstBody;  