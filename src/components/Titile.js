import React, { PureComponent } from 'react';
import {MDBNavbar,MDBContainer,MDBNavbarToggler,MDBCollapse, MDBNavbarNav, MDBNavItem, MDBIcon} from 'mdbreact';
import { Link  } from'react-router-dom';
import Albumheader from './Album_header'
import Calendarheader from './Calendar_header'
import Albummodal from './Album_modal'
import TalkHeader from './Talk_header'
import Calendarmodal from './Calendar_modal'
import TalkModalAbove from './Talk_modal_Above'

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
  color:"#e0f7fa",
  fontSize:"15px",
  alignItems :"center",
  width:200,
  
}

const modal ={

  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: "row",
  alignItems :"center",
  justifyContent: 'space-around',
  padding:'1em'
}

const list1 = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems:'center'
 }

class M_nav extends PureComponent{
  
  state = {
      collapse: false,
      isWideEnough: false,
      checked: false,
      modal6: false,
      modal7: false,
      modal8: false,
      modal: false,
      switch1: true,
      switch2: false
    };

 

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
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
                  <MDBNavbarToggler onClick={this.toggleCollapse} />
                  <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar className=" fixed-top navbar-light bg-white"> 
                      <MDBNavbarNav style={layout} className="text-center">
                      <MDBNavItem>
                        <Link to={this.props.backUrl}><MDBIcon icon={this.props.backIcon} /><br></br>{this.props.back}</Link>
                      </MDBNavItem>
                      <MDBNavItem >
                        <Link to="#"><MDBIcon icon={this.props.mainIcon} /><br></br>{this.props.title}</Link>
                      </MDBNavItem>
                      <Albumheader
                        mode={this.props.mode}
                        toggle8={this.props.toggle}
                        rightIcon ={this.props.rightIcon}
                      />
                      <Calendarheader
                        mode={this.props.mode}
                        t={this.props.t}
                        rightIcon ={this.props.rightIcon}
                      />
                      {this.props.mode!=="calendar"&&this.props.mode!=="album"&&this.props.mode!=="talk"&&
                      <MDBNavItem >
                        <Link to="#"><MDBIcon icon={this.props.rightIcon} /><br></br>{this.props.update}</Link>
                     </MDBNavItem> 
                      }
                      {this.props.mode==="talk"&&
                       <TalkHeader
                        mode={this.props.mode}
                        modalTalk={this.props.modalTalk}
                        rightIcon ={this.props.rightIcon}
                        update ={this.props.update}
                       />
                      }              
                    </MDBNavbarNav>
                      
                  </MDBCollapse>
                  <Albummodal
                    mode={this.props.mode}
                    modal8={this.props.modal8}
                    toggle8={this.props.toggle}
                    setData={this.props.setData}
                    show={this.props.show}
                    modal={modal}
                    onClick={this.props.onClick}
                    setting={this.props.setting}
                    onChangePhoto={this.props.onChangePhoto}
                    file={this.props.file}
                    setRef={this.props.setRef}
                    imageName={this.props.imageName}
                    onChangeCamera={this.props.onChangeCamera}
                    imageData={this.props.imageData}
                    capture={this.props.capture}
                    onClickRetake={this.props.onClickRetake}
                  />
                  <TalkModalAbove
                    mode={this.props.mode}
                    modalTalk={this.props.modalTalk}
                    modalIsOpen={this.props.modalIsOpen}
                    caretDown={this.props.caretDown}
                    stream={this.props.stream}
                  />
                 <Calendarmodal
                   mode={this.props.mode}
                   modal={this.props.modal}
                   t={this.props.t}
                   list1={list1}
                 />  
                </MDBContainer>
              </MDBNavbar> 
      </React.Fragment>
    );
  };

  
}

  

export default M_nav;  