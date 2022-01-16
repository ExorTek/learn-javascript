'use strict';
const fastify = require('fastify')({logger: true});
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require("./middlewares/error/customErrorHandler");
dotenv.config({
    path: './config/env/config.env'
});
connectDatabase();
const PORT = process.env.PORT;
fastify.register(require('fastify-multipart'))
fastify.register(require('fastify-cors'));
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
});

fastify.setErrorHandler(customErrorHandler);
fastify.register(require('./router/index'), {prefix: '/api'});
const startServer = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
startServer();