// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const TagSchema = new Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         createdBy: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//         },
//         deleted: {
//             type: Boolean,
//             default: false,
//         },
//         deletedAt: {
//             type: Date,
//             default: null,
//         },
//         deletedBy: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//         },
//         createdAt: {
//             type: Date,
//         },
//     },
//     {
//         timestamps: true,
//         versionKey: false,
//     }
// );
//
// module.exports = mongoose.model('Tag', TagSchema);
