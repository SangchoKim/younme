import React, { PureComponent } from 'react';
import {MDBBtn,MDBModalBody,MDBModal,MDBRow,MDBCol,MDBModalHeader,MDBModalFooter} from 'mdbreact';
import SocketIo from 'socket.io-client';
import Peer from 'simple-peer';
const prod = process.env.NODE_ENV === 'production';
let socket_Chat = null;
if(prod){
   socket_Chat = SocketIo.connect(`http://13.125.221.14/videochat`);
}else{
  socket_Chat = SocketIo.connect(`http://localhost:5000/videochat`);
}

let client = {};
const video_container = {
    width: '500px',
    height: '380px',
    margin: '0px auto',
    border: '2px solid #645cff',
    position: 'relative',
    boxShadow: '1px 1px 11px #9e9e9e',
}

const my_video = {
  width: '200px',
  left: '10px',
  bottom: '10px',
  border: '6px solid #2195F3',
  position: 'absolute',
  borderRadius:'6px',
  zIndex:2
}

const user_video = {
  width: '100%',
  height: '100%',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}
class Talk_modal_Above extends PureComponent{
 
  
  state={
    stream: null,
  }

  componentDidMount(){
      // peer 초기화
      const InitPeer = (type) => {
        const stream = this.props.stream;
        let peer = new Peer({initiator:(type === 'init')?true:false,stream:stream, trickle:false});
    
        peer.on('stream', (stream) => {
          CreateVideo(stream);
        })
    
        peer.on('close', () => {
          peer.destroy();
        })
      return peer
      }

      // for peer of type init
      const MakePeer = () => {
        client.gotAnswer = false;
        let peer = InitPeer('init');
        peer.on('signal', (data) => {
          if(!client.gotAnswer){
            socket_Chat.emit('Offer', data);
          }
        })
        client.peer = peer;
      }

       // for peer of type not init
       const FrontAnswer = (offer) => {
          let peer = InitPeer('notInit');
          peer.on('signal', (data) => {
            socket_Chat.emit('Answer', data);
          })
          
          peer.signal(offer);
        }

        const SignalAnswer = async(answer) => {
          
          client.gotAnswer = true;
           let peer = await client.peer;
           await peer.signal(answer);
        }

        const CreateVideo = (stream) => {
          
            try {
              this.userVideo.srcObject = stream;
            } catch (e) {
              // this.myVideo.src = URL.createObjectURL(stream);
            }
            this.userVideo.play(); 
          
        }

        const SessionActive = () => {

        }

        socket_Chat.on('BackOffer',FrontAnswer);
        socket_Chat.on('BackAnswer',SignalAnswer);
        socket_Chat.on('SessionActive',SessionActive);
        socket_Chat.on('CreatePeer',MakePeer);
  }

 
  componentDidUpdate(){
    setTimeout(() => {
    if(this.props.stream!==null){
      
        const stream = this.props.stream;
      try {
        this.setState(prev=>({
          ...prev,
          stream:stream
        }))
        this.myVideo.srcObject = stream;
      } catch (e) {
        // this.myVideo.src = URL.createObjectURL(stream);
      }
      this.myVideo.play();  
    }
    }, 500);
  }
  
  

  _onVideoChat = (e) => {
    e.preventDefault();
    socket_Chat.emit('NewClient');
  } 

 

  
    render(){

        return(
            <React.Fragment>
                      <MDBModal size="lg" isOpen={this.props.modalIsOpen} toggle={this.props.modalTalk}>
                        <MDBModalHeader>
                          <h1>영상통화</h1>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <MDBRow>
                            <MDBCol md="3">

                            </MDBCol>
                            <MDBCol md="6" className="video-container" style={video_container}>
                                <video style={my_video} id="myVideo" className="my-video" ref={(refs) => {this.myVideo = refs;}}/>
                                <video style={user_video} className="user-video" ref={(ref) => {this.userVideo = ref;}}/>
                            </MDBCol>
                            <MDBCol md="3">

                            </MDBCol>
                          </MDBRow>
                        </MDBModalBody>    
                  <MDBModalFooter>
                    <MDBBtn color="info" onClick={this._onVideoChat}>연결</MDBBtn>
                    <MDBBtn color="secondary" onClick={this.props.modalTalk}>닫기</MDBBtn>
                </MDBModalFooter>
            </MDBModal>      
            </React.Fragment>
        )
    }


}




export default Talk_modal_Above;