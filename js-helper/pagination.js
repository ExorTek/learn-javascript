/**
 * @param queryPage - Page number
 * @param total - Total number of documents
 * @return {{startIndex: number, pagination: {}, limit: number, page: (number|number)}}
 * @description - Pagination helper
 * @example - const {pagination, startIndex, limit, page} = paginationHelper(req, total);
 */
const paginationHelper = (queryPage, total) => {
    const [page, limit, pagination] = [
        !(queryPage && Number.isSafeInteger(queryPage)) ? 1 : Number.isSafeInteger(queryPage) ? queryPage : 1,
        10,
        {},
    ];
    const [startIndex, endIndex] = [(page - 1) * limit, page * limit];
    if (startIndex > 0)
        pagination.prev = {
            page: page - 1,
            limit,
        };
    if (endIndex < total)
        pagination.next = {
            page: page + 1,
            limit,
        };
    return {
        pagination,
        startIndex,
        limit,
        page,
    };
};

/**
 * @param model  - Model
 * @param query - Query
 * @param queryPage - Page number
 * @param select - Select
 * @param populate - Populate
 * @return {Promise<{total: *, pagination: ({}|null), data: *, page: number}>}
 * @description - Pagination function for mongoose models
 * @example - const complaints = await pagination(Complaint, null, queryPage);
 * @example - const complaints = await pagination(Complaint, {status: 'pending'}, queryPage);
 * @example - const complaints = await pagination(Complaint, {status: 'pending', brand: 'apple'}, queryPage);
 * @example - const complaints = await pagination(Complaint, {status: 'pending', brand: 'apple', title: 'title'}, queryPage);
 * @example - const complaints = await pagination(Complaint, {status: 'pending', brand: 'apple', title: 'title', description: 'description'}, queryPage);
 */
const pagination = async (model, query, queryPage, select, populate) => {
    const total = await model.countDocuments(query ?? {});
    const {pagination, startIndex, limit, page} = paginationHelper(queryPage, total);
    if (!queryPage)
        return await model
            .find(query ?? {})
            .select(select ?? {})
            .populate(populate ?? {});
    return {
        data: await model
            .find(query ?? {})
            .select(select ?? {})
            .skip(startIndex)
            .limit(limit)
            .populate(populate ?? {}),
        total,
        pagination: Object.prototype.toString() === '[object Object]' ? pagination : null,
        page,
    };
};

module.exports = pagination;
