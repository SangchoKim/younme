// 액션 타입을 정의해줍니다.
export const MAIN_REQUEST = 'MAIN_REQUEST';
export const MAIN_FAIL = 'MAIN_FAIL';
export const MAIN_SUCCESS = 'MAIN_SUCCESS';

export const mainRequest = (userInfo) => ({ type: MAIN_REQUEST,data:userInfo});

// 모듈의 초기 상태를 정의합니다.
const initialState = {
      mainState:'isReady',
      errMessage:null,
      result:'',
  };

  
// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
  
    switch(action.type) {
      case MAIN_REQUEST:
        return state;

      case MAIN_SUCCESS:
        return (
          {...state,
            result:action.data.result,
            mainState:'isSuccess'
          }
        );

      case MAIN_FAIL:
        
        return {
          ...state,
          mainState:'isFail',
          errMessage:action.error,
        };
      default:
        return state 
    }
  }
