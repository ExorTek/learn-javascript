const {
    getAllProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    getByProductId,
    productImagesUpload
} = require('../controllers/product');
const upload = require("../middlewares/lib/imageUpload");

async function product(fastify) {
    fastify.get('/', getAllProduct);
    fastify.get('/:id', getByProductId);
    fastify.post('/', addProduct);
    fastify.post('/upload', {preHandler: upload}, productImagesUpload);
    fastify.delete('/:id', deleteProduct);
    fastify.put('/:id', updateProduct);
}

//
module.exports = product;
