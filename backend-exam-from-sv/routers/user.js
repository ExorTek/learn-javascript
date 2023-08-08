const router = require('express').Router();
const {
    register,
    login,
    getMe,
    uploadProfilePhoto,
    forgotPassword,
    resetPassword,
    changePassword,
    sendOtpCode,
    verifyOtpCode,
    deleteProfilePhoto,
    deleteMyAccount,
} = require('../controllers/user/auth');
const profilePhotoUpload = require('../middlewares/uploads/profilePhotoUpload');
const {getAccessToRoute} = require('../middlewares/auth');

// public auth
router.use(
    '/auth',
    router.post('/register', register),
    router.post('/login', login),
    router.post('/forgotPassword', forgotPassword),
    router.post('/resetPassword', resetPassword)
);

// private auth
router.use(getAccessToRoute);
router.post('/changePassword', changePassword);
router.post('/sendOtpCode', sendOtpCode);
router.post('/verifyOtpCode', verifyOtpCode);
router.get('/me', getMe);
router.post('/uploadProfilePhoto', profilePhotoUpload.single('profilePhoto'), uploadProfilePhoto);
router.delete('/deleteProfilePhoto', deleteProfilePhoto);
router.delete('/deleteMyAccount', deleteMyAccount);

module.exports = router;
