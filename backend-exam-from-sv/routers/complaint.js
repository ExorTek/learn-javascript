const router = require('express').Router();
const {
    createComplaint,
    getComplaint,
    getComplaints,
    saveComplaintByUser,
    uploadAttachment,
    supportComplaint,
    getSavedComplaintsByUser,
    // unSupportComplaint,
} = require('../controllers/complaint');
const attachmentUpload = require('../middlewares/uploads/attachmentUpload');
const {nonAuthJwtDecode, getAccessToRoute} = require('../middlewares/auth');

// Public
router.post('/uploadAttachment', nonAuthJwtDecode, attachmentUpload.single('attachment'), uploadAttachment);

// Private
// router.use(getAccessToRoute);
router.post('/createComplaint', createComplaint);
router.get('/getComplaints', getComplaints);
router.get('/getComplaint/:id', getComplaint);
router.post('/saveComplaintByUser', saveComplaintByUser);
router.get('/supportComplaint/:id', supportComplaint);
// router.get('/unSupportComplaint/:id', unSupportComplaint);

module.exports = router;
