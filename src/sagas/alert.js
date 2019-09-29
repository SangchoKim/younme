import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  ALERT_REQUEST,
  ALERT_FAIL,
  ALERT_SUCCESS,
} from '../store/modules/Alert';

const delays = delay(2000);

// 기념일 화면 
function AlertAPI() {
  return fetch(`/io/getAlert`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                    })
                    .then((res) => res.json())
}

function* Alert() {
  try {
    yield delays;
    const data = yield call(AlertAPI);
    yield put({
      type: ALERT_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: ALERT_FAIL,
      error: e,
    });
  }
}

function* watchAlert() {
  yield takeLatest(ALERT_REQUEST, Alert);
}

export default function* alertSaga() {
  yield all([
    fork(watchAlert),
  ]);
}