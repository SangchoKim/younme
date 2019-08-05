import React, { Component } from 'react';
import {MDBContainer,MDBCard ,MDBRow,MDBCol,MDBIcon} from 'mdbreact';

const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }

 const layout = {
  disPlay: "flex",
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems:'center',
  padding:'2em'
 } 

class M_header extends Component{
  render(){
    return(
      <React.Fragment>  
      <MDBContainer >
            <MDBRow style={font} className="mt-2">
                <MDBCol md="1" >
                </MDBCol> 
                <MDBCol md="10" >
                  <MDBCard style={layout} className="#b3e5fc #ff80ab #e8eaf6#fce4ec #f8bbd0#90caf9 blue lighten-3">
                    <MDBIcon far icon="grin-hearts fa-5x fa-spin" />
                      <div className="text-center">
                        <h5>처음 만난 날</h5>
                        <h3 className="red-text"><strong>{this.props.relDay}일</strong></h3>
                        <span>{this.props.userName}</span><MDBIcon icon="heart" /><span>{this.props.oppenetName}</span>
                      </div>
                    <MDBIcon far icon="kiss-wink-heart fa-5x fa-spin" />
                  </MDBCard>
                </MDBCol>
              </MDBRow> 
        </MDBContainer>
      </React.Fragment>
    )
  }
}
export default M_header;  