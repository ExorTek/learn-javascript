const express = require('express');
const helmet = require('helmet');
const {headerSetter, headerFilter} = require('./middlewares/header');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const corsOptionsDelegate = require('./helpers/corsOptionsDelegate');
const customErrorHandler = require('./middlewares/error/customErrorHandler');
const responseTime = require('./middlewares/responseTime');
const mongoSanitize = require('./middlewares/mongoSanitize');
const morgan = require('./helpers/logger/morgan');
const reqId = require('./middlewares/reqId');
const rateLimiter = require('./middlewares/limiter/rateLimiter');
const notFound = require('./middlewares/NotFound');
const {Server} = require('socket.io');
const socketSpreader = require('./helpers/socketSpreader');
const ifNotReqObject = require("./middlewares/ifNotReqObject");

const app = express();
const server = require('http').createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', socket => socketSpreader(socket, io));

app.use(headerSetter);
app.use(
    helmet({
        hidePoweredBy: false,
        xssFilter: true,
    })
);
// app.use(headerFilter);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression({level: 9}));
app.use(cors(corsOptionsDelegate));
app.options('*', cors());
app.use(reqId);
app.use(responseTime((req, res, time) => (res.responseTime = time)));
app.use(mongoSanitize);
app.use(ifNotReqObject);
app.use(morgan);
app.use(rateLimiter);
app.use('/api/v1', require('./routers'));
app.all('*', notFound);
app.use(customErrorHandler);

module.exports = server;
