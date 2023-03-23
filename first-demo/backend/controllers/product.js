const Product = require('../model/Product');
const getAllProduct = async (req, reply) => {
    const product = await Product.find().populate({
        path: 'category',
        select: 'categoryName'
    }).populate({
        path: 'brand',
        select: 'brandName'
    }).populate({
        path: 'size',
        select: 'size'
    });
    reply.send({
        success: true,
        message:'Get All Product Successfully!',
        data: product
    });
};
const getByProductId = async (req, reply) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'category',
        select: 'categoryName'
    }).populate({
        path: 'brand',
        select: 'brandName'
    }).populate({
        path: 'size',
        select: 'size'
    });
    reply.send({
        success: true,
        message:'Get Single Product Successfully!',
        data: product
    });
};
const addProduct = async (req, reply) => {
    const product = await Product.create({
        ...req.body,
    });
    const newProduct = await Product.findById(product._id).populate({
        path: 'category',
        select: 'categoryName'
    }).populate({
        path: 'brand',
        select: 'brandName'
    }).populate({
        path: 'size',
        select: 'size'
    });
    reply.send({
        success: true,
        message: 'Product Added Successfully!',
        data: newProduct
    });
};
const deleteProduct = async (req, reply) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    reply.send({
        success: true,
        message: 'Product Deleted Successfully!'
    });
}
const updateProduct = async (req, reply) => {
    const {productName, gender, brand, price, description, size, category} = req.body;
    const {id} = req.params;
    const response = await Product.findOneAndUpdate({
        _id: id
    }, {
        productName,
        category,
        price,
        gender,
        brand,
        description,
        size
    }, {new: true, upsert: true, rawResult: true});
    reply.send({
        success: true,
        message:"Product Updated Successfully!",
        data: response.value
    });
};
const productImagesUpload = async (req, reply) => {
    reply.send({
        success: true,
        message: 'Images Upload Successfully!',
        data: req.savedProductImage
    });
};
module.exports = {
    getAllProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    getByProductId,
    productImagesUpload
}
