
// 액션 타입을 정의해줍니다.
const SETCALENDARDATA = 'SETCALENDARDATA';
const SETCALENDARTIME = 'SETCALENDARTIME';
const SUBMITDATA = 'SUBMITDATA';
const SETCALENDARREAD = 'SETCALENDARREAD';

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const setCalendarData = (startDate,endDate) => ({ type: SETCALENDARDATA, payload:{startDate:startDate,endDate:endDate}});
export const setCalendarTime = (name, val) => ({ type: SETCALENDARTIME, payload:{name:name,val:val}});
export const submitData = (sub,memo) => ({ type: SUBMITDATA,payload:{sub:sub,memo:memo}});
export const setCalendarRead = (data) => ({ type: SETCALENDARREAD, payload:data});

// 모듈의 초기 상태를 정의합니다.
const initialState = {
      Title:{
        title:"캘린더",
        back:"Back",
        update:"Add",
        backUrl:"./main",
        updateUrl:"#",
        icon:{main:"calendar-check fa-3x", update:"plus fa-2x", back:"arrow-circle-left fa-2x"},
        mode:{show:"calendar"}
      },
      startDate:null,
      endDate:null,
      startTime:null,
      endTime:null,
      order:null, 
      sub:'',
      memo:'',
      data:[],
  };

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
    switch(action.type) {
      case SETCALENDARDATA:
        console.log(SETCALENDARDATA);
        return {
              ...state,
              startDate:action.payload.startDate,
              endDate:action.payload.endDate,
        };
      case SETCALENDARTIME:
          console.log(SETCALENDARTIME);
        return {
          ...state,
          [action.payload.name]:action.payload.val,
        };
        case SUBMITDATA:
            console.log(SUBMITDATA,state);
          return {
            ...state,
            order:"SUBMIT", 
            sub: action.payload.sub,
            memo: action.payload.memo,
          };
        case SETCALENDARREAD:
            console.log(SETCALENDARREAD,action.payload);
        return {
            ...state,
            order:null, 
            data: action.payload, 
          };
      default:
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
