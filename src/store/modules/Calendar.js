
// 액션 타입을 정의해줍니다.
const SETCALENDARDATA = 'SETCALENDARDATA';
const SETCALENDARTIME = 'SETCALENDARTIME';
const SETSUBMEMO = 'SETSUBMEMO';
const SETCALENDARREAD = 'SETCALENDARREAD';
const DELETECALENDAR = 'DELETECALENDAR';

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const setCalendarData = (startDate,endDate) => ({ type: SETCALENDARDATA, payload:{startDate:startDate,endDate:endDate}});
export const setCalendarTime = (name, val) => ({ type: SETCALENDARTIME, payload:{name:name,val:val}});
export const setSubMemo = (sub,memo) => ({ type: SETSUBMEMO,payload:{sub:sub,memo:memo}});
export const setCalendarRead = (data) => ({ type: SETCALENDARREAD, payload:data});
export const deleteCalendar = (_id) => ({ type: DELETECALENDAR, payload:_id});

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
      sub:'',
      memo:'',
      order:'',
      data:[],
      _id:null,
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
        case SETSUBMEMO:
            console.log(SETSUBMEMO,state);
          return {
            ...state,
            sub: action.payload.sub,
            memo: action.payload.memo,
          };
        case SETCALENDARREAD:
            console.log(SETCALENDARREAD,action.payload);
        return {
            ...state,
            data: action.payload, 
          };
        case DELETECALENDAR:
            console.log(DELETECALENDAR,action.payload);
        return {
            ...state,
            _id:action.payload,
            order:"DELETE", 
          };
      default:
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
