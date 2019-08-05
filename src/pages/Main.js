import React,{Component} from 'react';
import MainNav from '../components/M_nav'  
import MainHeader from '../components/M_header'
import MainBody from '../components/M_body'
import { connect } from 'react-redux';
import * as MainAction from '../store/modules/M_header';
import defautImge from '../img/main_default.jpg';
import base64Img  from 'base64-img';
class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      MainBody:{
        imgUrl:defautImge
      },
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
    fetch("/api/main",{method: "get",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                        })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.result===1){
      const _name = res.user_info.name;
      const _oppenetName = res.user_info.birthday;
      const _relDay = res.user_info.relDay;
      const userBasicInfo = {name:_name,oppenetName:_oppenetName,relDay:_relDay};
      const { _setUserHeadInfo } = this.props;
      _setUserHeadInfo(userBasicInfo);
      let _imgUrl = res.user_info.img;
      if(!_imgUrl) _imgUrl=defautImge; 
      else _imgUrl = '/uploads/'+ _imgUrl;
      this.setState({
        MainBody:{
          imgUrl:_imgUrl
        }
      })

      
      console.log("name:",_name);
      console.log("oppenetName:",_oppenetName);
      console.log("relDay:",_relDay);
      
    }else{
        console.log(res.error);
      }
     });
  }

  


  _onClick = (e) => {
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
          console.log('디폴트')
    }
  }

  _onChangePhoto = (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      realfile:e.target.files[0]
    })
  }

  _onChangeCamera = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
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
      const formData = new FormData();
      let file = this.state.realfile;
      formData.append('myImage',file);
      console.log('Album 구역입니다.');
      console.log("file:",file);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }; 
      if(!file){
        alert('사진을 선택해주세요');
        return;
      }
      fetch("/api/setbackground", {method: "POST",
                          config,
                          body: formData 
                          })
      .then(res => res.json())
      .then((res) =>{
        console.log(res);
        if(res.result===1){
        console.log('set background');
        const img = res.img;
        this.setState({
          MainBody:{
            imgUrl:'/uploads/'+img
          }
        })
        this.setState({modal:!this.state.modal});
        }else{
          console.log('set background err');
        }
      });
    }else{
      console.log('Camera 구역입니다.');
      const _imageName = this.state.camera.myImage;
      const _imageData = this.state.camera.imageData;
      const decodedData = atob(_imageData);
      // base64Image를 decode 해야하는 과정 필요 
      // const img = base64Img.imgSync(_imageData,'./server/etc',_imageName);
      // const myBlob = new Blob([_imageData], {type : 'image/jpeg'});
      const formData = new FormData();
      console.log("myImage",_imageData);
      console.log("imageName",_imageName);
      formData.append('myImage',decodedData);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      fetch("/api/setbackground", {method: "POST",
                          config,
                          body: formData 
                          })
      .then(res => res.json())
      .then((res) =>{
        console.log(res);
        if(res.result===1){
        console.log('set background');
        const img = res.img;
        this.setState({
          MainBody:{
            imgUrl:'/uploads/'+ img
          }
        })
        this.setState({modal:!this.state.modal});
        }else{
          console.log('set background err');
        }
      }); 
    }
  }

  _setRef = (webcam) => {
    this.webcam = webcam;
  };

  _capture = (e) => {
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
    return(
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
        imgUrl={this.state.MainBody.imgUrl}
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
        
      />
    </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  name: state.Mheader.User_info.userName,
  oppenetName: state.Mheader.User_info.oppenetName,
  relDay: state.Mheader.User_info.relDay
});

const mapDispatchToProps = (dispatch) => ({
  _setUserHeadInfo: (userBasicInfo) => dispatch(MainAction.setUserHeadInfo(userBasicInfo))

})
export default connect(mapStateToProps, mapDispatchToProps) (Main);


