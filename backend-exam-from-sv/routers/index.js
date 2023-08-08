const router = require('express').Router();
const adminRouter = require('./admin');
const userRouter = require('./user');
const brandRouter = require('./brand');
const complaintRouter = require('./complaint');

const allRoutes = [
    {
        path: '/admin',
        router: adminRouter,
    },
    {
        path: '/user',
        router: userRouter,
    },
    {
        path: '/brand',
        router: brandRouter,
    },
    {
        path: '/complaint',
        router: complaintRouter,
    },
];

const initializeRoutes = routes => {
    routes.forEach(route => {
        router.use(route.path, route.router);
    });
};

initializeRoutes(allRoutes);

module.exports = router;
