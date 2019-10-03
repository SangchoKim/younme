
const SETCALENDARDATA = 'SETCALENDARDATA';
const SETCALENDARTIME = 'SETCALENDARTIME';
const SETSUBMEMO = 'SETSUBMEMO';
const SETCATEGORY = 'SETCATEGORY';

export const CALENDAR_REQUEST = 'CALENDAR_REQUEST';
export const CALENDAR_FAIL = 'CALENDAR_FAIL';
export const CALENDAR_SUCCESS = 'CALENDAR_SUCCESS';

export const CALENDAR_INSERT_REQUEST = 'CALENDAR_INSERT_REQUEST';
export const CALENDAR_INSERT_FAIL = 'CALENDAR_INSERT_FAIL';
export const CALENDAR_INSERT_SUCCESS = 'CALENDAR_INSERT_SUCCESS';

export const CALENDAR_UPDATE_REQUEST = 'CALENDAR_UPDATE_REQUEST';
export const CALENDAR_UPDATE_FAIL = 'CALENDAR_UPDATE_FAIL';
export const CALENDAR_UPDATE_SUCCESS = 'CALENDAR_UPDATE_SUCCESS';

export const CALENDAR_DELETE_REQUEST = 'CALENDAR_DELETE_REQUEST';
export const CALENDAR_DELETE_FAIL = 'CALENDAR_DELETE_FAIL';
export const CALENDAR_DELETE_SUCCESS = 'CALENDAR_DELETE_SUCCESS';

export const CALENDAR_OUT = 'CALENDAR_OUT';

export const setCalendarData = (startDate,endDate) => ({ type: SETCALENDARDATA, payload:{startDate:startDate,endDate:endDate}});
export const setCalendarTime = (name, val) => ({ type: SETCALENDARTIME, payload:{name:name,val:val}});
export const setSubMemo = (sub,memo) => ({ type: SETSUBMEMO,payload:{sub:sub,memo:memo}});
export const setCategory = (data) => ({ type: SETCATEGORY,data:data})

export const setCalendarReads = () => ({ type: CALENDAR_REQUEST, data:null});
export const insertCalendar = (data) => ({ type: CALENDAR_INSERT_REQUEST, data:data});
export const updateCalendar = (data) => ({ type: CALENDAR_UPDATE_REQUEST, data:data});
export const deleteCalendar = (_id) => ({ type: CALENDAR_DELETE_REQUEST, data:_id});

export const calendarOut = () => ({ type: CALENDAR_OUT,data:null});


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
      category:null,
      startDate:null,
      endDate:null,
      startTime:null,
      endTime:null, 
      sub:'',
      memo:'',
      order:'',
      data:[],
      _id:null,
      comment:'',
      calendarState:'isReady',
      errMessage: null,
  };


export default function reducer(state = initialState, action) {
    
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
        case SETCATEGORY:
          return {
            ...state,
            category: action.data,
          };  
        
        case CALENDAR_REQUEST:
            return {
              ...state,
              comment:'데이터를 수집중입니다..',
              calendarState:'isReady',
            };
    
          case CALENDAR_SUCCESS:
            return (
              {...state,
                data: action.data.data,
                calendarState:'isSuccess'
              }
            );
          case CALENDAR_FAIL:
            return {
              ...state,
              calendarState:'isFail',
              errMessage:action.error,
            };
            
          case CALENDAR_DELETE_REQUEST:
              return {
                ...state,
                comment:'삭제중입니다.',
                calendarState:'isReady',
              };
      
            case CALENDAR_DELETE_SUCCESS:
              return (
                {...state,
                  data: action.data.data,
                  calendarState:'isSuccess'
                }
              );
            case CALENDAR_DELETE_FAIL:
              return {
                ...state,
                calendarState:'isFail',
                errMessage:action.error,
              };
            case CALENDAR_INSERT_REQUEST:
            return {
              ...state,
              comment:'저장중입니다.',
              calendarState:'isReady',
            };
            case CALENDAR_INSERT_SUCCESS:
              return (
                {...state,
                  data: action.data.data,
                  calendarState:'isSuccess'
                }
              );
            case CALENDAR_INSERT_FAIL:
              return {
                ...state,
                calendarState:'isFail',
                errMessage:action.error,
              }; 
            case CALENDAR_UPDATE_REQUEST:
              return {
                ...state,
                comment:'업데이트 중 입니다.',
                calendarState:'isReady',
              };
            case CALENDAR_UPDATE_SUCCESS:
              return (
                {...state,
                  data: action.data.data,
                  calendarState:'isSuccess'
                }
              );
            case CALENDAR_UPDATE_FAIL:
              return {
                ...state,
                calendarState:'isFail',
                errMessage:action.error,
              };
              
            case CALENDAR_OUT:
              return {
                ...state,
                calendarState:'isReady',
              }; 
      default:
        return state; 
    }
  }
