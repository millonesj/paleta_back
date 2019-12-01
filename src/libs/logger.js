const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  format: format.json(),
  /* defaultMeta: {service: 'shop-api'}, */
  transports: [
    new transports.File({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
      ),
      exitOnError: false,
      maxSize: 512000,
      maxFiles: 5,
      filename: `${__dirname}/log-de-aplicacion.log`,
      prettyPrint: object => {
        return JSON.stringify(object);
      }
    }),
    new transports.Console({
      level: 'debug',
      exitOnError: false,
      format: format.combine(format.colorize(), format.simple())
    })
  ]
});

// logging morgan info
logger.stream = {
  write: function(message, encoding) {
    logger.info('morgan', { request: message.trim() });
  }
};

// logging params request
logger.saveParams = (req, rest, next) => {
  let params = req.body;
  if (req.body.password) params = { ...params, password: '***' };
  logger.info('params', { params, url: req.url });
  next();
};

module.exports = logger;
