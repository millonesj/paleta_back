require('dotenv').config()
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

const PORT = process.env.PORT;

http.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + JSON.stringify(msg));
    io.emit('chat message', msg);
  });
});
