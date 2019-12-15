require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { saveChat } = require('./chat.controller');
const auth = require('./libs/authentication');
app.get('/', (req, res) => {
  res.send('<h1>Hello Chat Server!</h1>');
});

const PORT = process.env.CHAT_PORT;

http.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});

io.use(auth).on('connection', function(socket) {
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

app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  });
});
