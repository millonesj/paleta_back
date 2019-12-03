const { BaseError } = require('../../libs/errorHandler');

class PaletteNoExist extends BaseError {
  constructor(message) {
    let _message = message || "Palette doesn't exist.";
    super(_message, '404', 'PaletteNoExist');
  }
}

class OwnerNoExist extends BaseError {
  constructor(message) {
    let _message = message || "Owner doesn't existe";
    super(_message, '404', 'OwnerNoExist');
  }
}

module.exports = {
  PaletteNoExist,
  OwnerNoExist
};
