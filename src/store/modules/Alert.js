
import defaultImage from '../../img/default_alert.png';

export const ALERT_REQUEST = 'ALERT_REQUEST';
export const ALERT_FAIL = 'ALERT_FAIL';
export const ALERT_SUCCESS = 'ALERT_SUCCESS';

export const ALERT_OUT = 'MAIN_OUT';
// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const getDataFromAlert = () => ({ type: ALERT_REQUEST, data:null });

export const alertOut = () => ({ type: ALERT_OUT,data:null});

// 모듈의 초기 상태를 정의합니다.
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

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
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
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
