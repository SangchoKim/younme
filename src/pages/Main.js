import React,{PureComponent} from 'react';
import MainNav from '../components/M_nav'  
import MainHeader from '../components/M_header'
import MainBody from '../components/M_body'
import { connect } from 'react-redux';
import * as MainsAction from '../store/modules/Main';
import defautImge from '../img/main_default.jpg';
import {imageEncodeToBase64} from '../lib/imageEncoder'
import Loding from '../components/Loding';
class Main extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      MainBody:{
        imgUrl:defautImge
      },
      mode:"main",
      file: null,
      check: false,
      realfile: null,
      modal: false,
      setting: '',
      camera:{
        imageData: null,
        myImage: " ",
        saveImage: false
      }
    } 
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount = () => {
    const {mainGetDataRequest} = this.props;
    mainGetDataRequest();
  }

  // componentDidUpdate(){
  //   const {check, mainUpdateRelday,partnerRelday, inintRequest} = this.props;
  //   if(check==='DIF'){
  //     setTimeout(() => {
  //       if(window.confirm(`상대방이 입력한 처음만난 날은 ${partnerRelday} 입니다. 이대로 적용하시겠습니까?`)){
  //         const order = 'CHANGEMINE';
  //         mainUpdateRelday({partnerRelday,order});
  //       }else{
  //         const order = 'CHANGEPARTNERS';
  //         inintRequest();
  //         mainUpdateRelday({partnerRelday,order});
  //       }
  //     }, 5000);
      
  //   }
  // }

  componentWillUnmount(){
    const {mainOut} = this.props;
    mainOut();
  }

  _onClick = (e) => {
    e.preventDefault();
    switch(e.target.name){
      case 'album': 
        this.setState({
          check:true,
          setting:'album'
        });
        return console.log('album');;
      case 'camera':
          this.setState({
            check:true,
            setting:'camera'
          });
        return console.log('camera')
      case 'back':
          this.setState({
            check:false
          })
          return console.log('back');
        default:
          console.log('default')
    }
  }

  _onChangePhoto = (e) => {
    e.preventDefault();
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      realfile:e.target.files[0]
    })
  }

  _onChangeCamera = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      camera:{
        ...prevState.camera,
        [name] : value
        }
     }));
  }

  _setData = (e) => {
    e.preventDefault();
    if(this.state.setting ==='album'){
      const {mainUpdateAlbumRequest} = this.props;
      const formData = new FormData();
      let file = this.state.realfile;
      formData.append('myImage',file);
      if(!file){
        alert('사진을 선택해주세요');
        return;
      }
      mainUpdateAlbumRequest(formData);
      this.setState({modal:!this.state.modal});
      
    }else{
      const {myImage,imageData} = this.state.camera;
      const {mainUpdateCameraRequest} = this.props;
      if(!myImage){
        alert('사진의 제목을 입력해주세요');
        return;
      }
      if(!imageData){
        alert('사진을 찍어주세요');
        return;
      }
      const myBlob = imageEncodeToBase64(imageData,'image/jpeg');
      let formData = new FormData();
      formData.append('myImage',myBlob,myImage);
      mainUpdateCameraRequest(formData);
      this.setState({modal:!this.state.modal});
    }
  }

  _setRef = (webcam) => {
    this.webcam = webcam;
  };

  _capture = (e) => {
    e.preventDefault();
    const imageSrc = this.webcam.getScreenshot();
    this.setState(prevState => ({
      camera:{
        ...prevState.camera,
        imageData: imageSrc
        }
     }));
  };

  _onClickRetake = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      camera:{
        ...prevState.camera,
        imageData: null
        }
     }));
  }

  
  render(){
    
    const {mainState,result,reason} = this.props;
    return(
      <React.Fragment>
        {mainState==='isReady'&& 
          <Loding 
            comment={this.props.comment}
          />
        }
        
        {mainState==="isFail"&&
           <p>에러발생</p>
        }
        {mainState==='isSuccess'&& 
          <React.Fragment>
            <MainNav 
              history={this.props.history}
              location={this.props.location}
            />
            <MainHeader 
              userName={this.props.name}
              oppenetName={this.props.oppenetName}
              relDay={this.props.relDay}
            />
            <MainBody 
              imgUrl={this.props.image}
              onClick={this._onClick}
              file={this.state.file}
              show={this.state.check}
              setting={this.state.setting}
              onChangePhoto={this._onChangePhoto}
              setData={this._setData}
              toggle={this.toggle}
              modal={this.state.modal}
              setRef={this._setRef}
              onChangeCamera={this._onChangeCamera}
              onClickRetake={this._onClickRetake}
              imageName={this.state.camera.myImage}
              imageData={this.state.camera.imageData}
              saveImage={this.state.camera.saveImage}
              capture={this._capture}
              mode={this.state.mode}
            />
          </React.Fragment>
        }
    </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
    mainState: state.Main.mainState,
    name: state.Main.User_info.userName,
    oppenetName: state.Main.User_info.oppenetName,
    relDay: state.Main.User_info.relDay,
    partnerRelday: state.Main.User_info.partnerRelday,
    image: state.Main.User_info.image,
    comment: state.Main.comment,
    check: state.Main.check,
});

const mapDispatchToProps = (dispatch) => ({
  mainGetDataRequest: () => dispatch(MainsAction.mainGetDataRequest()),
  mainUpdateAlbumRequest: (file) => dispatch(MainsAction.mainUpdateAlbumRequest(file)),
  mainUpdateCameraRequest: (file) => dispatch(MainsAction.mainUpdateCameraRequest(file)),
  inintRequest: () => dispatch(MainsAction.inintRequest()),
  mainUpdateRelday: (data) => dispatch(MainsAction.mainUpdateRelday(data)),
  mainOut: () => dispatch(MainsAction.mainOut()),
})
export default connect(mapStateToProps, mapDispatchToProps) (Main);


