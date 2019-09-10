const mongoose = require('mongoose');

const _dataSchema = new mongoose.Schema({
  sender: {type: String, default:null, trim:true},
  getter: {type: String, default:null, trim:true},
  comment: {type: String, trim:true},
  gif: {type: String, trim:true},
  cratedAt : { type : Date, default: Date.now }
});

  const chatSchema = new mongoose.Schema({
      _code: {type: Number, required:true, trim:true},
      dataSchema: [_dataSchema],
  });

  module.exports = mongoose.model('room', chatSchema);