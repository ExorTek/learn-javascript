const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const customErrorHandler = require('./middlewares/error/customErrorHandler');
const notFound = require('./middlewares/error/notFound');
const mongoSanitize = require('./middlewares/database/mongoSanitize');
const corsOptionsDelegate = require('./helpers/cors/corsOptionDelegate');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    helmet({
        hidePoweredBy: false,
        xssFilter: true,
    })
);

app.use(compression({ level: 9 }));
app.use(cors(corsOptionsDelegate));
app.use(mongoSanitize);
app.use('/api/v1', require('./routers'));
app.all('*', notFound);
app.use(customErrorHandler);

module.exports = app;
