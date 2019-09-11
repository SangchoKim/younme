import React, { PureComponent, createRef } from 'react';
import {MDBRow,MDBCol,MDBCard,MDBBtn,MDBIcon,MDBModal,MDBModalBody,MDBInput,MDBListGroup,MDBListGroupItem} from 'mdbreact';
import uuids from 'uuid/v1';
import moment from 'moment';
import SocketIo from 'socket.io-client'; // 소켓
import Talkmodalbottom from './Talk_modal_bottom'
const socket_Chat = SocketIo.connect('http://localhost:5000/chat');

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


  constructor(props){
    super(props)
    this.state={
      message:'',
      log:[],
      socket_id:'',
      user:{
        name:'',
        email:'',
        intro:'',
        oppentEmail:'',
        oppentName:'',
        _code:'',
      },
      num:10,
      length:null,
    }
    this.myRef = createRef();
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

    _approchServer = async(limit) =>{
      const logs = this.state.log;
      let lastId = null;
      console.log("limit",limit);
      if(logs.length>=1){
        lastId = logs[logs.length-1].cratedAt;
      };
      console.log("_approchServer");
      fetch(`/io/inituser?lastId=${lastId}&limit=${limit}`,{method: "GET",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            }
                          })
      .then((res) => res.json())
      .then((res) =>{
        console.log('User 정보 확인', res.chat_info);
        if(res.results===1){
          const {name,email,intro,oppentEmail,oppentName,_code} = res.user_info;
          let _chat_info = null;
          let _length = null;
          if(res.chat_info){
            _chat_info = res.chat_info;
          }
          if(res.length){
            _length = res.length;
          }
         this.setState(prev=>({
            ...prev,
            user:{
                  name:name,
                  email:email,
                  intro:intro,
                  oppentEmail:oppentEmail,
                  oppentName:oppentName,
                  _code:_code,
                  },
            log:_chat_info,
            length:_length,
          }));
          socket_Chat.emit("isConnecting",email);  
        }else if(res.result===5){
          alert('User 정보 Read 실패');
        }
      })
    }

    onScroll = () => {
      // 첫번쨰와 두번쨰 더하면 세번째 것이 된다. 
      // window.scrollY = 페이지의 가장 위쪽에 위치
      // document.documentElement.clientHeight = 페이지 위쪽부터 페이지 밑쪽까지
      // document.documentElement.scrollHeight = 페이지 가장 위쪽에서 가장 밑쪽까지
      console.log(parseInt(window.scrollY)+document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if(parseInt(window.scrollY) + parseInt(document.documentElement.clientHeight) === parseInt(document.documentElement.scrollHeight)-1){
        let {num,length} = this.state;
        if(length>=num){
          num = num + 10;
          this.setState((prev) => ({
            ...prev,
            num:num,
          }))
          console.log('제발',num,length);
          this._approchServer(num);
        }
        }
       
    };
    

    componentDidMount(){
      this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
      window.addEventListener('scroll', this.onScroll);
         this._isMounted = true;
          // 처음에 Talk 페이지에 접근했을 때 
          this._approchServer(10);
  
          socket_Chat.on('socket_id',(data) => {
            console.log('socket_id',data);

            if(this._isMounted){
              this.setState((prev)=>({
                ...prev,
                socket_id:data,
              }))
            }
          });

          // 소켓 IO 페이지에 접근했을때 
          const {log} = this.state;
          
          socket_Chat.on('message', (data) => { // 클라이언트에서 newScoreToServer 이벤트 요청 시
            console.log('messageFromServer',data,log);
            const add = { _id:data.uid,
                          comment:data.message,
                          sender:data.sender,
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
    componentWillUnmount() {
      this._isMounted = false;
      window.removeEventListener('scroll',this.onScroll);
    }
    

    _onClick = async(e) => {
      e.preventDefault();
      const {message,log} = this.state;
      const {name,email,oppentEmail,_code} = this.state.user;
      console.log('_onClick_setMessage',message);
      await socket_Chat.emit('code',_code);
      const _message={
                      _id:uid,
                      comment:message,
                      sender:email,
                      getter:oppentEmail,
                      cratedAt:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")
                      }

       fetch('/io/chat_info',{method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            },
                            body:JSON.stringify(_message)
                          })
      this.setState({message:''});
    }

    render(){
      const {message,log,socket_id} = this.state;
      console.log("TalkLog:",log);
      const {name,email,oppentEmail,intro,oppentName} = this.state.user;
        return(
            <React.Fragment>
            {this.props.mode==="talk"&&
            // Talk body 부분 
            <MDBRow style={this.props.font} ref={this.myRef}>
              <MDBCol md="1" >
              </MDBCol>
              <MDBCol md="10" >
                <MDBCard style={layout} className="light-blue lighten-3">
                    <MDBIcon far icon="grin-hearts fa-5x fa-spin" />
                    <MDBListGroup>
                      <MDBListGroupItem className="blue border-default" >
                        <span>{name}</span>  {socket_id?<MDBIcon icon="heart" style={{color:'#ff6b6b'}}/>:<MDBIcon icon="heart"/> }  <span>{oppentName}</span>
                      </MDBListGroupItem>
                    </MDBListGroup>
                    <MDBIcon far icon="grin-hearts fa-5x fa-spin" />
                </MDBCard>
                {/* <img src={this.props.imgUrl} alt="Logo" width="100%" height="" /> */}
                <MDBListGroup >
                {log&&
                  log.map(data => {
                    return(
                    data.sender===email? 
                    <MDBListGroupItem  key={data._id+'_'+data.cratedAt} className="text-right">
                          <MDBRow>
                            <MDBCol md="8"></MDBCol>
                            <MDBCol md="4" style={round} className="light-green">
                              <div style={{fontSize:15}} className="text-left m-2">
                                <p>{name}</p>
                              </div>
                              <div className="text-left ml-2">
                                <p>{data.comment}</p>
                              </div>
                              <div style={{fontSize:10}} className="text-right mr-2">
                                <p>{moment(data.cratedAt).format("YYYY-MM-DD, hh:mm a")}</p>
                              </div>
                            </MDBCol>
                          </MDBRow> 
                    </MDBListGroupItem>
                    :
                    <MDBListGroupItem  key={data._id+'_'+data.cratedAt} className="text-left">
                          <MDBRow>
                            <MDBCol md="4" style={round} className="light-blue">
                              <div style={{fontSize:15}} className="text-left m-2">
                                <p>{oppentName}</p>
                              </div>
                              <div className="text-left ml-2">
                                <p>{data.comment}</p>
                              </div>
                              <div style={{fontSize:10}} className="text-right mr-2">
                                <p>{moment(data.cratedAt).format("YYYY-MM-DD, hh:mm a")}</p>
                              </div>
                            </MDBCol>
                            <MDBCol md="8"></MDBCol>
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
                <Talkmodalbottom
                  toggle={this.props.toggle}
                  modal8={this.props.modal8}
                  modal={this.props.modal}
                  sender={email}
                  getter={oppentEmail}
                /> 
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