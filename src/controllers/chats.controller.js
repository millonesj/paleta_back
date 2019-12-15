const Chat = require('../models/chats.model');

function create(chat) {
  return new Chat(chat).save();
}

function getAllWithFilter(filter) {
  return Chat.find(filter);
}

function update(id, chat) {
  return Chat.findOneAndUpdate({ _id: id }, chat, {
    new: false,
    useFindAndModify: false
  });
}

function getOne(filter) {
  let chat = Chat.findOne(filter);
  return chat;
}

function getById(id) {
  let chat = Chat.findById(id);
  return chat;
}
function remove(id) {
  return Chat.findOneAndDelete(id);
}

module.exports = {
  create,
  getAllWithFilter,
  getOne,
  getById,
  update,
  remove
};
