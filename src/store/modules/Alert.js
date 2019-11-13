
import defaultImage from '../../img/default_alert.png';

export const ALERT_REQUEST = 'ALERT_REQUEST';
export const ALERT_FAIL = 'ALERT_FAIL';
export const ALERT_SUCCESS = 'ALERT_SUCCESS';

export const ALERT_OUT = 'MAIN_OUT';

export const getDataFromAlert = () => ({ type: ALERT_REQUEST, data:null });

export const alertOut = () => ({ type: ALERT_OUT,data:null});

const initialState = {
      Title:{
        title:"알림",
        back:"Back",
        update:"Setting",
        backUrl:"./main",
        updateUrl:"./#",
        icon:{main:"bell fa-3x", update:"cog fa-2x", back:"arrow-circle-left fa-2x"},
        mode:{show:"alert"}
      },
      Body:{
        alert:{State:"오직 둘만의 공간, You&ME에 오신 것을 환영합니다. 앞으로 두분의 활동 소식은 이곳에서 모아보세요.",
              icon:"bell" 
              } 
      },
      log:[],
      alertState:'isReady',
      comment:'',
      errMessage:null,
      result:null,
      defaultImage: defaultImage,
  };

export default function reducer(state = initialState, action) {

    switch(action.type) {
      case ALERT_REQUEST:
        return {
          ...state,
          comment:'데이터를 수집중입니다.',
          alertState:'isReady',
        };

      case ALERT_SUCCESS:
        if(action.data.results!==1)
        alert('등록된 알림이 없습니다.');
        return (
          {...state,
            result:action.data.results,
            log: action.data.sendData,
            alertState:'isSuccess'
          }
        );
        case ALERT_FAIL:
        return {
          ...state,
          alertState:'isFail',
          errMessage:action.error,
        };
        case ALERT_OUT:
        return {
          ...state,
          alertState:'isReady',
        };
      default:
        return state; 
    }
  }
