const mongoose = require('mongoose');
const logger = require('./logger');

function processError(fn) {
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
}

function processDBerrors(err, req, res, next) {
  if (err instanceof mongoose.Error || err.name === 'MongoError') {
    logger.error('Ocurrio un error en la DB', err);
    err.message = 'Error en la BD';
    err.status = 500;

    if (err.code === 11000) {
      err.message = 'Value already exists';
      err.status = 409;
    }
  }
  next(err);
}

function catchResolver(err, req, res, next) {
  res.status(err.status).json({ message: err.message });
}

class BaseError extends Error {
  constructor(message, status, name) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = name;
  }
}

module.exports = {
  processError,
  processDBerrors,
  catchResolver,
  BaseError
};
