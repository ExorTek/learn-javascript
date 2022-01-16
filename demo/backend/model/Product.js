const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid');
const slugify = require('slugify');
const ProductSchema = new Schema({
    _id: {
        type: String,
        default: () => nanoid(15)
    },
    productName: {
        type: String,
        required: [true, 'Please provide a Product Name'],
        minLength: [6, 'Product Name must be at least 6 characters']
    },
    category: {
        type: String,
        ref: 'category'
    },
    price:{
        type: Number,
        required:[true,"Please provide a Price"]
    },
    gender: {
        type: String,
        enum: ['Man', 'Woman']
    },
    brand: {
        type: String,
        ref: 'brand'
    },
    description: {
        type: String,
    },
    productImages: {
        type: Array,
    },
    size: {
        type: Array,
        ref: 'size'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: String,
});
ProductSchema.pre('save', function (next) {
    if (!this.isModified('productName')) next();
    this.slug = this.makeSlug();
    next();
});
ProductSchema.methods.makeSlug = function () {
    return slugify(this.productName, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    });
};
module.exports = mongoose.model('product', ProductSchema);