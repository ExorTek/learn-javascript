const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid');

const BrandSchema = new Schema({
    _id: {
        type: String,
        default: () => nanoid(8)
    },
    brandName: {
        type: String,
        required: [true, 'Please provide a Brand'],
        minLength: [3, 'Brand Name must be at least 3 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('brand', BrandSchema);