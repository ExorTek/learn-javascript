const ComplaintSupporter = require('../models/ComplaintSupporter');

const createSupportData = async (complaintId, userId) =>
    await ComplaintSupporter.create({
        complaint: complaintId,
        supporters: [userId],
    });
const findSupportUserAndRemove = async (complaintId, userId) => await ComplaintSupporter.findOneAndUpdate(
    {complaint: complaintId},
    {$pull: {supporter: userId}},
    {new: true},
);

const supportComplaintCheck = async (complaintId, userId) => {
    const complaintSupporter = await ComplaintSupporter.findOne({complaint: complaintId});
    if (!complaintSupporter) return await createSupportData(complaintId, userId);
    if (complaintSupporter.supporter.includes(userId)) return await findSupportUserAndRemove(complaintId, userId);
    complaintSupporter.supporter.push(userId);
    await complaintSupporter.save();
    return complaintSupporter;
};
module.exports = {
    supportComplaintCheck,
};
