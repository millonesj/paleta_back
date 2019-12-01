const { BaseError } = require('../../libs/errorHandler');

class UserNoExist extends BaseError {
  constructor(message) {
    let _message = message || "User doesn't existe. No complite";
    super(_message, '404', 'UserNoExist');
  }
}

class InvalidAuthentication extends BaseError {
  constructor(message) {
    let _message = message || 'Invalid authentication';
    super(_message, '401', 'InvalidAuthentication');
  }
}

class InvalidCode extends BaseError {
  constructor(message) {
    let _message = message || 'Invalid code';
    super(_message, '401', 'InvalidCode');
  }
}

class UsernameAlreadyExists extends BaseError {
  constructor(message) {
    let _message = message || 'Username already exists';
    super(_message, '409', 'ProductNoExist');
  }
}

module.exports = {
  UsernameAlreadyExists,
  InvalidAuthentication,
  UserNoExist,
  InvalidCode
};
