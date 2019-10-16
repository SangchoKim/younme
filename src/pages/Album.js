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
    console.log(_img,_order);
    fetch(`/api/album?image=${_img}&order=${_order}`,{method: "get",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                        })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.result===1){
      let _img = res.img;
      if(_img){
        console.log("img:",_img);
        const r = _img.map((_img)=>{return _img.src});
        console.log("src:", r);
        const setAlbumInfo = {image:r};
        console.log("setAlbumInfo:",setAlbumInfo);
        this.setState({image: r});
        this.pre(setAlbumInfo)
        .then((r)=>{
          console.log("rL",r); 
          this.setState({
            afters:true
          })
        })
      }else{
        this.setState({
          defautImgeHave:true
        })
        console.log("공유앨범 없음 -> default 이미지 출력");
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
          console.log('디폴트')
    }
  }

  _imageDelete = async ({target}) => {
    console.log("targetID", target.id);
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
    console.log("targetID", target.id);
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
      formData.append('myImages',file);
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
      fetch("/api/setalbum", {method: "POST",
                          config,
                          body: formData
                          })
      .then(res => res.json())
      .then((res) =>{
        console.log(res);
        if(res.result===1){
        console.log('set sharedAlbum');
        let _img = res.img;
          if(_img){
            console.log("img:",_img);
            const r = _img.map((_img)=>{return _img.src});
            console.log("src:", r);
            const setAlbumInfo = {image:r};
            console.log("setAlbumInfo:",setAlbumInfo);
            this.pre(setAlbumInfo)
          .then((r)=>{
            console.log("rL",r); 
            this.setState({
              afters:true
            })
          })
          }else{
            this.setState({
              defautImgeHave:true
            })
          console.log("공유앨범 없음 -> default 이미지 출력");
        }
        this.setState({modal8:!this.state.modal8});
        }else if(res.result===5){
          alert('공유앨범이 아직 없습니다.');
        }else{
          alert('공유앨범 에러 발생');
        }
      });
    }else if(this.state.setting ==='camera'){
      console.log('Camera 구역입니다.');
      const _imageName = this.state.camera.myImage;
      const _imageData = this.state.camera.imageData;
      const myBlob = imageEncodeToBase64(_imageData,'image/jpeg');
      let formData = new FormData();
      console.log("myImage",_imageData);
      console.log("imageName",_imageName);
      formData.append('myImages',myBlob,_imageName);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      fetch("/api/setalbum", {method: "POST",
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
    }else if(this.state.setting ==='modify'){
      console.log('앨범 수정 구역입니다.');
      console.log('modifyImgVal',document.getElementById('data').value);
      const _modifyImgVal = document.getElementById('data').value;
      const myBlob = imageEncodeToBase64(_modifyImgVal,'image/jpeg');
      let id = this.state.imageName;
      id = id.split('/');
      console.log("targetID", id);
      let data = new FormData();
      data.append('myImage', myBlob, id[2]);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      fetch("/api/updatealbum", {method: "POST",
                          config,
                          body: data 
                          })
      .then(res => res.json())
      .then((res) =>{                  
        console.log(res);
        if(res.result===1){
        console.log('modifyied sharedAlbum');
        let _img = res.img;
          if(_img){
            console.log("img:",_img);
            const r = _img.map((_img)=>{return _img.src});
            console.log("src:", r);
            const setAlbumInfo = {image:r};
            console.log("setAlbumInfo:",setAlbumInfo);
            this.pre(setAlbumInfo)
          .then((r)=>{
            console.log("rL",r); 
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
          console.log("공유앨범 없음 -> default 이미지 출력");
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
    console.log(this.state.imageNameCheck);
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
    
// props 값으로 넣어 줄 상태를 정의해줍니다.
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

// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchToProps = (dispatch) => ({
  _setAlbum: (setAlbumInfo) => dispatch(AlbumAction.setAlbum(setAlbumInfo))
})
    
export default connect(mapStateToProps, mapDispatchToProps) (Album);



