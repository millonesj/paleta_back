require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const logger = require('./src/libs/logger');

/* configuration */
const config = {
  PORT: process.env.PORT
}

const app = express();

/* DATABASE */
mongoose.connect('mongodb://127.0.0.1:27017/training', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true
});

mongoose.set('useFindAndModify', false);

mongoose.connection.on('error', (error) => {
  logger.error('Failed to connect to database', error);
  process.exit(1);
});

/* MIDDLEWARES */
app.use(express.json());
app.use(morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', {
  stream: logger.stream}));
app.use((req,res,next) => logger.saveParams(req,res,next));

app.listen(config.PORT, () => {
  console.log(`We app is listening on port: ${config.PORT}`);
})
