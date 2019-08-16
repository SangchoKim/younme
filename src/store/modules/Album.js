import image from '../../img/default_album.png'

// 액션 타입을 정의해줍니다.
const SETALBUM = 'SETALBUM';
const MODIFYALBUM = 'MODIFYALBUM';

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const setAlbum = (setAlbumInfo) => ({ type: SETALBUM,payload:setAlbumInfo});
export const modifyAlbumInfo = (ModifyAlbumInfo) => ({ type: MODIFYALBUM,payload:ModifyAlbumInfo});

// 모듈의 초기 상태를 정의합니다.
const initialState = {
      Title:{
      title:"앨범",
      back:"Back",
      update:"Add",
      backUrl:"./main",
      updateUrl:"./#",
      icon:{main:"image fa-3x", update:"plus fa-2x", back:"arrow-circle-left fa-2x"},
      mode:{show:"album"}
    },
    Body:{
      imgUrl:image
    } 
  };

// 리듀서를 만들어서 내보내줍니다.
export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
    switch(action.type) {
      case SETALBUM:
          const _image = action.payload.image;
          console.log("_image:",_image)
        return {
          ...state,
          Body:{
            imgUrl:_image
          } 
        }
      case MODIFYALBUM:
          const _key = action.payload.key;
          const _val = action.payload.val;
        return {
          ...state,
          Body:{
            ...state.Body,
            imgKey:_key,
            imgVal:_val
          } 
        }
      default:
        return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
  }
