import SocketIo from 'socket.io-client'; // 소켓
const prod = process.env.NODE_ENV === 'production';
let socket_Chat = null;
if(prod){
   socket_Chat = SocketIo.connect(`http://54.180.150.138:80/chat`);
}else{
   socket_Chat = SocketIo.connect(`http://localhost:5000/chat`);
}

export const TALK_REQUEST = 'TALK_REQUEST';
export const TALK_FAIL = 'TALK_FAIL';
export const TALK_SUCCESS = 'TALK_SUCCESS';

export const SOCKET_ONMESSAGE = 'SOCKET_ONMESSAGE';
export const MESSAGE_REQUEST = 'MESSAGE_REQUEST';
export const MESSAGE_FAIL = 'MESSAGE_FAIL';
export const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';

export const SOCKET_ONPHOTO = 'SOCKET_ONPHOTO';
export const PHOTO_REQUEST = 'PHOTO_REQUEST';
export const PHOTO_FAIL = 'PHOTO_FAIL';
export const PHOTO_SUCCESS = 'PHOTO_SUCCESS';

export const SOCKET_ONCAMERA = 'SOCKET_ONCAMERA';
export const CAMERA_REQUEST = 'CAMERA_REQUEST';
export const CAMERA_FAIL = 'CAMERA_FAIL';
export const CAMERA_SUCCESS = 'CAMERA_SUCCESS';

export const SOCKET_ONGIF = 'SOCKET_ONGIF';
export const GIF_REQUEST = 'GIF_REQUEST';
export const GIF_FAIL = 'GIF_FAIL';
export const GIF_SUCCESS = 'GIF_SUCCESS';

export const SOCKET_ONVIDEO = 'SOCKET_ONVIDEO';
export const VIDEO_REQUEST = 'VIDEO_REQUEST';
export const VIDEO_FAIL = 'VIDEO_FAIL';
export const VIDEO_SUCCESS = 'VIDEO_SUCCESS';

export const SOCKET_ONALBUM = 'SOCKET_ONALBUM';
export const ALBUM_REQUEST = 'ALBUM_REQUEST';
export const ALBUM_FAIL = 'ALBUM_FAIL';
export const ALBUM_SUCCESS = 'ALBUM_SUCCESS';

export const SOCKET_ONRECORD = 'SOCKET_ONRECORD';
export const RECORD_REQUEST = 'RECORD_REQUEST';
export const RECORD_FAIL = 'RECORD_FAIL';
export const RECORD_SUCCESS = 'RECORD_SUCCESS';

export const TALK_OUTS = 'TALK_OUTS';

export const onMessage = (message) => ({ type: SOCKET_ONMESSAGE,data:message});
export const sendMessage = (data) => ({ type: MESSAGE_REQUEST,data:data});

export const onPhoto = (data) => ({ type: SOCKET_ONPHOTO,data:data});
export const sendPhoto = (data) => ({ type: PHOTO_REQUEST,data:data});

export const onCamera = (data) => ({ type: SOCKET_ONCAMERA,data:data});
export const sendCamera = (data) => ({ type: CAMERA_REQUEST,data:data});

export const onGif = (data) => ({ type: SOCKET_ONGIF,data:data});
export const sendGif = (data) => ({ type: GIF_REQUEST,data:data});

export const onVideo = (data) => ({ type: SOCKET_ONVIDEO,data:data});
export const sendVideo = (data) => ({ type: VIDEO_REQUEST,data:data});

export const onAlbum = (data) => ({ type: SOCKET_ONALBUM,data:data});
export const sendAlbum = (data) => ({ type: ALBUM_REQUEST,data:data});

export const onRecord = (data) => ({ type: SOCKET_ONRECORD,data:data});
export const sendRecord = (data) => ({ type: RECORD_REQUEST,data:data});

export const chatDataRequest = (limit) => ({ type: TALK_REQUEST,data:limit});
export const talkOut = () => ({ type: TALK_OUTS, data:null});

const initialState = {
    Title:{
      title:"",
      back:"Back",
      update:"Call",
      backUrl:"./main",
      updateUrl:"./#",
      icon:{main:"sms fa-3x", update:"phone fa-2x", back:"arrow-circle-left fa-2x",caretDown:"caret-down fa-lg"},
      mode:{show:"talk"}
    },
    Body:{
      imgUrl:"https://images.unsplash.com/photo-1526398977052-654221a252b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    user:{
          name:'',
          email:'',
          intro:'',
          oppentEmail:'',
          oppentName:'',
          _code:'',
          },
    log:[],
    length:null,
    num:null,
    talkState:'isReady',
    comment:'',
    errMessage:null,
  };

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
    switch(action.type) {
      case TALK_REQUEST:
        return {
          ...state,
          comment:'데이터 수집 중 입니다.',
          talkState:'isReady',
          num:action.data,
        };

      case TALK_SUCCESS:
        const {name,email,intro,oppentEmail,oppentName,_code} = action.data.user_info;
        socket_Chat.emit('joinRoom',_code,name);
        let _chat_info = null;
        let _length = null;
        if(action.data.chat_info){
          _chat_info = action.data.chat_info;
        }
        if(action.data.length){
          _length = action.data.length;
        }
        return (
          {...state,
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
            talkState:'isSuccess'
          }
        );
      case TALK_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };
      case SOCKET_ONMESSAGE:
        return {
          ...state,
          log:[...state.log, action.data],
        }; 
      case MESSAGE_REQUEST:
        return {
          ...state,
        };
      case MESSAGE_SUCCESS:
        return {
          ...state,
        };
      case MESSAGE_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };
       case SOCKET_ONPHOTO:
        return {
          ...state,
          log:[...state.log, action.data],
        }; 
      case PHOTO_REQUEST:
        return {
          ...state,
        };
      case PHOTO_SUCCESS:
        return {
          ...state,
        };
      case PHOTO_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };
      case SOCKET_ONCAMERA:
        return {
          ...state,
          log:[...state.log, action.data],
        }; 
      case CAMERA_REQUEST:
        return {
          ...state,
        };
      case CAMERA_SUCCESS:
        return {
          ...state,
        };
      case CAMERA_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };
      case SOCKET_ONGIF:
        return {
          ...state,
          log:[...state.log, action.data],
        }; 
      case GIF_REQUEST:
        return {
          ...state,
        };
      case GIF_SUCCESS:
        return {
          ...state,
        };
      case GIF_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };
      case SOCKET_ONVIDEO:
        return {
          ...state,
          log:[...state.log, action.data],
        }; 
      case VIDEO_REQUEST:
        return {
          ...state,
        };
      case VIDEO_SUCCESS:
        return {
          ...state,
        };
      case VIDEO_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };
      case SOCKET_ONALBUM:
        return {
          ...state,
          log:[...state.log, action.data],
        }; 
      case ALBUM_REQUEST:
        return {
          ...state,
        };
      case ALBUM_SUCCESS:
        return {
          ...state,
        };
      case ALBUM_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };
      case SOCKET_ONRECORD:
        return {
          ...state,
          log:[...state.log, action.data],
        }; 
      case RECORD_REQUEST:
        return {
          ...state,
        };
      case RECORD_SUCCESS:
        return {
          ...state,
        };
      case RECORD_FAIL:
        return {
          ...state,
          talkState:'isFail',
          errMessage:action.error,
        };                            
      case TALK_OUTS:
        return {
          ...state,
          talkState:'isReady',
        };
      default:
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
