const cookieParser = require('cookie-parser');
const passportSocketIo = require('passport.socketio');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

 
module.exports = (io, app, sessionMiddleware) => {
  // 익스프레스 변수 저장 방법 
  app.set('io',io);
  // req.app.get('io').of('/room).emit
  // 소켓 -> 네임스페이스 필수
  // io.of('/') -> 기본
  const initChat = io.of('/chat');
  const initVideoChat = io.of('/videochat');
  const initAlert = io.of('/alert');
  
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,       // the same middleware you registrer in express
    key:'shelley',       // the name of the cookie where express/connect stores its session_id
    secret: process.env.COOKIE_SECRET,    // the session_secret to parse the cookie
    store:new FileStore(),
  }));
  
  app.use((socket,next) => { // 익스프레스 미들웨어를 소켓IO에서 쓰는 방법
    sessionMiddleware(socket.request, socket.request.res, next);
    next();
  });

  
  // 알림 네임스페이스
  initAlert.on('connection', async(socket,next) => {
    const join_code = socket.request.user._code.codes;
    const req = socket.request;
    
        if(join_code===initAlert.adapter.rooms){
          console.log('이미 조인되어 있는 룸이 존재합니다.');
        }else{
          await socket.join(join_code);     
        }
    
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Server-Sokect_Alert 접속 됨', ip, socket.id, join_code);

    socket.on('error',(error)=>{
      console.error('에러발생',error);
    })
    
    socket.on('disconnect',()=>{
      console.log('initAlert 접속 종료');
    })
  });

  // 채팅 네임스페이스
  initChat.on('connection', (socket) => { // 채팅 소켓 연결 시
      const join_code = socket.request.user._code.codes;
      const req = socket.request;
      
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log('Server-Sokect_Chat 접속 됨', ip, socket.id, join_code);
      socket.join(join_code);

      socket.on('joinRoom', (_code,name) => {
        console.log(name + ' join a ' + _code);
        console.log('rooms',initChat.adapter.rooms);
        initChat.to(_code).emit('joinedRoom', _code, name);
      });

      socket.on('error',(error)=>{
        console.error('에러발생',error);
      })

      socket.on('disconnect',()=>{
        console.log('initChat 접속 종료');
      })
    });

    
    // 화상통화 
    initVideoChat.on('connection', (socket) => { // 채팅 소켓 연결 시
      const join_code = socket.request.user._code.codes;
      const req = socket.request;
      let clients = 0;
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log('Server-Sokect_VideoChat 접속 됨', ip, socket.id, join_code);
      socket.join(join_code);

      const SendOffer = (offer) => {
        console.log('SendOffer',offer);
        initVideoChat.to(join_code).emit("BackOffer", offer);
      }

      const SendAnswer = (data) => {
        console.log('SendAnswer',data);
        initVideoChat.to(join_code).emit("BackAnswer", data);
      }

      socket.on('NewClient', ()=>{
        console.log('NewClient');
        if(clients<2){
          initVideoChat.to(join_code).emit('CreatePeer');
        }else{
          initVideoChat.to(join_code).emit('SessionActive');
        }
      })

      socket.on('Offer',SendOffer);
      socket.on('Answer',SendAnswer);

      socket.on('error',(error)=>{
        console.error('에러발생',error);
      })

      socket.on('disconnect',()=>{
        console.log('initChat 접속 종료');
        if(clients>0)
          clients--;
      })

      
    });
  };

