import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  CALENDAR_REQUEST,
  CALENDAR_FAIL,
  CALENDAR_SUCCESS,
  CALENDAR_DELETE_REQUEST,
  CALENDAR_DELETE_FAIL,
  CALENDAR_DELETE_SUCCESS,
  CALENDAR_INSERT_REQUEST,
  CALENDAR_INSERT_FAIL,
  CALENDAR_INSERT_SUCCESS,
  CALENDAR_UPDATE_REQUEST,
  CALENDAR_UPDATE_FAIL,
  CALENDAR_UPDATE_SUCCESS,
} from '../store/modules/Calendar';

const delays = delay(2000);

// 캘린더 화면 
function calendarAPI() {
  return  fetch(`/api/readcalendar?data=null&order=READ`,
                       {method: "GET",
                        headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                        }
                        })
                        .then((res) => res.json())
}

function* calendar() {
  try {
    yield delays;
    const data = yield call(calendarAPI);
    yield put({
      type: CALENDAR_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: CALENDAR_FAIL,
      error: e,
    });
  }
}

function* watchCalendar() {
  yield takeLatest(CALENDAR_REQUEST, calendar);
}

// 캘린더 삭제
function calendarDeleteAPI(id) {
  return   fetch(`/api/deletecalendar?_id=${id}`, {method: "GET",
                                       headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json'
                                       }
                                       })
                                      .then(res => res.json())
}

function* calendarDelete(action) {
  try {
    yield delays;
    const data = yield call(calendarDeleteAPI, action.data);
    yield put({
      type: CALENDAR_DELETE_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: CALENDAR_DELETE_FAIL,
      error: e,
    });
  }
}

function* watchCalendarDelete() {
  yield takeLatest(CALENDAR_DELETE_REQUEST, calendarDelete);
}

// 캘린더 추가
function calendarAddAPI(data) {
  return fetch("/api/setcalendar", {method: "POST",
                                  headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({'data':data})
                                  })
                                  .then(res => res.json())
}

function* calendarAdd(action) {
  try {
    yield delays;
    const data = yield call(calendarAddAPI, action.data);
    yield put({
      type: CALENDAR_INSERT_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: CALENDAR_INSERT_FAIL,
      error: e,
    });
  }
}

function* watchCalendarAdd() {
  yield takeLatest(CALENDAR_INSERT_REQUEST, calendarAdd);
}

// 캘린더 업데이트
function calendarUpdateAPI(data) {
  return fetch('/api/updatecalendar', {method: "PATCH",
                                      headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify({'data':{
                                      id:data.id,
                                      startDate:data.startDate,
                                      endDate:data.endDate,
                                      startTime:data.startTime,
                                      endTime:data.endTime,
                                      sub:data.sub,
                                      memo:data.memo,  
                                      }})
                                      })
                                      .then(res => res.json())
}

function* calendarUpdate(action) {
  try {
    yield delays;
    const data = yield call(calendarUpdateAPI, action.data);
    yield put({
      type: CALENDAR_UPDATE_SUCCESS,
      data:data,
    });
  } catch (e) {
    yield put({
      type: CALENDAR_UPDATE_FAIL,
      error: e,
    });
  }
}

function* watchCalendarUpdate() {
  yield takeLatest(CALENDAR_UPDATE_REQUEST, calendarUpdate);
}

export default function* calendarSaga() {
  yield all([
    fork(watchCalendar),
    fork(watchCalendarDelete),
    fork(watchCalendarAdd),
    fork(watchCalendarUpdate),
  ]);
}