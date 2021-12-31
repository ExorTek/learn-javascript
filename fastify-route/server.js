const fastify = require('fastify')({logger: true});
const PORT = 5001;
fastify.register(require('./routes/index'));
const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();