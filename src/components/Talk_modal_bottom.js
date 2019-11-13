import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon,MDBModalBody,MDBModal,MDBCard,MDBCol} from 'mdbreact';
import TalkModalPhoto from './TalkModalPhoto';
import TalkModalVideo from './TalkModalVideo';
import TalkModalCamera from './TalkModalCamera';
import TalkModalGif from './TalkModalGif';
import TalkModalVoice from './TalkModalVoice';
import TalkModalLoveLetter from './TalkModalLoveLetter';
import TalkModalAlbum from './TalkModalAlbum';

class Talk_modal_bottom extends PureComponent{

  state = {
    isPhoto:false,
    isAlbum:false,
    isVideo:false,
    isCamera:false,
    isGif:false,
    isVoice:false,
    isLoveletter:false,
    isBack:false,
    isBegin:true,
    image:[],
  }

  _onClick = (e) => {
    switch(e.target.name){
      case 'photo': 
        this.setState({
          isPhoto:true,
          isAlbum:false,
          isVideo:false,
          isCamera:false,
          isGif:false,
          isVoice:false,
          isLoveletter:false,
          isBack:true,
          isBegin:false,
        });
        return console.log('photo');
      case 'album': 
        this.setState({
          isPhoto:false,
          isAlbum:true,
          isVideo:false,
          isCamera:false,
          isGif:false,
          isVoice:false,
          isLoveletter:false,
          isBack:true,
          isBegin:false,
        });
        this._setAlbume();
        return console.log('album');;
      case 'video':
          this.setState({
            isVideo:true,
            isAlbum:false,
            isPhoto:false,
            isCamera:false,
            isGif:false,
            isVoice:false,
            isLoveletter:false,
            isBack:true,
            isBegin:false,
          });
        return console.log('video')
      case 'camera':
          this.setState({
            isCamera:true,
            isAlbum:false,
            isPhoto:false,
            isVideo:false,
            isGif:false,
            isVoice:false,
            isLoveletter:false,
            isBack:true,
            isBegin:false,
          })
          return console.log('camera');
       case 'gif':
          this.setState({
            isGif:true,
            isAlbum:false,
            isPhoto:false,
            isVideo:false,
            isCamera:false,
            isVoice:false,
            isLoveletter:false,
            isBack:true,
            isBegin:false,
          })
          return console.log('gif');
      case 'voice':
          this.setState({
            isVoice:true,
            isAlbum:false,
            isPhoto:false,
            isVideo:false,
            isCamera:false,
            isGif:false,
            isLoveletter:false,
            isBack:true,
            isBegin:false,
          })
          return console.log('voice');
      case 'loveletter':
          this.setState({
            isLoveletter:true,
            isAlbum:false,
            isPhoto:false,
            isVideo:false,
            isCamera:false,
            isGif:false,
            isVoice:false,
            isBack:true,
            isBegin:false,
          })
          return console.log('loveletter');
      case 'back':
          this.setState({
            isBack:false,
            isAlbum:false,
            isPhoto:false,
            isVideo:false,
            isCamera:false,
            isGif:false,
            isVoice:false,
            isLoveletter:false,
            isBegin:true,
          })
          return console.log('back');
      default:
          console.log('default')
    }
  }

  _setAlbume = async() => {
    fetch(`/api/album?image=null&order=null`,{method: "get",
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
        this.setState(prev=>({
          ...prev,
          image: r
        }));
      }else{
      }
      
    }else if(res.result===5){
        alert('공유앨범이 아직 없습니다.');
      }else{
        alert('오류발생.');
      }
     });
  }

    render(){
      const {isAlbum,isPhoto,isVideo,isCamera,isGif,isVoice,isLoveletter,isBegin} = this.state;
        return(
            <React.Fragment>

                <MDBCol md="1" >
                <MDBBtn outline color="danger" onClick={this.props.toggle}><MDBIcon icon="plus-circle fa-lg" /></MDBBtn>
                <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle} fullHeight position="bottom">            
                        <MDBModalBody>
                          {isBegin&&
                            <MDBCard style={this.props.modal} className="text-center">
                            <MDBBtn color="cyan" name='photo' onClick={this._onClick} ><MDBIcon far icon="file-image fa-2x" /><br></br>사진</MDBBtn>
                            <MDBBtn color="cyan" name='album' onClick={this._onClick} ><MDBIcon far icon="images fa-2x" /><br></br>공유앨범</MDBBtn>
                            <MDBBtn color="cyan" name='video' onClick={this._onClick}><MDBIcon icon="video fa-2x" /> <br></br>동영상</MDBBtn>
                            <MDBBtn color="cyan" name='camera' onClick={this._onClick}><MDBIcon icon="camera-retro fa-2x" /> <br></br>카메라</MDBBtn>
                            <MDBBtn color="cyan" name='gif' onClick={this._onClick}><MDBIcon icon="grin-beam fa-2x" /> <br></br>이모티콘</MDBBtn>
                            <MDBBtn color="cyan" name='voice' onClick={this._onClick}><MDBIcon icon="microphone fa-2x" /> <br></br>음성녹음</MDBBtn>
                            {/* <MDBBtn color="cyan" name='loveletter' onClick={this._onClick}><MDBIcon icon="envelope-open fa-2x" /> <br></br>러브레터</MDBBtn> */}
                          </MDBCard>
                          }
                          {isPhoto&&
                          <TalkModalPhoto
                            onClick={this._onClick}
                            setData={this.props.setData}
                            onChangePhoto={this.props.onChangePhoto}
                            file={this.props.file}
                          />
                          }
                          {isAlbum&&
                          <TalkModalAlbum
                            onClick={this._onClick}
                            setAlbumData={this.props.setAlbumData}
                            onAlbumChoice={this.props.onAlbumChoice}
                            imgUrls = {this.state.image}
                            albumFile={this.props.albumFile}
                            isChoice={this.props.isChoice}
                          />
                          }
                          {isVideo&&
                          <TalkModalVideo
                            onClick={this._onClick}
                            onChangeVideo={this.props.onChangeVideo}
                            setVideoData={this.props.setVideoData}
                            videoFile={this.props.videoFile}
                            videoFileisReady={this.props.videoFileisReady}
                          />
                          }
                          {isCamera&&
                          <TalkModalCamera
                            onClick={this._onClick}
                            setRef={this.props.setRef}
                            modal={this.props.modal}
                            onChangeCamera={this.props.onChangeCamera}
                            imageName={this.props.imageName}
                            capture={this.props.capture}
                            imageData={this.props.imageData}
                            isCapture={this.props.isCapture}
                            isReady={this.props.isReady}
                            setCameraData={this.props.setCameraData}
                            onClickRetake={this.props.onClickRetake}
                          />
                          }
                          {isGif&&
                          <TalkModalGif
                            onClick={this._onClick}
                            setGifData={this.props.setGifData}
                          />
                          }
                          {isVoice&&
                          <TalkModalVoice
                            onClick={this._onClick}
                            startRecording={this.props.startRecording}
                            stopRecording={this.props.stopRecording}
                            onStop={this.props.onStop}
                            onData={this.props.onData}
                            recordedBlob={this.props.recordedBlob}
                            record={this.props.record}
                            setRecordData={this.props.setRecordData}
                          />
                          }
                          {isLoveletter&&
                          <TalkModalLoveLetter
                            onClick={this._onClick}
                          />
                          }
                                             
                        </MDBModalBody>
                      </MDBModal>
              </MDBCol>
            </React.Fragment>
        )
    }
}

export default Talk_modal_bottom;