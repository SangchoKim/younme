import React, { PureComponent} from 'react';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBIcon,MDBInput,MDBListGroup,MDBListGroupItem} from 'mdbreact';
import uuids from 'uuid/v1';
import moment from 'moment';
import SocketIo from 'socket.io-client'; // 소켓
import Talkmodalbottom from './Talk_modal_bottom'
import {imageEncodeToBase64} from '../lib/imageEncoder'
import TalkBodyDataMap from './TalkBodyDataMap'
import * as TalkActions from '../store/modules/Talk';
import Loding from '../components/Loding';
import { connect } from 'react-redux';

const socket_Chat = SocketIo.connect(`http://localhost:5000/chat`);

const uid = uuids();

const layout = {
  disPlay: "flex",
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems:'center',
  padding:'2em'
 } 

class Talk_body extends PureComponent{
  _isMounted = false;
  constructor(props){
    super(props)
    this.state={
      message:'',
      socket_id:'',
      photo:{
        file: null,
        realfile: null,
      },
      album: {
        file: [],
        isChoice:false,
      },    
      video:{
        file: null,
        realfile: null,
        isReady:false,
      },
      camera:{
        isCapture:false,
        isReady:true,
        imageData: null,
        imageName:'',
      },
      voicerRecord:{
        record: false,
        recordedBlob: null,
      },
      modal8:false,
    }
  }

    toggle = nr => () => {
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }

    _onchange = async(e) => {
      e.preventDefault();
      const name = e.target.name;
      const val = e.target.value;
      console.log('_onchange_setMessage',name,val);

      await this.setState((pre)=>({
          ...pre,
          [name]: val
      }))
    }

    _approchServer = (limit) =>{
      const {chatDataRequest} = this.props;
      if( limit===10){
        document.documentElement.scrollTop = parseInt( document.documentElement.scrollHeight) - parseInt(document.documentElement.clientHeight);
        console.log( document.documentElement.scrollTop);
      } 
      chatDataRequest(limit);   
    }

