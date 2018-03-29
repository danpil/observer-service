var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  chatId: {
    type: Number,
    unique: true,
    required: true,
  },
  first_name: {
    type: String,
    unique: false,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
    unique: false,
  },
});

module.exports = mongoose.model('User', UserSchema);