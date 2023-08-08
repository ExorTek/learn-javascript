const asyncHandler = require('../helpers/handler/asyncHandler');
const {parse, stringify} = require('../helpers/safeJsonParser');
const Brand = require('../models/Brand');
const Complaint = require('../models/Complaint');
const {messages, statusCodes} = require('../constants');
const getSearchedItems = require('../helpers/search/search');
const {checkSearchFieldValue} = require('../helpers/input');

const searchBrand = asyncHandler((ws, req) => {
    ws.on('message', async msg => {
        const socketData = parse(msg);
        if (
            !checkSearchFieldValue({
                ...socketData,
            })
        )
            return ws.send(stringify({message: messages.INVALID_VARIABLE_TYPE}));

        const {fields, values} = socketData;

        const brands = await getSearchedItems({
            searchFields: fields,
            searchValues: values,
            model: Brand,
            options: {
                select: {
                    _id: 1,
                    brandName: 1,
                    image: 1,
                },
                or: true,
                pagination: !!socketData?.page,
                page: socketData?.page,
            },
        });
        return ws.send(
            stringify({
                message: messages.SUCCESS,
                status: statusCodes.OK,
                brands,
            })
        );
    });
});

const searchComplaint = asyncHandler((ws, req) => {
    ws.on('message', async msg => {
        const socketData = parse(msg);
        if (
            !checkSearchFieldValue({
                ...socketData,
            })
        )
            return ws.send(stringify({message: messages.INVALID_VARIABLE_TYPE}));

        const {fields, values} = socketData;

        const complaints = await getSearchedItems({
            searchFields: fields,
            searchValues: values,
            model: Complaint,
            options: {
                select: {
                    _id: 1,
                    title: 1,
                },
                or: true,
                pagination: !!socketData?.page,
                page: socketData?.page,
            },
        });
        return ws.send(
            stringify({
                message: messages.SUCCESS,
                status: statusCodes.OK,
                complaints,
            })
        );
    });
});

module.exports = {
    searchBrand,
    searchComplaint,
};
