import image from '../../img/default_album.png'

const SETALBUM = 'SETALBUM';
const MODIFYALBUM = 'MODIFYALBUM';

export const setAlbum = (setAlbumInfo) => ({ type: SETALBUM,payload:setAlbumInfo});
export const modifyAlbumInfo = (ModifyAlbumInfo) => ({ type: MODIFYALBUM,payload:ModifyAlbumInfo});

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


export default function reducer(state = initialState, action) {
    switch(action.type) {
      case SETALBUM:
          const _image = action.payload.image;
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
        return state;
    }
  }
