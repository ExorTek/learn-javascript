const {getSize, addSize} = require("../controllers/size");

async function size(fastify) {
    fastify.get('/', getSize);
    fastify.post('/', addSize);
}

module.exports = size;