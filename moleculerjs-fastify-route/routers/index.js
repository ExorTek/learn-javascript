const auth = require('./auth')
const apiRoute = async (fastify, broker) => {
    fastify.register((e) => auth(e, broker), {prefix: '/auth'});
};
module.exports = apiRoute;