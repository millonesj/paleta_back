const jwt = require('jsonwebtoken');

const authentication = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.SECRET_KEY, function(
      err,
      decoded
    ) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      socket.token = socket.handshake.query.token;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
};

module.exports = authentication;
