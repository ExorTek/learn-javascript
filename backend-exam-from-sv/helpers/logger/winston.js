const winston = require('winston');
require('winston-daily-rotate-file');
const timezone = () =>
    new Date().toLocaleString('TR', {
        timeZone: 'Europe/Istanbul',
    });

const transport = new winston.transports.DailyRotateFile({
    filename: `${__dirname}/../../logs/request/%DATE%.log`,
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
});

const options = {
    file: {
        level: 'info',
        filename: `${__dirname}/../../logs/request/application.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 1,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
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

logger.stream = {
    write(message) {
        logger.info(message);
    },
};

module.exports = logger;
