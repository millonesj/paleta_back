require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const jwt = require('jsonwebtoken');
const axios = require('axios');

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

const PORT = process.env.CHAT_PORT;

http.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});

io.use(function(socket, next) {
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
}).on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
    console.log('message: ' + JSON.stringify(msg));
    const token = socket.token;
    const chat = {
      proyectId: msg.proyectId,
      message: msg.msg,
      userId: msg.from
    };
    saveChat(token, chat);
    io.emit('chat message', msg);
  });
});

const saveChat = (token, chat) => {
  var config = {
    headers: { Authorization: 'bearer ' + token }
  };

  var bodyParameters = {
    ...chat
  };

  axios
    .post('http://localhost:3002/chats', bodyParameters, config)
    .then(response => {
      //console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
