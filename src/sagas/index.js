import { all, fork } from 'redux-saga/effects';
import mypage from './mypage';
import main from './main';
import memorialDay from './memorialDay';
import calendar from './calendar';

export default function* rootSaga() {
  yield all([
    fork(mypage),
    fork(main),
    fork(memorialDay),
    fork(calendar),
  ]);
}