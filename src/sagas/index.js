import { all, fork } from 'redux-saga/effects';
import mypage from './mypage';
import main from './main';

export default function* rootSaga() {
  yield all([
    fork(mypage),
    fork(main),
  ]);
}