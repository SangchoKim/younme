const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  src:String
});

const userSchema = new mongoose.Schema({
  id: {type: String, required:true, unique:true, lowercase:true},
  password: {type: String, required:true, trim:true},
  name: { type: String},
  birth: { type: Date, default: Date.now },
  gender: { type: String},
  image: imageSchema,
  intro: { type: String, default: 0, max: 100}
});

userSchema.methods.comparePassword = function(inputPassword, cb) {
  if (inputPassword === this.password) {
    cb(null, true);
  } else {
    cb('error');
  }
};

module.exports = mongoose.model('users', userSchema);