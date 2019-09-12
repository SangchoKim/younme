import React, { PureComponent } from 'react';
import {MDBBtn,MDBIcon,MDBModalBody,MDBModal,MDBCard,MDBCol} from 'mdbreact';
import TalkModalPhoto from './TalkModalPhoto';
import TalkModalVideo from './TalkModalVideo';
import TalkModalCamera from './TalkModalCamera';
import TalkModalGif from './TalkModalGif';
import TalkModalVoice from './TalkModalVoice';
import TalkModalLoveLetter from './TalkModalLoveLetter';

class Talk_modal_bottom extends PureComponent{

  state = {
    isPhoto:false,
    isVideo:false,
    isCamera:false,
    isGif:false,
    isVoice:false,
    isLoveletter:false,
    isBack:false,
    isBegin:true,
  }

  _onClick = (e) => {
    switch(e.target.name){
      case 'photo': 
        this.setState({
          isPhoto:true,
          isVideo:false,
          isCamera:false,
          isGif:false,
          isVoice:false,
          isLoveletter:false,
          isBack:true,
          isBegin:false,
        });
        return console.log('photo');;
      case 'video':
          this.setState({
            isVideo:true,
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
          console.log('디폴트')
    }
  }

    render(){
      const {isBack,isPhoto,isVideo,isCamera,isGif,isVoice,isLoveletter,isBegin} = this.state;
        return(
            <React.Fragment>

                <MDBCol md="1" >
                <MDBBtn outline color="danger" onClick={this.props.toggle}><MDBIcon icon="plus-circle fa-lg" /></MDBBtn>
                <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle} fullHeight position="bottom">            
                        <MDBModalBody>
                          {isBegin&&
                            <MDBCard style={this.props.modal} className="text-center">
                            <MDBBtn color="cyan" name='photo' onClick={this._onClick} ><MDBIcon far icon="images fa-2x" /><br></br>사진</MDBBtn>
                            <MDBBtn color="cyan" name='video' onClick={this._onClick}><MDBIcon icon="video fa-2x" /> <br></br>동영상</MDBBtn>
                            <MDBBtn color="cyan" name='camera' onClick={this._onClick}><MDBIcon icon="camera-retro fa-2x" /> <br></br>카메라</MDBBtn>
                            <MDBBtn color="cyan" name='gif' onClick={this._onClick}><MDBIcon icon="grin-beam fa-2x" /> <br></br>움짤</MDBBtn>
                            <MDBBtn color="cyan" name='voice' onClick={this._onClick}><MDBIcon icon="microphone fa-2x" /> <br></br>음성</MDBBtn>
                            <MDBBtn color="cyan" name='loveletter' onClick={this._onClick}><MDBIcon icon="envelope-open fa-2x" /> <br></br>러브레터</MDBBtn>
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
                          {isVideo&&
                          <TalkModalVideo
                            onClick={this._onClick}
                          />
                          }
                          {isCamera&&
                          <TalkModalCamera
                            onClick={this._onClick}
                            sender = {this.props.sender}
                            getter = {this.props.getter}
                            toggle={this.props.toggle}
                            modal8={this.props.modal8}
                            modal={this.props.modal}
                            code={this.props.code}
                          />
                          }
                          {isGif&&
                          <TalkModalGif
                            onClick={this._onClick}
                          />
                          }
                          {isVoice&&
                          <TalkModalVoice
                            onClick={this._onClick}
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