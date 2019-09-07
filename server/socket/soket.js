const uuids = require('uuid/v1');
const moment = require('moment');
const uid = uuids();
const clients = [];

module.exports = (io) => {
    io.on('connection', (socket) => { // 웹소켓 연결 시
      console.log('유저 접속 됨');

      socket.on('isConnecting',(data)=>{ // 접속한 유저 메일과 소켓 id 저장
        console.log('isConnecting',data);
        const clientInfo = {
                            _id:socket.id,
                            sender:data._userInfo.sender,
                            }
        clients.unshift(clientInfo);
      });

      socket.on('message', (data) => { // 상대방에게 전달할 메세지 
            console.log('전달된 메세지',data);  
            const do_sendData = {
                message: "메시지 감사합니다.",
                uid:uid,
                reg_time:moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                sender:'김상초',
              }  
          for (let i = 0; i < clients.length; i++) {
              const client = clients[i];
              console.log('client_ID',client);
              if(client.sender===data.getter){
                io.to(client._id).emit('message', do_sendData );
                break;
              }
            }
      });

      socket.on('disconnect',()=>{
        for (let i = 0; i < clients.length; i++) {
          const client = clients[i];
          console.log('client_ID',client);
          if(client._id===socket.id){
            clients.splice(i,1);
            break;
          }
        }
        console.log('유저 접속 종료');
      })
    });
  };

