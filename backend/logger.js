const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  const istTime = new Date(timestamp).toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  return `${istTime} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Customize the timestamp format
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
