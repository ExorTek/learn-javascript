const asyncHandler = require('../helpers/handler/asyncHandler');
const Complaint = require('../models/Complaint');
const UserSaveComplaint = require('../models/UserSaveComplaint');
const Attachment = require('../models/Attachment');
const {checkComplaintInput} = require('../helpers/input');
const CustomError = require('../helpers/error/CustomError');
const {statusCodes, messages} = require('../constants');
const Admin = require('../models/Admin');
const pagination = require('../helpers/pagination');
const {nanoid} = require('nanoid');
const {PutObjectCommand} = require('@aws-sdk/client-s3');
const s3 = require('../helpers/aws/s3');
const {baseComplaintPopulate} = require('../helpers/populates');
const {supportComplaintCheck} = require('../services/Complaint');
const {AWS_BUCKET_NAME} = process.env;

const createComplaint = asyncHandler(async (req, res, next) => {
    if (!checkComplaintInput(req.body)) return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));

    const {title, description, attachments, brand} = req.body;

    const admin = await Admin.find();
    const randomAdmin = Math.floor(Math.random() * admin.length);
    const adminId = admin[randomAdmin]._id;

    const userId = req.user.id;

    const complaint = await Complaint.create({
        title,
        description,
        attachments,
        brand,
        user: userId,
        admin: adminId,
    });

    return res.status(statusCodes.CREATED).json({
        success: true,
        data: complaint,
    });
});

const getComplaint = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!id || id === ':id') return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));

    const complaint = await Complaint.findById(id).populate(baseComplaintPopulate).select('-admin');
    return res.status(statusCodes.OK).json({
        success: true,
        data: complaint,
    });
});

const getComplaints = asyncHandler(async (req, res, next) => {
    const queryPage = req.query?.page;
    const data = await pagination(Complaint, null, queryPage, '-admin', baseComplaintPopulate);
    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            ...data,
        },
    });
});

const saveComplaintByUser = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const complaintId = req.params.id;
    if (!complaintId) return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));

    const userSaveComplaint = await UserSaveComplaint.create({
        user: userId,
        complaint: complaintId,
    });

    return res.status(statusCodes.CREATED).json({
        success: true,
        data: userSaveComplaint,
    });
});

const getSavedComplaintsByUser = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const userSaveComplaints = await UserSaveComplaint.find({user: userId})
        .populate({
            path: 'complaint user',
            select: 'title description brand _id',
            populate: {
                path: 'brand',
                select: 'name _id',
            },
        })
        .populate({
            path: 'user',
            select: 'name avatar _id',
        });
    return res.status(statusCodes.OK).json({
        success: true,
        data: userSaveComplaints,
    });
});

const uploadAttachment = asyncHandler(async (req, res, next) => {
    const file = req.file;
    const {visibility} = req.query;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const id = req.user?.id;
    const typeToDirCategorize = type => (type === 'image' ? 'images' : type === 'video' ? 'videos' : 'documents');
    const fileID = nanoid(22);
    const extension = file.originalname.split('.').pop();
    const filePath = `public/upload/${typeToDirCategorize(file.mimetype.split('/')[0])}/${fileID}.${extension}`;

    const fileParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(fileParams);

    await s3.send(command);

    const attachment = new Attachment({
        key: filePath,
        url: `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${filePath}`, // TODO: Cloudfront url
        name: file.originalname,
        visibility: visibility || 'public',
        type: file.mimetype,
        size: file.size,
        uploader: id || ip,
    });

    await attachment.save();

    res.status(statusCodes.OK).json({
        success: true,
        data: attachment,
    });
});

const supportComplaint = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const complaintId = req.params.id;
    if (!complaintId) return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));
    await supportComplaintCheck(complaintId, userId);
    const complaint = await Complaint.findById(complaintId).populate(baseComplaintPopulate).select('-admin');
    return res.status(statusCodes.CREATED).json({
        success: true,
        data: complaint,
    });
});

// const unSupportComplaint = asyncHandler(async (req, res, next) => {
//     const userId = '641026d6e20de4ee75818a05' //req.user.id;
//     const complaintId = req.params.id;
//     if (!complaintId) return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));
//     const complaintIsSupported = await ComplaintSupporter.findOne({complaint: complaintId});
//     if (!complaintIsSupported) return next(new CustomError(messages.COMPLAINT_NOT_FOUND, statusCodes.NOT_FOUND));
//     if (!complaintIsSupported.supporter.includes(userId))
//         return next(new CustomError(messages.COMPLAINT_NOT_SUPPORTED, statusCodes.BAD_REQUEST));
//     const idIndex = complaintIsSupported.supporter.indexOf(userId);
//     complaintIsSupported.supporter.splice(idIndex, 1);
//     await complaintIsSupported.save();
//     const complaint = await Complaint.findById(complaintId).populate(baseComplaintPopulate);
//     return res.status(statusCodes.OK).json({
//         success: true,
//         data: complaint,
//     });
// });

module.exports = {
    createComplaint,
    getComplaint,
    getComplaints,
    saveComplaintByUser,
    getSavedComplaintsByUser,
    uploadAttachment,
    supportComplaint,
    // unSupportComplaint,
};
