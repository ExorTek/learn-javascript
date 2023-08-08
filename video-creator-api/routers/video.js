const router = require('express').Router();

const videoController = require('../controllers/video');
const { getAccessToRoute } = require('../middlewares/auth/jwt');
const { getAdminAccessToRoute } = require('../middlewares/auth/userRole');
const { isParamsValid } = require('../middlewares/request');
const videoCategoryController = require('../controllers/videoCategory');
const { videoUpload } = require('../middlewares/file/videoUpload');

router.get('/videos', videoController.getVideos);
router.post('/videos', videoController.createVideo);
router.get('/videos/search', videoController.searchVideos);
router.get('/videos/:id', isParamsValid, videoController.getVideo);
router.put('/videos/:id/statistics', isParamsValid, videoController.updateStatistics);
router.put('/videos/:id/view', isParamsValid, videoController.updateVideoViews);

router.get('/categories', videoCategoryController.getVideoCategories);
router.get('/categories/:id', isParamsValid, videoCategoryController.getVideoCategory);
router.post('/categories', videoCategoryController.createVideoCategory);
router.put('/categories/:id', isParamsValid, videoCategoryController.updateVideoCategory);

router.use(getAccessToRoute);
router.use(getAdminAccessToRoute);
router.put('/videos/:id', isParamsValid, videoController.updateVideo);
router.delete('/videos/:id', isParamsValid, videoController.changeVideoStatus);
router.post('/videos/upload', videoUpload, videoController.uploadVideo);

module.exports = router;
