const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User should have a name']
  },
  password: {
    type: String,
    required: [false, 'User should have a password']
  },
  email: {
    type: String,
    required: [true, 'User should have a email']
  },
});

module.exports = mongoose.model('user', userSchema);
