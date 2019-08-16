import React, { PureComponent } from 'react';
import {MDBContainer} from 'mdbreact';
import 'react-image-lightbox/style.css';
import 'tui-image-editor/dist/tui-image-editor.css'
import Mainheader from './Main_header'
import Albumbody from './Album_body'
import Talkbody from './Talk_body'
import Mainbody from './Main_body'


const font = {
    color:"black",
    fontWeight:"bold",
    fontSize:17,
    fontFamily:"a다정다감"
  }

 const layout = {
  display: 'flex',
  flexDirection: "row",
  justifyContent: 'center',
  padding:'1em'
 }

 const round = {
  backgroundColor: "black",
  borderRadius: "50%"
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
  justifyContent: 'center',
  alignItems:'center',
  height:'250px'
 }



class M_body extends PureComponent{

  state = {
    modal6: false,
    modal7: false,
    modal: false,
    images: []
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  

  m = () => {
    this.props.check && this.setState({images:this.props.imgUrls});
  }

  render(){
    return(
      <React.Fragment >
      <MDBContainer>
          <Mainheader
            font = {font}
            imgUrl = {this.props.imgUrl}
            mode={this.props.mode}
          /> 
          <Albumbody
            font = {font}
            check = {this.props.check}
            imgUrls = {this.props.imgUrls}
            onClick = {this.props.onClick}
            imageNameCheck = {this.props.imageNameCheck}
            setData = {this.props.setData}
            imageName = {this.props.imageName}
            defautImgeHave={this.props.defautImgeHave}
            mode={this.props.mode}
            defautImge={this.props.defautImge}
            image={this.props.image}
            imageNameShow={this.props.imageNameShow}
          />
           <Talkbody
             font = {font}
             mode={this.props.mode}
             modal8 ={this.state.modal8}
             toggle = {this.toggle(8)}
             modal ={modal}
           />
           <Mainbody
            font = {font}
            mode={this.props.mode}
            layout={layout}
            round={round}
            toggle={this.props.toggle}
            modal={this.props.modal}
            setData={this.props.setData}
            show={this.props.show}
            list1={list1}
            onClick={this.props.onClick}
            setting={this.props.setting}
            onChangePhoto={this.props.onChangePhoto}
            file={this.props.file}
            imageData={this.props.imageData}
            setRef={this.props.setRef}
            imageName={this.props.imageName}
            onChangeCamera={this.props.onChangeCamera}
            capture={this.props.capture}
            onClickRetake={this.props.onClickRetake}
           /> 
        </MDBContainer>
      </React.Fragment>

    )
  }
}
export default M_body;  