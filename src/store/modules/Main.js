import defautImge from '../../img/main_default.jpg';

export const MAIN_REQUEST = 'MAIN_REQUEST';
export const MAIN_FAIL = 'MAIN_FAIL';
export const MAIN_SUCCESS = 'MAIN_SUCCESS';

export const MAIN_GETDATA_REQUEST = 'MAIN_GETDATA_REQUEST';
export const MAIN_GETDATA_FAIL = 'MAIN_GETDATA_FAIL';
export const MAIN_GETDATA_SUCCESS = 'MAIN_GETDATA_SUCCESS';

export const MAIN_UPDATEALBUM_REQUEST = 'MAIN_UPDATEALBUM_REQUEST';
export const MAIN_UPDATEALBUM_FAIL = 'MAIN_UPDATEALBUM_FAIL';
export const MAIN_UPDATEALBUM_SUCCESS = 'MAIN_UPDATEALBUM_SUCCESS';

export const MAIN_UPDATECAMERA_REQUEST = 'MAIN_UPDATECAMERA_REQUEST';
export const MAIN_UPDATECAMERA_FAIL = 'MAIN_UPDATECAMERA_FAIL';
export const MAIN_UPDATECAMERA_SUCCESS = 'MAIN_UPDATECAMERA_SUCCESS';

export const MAIN_OUT = 'MAIN_OUT';

export const mainRequest = (userInfo) => ({ type: MAIN_REQUEST,data:userInfo});
export const mainGetDataRequest = () => ({ type: MAIN_GETDATA_REQUEST,data:null});
export const mainUpdateAlbumRequest = (file) => ({ type: MAIN_UPDATEALBUM_REQUEST,data:file});
export const mainUpdateCameraRequest = (file) => ({ type: MAIN_UPDATECAMERA_REQUEST,data:file});

export const mainOut = () => ({ type: MAIN_OUT,data:null});

// 모듈의 초기 상태를 정의합니다.
const initialState = {
      mainState:'isReady',
      comment:'',
      errMessage:null,
      reason:'',
      result:'',
      User_info:{
        userName:'김철수',
        oppenetName:'이영희',
        relDay:'null',
        image:defautImge,
      }, 
  };

  
// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
  
    switch(action.type) {
      case MAIN_REQUEST:
        return {
          ...state,
          comment:'로딩중입니다.',
          mainState:'isReady',
        };

      case MAIN_SUCCESS:
        return (
          {...state,
            result:action.data.result,
            reason:action.data.fMsg,
            mainState:'isSuccess'
          }
        );

      case MAIN_FAIL:
        return {
          ...state,
          mainState:'isFail',
          errMessage:action.error,
        };
      
      case MAIN_GETDATA_REQUEST:
          return {
            ...state,
            comment:'데이터를 수집중입니다.',
            mainState:'isReady',
          };

      case MAIN_GETDATA_SUCCESS:
        let {name,oppentname,relDay,img} = action.data.user_info;
        if(!img) img = defautImge;
        else img = '/uploads/'+ img;
        return (
          {...state,
            User_info:{
              userName:name,
              oppenetName:oppentname,
              relDay:relDay,
              image:img,
            },
            mainState:'isSuccess' 
          }
        );

      case MAIN_GETDATA_FAIL:
        return {
          ...state,
          mainState:'isFail',
          errMessage:action.error,
        };

      case MAIN_UPDATEALBUM_REQUEST:
           return {
            ...state,
            mainState:'isReady',
            comment:'업데이트 중입니다.',
          };  
  
      case MAIN_UPDATEALBUM_SUCCESS:
          let image = action.data.img;
          if(!image) image = defautImge;
          else image = '/uploads/'+ image;
          return (
            {...state,
              User_info:{
                ...state.User_info,
                image:image,
              },
              mainState:'isSuccess',
            }
          );

      case MAIN_UPDATEALBUM_FAIL:
        return {
          ...state,
          mainState:'isFail',
          errMessage:action.error,
        };  

      case MAIN_UPDATECAMERA_REQUEST:
            return {
             ...state,
             mainState:'isReady',
             comment:'업데이트 중입니다.',
           };  
   
       case MAIN_UPDATECAMERA_SUCCESS:
           let images = action.data.img;
           if(!images) images = defautImge;
           else images = '/uploads/'+ images;
           return (
             {...state,
               User_info:{
                 ...state.User_info,
                 image:images,
               },
               mainState:'isSuccess',
             }
           );
 
       case MAIN_UPDATECAMERA_FAIL:
         return {
           ...state,
           mainState:'isFail',
           errMessage:action.error,
         };

      case MAIN_OUT:
        return {
          ...state,
          mainState:'isReady',
        };

      default:
        return state 
    }
  }
