require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

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

app.listen(config.PORT, () => {
  console.log(`We app is listening on port: ${config.PORT}`);
})
