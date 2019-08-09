const mongoose = require('mongoose');

const _sharedSchema = new mongoose.Schema({
    size: {type: Number, required:true, default:0, trim:true},
    originalname: {type: String, required:true, default:null, trim:true},
    src:{type: String, required:true, default:null, trim:true},
    time : { type : Date, default: Date.now }
  });

  const _wallpaperSchema = new mongoose.Schema({
    size: {type: Number, required:true, default:0, trim:true},
    originalname: {type: String, required:true, default:null, trim:true},
    src:{type: String, required:true, default:null, trim:true},
    time : { type : Date, default: Date.now }
  });


  const albumSchema = new mongoose.Schema({
    _code: {type: Number, required:true, trim:true},
    wallpaperSchema: _wallpaperSchema,
    sharedSchema: [_sharedSchema]
  });

  module.exports = mongoose.model('albums', albumSchema);