import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  MAIN_REQUEST,
  MAIN_FAIL,
  MAIN_SUCCESS,
} from '../store/modules/Main';

// 마이페이지 정보 가져오기 
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


export default function* postSaga() {
  yield all([
    fork(watchMoveMain),
  ]);
}