const apiRoute = async (fastify) => {
    fastify.register(require('./product'), {prefix: 'product'});
    fastify.register(require('./category'), {prefix: 'category'});
    fastify.register(require('./brand'), {prefix: 'brand'});
    fastify.register(require('./size'), {prefix: 'size'});
};
module.exports = apiRoute;