const {getBrand, addBrand} = require("../controllers/brand");

async function brand(fastify) {
    fastify.get('/', getBrand);
    fastify.post('/', addBrand);
}

module.exports = brand;