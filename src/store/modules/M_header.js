// 액션 타입을 정의해줍니다.
const SETUSERHEADINFO = 'SETUSERHEADINFO';
const DECREMENT = 'counter/DECREMENT';

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const setUserHeadInfo = (userBasicInfo) => ({ type: SETUSERHEADINFO, payload:userBasicInfo});
export const decrement = () => ({ type: DECREMENT });

// 모듈의 초기 상태를 정의합니다.
const initialState = {
  User_info:{
    userName:'김철수',
    oppenetName:'이영희',
    relDay:'null'
  }, 
  };

  const _setUserHeadInfo = (_name,_oppenetName,_relDay) => {
    return{
      User_info:{
        userName:_name,
        oppenetName:_oppenetName,
        relDay:_relDay
      }, 
  };
  }

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
    switch(action.type) {
      case SETUSERHEADINFO:
        const _name = action.payload.name;
        const _oppenetName = action.payload.oppenetName;
        const _relDay = action.payload.relDay;
        console.log(action.payload);
        return  _setUserHeadInfo(_name, _oppenetName, _relDay);
      case DECREMENT:
        return { number: state.number - 1 };
      default:
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
