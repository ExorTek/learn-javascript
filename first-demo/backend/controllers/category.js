const Category = require('../model/Category');
const getCategory = async (req, reply) => {
    const categories = await Category.find();
    reply.send({
        success: true,
        data: categories
    })
};
const addCategory = async (req, reply) => {
    const categoryName = req.body;
    const category = await Category.create(
        categoryName
    );
    reply.send({
        success: true,
        message: 'Created category successfully',
        data: category
    });
};
module.exports = {getCategory, addCategory};