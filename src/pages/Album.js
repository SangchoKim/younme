import React,{PureComponent} from 'react';
import Titile from '../components/Titile'
import Body from '../components/M_body'
import { connect } from 'react-redux';
import defautImge from '../img/default_album.png'
import * as AlbumAction from '../store/modules/Album'
// import ImageEditor from '@toast-ui/react-image-editor'
import {imageEncodeToBase64} from '../lib/imageEncoder'



class Album extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      MainBody:{
        imgUrl:defautImge,
        defautImgeHave:false
      },
      imageNameShow:false,
      imageNameSet:null,
      imageNameCheck:false,
      imageName:null,
      image: null,
      collapse: false,
      isWideEnough: false,
      afters: false,
      checked: false,
      modal6: false,
      modal7: false,
      modal8: false,
      modal: false,
      switch1: true,
      switch2: false,
      file: null,
      check: false,
      realfile: null,
      setting: '',
      camera:{
        imageData: null,
        myImage: " ",
        saveImage: false
      }
    } 
  }
  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  

  componentDidMount(){
    this._approchServer();
  };

  _approchServer = async(img,order) => {
    const _img = img;
    const _order = order;
    fetch(`/api/album?image=${_img}&order=${_order}`,{method: "get",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                        })
    .then(res => res.json())
    .then(res => {
      if(res.result===1){
      let _img = res.img;
      if(_img){
        const r = _img.map((_img)=>{return _img.src});
        const setAlbumInfo = {image:r};
        this.setState({image: r});
        this.pre(setAlbumInfo)
        .then((r)=>{
          this.setState({
            afters:true
          })
        })
      }else{
        this.setState({
          defautImgeHave:true
        })
      }
      
    }else if(res.result===5){
        alert('공유앨범이 아직 없습니다.');
      }else{
        alert('오류발생.');
      }
     });
  }

  pre = async (setAlbumInfo) =>{
    return new Promise((resolve,reject)=>{
      resolve(this.props._setAlbum(setAlbumInfo));
    })
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
      case 'update':
        this._imageNameSet(e)
        .then((r)=>{
          if(r===1)
          return this._imageShow();
        })
          return console.log('update');
      case 'delete':
          this._imageDelete(e);
          return console.log('delete');
      default:
          console.log('default')
    }
  }

  _imageDelete = async ({target}) => {
    let id = target.id;
    const order = "DELETE"
    try{
      await window.confirm('정말로 삭제 하시겠습니까?')&&
      await this._approchServer(id,order);
     
    }catch(err){
      console.error("err:",err);
    }
  }

  _imageShow = async () => {
    await this.setState({
      imageNameCheck: !this.state.imageNameCheck,
      setting:'modify',
      
    })  
  }
  _imageNameSet = async ({target}) => {
    const id = target.id;
    try{
    await this.setState({
      imageName:id,
      imageNameShow: !this.state.imageNameShow,
      afters:true,
    })
    // first = await this._imageEditor();
    return 1;
  }catch(err){
    console.error("err:",err);
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
      formData.append('myImages',file);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      }; 
      if(!file){
        alert('사진을 선택해주세요');
        return;
      }
      fetch("/api/setalbum", {method: "POST",
                          config,
                          body: formData
                          })
      .then(res => res.json())
      .then((res) =>{
        if(res.result===1){
        let _img = res.img;
          if(_img){
            const r = _img.map((_img)=>{return _img.src});
            const setAlbumInfo = {image:r};
            this.pre(setAlbumInfo)
          .then((r)=>{
            this.setState({
              afters:true
            })
          })
          }else{
            this.setState({
              defautImgeHave:true
            })
        }
        this.setState({modal8:!this.state.modal8});
        }else if(res.result===5){
          alert('공유앨범이 아직 없습니다.');
        }else{
          alert('공유앨범 에러 발생');
        }
      });
    }else if(this.state.setting ==='camera'){
      const _imageName = this.state.camera.myImage;
      const _imageData = this.state.camera.imageData;
      if(!_imageName){
        alert('사진의 제목을 입력해주세요');
        return;
      }
      if(!_imageData){
        alert('사진을 찍어주세요');
        return;
      }
      const myBlob = imageEncodeToBase64(_imageData,'image/jpeg');
      let formData = new FormData();
      formData.append('myImages',myBlob,_imageName);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      fetch(`/api/setalbum?`, {method: "POST",
                          config,
                          body: formData 
                          })
      .then(res => res.json())
      .then((res) =>{
        if(res.result===1){
        const img = res.img;
        this.setState({
          MainBody:{
            imgUrl:'/uploads/'+ img
          }
        })
        this.setState({modal:!this.state.modal});
        }else{
        }
      }); 
    }else if(this.state.setting ==='modify'){
      const _modifyImgVal = document.getElementById('data').value;
      const myBlob = imageEncodeToBase64(_modifyImgVal,'image/jpeg');
      let id = this.state.imageName;
      let data = new FormData();
      data.append('myImage', myBlob, id);
      // const config = {
      //   headers: {
      //       'content-type': 'multipart/form-data'
      //   }
      // };
      fetch(`/api/updatealbum?id=${id}`, {method: "PATCH",
                          // config,
                          body: data 
                          })
      .then(res => res.json())
      .then((res) =>{                  
        if(res.result===1){
        let _img = res.img;
          if(_img){
            const r = _img.map((_img)=>{return _img.src});
            const setAlbumInfo = {image:r};
            this.pre(setAlbumInfo)
          .then((r)=>{
            this.setState({
              afters:true,
              defautImgeHave:false,
              imageNameShow:false,
              imageNameCheck:false
            })
          })
          }else{
            this.setState({
              defautImgeHave:true
            })
        }
        }else if(res.result===5){
          alert('공유앨범이 아직 없습니다.');
        }else{
          alert('공유앨범 에러 발생');
        } 
      })
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

  _setAlbumArray = () => {
   const _imgUrl = this.props.imgUrl;
   _imgUrl.map((_imgUrl,i) => {
    return _imgUrl
   }) 
  }

  _imageEditor = async () => {
  
  }

  
  render(){
    return(
      <React.Fragment>  
        <Titile 
          title={this.props.title}
          back={this.props.back}
          update={this.props.update}
          backUrl={this.props.backUrl}
          updateUrl={this.props.updateUrl}
          mainIcon={this.props.mainIcon}
          rightIcon={this.props.rightIcon}
          backIcon={this.props.backIcon}
          mode={this.props.mode}
          onClick={this._onClick}
          file={this.state.file}
          show={this.state.check}
          setting={this.state.setting}
          onChangePhoto={this._onChangePhoto}
          setData={this._setData}
          setRef={this._setRef}
          toggle={this.toggle}
          modal8={this.state.modal8}
          modal={this.state.modal}
          onChangeCamera={this._onChangeCamera}
          onClickRetake={this._onClickRetake}
          imageName={this.state.camera.myImage}
          imageData={this.state.camera.imageData}
          saveImage={this.state.camera.saveImage}
          capture={this._capture}
          alt = {this.state.MainBody.imgUrl}
        />
        <Body
           setData={this._setData}
           check={this.state.afters} 
           mode={this.props.mode}
           imgUrls={this.props.imgUrl}
           defautImge={this.state.MainBody.imgUrl}
           defautImgeHave={this.state.MainBody.defautImgeHave}
           image={this.state.image}
           onClick={this._onClick}
           imageName={this.state.imageName}
           imageNameSet={this.state.imageNameSet}
           imageNameCheck={this.state.imageNameCheck}
           imageNameShow ={this.state.imageNameShow}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  title: state.Album.Title.title,
  back: state.Album.Title.back,
  update: state.Album.Title.update,  
  backUrl: state.Album.Title.backUrl,
  updateUrl: state.Album.Title.updateUrl,
  mainIcon: state.Album.Title.icon.main,
  rightIcon: state.Album.Title.icon.update,
  backIcon: state.Album.Title.icon.back,
  mode: state.Album.Title.mode.show,
  imgUrl: state.Album.Body.imgUrl,
});


const mapDispatchToProps = (dispatch) => ({
  _setAlbum: (setAlbumInfo) => dispatch(AlbumAction.setAlbum(setAlbumInfo))
})
    
export default connect(mapStateToProps, mapDispatchToProps) (Album);



