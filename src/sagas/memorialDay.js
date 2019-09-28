import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  MEMORIALDAY_REQUEST,
  MEMORIALDAY_FAIL,
  MEMORIALDAY_SUCCESS,
} from '../store/modules/MemorialDay';

const delays = delay(2000);

// 기념일 화면 
function MemorialDayAPI() {
  return  fetch(`/api/main?momorial=${1}`,{method: "GET",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                        })
                        .then(res => res.json())
}

function* MemorialDay() {
  try {
    yield delays;
    const data = yield call(MemorialDayAPI);
    yield put({
      type: MEMORIALDAY_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: MEMORIALDAY_FAIL,
      error: e,
    });
  }
}

function* watchMemorialDay() {
  yield takeLatest(MEMORIALDAY_REQUEST, MemorialDay);
}

export default function* memorialDaySaga() {
  yield all([
    fork(watchMemorialDay),
  ]);
}