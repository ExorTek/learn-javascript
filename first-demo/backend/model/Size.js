const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid');

const SizeSchema = new Schema({
    _id: {
        type: String,
        default: () => nanoid(8)
    },
    size: {
        type: String,
        required: [true, 'Please provide a size'],
        minLength: [2, 'Size must be at least 2 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('size', SizeSchema);