import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  TALK_REQUEST,
  TALK_FAIL,
  TALK_SUCCESS,
  MESSAGE_REQUEST,
  MESSAGE_FAIL,
  MESSAGE_SUCCESS,
  PHOTO_REQUEST,
  PHOTO_FAIL,
  PHOTO_SUCCESS,
  CAMERA_REQUEST,
  CAMERA_FAIL,
  CAMERA_SUCCESS,
  GIF_REQUEST,
  GIF_FAIL,
  GIF_SUCCESS,
  VIDEO_REQUEST,
  VIDEO_FAIL,
  VIDEO_SUCCESS,
  ALBUM_REQUEST,
  ALBUM_FAIL,
  ALBUM_SUCCESS,
  RECORD_REQUEST,
  RECORD_FAIL,
  RECORD_SUCCESS,
} from '../store/modules/Talk';

const delays = delay(3000);

// 채팅 화면 
function TalkAPI(limit) {
  return fetch(`/io/inituser?lastId=null&limit=${limit}`,{method: "GET",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            }
                          })
                .then((res) => res.json())
}

function* Talk(action) {
  try {
    yield delays;
    const data = yield call(TalkAPI , action.data);
    yield put({
      type: TALK_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: TALK_FAIL,
      error: e,
    });
  }
}

function* watchTalk() {
  yield takeLatest(TALK_REQUEST, Talk);
}

// 채팅 메시지 보내기 
function MessageAPI(data) {
  return fetch('/io/chat_info',{method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            },
                            body:JSON.stringify(data)
                          })
                          .then(res => res.json())
}

function* Message(action) {
  try {
    yield call(MessageAPI , action.data);
    yield put({
      type: MESSAGE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: MESSAGE_FAIL,
      error: e,
    });
  }
}

function* watchMessage() {
  yield takeLatest(MESSAGE_REQUEST, Message);
}

// 채팅 사진 보내기 
function PhotoAPI(data) {
  return fetch(`/io/chat_photo?sender=${data.email}&getter=${data.oppentEmail}`, 
                          {method: "PATCH",
                            headers: {
                              // 'content-type': 'multipart/form-data',
                              // 'Accept': 'application/json'
                          },
                            body: data.formData
                          })
                          .then(res => res.json())
}

function* Photo(action) {
  try {
    yield call(PhotoAPI , action.data);
    yield put({
      type: PHOTO_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: PHOTO_FAIL,
      error: e,
    });
  }
}

function* watchPhoto() {
  yield takeLatest(PHOTO_REQUEST, Photo);
}


// 채팅 카메라 보내기 
function CameraAPI(data) {
  return fetch(`/io/chat_camera?sender=${data.email}&getter=${data.oppentEmail}`, 
                          {method: "PATCH",
                          headers: {
                            // 'content-type': 'multipart/form-data'
                          },
                          body: data.formData 
                          })
                          .then(res => res.json())
}

function* Camera(action) {
  try {
    yield call(CameraAPI , action.data);
    yield put({
      type: CAMERA_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CAMERA_FAIL,
      error: e,
    });
  }
}

function* watchCamera() {
  yield takeLatest(CAMERA_REQUEST, Camera);
}

// 채팅 GIF 보내기 
function GifAPI(data) {
  return fetch('/io/chat_gif',{method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            },
                            body:JSON.stringify(data)
                          })
                          .then(res => res.json())
}

function* Gif(action) {
  try {
    yield call(GifAPI , action.data);
    yield put({
      type: GIF_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: GIF_FAIL,
      error: e,
    });
  }
}

function* watchGif() {
  yield takeLatest(GIF_REQUEST, Gif);
}

// 채팅 Video 보내기 
function VideoAPI(data) {
  return  fetch(`/io/chat_video?sender=${data.email}&getter=${data.oppentEmail}`, 
                            {method: "PATCH",
                            headers: {
                              // 'content-type': 'multipart/form-data',
                              // 'Accept': 'application/json'
                            },
                            body: data.formData
                            })
                            .then(res => res.json())
}

function* Video(action) {
  try {
    yield call(VideoAPI , action.data);
    yield put({
      type: VIDEO_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: VIDEO_FAIL,
      error: e,
    });
  }
}

function* watctVideo() {
  yield takeLatest(VIDEO_REQUEST, Video);
}

// 채팅 공유앨범 보내기 
function AlbumAPI(data) {
  return fetch(`/io/chat_album`, 
                            {method: "POST",
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                            },
                            body: JSON.stringify(data)
                            })
                            .then(res => res.json()) 
}

function* Album(action) {
  try {
    yield call(AlbumAPI , action.data);
    yield put({
      type: ALBUM_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ALBUM_FAIL,
      error: e,
    });
  }
}

function* watctAlbum() {
  yield takeLatest(ALBUM_REQUEST, Album);
}


// 채팅 녹음파일 보내기 
function RecordAPI(data) {
  return  fetch(`/io/chat_voicerecord?sender=${data.email}&getter=${data.oppentEmail}`, 
                            {method: "PATCH",
                            headers: {
                              // 'content-type': 'multipart/form-data',
                              // 'Accept': 'application/json'
                            }, 
                            body: data.formData
                            })
                            .then(res => res.json()) 
}

function* Record(action) {
  try {
    yield call(RecordAPI , action.data);
    yield put({
      type: RECORD_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: RECORD_FAIL,
      error: e,
    });
  }
}

function* watctRecord() {
  yield takeLatest(RECORD_REQUEST, Record);
}

export default function* talkSaga() {
  yield all([
    fork(watchTalk),
    fork(watchMessage),
    fork(watchPhoto),
    fork(watchCamera),
    fork(watchGif),
    fork(watctVideo),
    fork(watctAlbum),
    fork(watctRecord),
  ]);
}