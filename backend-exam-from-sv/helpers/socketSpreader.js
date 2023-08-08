const {parse, stringify} = require('../helpers/safeJsonParser');
const {searchBrand} = require('../services/Brand');
const {checkSearchFieldValue} = require('./input');
const {messages, statusCodes} = require('../constants');

const socketSpreader = (socket, io) => {
    socket.on('searchBrand', async msg => {
        const socketData = parse(msg);
        if (
            !checkSearchFieldValue({
                ...socketData,
            })
        )
            return io.emit(
                'searchBrand',
                stringify({
                    message: messages.INVALID_VARIABLE_TYPE,
                    status: statusCodes.BAD_REQUEST,
                })
            );

        const result = await searchBrand(socketData);
        return io.emit('searchBrand', stringify(result));
    });
    //
    // socket.on('searchComplaint', async msg => {
    //     const socketData = parse(msg);
    //     if (
    //         !checkSearchFieldValue({
    //             ...socketData,
    //         })
    //     )
    //         return io.emit('searchComplaint', stringify({
    //             message: messages.INVALID_VARIABLE_TYPE,
    //             status: statusCodes.BAD_REQUEST
    //         }));
    //
    //     const result = await searchComplaint(socketData);
    //     return io.emit('searchComplaint', stringify(result));
    // })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
};

module.exports = socketSpreader;
