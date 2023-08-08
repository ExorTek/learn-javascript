const populateModel = require('./populater');

const videoPopulates = populateModel([
    {
        path: 'statistics',
        select: {
            _id: 1,
            views: 1,
            stars: 1,
        },
    },
    {
        path: 'category',
        select: {
            _id: 1,
            name: 1,
        },
    },
]);

module.exports = {
    videoPopulates,
};
