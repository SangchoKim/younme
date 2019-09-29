import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  TALK_REQUEST,
  TALK_FAIL,
  TALK_SUCCESS,
} from '../store/modules/Talk';

const delays = delay(3000);

// 기념일 화면 
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

export default function* talkSaga() {
  yield all([
    fork(watchTalk),
  ]);
}