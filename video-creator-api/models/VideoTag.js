// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const VideoTagSchema = new Schema(
//     {
//         video: {
//             type: Schema.Types.ObjectId,
//             ref: 'Video',
//         },
//         tags: {
//             type: Schema.Types.ObjectId,
//             ref: 'Tag',
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
//             default: Date.now,
//         },
//         updatedAt: {
//             type: Date,
//             default: Date.now,
//         },
//     },
//     {
//         timestamps: true,
//         versionKey: false,
//     }
// );
//
// module.exports = mongoose.model('VideoTag', VideoTagSchema);
