import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  MAIN_REQUEST,
  MAIN_FAIL,
  MAIN_SUCCESS,
  MAIN_GETDATA_REQUEST,
  MAIN_GETDATA_FAIL,
  MAIN_GETDATA_SUCCESS,
  MAIN_UPDATEALBUM_REQUEST,
  MAIN_UPDATEALBUM_FAIL,
  MAIN_UPDATEALBUM_SUCCESS,
  MAIN_UPDATECAMERA_REQUEST,
  MAIN_UPDATECAMERA_FAIL,
  MAIN_UPDATECAMERA_SUCCESS,
} from '../store/modules/Main';

const delays = delay(2000);
// 메인 페이지로 이동
function moveMainAPI(data) {
  return fetch("/api/login",{method: "post",
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({'email':data.email,'password':data.password})})
                            .then(res => res.json())
}

function* moveMain(action) {
  try {
    const data = yield call(moveMainAPI, action.data);
    yield put({
      type: MAIN_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: MAIN_FAIL,
      error: e,
    });
  }
}

function* watchMoveMain() {
  yield takeLatest(MAIN_REQUEST, moveMain);
}

// 마이페이지 정보 가져오기 
function mainGetDataAPI() {
  return fetch("/api/main",{method: "GET",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                        })
                        .then(res => res.json())
}

function* mainGetData() {
  try {
    yield delays;
    const data = yield call(mainGetDataAPI);
    yield put({
      type: MAIN_GETDATA_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: MAIN_GETDATA_FAIL,
      error: e,
    });
  }
}

function* watchMainGetData() {
  yield takeLatest(MAIN_GETDATA_REQUEST, mainGetData);
}

// 배경화면 변경하기 with 앨범
function mainUpdateAlbumAPI(formData) {
  const config = {
    headers: {
        'content-type': 'multipart/form-data'    
    }
  }; 
  return (fetch("/api/setbackground", {method: "POST",
                          config,
                          body: formData
                          })
                          .then(res => res.json()));
}

function* mainUpdateAlbum(action) {
  try {
    yield delays;
    const data = yield call(mainUpdateAlbumAPI, action.data);
    yield put({
      type: MAIN_UPDATEALBUM_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: MAIN_UPDATEALBUM_FAIL,
      error: e,
    });
  }
}

function* watchUpdateAlbum() {
  yield takeLatest(MAIN_UPDATEALBUM_REQUEST, mainUpdateAlbum);
}

// 배경화면 변경하기 with 카메라
function mainUpdateCameraAPI(formData) {
  const config = {
    headers: {
        'content-type': 'multipart/form-data'    
    }
  }; 
  return (fetch("/api/setbackground", {method: "POST",
                          config,
                          body: formData 
                          })
                          .then(res => res.json()));
}

function* mainUpdateCamera(action) {
  try {
    yield delays;
    const data = yield call(mainUpdateCameraAPI, action.data);
    yield put({
      type: MAIN_UPDATECAMERA_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: MAIN_UPDATECAMERA_FAIL,
      error: e,
    });
  }
}

function* watchUpdateCamera() {
  yield takeLatest(MAIN_UPDATECAMERA_REQUEST, mainUpdateCamera);
}

export default function* mainSaga() {
  yield all([
    fork(watchMoveMain),
    fork(watchMainGetData),
    fork(watchUpdateAlbum),
    fork(watchUpdateCamera),
  ]);
}