
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
        firstSpace:{firstSpaceDay:"1200일",firstSpaceLeftDay:"89일 남음"},
        secondSpace:{secondSpaceDay:"1300일",secondSpaceLeftDay:"189일 남음"},
        thirdSpace:{thirdSpaceDay:"1400일",thirdSpaceLeftDay:"289일 남음"},
        forthSpace:{forthSpaceDay:"4년",forthSpaceLeftDay:"351일 남음"},
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
                comment:'로딩중입니다...',
                mainState:'isReady',
            };
    
          case MEMORIALDAY_SUCCESS:
            const {name,oppentname,birth,oppenetbirthday,
                    relDay} = action.data.user_info;
             const {first,second,third,forth,
                    } = action.data.user_info.calDay;        
            return (
              {...state,
                MemorialBody:{
                  firstSpace:{...state.MemorialBody.firstSpace ,firstSpaceLeftDay:`${first}일 남음`},
                  secondSpace:{...state.MemorialBody.secondSpace, secondSpaceLeftDay:`${second}일 남음`},
                  thirdSpace:{...state.MemorialBody.thirdSpace, thirdSpaceLeftDay:`${third}일 남음`},
                  forthSpace:{...state.MemorialBody.forthSpace, forthSpaceLeftDay:`${forth}일 남음`},
                  firstDay:{...state.MemorialBody.firstDay ,SeeingDay:`${relDay}일 째`},
                  guy:{name:`${name} 생일`, birthday:`${birth}일`},
                  girl:{name:`${oppentname} 생일`, birthday:`${oppenetbirthday}일`,}
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
