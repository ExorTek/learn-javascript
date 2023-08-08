function isNumeric(value) {
    return /^[0-9]+$/.test(value);
}

const paginationHelper = (reqPagination, totalDocumentsCount) => {
    let limit = 12;
    let page = 1;

    if (reqPagination) {
        if (reqPagination.limit && isNumeric(reqPagination.limit)) limit = parseInt(reqPagination.limit);
        if (reqPagination.page && isNumeric(reqPagination.page)) page = parseInt(reqPagination.page);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginationObject = {};

    if (startIndex > 0) {
        paginationObject.prev = {
            page: page - 1,
            limit,
        };
    }
    if (endIndex < totalDocumentsCount) {
        paginationObject.next = {
            page: page + 1,
            limit,
        };
    }
    paginationObject.total = totalDocumentsCount;
    paginationObject.limit = limit;
    paginationObject.page = page;

    return {
        paginationObject,
        startDocumentIndex: startIndex,
        limit,
    };
};

async function pagination({ model, query = {}, sort = {}, reqPagination, select = {}, populate = [] }) {
    const totalDocumentsCount = await model.countDocuments(query);
    const { paginationObject, startDocumentIndex, limit } = paginationHelper(reqPagination, totalDocumentsCount);
    const documents = await model
        .find(query)
        .select(select)
        .skip(startDocumentIndex)
        .limit(limit)
        .populate(populate)
        .sort(sort);
    return {
        data: documents,
        pagination: paginationObject,
    };
}

module.exports = pagination;
