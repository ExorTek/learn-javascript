const apiRoute = async (fastify) => {
    fastify.register(require('./auth/auth'), {prefix: 'auth'});
};
module.exports = apiRoute;