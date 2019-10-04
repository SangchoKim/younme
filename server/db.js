const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    let ip = 'localhost'
    // if(process.env.NODE_ENV==='production'){
    //   ip = process.env.
    // }
    mongoose.Promise = global.Promise
    mongoose.connect(`mongodb://${ip}:27017/admin`,
        {'useNewUrlParser': true,'useCreateIndex': true},
      function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }else{
        console.log('mongodb connected');
      }
    });
  }
  connect();

  mongoose.connection.on('error', (error)=>{
    console.error('몽고디비 연결 에러', error);
  });

  mongoose.connection.on('disconnected', ()=>{
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다. ');
    connect();
  });
};