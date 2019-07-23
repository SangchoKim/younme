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
        title:"기념일",
        back:"Back",
        update:"Update",
        backUrl:"./main",
        updateUrl:"./memorialUpdate",
        icon:{main:"american-sign-language-interpreting fa-3x", update:"pen-nib fa-2x", back:"arrow-circle-left fa-2x"}
      },
      MemorialBody:{
        firstSpace:{firstSpaceDay:"1200일",firstSpaceLeftDay:"89일 남음"},
        secondSpace:{secondSpaceDay:"1300일",secondSpaceLeftDay:"189일 남음"},
        thirdSpace:{thirdSpaceDay:"1400일",thirdSpaceLeftDay:"289일 남음"},
        forthSpace:{forthSpaceDay:"4일",forthSpaceLeftDay:"351일 남음"},
        firstDay:{firstDay:"처음 만난날",SeeingDay:"1111일 째"},
        guy:{name:"김철수 생일", birthday:"76일 째",},
        girl:{name:"이영희 생일", birthday:"57일 째",}
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
