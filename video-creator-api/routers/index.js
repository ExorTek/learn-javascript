const router = require('express').Router();

const authRouter = require('./auth');
const videoRouter = require('./video');
const videoCategoryRouter = require('./videoCategory');
const videoTagRouter = require('./videoTag');

const allRoutes = [
    {
        path: '/auth',
        router: authRouter,
    },
    {
        path: '/video',
        router: videoRouter,
    },
    {
        path: '/video-category',
        router: videoCategoryRouter,
    },
    {
        path: '/video-tag',
        router: videoTagRouter,
    },
];

const initializeRoutes = routes => {
    routes.forEach(route => {
        router.use(route.path, route.router);
    });
};

initializeRoutes(allRoutes);

module.exports = router;
