
const SETUSERHEADINFO = 'SETUSERHEADINFO';
const DECREMENT = 'counter/DECREMENT';

export const setUserHeadInfo = (userBasicInfo) => ({ type: SETUSERHEADINFO, payload:userBasicInfo});
export const decrement = () => ({ type: DECREMENT });

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


export default function reducer(state = initialState, action) {
    switch(action.type) {
      case SETUSERHEADINFO:
        const _name = action.payload.name;
        const _oppenetName = action.payload.oppenetName;
        const _relDay = action.payload.relDay;
        return  _setUserHeadInfo(_name, _oppenetName, _relDay);
      case DECREMENT:
        return { number: state.number - 1 };
      default:
        return state; 
    }
  }
