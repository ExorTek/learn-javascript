const fastify = require('fastify')({logger: true});
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/error/customErrorHandler');
fastify.setErrorHandler(customErrorHandler);
dotenv.config({
    path: './config/env/config.env'
});
connectDatabase();
const PORT = process.env.PORT;
fastify.register(require('./router/index'), {prefix: '/api'});
const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();