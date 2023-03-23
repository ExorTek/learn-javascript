const {getCategory,addCategory} = require("../controllers/category");

async function category(fastify) {
    fastify.get('/', getCategory);
    fastify.post('/', addCategory);
}

module.exports = category;