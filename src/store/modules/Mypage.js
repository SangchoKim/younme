
const STATEMESSAGE = 'counter/STATEMESSAGE';
const GENDER = 'counter/GENDER';
const BIRTHDAY = 'counter/BIRTHDAT';
const MOVEPAGE = 'counter/onMoveToPage';

export const MYPAGE_REQUEST = 'MYPAGE_REQUEST';
export const MYPAGE_FAIL = 'MYPAGE_FAIL';
export const MYPAGE_SUCCESS = 'MYPAGE_SUCCESS';

export const MYPAGE_INTRO_REQUEST = 'MYPAGE_INTRO_REQUEST';
export const MYPAGE_INTRO_FAIL = 'MYPAGE_INTRO_FAIL';
export const MYPAGE_INTRO_SUCCESS = 'MYPAGE_INTRO_SUCCESS';

export const MYPAGE_BIRTHDAY_REQUEST = 'MYPAGE_BIRTHDAY_REQUEST';
export const MYPAGE_BIRTHDAY_FAIL = 'MYPAGE_BIRTHDAY_FAIL';
export const MYPAGE_BIRTHDAY_SUCCESS = 'MYPAGE_BIRTHDAY_SUCCESS';

export const MYPAGE_GENDER_REQUEST = 'MYPAGE_GENDER_REQUEST';
export const MYPAGE_GENDER_FAIL = 'MYPAGE_GENDER_FAIL';
export const MYPAGE_GENDER_SUCCESS = 'MYPAGE_GENDER_SUCCESS';


export const MYPAGE_OUT = 'MYPAGE_OUT';

export const mypageRequest = () => ({ type: MYPAGE_REQUEST,data:null});
export const mypageIntroRequest = (intro) => ({ type: MYPAGE_INTRO_REQUEST, data:intro});
export const mypageBirtdayRequest = (day) => ({ type: MYPAGE_BIRTHDAY_REQUEST, data:day});
export const mypageGenderRequest = (gender) => ({ type: MYPAGE_GENDER_REQUEST, data:gender});

export const mypageout = () => ({ type: MYPAGE_OUT,payload:null});

export const popUpstateMessage = (_email,_name,_birthday,_gender) => ({ type: STATEMESSAGE, payload:{_email,_name,_birthday,_gender } });
export const popUpGender = (_email,_name,_birthday,_gender) => ({ type: GENDER ,payload:{_email,_name,_birthday,_gender }});
export const popUpBirthday = (_email,_name,_birthday,_gender) => ({ type: BIRTHDAY,payload:{_email,_name,_birthday,_gender } });

const initialState = {
      Title:{
        title:"마이페이지",
        back:"Back",
        update:"Setting",
        backUrl:"./main",
        updateUrl:"./#",
        icon:{main:"address-card fa-3x", update:"cog fa-2x", back:"arrow-circle-left fa-2x"},
        mode:{show:"mypage"}
      },
      modalHeder:{title1:'상태 메시지',title2:'생일',title3:'성별'},
      modalBody:{comment1:'상태메시지를 입력해주세요'},
      modalFooter:{confirm:'확인'},
      user_info:{email:'',name:'',birthday:'',gender:'',oppentEmail:''},
      mode:{stateMessage:'stateMessage',gender:'gender',birthday:'birthday'},
      mypageState:'isReady',
  };

  
export default function reducer(state = initialState, action) {
    switch(action.type) {
      case MYPAGE_REQUEST:
        return state;

      case MYPAGE_SUCCESS:
        let {email,name,birthday,gender,intro,oppentEmail} = action.data;
        if(intro==='0'){
          intro = '상태메시지를 입력해주세요';
        }
        return Object.assign({},state,{
        user_info:{
            email:email,
            name:name,
            birthday:birthday,
            gender:gender,
            intro:intro,
            oppentEmail:oppentEmail
        },  
        mypageState:'isSuccess'});

      case MYPAGE_FAIL:
        return Object.assign({},state,{
        mypageState:'isFail'});

      case MYPAGE_INTRO_REQUEST:
         return state;

      case MYPAGE_INTRO_SUCCESS:
         return Object.assign({},state,{
          user_info:{
              ...state.user_info,
              intro:action.data,
          },  
          mypageState:'isSuccess'});

      case MYPAGE_INTRO_FAIL:
         return Object.assign({},state,{
          mypageState:'isFail'});
          
      case MYPAGE_BIRTHDAY_REQUEST:
          return state;
  
      case MYPAGE_BIRTHDAY_SUCCESS:
        return Object.assign({},state,{
          user_info:{
              ...state.user_info,
              birthday:action.data,
          },  
          mypageState:'isSuccess'});

      case MYPAGE_BIRTHDAY_FAIL:
        return Object.assign({},state,{
          mypageState:'isFail'});
          
      case MYPAGE_GENDER_REQUEST:
          return state;
  
      case MYPAGE_GENDER_SUCCESS:
        return Object.assign({},state,{
          user_info:{
              ...state.user_info,
              gender:action.data,
          },  
          mypageState:'isSuccess'});

      case MYPAGE_GENDER_FAIL:
        return Object.assign({},state,{
          mypageState:'isFail'});     

      case MYPAGE_OUT:
        return Object.assign({},state,{
          mypageState:'isReady'}); 

      case STATEMESSAGE:
        return Object.assign({},state,{
        modalHeder:{title1:'상태 메시지',title2:'생일',title3:'성별'},
        modalBody:{comment1:'상태메시지를 입력해주세요'},
        modalFooter:{confirm:'확인'},
        mode:'stateMessage'});
      case GENDER:
        return Object.assign({},state,{ 
        modalHeder:{title1:'상태 메시지',title2:'생일',title3:'성별'},
        modalFooter:{confirm:'확인'},
        mode:'gender'});
        case BIRTHDAY:
            return Object.assign({},state,{
            modalHeder:{title1:'상태 메시지',title2:'생일',title3:'성별'},
            modalBody:{comment1:'상태메시지를 입력해주세요'},
            modalFooter:{confirm:'확인'},
            mode:'birthday'}); 
      default:
        return state // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
