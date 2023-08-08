const router = require('express').Router();
const videoCategoryController = require('../controllers/videoCategory');
const { getAccessToRoute } = require('../middlewares/auth/jwt');
const { getAdminAccessToRoute } = require('../middlewares/auth/userRole');
const { isParamsValid } = require('../middlewares/request');

router.use([getAccessToRoute, getAdminAccessToRoute]);
router.get('/video-categories', videoCategoryController.getVideoCategories);
router.get('/video-categories/:id', isParamsValid, videoCategoryController.getVideoCategory);
router.post('/video-categories', videoCategoryController.createVideoCategory);
router.put('/video-categories/:id', isParamsValid, videoCategoryController.updateVideoCategory);

module.exports = router;
