export const TALK_REQUEST = 'TALK_REQUEST';
export const TALK_FAIL = 'TALK_FAIL';
export const TALK_SUCCESS = 'TALK_SUCCESS';

export const TALK_OUTS = 'TALK_OUTS';

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
      case TALK_OUTS:
        return {
          ...state,
          talkState:'isReady',
        };
      default:
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
