const mongoose = require('mongoose');

const crypto = require('crypto');

const imageSchema = new mongoose.Schema({
  size: {type: Number, required:true, trim:true},
  originalname: {type: String, required:true, trim:true},
  src:{type: String, required:true, trim:true}
});

const userSchema = new mongoose.Schema({
  id: {type: String, required:true, unique:true, lowercase:true},
  password: {type: String, required:true, trim:true},
  _salt: {type: String, required:true, trim:true},
  name: { type: String, required:true},
  birth: { type: String, required:true },
  relday: { type: String, required:true },
  gender: { type: String, required:true},
  image: imageSchema,
  intro: { type: String, default: 0, max: 100},
  code:{ type: String, required:true},
  time : { type : Date, default: Date.now }
});

userSchema.methods.comparePassword = function(inputPassword, _salt, cb) {
  console.log('솔트:',_salt);
  crypto.pbkdf2(inputPassword , _salt, 100000, 64, 'sha512', (err, key) => {
  console.log('암호화된비밀번호:',key.toString('base64'));
  const pw = key.toString('base64');
  if (pw === this.password) {
    cb(null, true);
  } else {
    cb('error');
  }
});

};


userSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports = mongoose.model('users', userSchema);