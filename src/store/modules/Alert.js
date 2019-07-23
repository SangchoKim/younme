// 액션 타입을 정의해줍니다.
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

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
      }
  };

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
    switch(action.type) {
      case INCREMENT:
        return { number: state.number + 1 };
      case DECREMENT:
        return { number: state.number - 1 };
      default:
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
