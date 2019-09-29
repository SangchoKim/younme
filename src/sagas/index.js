import { all, fork } from 'redux-saga/effects';
import mypage from './mypage';
import main from './main';
import memorialDay from './memorialDay';
import calendar from './calendar';
import alert from './alert';
import talk from './talk';

export default function* rootSaga() {
  yield all([
    fork(mypage),
    fork(main),
    fork(memorialDay),
    fork(calendar),
    fork(alert),
    fork(talk),
  ]);
}