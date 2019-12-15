require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const logger = require('./src/helpers/logger');
const errorHandler = require('./src/helpers/errorHandler');
const userRoutes = require('./src/routes/users.routes');
const proyectsRoutes = require('./src/routes/proyect.routes');
const chatsRoutes = require('./src/routes/chats.routes');
const palettesRoutes = require('./src/routes/palettes.routes');

/* configuration */
const config = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST
};

const app = express();

/* DATABASE */
mongoose.connect(`mongodb://${config.DB_HOST}:27017/db_palette`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.set('useFindAndModify', false);

mongoose.connection.on('error', error => {
  logger.error('Failed to connect to database', error);
  process.exit(1);
});

/* MIDDLEWARES */
app.use(express.json());
app.use(
  morgan(
    '{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}',
    {
      stream: logger.stream
    }
  )
);
app.use((req, res, next) => logger.saveParams(req, res, next));

/* ROUTES */
app.use('/users', userRoutes);
app.use('/proyects', proyectsRoutes);
app.use('/chats', chatsRoutes);
app.use('/users', userRoutes);
app.use('/palettes', palettesRoutes);

app.use(errorHandler.processDBerrors);
app.use(errorHandler.catchResolver);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(config.PORT, () => {
  console.log(`We app is listening on port: ${config.PORT}`);
});
