import React, { PureComponent } from 'react';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBInput,MDBListGroup,MDBListGroupItem} from 'mdbreact';
import uuids from 'uuid/v1';
import moment from 'moment';
import SocketIo from 'socket.io-client'; // 소켓
import { async } from 'q';
const socket = SocketIo.connect('http://localhost:5000');
const uid = uuids();

const layout = {
  disPlay: "flex",
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems:'center',
  padding:'2em'
 } 

 const round = {
  backgroundColor: "black",
  borderRadius: "10%",
  padding:3
 }

class Talk_body extends PureComponent{
  _isMounted = false;
    state={
      message:'',
      log:[],
      user:{
        name:'',
        email:'',
        intro:'',
        oppentEmail:'',
        oppentName:'',
      }

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

    _approchServer = async() =>{
      console.log("_approchServer");


      fetch('/io/inituser',{method: "GET",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            }
                          })
      .then((res) => res.json())
      .then((res) =>{
        console.log('User 정보 확인', res.results);
        if(res.results===1){
          const {name,email,intro,oppentEmail,oppentName} = res.user_info;
          
         this.setState(prev=>({
            ...prev,
            user:{
              name:name,
              email:email,
              intro:intro,
              oppentEmail:oppentEmail,
              oppentName:oppentName,
            }
          }));
        }else if(res.result===5){
          alert('User 정보 Read 실패');
        }
      })
    }
    

    componentDidMount(){
         this._isMounted = true;
          // 처음에 Talk 페이지에 접근했을 때 
          this._approchServer();

          // 소켓 IO 페이지에 접근했을때 
          const {log} = this.state;
          socket.on('message', (data) => { // 클라이언트에서 newScoreToServer 이벤트 요청 시
            console.log('messageFromServer',data,log);
            const add = {uuid:data.uid,
                          comment:data.message,
                          sender:data.sender,
                          reg_time:data.reg_time,
                          };
            log.unshift(add);
            if(this._isMounted){
              this.setState((prev)=>({
                ...prev,
                senderlog:log,
              }))
            }
          })
        
    }

    
    componentWillUnmount() {
      this._isMounted = false;
    }
    

    _onClick = async() => {
      const {message,log} = this.state;
      const {name,email,oppentEmail} = this.state.user;
      console.log('_onClick_setMessage',message);
      const add = 
        {uuid:uid,
         comment:message,
         sender:name,
         reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")
        };
        log.unshift(add);
      this.setState((prev)=>({
        ...prev,
        sendlog:log
      }))
      await socket.emit('isConnecting',{
        _userInfo:{
          sender:email,
        }
      });
      await socket.emit('message',{
        _message:{
                  uuid:uid,
                  comment:message,
                  getter:oppentEmail,
                  reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")
                  }
      });
      this.setState({message:''});
    }

    render(){
      const {message,log} = this.state;
      console.log("TalkLog:",log);
      const {name,email,oppentEmail,intro,oppentName} = this.state.user;
        return(
            <React.Fragment>
            {this.props.mode==="talk"&&
            // Talk body 부분 
            <MDBRow style={this.props.font}>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="10" >
                <MDBCard style={layout} className="light-blue lighten-3">
                    <MDBIcon far icon="grin-hearts fa-5x fa-spin" />
                    <MDBListGroup>
                      <MDBListGroupItem className="blue border-default" >
                        <span>{name}</span>  <MDBIcon icon="heart" />  <span>{oppentName}</span>
                      </MDBListGroupItem>
                    </MDBListGroup>
                    <MDBIcon far icon="grin-hearts fa-5x fa-spin" />
                </MDBCard>
                {/* <img src={this.props.imgUrl} alt="Logo" width="100%" height="" /> */}
                <MDBListGroup >
                {log&&
                  log.map(data => {
                    return(
                    <MDBListGroupItem  key={data.uuid+'_'+data.reg_time} className="text-right">
                          <MDBRow>
                            <MDBCol md="8"></MDBCol>
                            <MDBCol md="4" style={round} className="light-green">
                              <div className="text-left ml-2">
                                <p>{data.comment}</p>
                              </div>
                              <div style={{fontSize:10}} className="text-right mr-2">
                                <p>{moment(data.reg_time).format("YYYY-MM-DD, hh:mm a")}</p>
                              </div>
                            </MDBCol>
                          </MDBRow> 
                    </MDBListGroupItem>
                  )})
                }
                </MDBListGroup>
              </MDBCol>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="1" >
                <MDBBtn outline color="danger" onClick={this.props.toggle}><MDBIcon icon="plus-circle fa-lg" /></MDBBtn>
                <MDBModal isOpen={this.props.modal8} toggle={this.props.toggle} fullHeight position="bottom">            
                        <MDBModalBody>
                          <MDBCard style={this.props.modal} className="text-center">
                            <MDBBtn color="cyan"><MDBIcon far icon="images fa-2x" /><br></br>사진</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="video fa-2x" /> <br></br>동영상</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="camera-retro fa-2x" /> <br></br>카메라</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="grin-beam fa-2x" /> <br></br>움짤</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="microphone fa-2x" /> <br></br>음성</MDBBtn>
                            <MDBBtn color="cyan"><MDBIcon icon="envelope-open fa-2x" /> <br></br>러브레터</MDBBtn>
                          </MDBCard>
                        </MDBModalBody>
                      </MDBModal>
              </MDBCol>    
              <MDBCol md="8">
                <div className="ml-4">
                  <MDBInput 
                    input="text"
                    label="메세지를 입력해주세요"
                    group
                    validate
                    error="wrong"
                    success="right"
                    name ="message"
                    value = {message}
                    onChange = {this._onchange}
                  />
                </div>
              </MDBCol>
              <MDBCol>
                <MDBBtn outline color="light-blue" onClick={this._onClick}>전송</MDBBtn>
              </MDBCol>
            </MDBRow>
            }
            </React.Fragment>
        )
    }


}

export default Talk_body;