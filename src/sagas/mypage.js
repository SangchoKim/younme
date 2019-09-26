import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  MYPAGE_REQUEST,
  MYPAGE_FAIL,
  MYPAGE_SUCCESS,
} from '../store/modules/Mypage';

function addCommentAPI() {

}

function* getUserinfo(action) {
  try {
    
    yield delay(3000);
      console.log('들어왔어요');
    
    yield put({
      type: MYPAGE_FAIL,
      data:'isSuccess',
    });
  } catch (e) {
    // yield put({
    //   type: MYPAGE_FAIL,
    //   error: e,
    // });
  }
}

function* watchAddComment() {
  yield takeLatest(MYPAGE_REQUEST, getUserinfo);
}

export default function* postSaga() {
  yield all([
    fork(watchAddComment),
  ]);
}