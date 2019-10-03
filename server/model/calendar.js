const mongoose = require('mongoose');

const _dataSchema = new mongoose.Schema({
    title: {type: String, required:true, default:null, trim:true},
    s_date:{type: String, required:true, default:null, trim:true},
    e_date:{type: String, required:true, default:null, trim:true},
    s_time:{type: String, required:true, default:null, trim:true},
    e_time:{type: String, required:true, default:null, trim:true},
    author:{type: String, required:true, default:null, trim:true},
    memo:{type: String, required:true, default:null, trim:true},
    category:{type: Number, required:true, default:0, trim:true},
    time : { type : Date, default: Date.now }
  });

  const calendarSchema = new mongoose.Schema({
    _code: {type: Number, required:true, trim:true},
    dataSchema: [_dataSchema]
  });

  module.exports = mongoose.model('calendar', calendarSchema);