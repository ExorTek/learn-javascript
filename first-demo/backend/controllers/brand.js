const Brand = require('../model/Brand');
const getBrand = async (req, reply) => {
    const brands = await Brand.find();
    reply.send({
        success: true,
        message: 'Get All Brand Successfully!',
        data: brands
    })
};
const addBrand = async (req, reply) => {
    const brand = req.body;
    const createdBrand = await Brand.create(
        brand
    );
    reply.send({
        success: true,
        message: 'Created Brand Successfully!',
        data: createdBrand
    });
};
module.exports = {getBrand, addBrand};