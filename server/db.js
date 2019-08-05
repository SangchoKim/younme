const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost:27017/admin',
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
  mongoose.connection.on('disconnected', connect);
};