const Size = require('../model/Size');
const getSize = async (req, reply) => {
    const size = await Size.find();
    reply.send({
        success: true,
        data: size
    })
};
const addSize = async (req, reply) => {
    const size = req.body;
    const createdSize = await Size.create(
        size
    );
    reply.send({
        success: true,
        message: 'Created size successfully',
        data: createdSize
    });
};
module.exports = {getSize, addSize};