import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  MYPAGE_REQUEST,
  MYPAGE_FAIL,
  MYPAGE_SUCCESS,
  MYPAGE_INTRO_REQUEST,
  MYPAGE_INTRO_FAIL,
  MYPAGE_INTRO_SUCCESS,
  MYPAGE_BIRTHDAY_REQUEST,
  MYPAGE_BIRTHDAY_FAIL,
  MYPAGE_BIRTHDAY_SUCCESS,
  MYPAGE_GENDER_REQUEST,
  MYPAGE_GENDER_FAIL,
  MYPAGE_GENDER_SUCCESS,
} from '../store/modules/Mypage';

// 마이페이지 정보 가져오기 
function getUserinfoAPI() {
  return fetch("/api/mypage",{method: "get",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
}

function* getUserinfo(action) {
  try {
    yield delay(2000);
    const data = yield call(getUserinfoAPI);  
    yield put({
      type: MYPAGE_SUCCESS,
      data:data.user_info,
    });
  } catch (e) {
    yield put({
      type: MYPAGE_FAIL,
      error: e,
    });
  }
}

function* watchGetUserinfo() {
  yield takeLatest(MYPAGE_REQUEST, getUserinfo);
}


// 마이페이지 Intro 수정
function UpdateIntroAPI(intro) {
    return fetch("/api/changeinfo", {
                  method: "POST",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({'info': intro})
                }).then(res => res.json())
}

function* UpdateIntro(action) {
  
  try {
    const data = yield call(UpdateIntroAPI, action.data); 
    console.log(data.intro,'data.intro'); 
    yield put({
      type: MYPAGE_INTRO_SUCCESS,
      data:data.intro,
    });
  } catch (e) {
    yield put({
      type: MYPAGE_INTRO_FAIL,
      error: e,
    });
  }
}

function* watchUpdateIntro() {
  yield takeLatest(MYPAGE_INTRO_REQUEST, UpdateIntro);
}


// 마이페이지 Birtday 수정
function UpdateBirthdayAPI(birthday) {
  return fetch("/api/changebirth",{method: "post", 
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({'birth': birthday})
                            })
                            .then(res => res.json())
}

function* UpdateBirthday(action) {
try {
  const data = yield call(UpdateBirthdayAPI, action.data); 
  console.log(data.birthday,'data.birthday'); 
  yield put({
    type: MYPAGE_BIRTHDAY_SUCCESS,
    data:data.birthday,
  });
} catch (e) {
  yield put({
    type: MYPAGE_BIRTHDAY_FAIL,
    error: e,
  });
}
}

function* watchUpdateBirthday() {
yield takeLatest(MYPAGE_BIRTHDAY_REQUEST, UpdateBirthday);
}


// 마이페이지 Gender 수정
function UpdateGenderAPI(gender) {
  return  fetch(`/api/changeGender?gender=${gender}`,{method: "get", 
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              }
                            })
                            .then(res => res.json())
}

function* UpdateGender(action) {
try {
  const data = yield call(UpdateGenderAPI, action.data); 
  console.log(data.gender,'data.gender'); 
  yield put({
    type: MYPAGE_GENDER_SUCCESS,
    data:data.gender,
  });
} catch (e) {
  yield put({
    type: MYPAGE_GENDER_FAIL,
    error: e,
  });
}
}

function* watchUpdateGender() {
yield takeLatest(MYPAGE_GENDER_REQUEST, UpdateGender);
}

export default function* postSaga() {
  yield all([
    fork(watchGetUserinfo),
    fork(watchUpdateIntro),
    fork(watchUpdateBirthday),
    fork(watchUpdateGender),
  ]);
}