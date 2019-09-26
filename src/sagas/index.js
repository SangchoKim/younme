import { all, fork } from 'redux-saga/effects';
import mypage from './mypage';

export default function* rootSaga() {
  yield all([
    fork(mypage),
  ]);
}