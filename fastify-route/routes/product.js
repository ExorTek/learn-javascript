async function product(fastify, options) {
    fastify.get('/', async (req, reply) => {
        reply.send({message: "I am Product"});
    })
}

module.exports = product;