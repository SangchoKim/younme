const mongoose = require('mongoose');

const temp_code = new mongoose.Schema({
    code: {type: Number, lowercase:true},
    userMail1: {type: String, required:true, lowercase:true}
  });

  module.exports = mongoose.model('temp_code', temp_code);