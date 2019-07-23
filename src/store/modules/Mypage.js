// 액션 타입을 정의해줍니다.
const STATEMESSAGE = 'counter/STATEMESSAGE';
const GENDER = 'counter/GENDER';
const BIRTHDAY = 'counter/BIRTHDAT';

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const popUpstateMessage = () => ({ type: STATEMESSAGE });
export const popUpGender = () => ({ type: GENDER });
export const popUpBirthday = () => ({ type: BIRTHDAY });

// 모듈의 초기 상태를 정의합니다.
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
      mode:{stateMessage:'stateMessage',gender:'gender',birthday:'birthday'}
  };

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
    // console.log(action.type);
    switch(action.type) {    
      case STATEMESSAGE:
        return { Title:{
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
        mode:'stateMessage'};
      case GENDER:
        return { Title:{
          title:"마이페이지",
          back:"Back",
          update:"Setting",
          backUrl:"./main",
          updateUrl:"./#",
          icon:{main:"address-card fa-3x", update:"cog fa-2x", back:"arrow-circle-left fa-2x"},
          mode:{show:"mypage"}
        },
        modalHeder:{title1:'상태 메시지',title2:'생일',title3:'성별'},
        modalFooter:{confirm:'확인'},
        mode:'gender'};
        case BIRTHDAY:
            return { Title:{
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
            mode:'birthday'};
      default:
        return state // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