    onScroll = () => {
      // 첫번쨰와 두번쨰 더하면 세번째 것이 된다. 
      // window.scrollY = 페이지의 가장 위쪽에 위치
      // document.documentElement.clientHeight = 페이지 위쪽부터 페이지 밑쪽까지
      // document.documentElement.scrollHeight = 페이지 가장 위쪽에서 가장 밑쪽까지
      console.log(parseInt(window.scrollY) , document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if(parseInt(window.scrollY)===0){
        let {num,length} = this.props;
        if(length>=num){
          num = num + 10;
          this._approchServer(num);
        }
        }
    };

    componentWillUnmount() {
      this._isMounted = false;
      window.removeEventListener('scroll',this.onScroll);
      document.documentElement.scrollTop = 0;
    }

  
    componentDidMount(){
        window.addEventListener('scroll', this.onScroll);
         this._isMounted = true;
          // 처음에 Talk 페이지에 접근했을 때 
          this._approchServer(10);
         
          socket_Chat.on('connect',()=>{
            console.log('client-Sokect 접속 됨'); 
         });

         socket_Chat.on('joinedRoom',(joinCode,name)=>{
          console.log(name+'님이' + joinCode +'방에 입장하셨습니다'); 
          if(joinCode){
            this.setState((prev)=>({
              ...prev,
              socket_id:name,
            }))
          }
        });
        
          
          // 소켓 IO 페이지에 접근했을때 
          const {log} = this.state;
         
         
          
          // 문자일때
          socket_Chat.on('message', (data) => { // 클라이언트에서 newScoreToServer 이벤트 요청 시
            console.log('messageFromServer',data);
            const add = { _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          gif:data.gif,
                          getter:data.getter,
                          cratedAt:data.reg_time,
                          };
            if(this._isMounted){
              this.setState((prev)=>({
                ...prev,
                log:[...this.state.log, add],
              }))
            }
          })

          // photo 일때 
          socket_Chat.on('photo', (data) => { // 서버로부터 photo 파일 들어옴
            console.log('PhotoFromServer',data);
            const add = {  _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          gif:data.gif,
                          getter:data.getter,
                          cratedAt:data.reg_time,
                        };
            if(this._isMounted){
              this.setState((prev)=>({
                ...prev,
                log:[...this.state.log, add],
              }))
            }        
          })  

          // camera 일때 
          socket_Chat.on('camera', (data) => { // 서버로부터 photo 파일 들어옴
            console.log('CameraFromServer',data);
            const add = {  _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          gif:data.gif,
                          getter:data.getter,
                          cratedAt:data.reg_time,
                        };
                        
            if(this._isMounted){
              this.setState((prev)=>({
                ...prev,
                log:[...this.state.log, add],
              }))
            }        
          })
          
          // gif 일떄 
          socket_Chat.on('gif', (data) => { // 서버로부터 gif 파일 들어옴
            console.log('GifFromServer',data);
            const add = {  _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          gif:data.gif,
                          getter:data.getter,
                          cratedAt:data.reg_time,
                        };
                
            if(this._isMounted){       
              this.setState((prev)=>({
                ...prev,
                log:[...this.state.log, add],
              }))
            }        
          })

          // video 일때
          socket_Chat.on('video', (data) => { // 서버로부터 gif 파일 들어옴
            console.log('VideoFromServer',data);
            const add = {  _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          gif:data.gif,
                          getter:data.getter,
                          cratedAt:data.reg_time,
                        };
            if(this._isMounted){       
              this.setState((prev)=>({
                ...prev,
                log:[...this.state.log, add],
              }))
            }        
          })

          // album 일때
          socket_Chat.on('album', (data) => { // 서버로부터 gif 파일 들어옴
            console.log('AlbumFromServer',data);
            const add = {  _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          gif:data.gif,
                          getter:data.getter,
                          cratedAt:data.reg_time,
                        };
            if(this._isMounted){       
              this.setState((prev)=>({
                ...prev,
                log:[...this.state.log, add],
              }))
            }        
          })

           // voiceRecord 일때
           socket_Chat.on('voiceRecord', (data) => { // 서버로부터 gif 파일 들어옴
            console.log('voiceRecordFromServer',data);
            const add = {  _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          gif:data.gif,
                          getter:data.getter,
                          cratedAt:data.reg_time,
                        };
            if(this._isMounted){       
              this.setState((prev)=>({
                ...prev,
                log:[...this.state.log, add],
              }))
            }        
          })
    }
    
    

    _onClick = async(e) => {
      e.preventDefault();
      const {message,log} = this.state;
      const {name,email,oppentEmail,_code} = this.state.user;
      console.log('_onClick_setMessage',message);
      
      const _message={
                      _id:uid,
                      comment:message,
                      sender:email,
                      getter:oppentEmail,
                      cratedAt:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")
                      }
       await fetch('/io/chat_info',{method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            },
                            body:JSON.stringify(_message)
                          })
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
      })
      this.setState({message:''});
    }

    // TalkModalPhoto 구역입니다. 

    _onChangePhoto = (e) => {
      const file = e.target.files[0];
      this.setState(prev=>({
        ...prev,
        photo: {
          file: URL.createObjectURL(file),
          realfile:file,
        }    
      }));
    }

    _setData = async(e) => {
      e.preventDefault();
      const {name,email,oppentEmail,_code} = this.state.user;
      console.log('TalkModalPhoto 구역입니다.',_code);
      let file = this.state.photo.realfile;
      if(!file){
        alert('사진을 선택해주세요');
        return;
      }
      const formData = new FormData();
      formData.append('myImages',file);
      const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Accept': 'application/json'
        }
      };
       fetch(`/io/chat_photo?sender=${email}&getter=${oppentEmail}`, 
                          {method: "PATCH",
                          config,
                          body: formData
                          })
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        if(res.results===1)
        this.setState(prev => ({
          ...prev,
          modal8:!this.state.modal8
        }));
      })
    }

    // TalkModalCamera 구역입니다.

    _setRef = (webcam) => {
      this.webcam = webcam;
    };

    _onChangeCamera = (e) => {
      e.preventDefault();
      const {name,value} = e.target;
      console.log(name,value);
      this.setState(prev => ({
        ...prev,
        camera:{
          ...prev.camera,
          [name] : value
          }
       }));
    }

    _capture = (e) => {
      e.preventDefault();
      const imageSrc = this.webcam.getScreenshot();
      this.setState( prev => ({
        ...prev,
        camera:{
          ...prev.camera,
          imageData: imageSrc,
          isCapture:true,
          isReady:false,
          }
       }));
    };

    _setCameraData = async(e) => {
      e.preventDefault();
      console.log('TalkModalCamera 구역입니다.');
      const {imageData,imageName} = this.state.camera;
      const {email,oppentEmail,_code} = this.state.user;
      const myBlob = imageEncodeToBase64(imageData,'image/jpeg');
      let formData = new FormData();
      formData.append('myImages',myBlob,imageName);
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      fetch(`/io/chat_camera?sender=${email}&getter=${oppentEmail}`, 
                          {method: "PATCH",
                          config,
                          body: formData 
                          })
      .then(res => res.json())
      .then(res => {
        console.log("TalkModalCamera완료",res.results);
        if(res.results===1)
        this.setState(prev => ({
          ...prev,
          modal8:!this.state.modal8
        }));
      })
    }

     _onClickRetake = (e) => {
        e.preventDefault();
        this.setState(prev => ({
          ...prev,
          camera:{
            ...prev.camera,
            imageData: null,
            imageName:'',
            isCapture:false,
            isReady:true,
            }
        }));
      }

      // TalkModalGif 구역

      _setGifData = async(e) => {
        e.preventDefault();
        const {email,oppentEmail,_code} = this.state.user;
        const gifKey = {
                        gifKey:e.target.name,
                        sender:email,
                        getter:oppentEmail,
                        };
        console.log('TalkModalGif 구역입니다.',_code,gifKey);
        fetch('/io/chat_gif',{method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            },
                            body:JSON.stringify(gifKey)
                          })
        .then(res => res.json())
        .then(res => {
          console.log(res.results);
          if(res.results===1)
          this.setState(prev => ({
            ...prev,
            modal8:!this.state.modal8
          }));
        })
      }

      // TalkModalVideo 구역

      _onChangeVideo = (e) => {
        const file = e.target.files[0];
        this.setState(prev=>({
          ...prev,
          video: {
            file: URL.createObjectURL(file),
            realfile:file,
            isReady:true,
          }    
        }));
      }
  
      _setVideoData = async(e) => {
        e.preventDefault();
        const {email,oppentEmail,_code} = this.state.user;
        console.log('TalkModalVideo 구역입니다.',_code);
        let file = this.state.video.realfile;
        if(!file){
          alert('동영상을 선택해주세요');
          return;
        }
        const formData = new FormData();
        formData.append('videoFile',file);
        const config = {
          headers: {
              'content-type': 'multipart/form-data',
              'Accept': 'application/json'
          }
        };
         fetch(`/io/chat_video?sender=${email}&getter=${oppentEmail}`, 
                            {method: "PATCH",
                            config,
                            body: formData
                            })
        .then(res => res.json())
        .then(res => {
          console.log(res.results);
          if(res.results===1)
          this.setState(prev => ({
            ...prev,
            modal8:!this.state.modal8
          }));
        })
      }

      // TalkModalAlbum 구역
      _onAlbumChoice = (e) => {
        const files = this.state.album.file;
        const albumImagePath = e.target.id; // imagePath
        const albumImageName = e.target.name; // imageName
        if(files.length>=1){
          for (const imgPath of files) {

            // 이미 공유사진을 선택했을 때
            if(imgPath.imageName===albumImageName){
              alert('이미 선택된 사진입니다.');
              return;
            }

            // 공유사진을 취소할때 
            if(albumImageName==="unselected"){
              const reArray = files.filter(data=>{return(data.imagePath!==albumImagePath)})
              this.setState(prev=>({
                ...prev,
                album: {
                  file: reArray,
                  isChoice:true,
                }
              }));
              return; 
            }
          }
        }
        this.setState(prev=>({
          ...prev,
          album: {
            file: [{imagePath:albumImagePath, imageName:albumImageName}, ...this.state.album.file],
            isChoice:true,
          }    
        }));
      }

      _setAlbumData = async(e) => {
        e.preventDefault();
        const {email,oppentEmail,_code} = this.state.user;
        const imagePath = this.state.album.file; // imagePath, imageName
        console.log('TalkModalAlbum 구역입니다.',_code,imagePath);
        if(!imagePath){
          alert('공유사진을 선택해주세요');
          return;
        }
        const AlbumKey = {
                          imageInfo:imagePath, //  배열
                          getter:oppentEmail,
                          sender:email,
                        };
        await fetch(`/io/chat_album`, 
                            {method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            },
                            body: JSON.stringify(AlbumKey)
                            })
        .then(res => res.json())
        .then(res => {
          console.log(res.results);
          if(res.results===1)
          this.setState(prev => ({
            ...prev,
            modal8:!this.state.modal8
          }));
        })
      }
      
      // TalkModalRecordVoice 구역입니다. 

      _startRecording = () => {
        this.setState(prev=>({
          ...prev,
          voicerRecord:{
            ...prev.voicerRecord,
            record: true,
          }
        }));
      }
     
      _stopRecording = () => {
        this.setState(prev=>({
          ...prev,
          voicerRecord:{
            ...prev.voicerRecord,
            record: false,
          }
        }));
      }
    
      _onData = (recordedBlob) => {
        console.log('chunk of real-time data is: ', recordedBlob);
        this.setState(prev=> ({
          ...prev,
          voicerRecord:{
            ...prev.voicerRecord,
            recordedBlob:recordedBlob
          }
        }));
      }
     
      _onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        this.setState(prev=> ({
          ...prev,
          voicerRecord:{
            ...prev.voicerRecord,
            recordedBlob:recordedBlob
          }
        }));
      }

      _setRecordData = async(e) => {
        e.preventDefault();
        const {email,oppentEmail,_code} = this.state.user;
        let file = this.state.voicerRecord.recordedBlob;
        console.log('TalkModalRecord 구역입니다.',file,_code);
        if(!file){
          alert('음성녹음을 해주세요');
          return;
        }
        const formData = new FormData();
        const filename = file.blobURL.split('/');
        formData.append('voiceRecord',file.blob,filename[3]);
        const config = {
          headers: {
              'content-type': 'multipart/form-data',
              'Accept': 'application/json'
          }
        };
         fetch(`/io/chat_voicerecord?sender=${email}&getter=${oppentEmail}`, 
                            {method: "PATCH",
                            config,
                            body: formData
                            })
        .then(res => res.json())
        .then(res => {
          console.log(res.results);
          if(res.results===1)
          this.setState(prev => ({
            ...prev,
            modal8:!this.state.modal8
          }));
        })
      }

    render(){
      const {message,socket_id} = this.state;
      const {talkState,length,log,name,email,oppentName} = this.props;
        return(
            <React.Fragment>
              {talkState==='isReady'&& this.props.mode==="talk" &&
              <Loding 
                comment={this.props.comment}
              />
              }
              {talkState==="isFail"&&
                <p>에러발생</p>
              }
              
            {this.props.mode==="talk"&& talkState==='isSuccess'&&
            // Talk body 부분 
            <MDBRow style={this.props.font} ref={(refs)=>{this.box = refs}}>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="10" >
                <MDBCard style={layout} className="light-blue lighten-3">
                    <MDBIcon far icon="grin-hearts fa-5x fa-spin" />
                    <MDBListGroup>
                      <MDBListGroupItem className="blue border-default" >
                       {socket_id===name?<span className="text-danger">{name}</span>:<span>{name}</span>}
                       <MDBIcon icon="heart"/>  
                       {socket_id===oppentName?<span className="text-danger">{name}</span>:<span>{oppentName}</span>}
                      </MDBListGroupItem>
                    </MDBListGroup>
                    <MDBIcon far icon="grin-hearts fa-5x fa-spin" />
                </MDBCard>
                <MDBListGroup >
                <TalkBodyDataMap
                 length={length}
                 log={log} 
                 email={email}
                 name = {name}
                 oppentName = {oppentName}
                  />
                </MDBListGroup>
              </MDBCol>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="1" >
              </MDBCol>
                <Talkmodalbottom
                  toggle={this.toggle(8)}
                  modal8={this.state.modal8}
                  modal={this.props.modal}
                  // photo
                  setData={this._setData}
                  onChangePhoto={this._onChangePhoto}
                  file={this.state.photo.file}
                  // camera
                  setRef={this._setRef}
                  onChangeCamera={this._onChangeCamera}
                  imageName={this.state.camera.imageName}
                  imageData={this.state.camera.imageData}
                  isCapture={this.state.camera.isCapture}
                  isReady={this.state.camera.isReady}
                  capture={this._capture}
                  setCameraData={this._setCameraData}
                  onClickRetake={this._onClickRetake}
                  // gif
                  setGifData={this._setGifData}
                  // video
                  onChangeVideo={this._onChangeVideo}
                  setVideoData={this._setVideoData}
                  videoFile={this.state.video.file}
                  videoFileisReady={this.state.video.isReady}
                  //album
                  onAlbumChoice={this._onAlbumChoice}
                  setAlbumData={this._setAlbumData}
                  isChoice={this.state.album.isChoice}
                  albumFile={this.state.album.file}
                  //record
                  startRecording={this._startRecording}
                  stopRecording={this._stopRecording}
                  onStop={this._onStop}
                  onData={this._onData}
                  setRecordData={this._setRecordData}
                  recordedBlob={this.state.voicerRecord.recordedBlob}
                  record={this.state.voicerRecord.record}
                  
                /> 
              <MDBCol md="8">
                <div className="ml-4">
                  <MDBInput 
                    input="text"
                    label="메세지를 입력해주세요"
                    name ="message"
                    value = {message}
                    onChange = {this._onchange}
                  />
                </div>
              </MDBCol>
              <MDBCol>
                <MDBBtn  outline color="light-blue" onClick={this._onClick}>전송</MDBBtn>
              </MDBCol>
            </MDBRow>
            }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
  num: state.Talk.num,
  talkState: state.Talk.talkState,
  comment: state.Talk.comment,
  errMessage: state.Talk.errMessage,
  name: state.Talk.user.name,
  email: state.Talk.user.email,
  intro: state.Talk.user.intro,
  oppentEmail: state.Talk.user.oppentEmail,
  oppentName: state.Talk.user.oppentName,
  _code: state.Talk.user._code,
  log: state.Talk.log,
  length: state.Talk.length,
});


const mapDispatchToProps = (dispatch) => ({
  chatDataRequest: (limit) => dispatch(TalkActions.chatDataRequest(limit)),
  talkOut: () => dispatch(TalkActions.talkOut()),
})

export default connect(mapStateToProps, mapDispatchToProps) (Talk_body);