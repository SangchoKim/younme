import color from "@material-ui/core/colors/amber";

export const MEMORIALDAY_REQUEST = 'MEMORIALDAY_REQUEST';
export const MEMORIALDAY_FAIL = 'MEMORIALDAY_FAIL';
export const MEMORIALDAY_SUCCESS = 'MEMORIALDAY_SUCCESS';

export const MEMORIALDAY_OUT = 'MEMORIALDAY_OUT';

export const getUserMemorialDay = () => ({ type: MEMORIALDAY_REQUEST, data:null});
export const memorialOut = () => ({ type: MEMORIALDAY_OUT,data:null});

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
        firstSpace:{firstSpaceDay:"",firstSpaceLeftDay:"89일 남음"},
        secondSpace:{secondSpaceDay:"",secondSpaceLeftDay:"189일 남음"},
        thirdSpace:{thirdSpaceDay:"",thirdSpaceLeftDay:"289일 남음"},
        forthSpace:{forthSpaceDay:"",forthSpaceLeftDay:"351일 남음"},
        firstDay:{firstDay:"처음 만난날",SeeingDay:"1111일 째"},
        guy:{name:"김철수 생일", birthday:"76일 째",},
        girl:{name:"이영희 생일", birthday:"57일 째",}
      },
      mainState:'isReady',
      comment:'',
      errMessage:null,
  };

export default function reducer(state = initialState, action) {
   
    switch(action.type) {
        
        case MEMORIALDAY_REQUEST:
            return {
                ...state,
                comment:'데이터를 수집중입니다....',
                mainState:'isReady',
            };
    
          case MEMORIALDAY_SUCCESS:
            const {name,oppentname,birth,oppenetbirthday,relDay} = action.data.user_info;
            const {first} = action.data.user_info.calDay;

            return (
              {...state,
                MemorialBody:{
                  firstSpace:{firstSpaceDay:`${first} 일` ,firstSpaceLeftDay:`${first-relDay}일 남음`},
                  secondSpace:{secondSpaceDay:`${first+500} 일`, secondSpaceLeftDay:`${(first+500)-relDay}일 남음`},
                  thirdSpace:{thirdSpaceDay:`${first+(500*2)} 일`, thirdSpaceLeftDay:`${(first+(500*2))-relDay}일 남음`},
                  forthSpace:{forthSpaceDay:`${first+(500*3)} 일`, forthSpaceLeftDay:`${(first+(500*3))-relDay}일 남음`},
                  firstDay:{...state.MemorialBody.firstDay ,SeeingDay:`${relDay}`},
                  guy:{name:`${name} 생일`, birthday:`${birth}`},
                  girl:{name:`${oppentname} 생일`, birthday:`${oppenetbirthday}`,}
                },
                mainState:'isSuccess'
              }
            );
    
          case MEMORIALDAY_FAIL:
            return {
              ...state,
              mainState:'isFail',
              errMessage:action.error,
            };

          case MEMORIALDAY_OUT:
              return {
                ...state,
                mainState:'isReady',
              }; 
      default:
        return state; 
    }
  }
