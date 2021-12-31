async function apiRoute(fastify, options) {
    fastify.register(require('./product'), {prefix: 'api/product'});
    fastify.get('/api', async (req, reply) => {
       reply.send({message:"Hello World!"});
    })
}

module.exports = apiRoute;