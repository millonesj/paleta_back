const { BaseError } = require('../helpers/errorHandler');

class ChatNoExist extends BaseError {
  constructor(message) {
    let _message = message || "Chat doesn't exist.";
    super(_message, '404', 'ChatNoExist');
  }
}

module.exports = {
  ChatNoExist
};
