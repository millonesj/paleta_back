const { BaseError } = require('../../libs/errorHandler');

class ProyectNoExist extends BaseError {
  constructor(message) {
    let _message = message || "Proyect doesn't exist.";
    super(_message, '404', 'ProyectNoExist');
  }
}

class OwnerNoExist extends BaseError {
  constructor(message) {
    let _message = message || "Owner doesn't existe";
    super(_message, '404', 'OwnerNoExist');
  }
}

module.exports = {
  ProyectNoExist,
  OwnerNoExist
};
