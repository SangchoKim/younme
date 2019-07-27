const express = require('express');
const db = require('./db.js');
const router = require('./routes/router')
const session = require('express-session'); // 세션 설정
const FileStore = require('session-file-store')(session); 
const passport = require('passport');
const passportConfig = require('./passport'); 
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

app.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
})); // 세션 활성화
app.use(methodOverride()); // PUT, DELETE를 지원 안 하는 클라이언트를 위해
app.use(bodyParser.urlencoded({ extended: true })); // qs모듈로 쿼리스트링 파싱
app.use(bodyParser.json()); // body의 데이터를 json형식으로 받음
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
db();
passportConfig(); // 이 부분 추가

app.use('/', router);
app.use((req, res, next) => { // 404 처리 부분
    res.status(404).send('일치하는 주소가 없습니다!');
  });
  app.use((err, req, res, next) => { // 에러 처리 부분
    console.error(err.stack); // 에러 메시지 표시
    res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
  });

const port = 5000;
app.listen(port, () => console.log('Server started on port', {port}))