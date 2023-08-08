// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const UploadVideoSchema = new Schema(
//     {
//         originalName: {
//             type: String,
//         },
//         encoding: {
//             type: String,
//         },
//         location: {
//             type: String,
//         },
//         bucket: {
//             type: String,
//         },
//         mimType: {
//             type: String,
//         },
//         size: {
//             type: Number,
//         },
//         key: {
//             type: String,
//         },
//         thumbnail: {
//             type: String,
//         },
//         createdBy: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//         },
//         updatedAt: {
//             type: Date,
//             default: Date.now,
//         },
//     },
//     {
//         versionKey: false,
//     }
// );
// module.exports = mongoose.model('UploadVideo', UploadVideoSchema);
