const uuids = require('uuid/v1');
const moment = require('moment');
const axios = require('axios');
const uid = uuids();
 
module.exports = (io, app, sessionMiddleware) => {
  // 익스프레스 변수 저장 방법 
  app.set('io',io);
  // req.app.get('io').of('/room).emit
  // 소켓 -> 네임스페이스 필수
  // io.of('/') -> 기본
  const initChat = io.of('/chat');
  
  app.use((socket,next) => { // 익스프레스 미들웨어를 소켓IO에서 쓰는 방법
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  initChat.on('connection', (socket) => { // 채팅 소켓 연결 시
     
      const req = socket.request;
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      console.log('initChat 접속 됨', ip, socket.id, req.ip);
      
      socket.on('isConnecting', (email) => {
        console.log('isConnecting',email);
        socket.emit('socket_id',socket.id);
      })

      socket.on('code', (_code) => {
        console.log('initRoom_code',_code);
        socket.join(_code);
      })
      
      socket.on('error',(error)=>{
        console.error('에러발생',error);
      })

      socket.on('disconnect',()=>{
        console.log('initChat 접속 종료');
      })
    });
  };

