const mongoose = require('mongoose');

const _dataSchema = new mongoose.Schema({
    number: {type: Number, default:null, trim:true},
    crud: {type: Number, default:null, trim:true},
    cratedAt : { type : Date, default: Date.now }
});

  const AlertSchema = new mongoose.Schema({
      _code: {type: Number, required:true, trim:true},
      dataSchema: [_dataSchema], 
  });

  module.exports = mongoose.model('alert', AlertSchema);