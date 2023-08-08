const populateModel = require('./populater');
const baseComplaintPopulate = populateModel([
    {
        path: 'user',
        select: {
            name: 1,
            avatar: 1,
            _id: 1,
        },
    },
    {
        path: 'brand',
        select: {
            brandName: 1,
            _id: 1,
            image: 1,
        },
    },
    {
        path: 'statistics',
        select: {
            _id: 1,
            views: 1,
            supporters: 1,
        },
    },
    {
        path: 'attachments',
        select: {
            _id: 1,
            url: 1,
            key: 1,
        },
    },
    {
        path: 'supporters',
        select: '-complaint',
        populate: {
            path: 'supporter',
            select: {
                name: 1,
                _id: 1,
            },
            populate: {
                path: 'avatar',
                select: {
                    url: 1,
                    _id: 1,
                    key: 1,
                },
            },
        },
    },
]);

module.exports = {
    baseComplaintPopulate,
};
