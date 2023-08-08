const router = require('express').Router();
const videoTagController = require('../controllers/videoTag');
const { getAccessToRoute } = require('../middlewares/auth/jwt');
const { getAdminAccessToRoute } = require('../middlewares/auth/userRole');
const { isParamsValid } = require('../middlewares/request');

router.use([getAccessToRoute, getAdminAccessToRoute]);
router.get('/video-tags', videoTagController.getVideoTags);
router.get('/video-tags/:id', isParamsValid, videoTagController.getVideoTag);
router.post('/video-tags', videoTagController.createVideoTag);
router.put('/video-tags/:id', isParamsValid, videoTagController.updateVideoTag);

module.exports = router;
