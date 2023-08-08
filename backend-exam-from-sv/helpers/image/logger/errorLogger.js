const winston = require('winston');
require('winston-daily-rotate-file');

const timezone = () =>
    new Date().toLocaleString('TR', {
        timeZone: 'Europe/Istanbul',
    });

const transport = new winston.transports.DailyRotateFile({
    filename: `${__dirname}/../../logs/error/%DATE%.log`,
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const options = {
    file: {
        level: 'error',
        filename: `${__dirname}/../../logs/error/error.log`,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const errorLogger = winston.createLogger({
    transports: [new winston.transports.Console(options.console), new winston.transports.File(options.file), transport],
    format: winston.format.combine(
        winston.format.timestamp({
            format: timezone,
        }),
        winston.format.json(),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    exitOnError: false, // do not exit on handled exceptions
});

errorLogger.stream = {
    write(message) {
        errorLogger.error(message);
    },
};

module.exports = errorLogger.error;
