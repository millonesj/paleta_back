const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  proyectId: {
    type: String,
    required: [true, 'The chat should have a proyectId']
  },
  message: {
    type: String,
    required: [true, 'The chat should have an message']
  },
  userId: {
    type: String,
    required: [true, 'The chat should have an userId']
  },
  date: {
    type: Date,
    required: [true, 'The chat should have an date'],
    default: Date.now
  }
});
module.exports = mongoose.model('chat', chatSchema);
