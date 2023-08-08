const router = require('express').Router();

const authController = require('../controllers/auth');
const { getAccessToRoute } = require('../middlewares/auth/jwt');
const { getAdminAccessToRoute } = require('../middlewares/auth/userRole');

router.post('/login', authController.login);

router.use(getAccessToRoute);
router.get('/me', authController.getMe);
router.use(getAdminAccessToRoute);
router.post('/register', authController.register);
router.put('/change-user-status', authController.changeAccountStatus);
router.put('/update-password', authController.updatePassword);
router.put('/update-profile', authController.updateProfile);

module.exports = router;
