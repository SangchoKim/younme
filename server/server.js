const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./db.js');
const router = require('./routes/router');
const socketIoRouter = require('./routes/socketIoRouter');
const session = require('express-session'); // 세션 설정
const FileStore = require('session-file-store')(session); 
const passport = require('passport');
const passportConfig = require('./passport'); 
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const SocketIo = require('socket.io'); // 소켓
const socketEvents = require('./socket/soket'); // 
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv'); 
const ColorHash = require('color-hash');

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    secure:false,  // https를 쓸 때 True
  },
  name:'shelley',
  store: new FileStore()
});

dotenv.config();
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware); // 세션 활성화
app.use(flash());
app.use((req,res,next) => {
  if(!req.session.color){
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID);
  }
  next();
});
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결
app.use(methodOverride()); // PUT, DELETE를 지원 안 하는 클라이언트를 위해
app.use(bodyParser.urlencoded({ extended: true })); // qs모듈로 쿼리스트링 파싱
app.use(bodyParser.json()); // body의 데이터를 json형식으로 받음
db();
passportConfig(); // 이 부분 추가

app.use('/api', router);
app.use('/io', socketIoRouter);
app.use((req, res, next) => { // 404 처리 부분
    res.status(404).send('일치하는 주소가 없습니다!');
  });
  app.use((err, req, res, next) => { // 에러 처리 부분
    console.error(err.stack); // 에러 메시지 표시
    res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
  });

const port = 5000;
const server = app.listen(port, () => console.log('Server started on port', {port}));

const io = SocketIo(server); // socket.io와 서버 연결하는 부분
socketEvents(io, app, sessionMiddleware); // 아까 만든 이벤트 연결 -> 소켓 모듈로 전달

