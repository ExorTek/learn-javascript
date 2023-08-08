const pagination = require('../pagination');
/**
 * @param value
 * @return {RegExp}
 * @description Create regex from value
 * @description Example: createRegex('test') => /test/iu
 */
const createRegex = value => new RegExp(value, 'iu');

/**
 * @param searchFields
 * @param searchValues
 * @param sfLength
 * @param svLength
 * @return {*[]}
 * @description Create or query for search
 * @description Example: createOrQuery({
 *     searchFields: ['name', 'surname', 'email'],
 *     searchValues: ['test', 'test', 'test'],
 *     sfLength: 3,
 *     svLength: 3,
 *     or: true
 * }) => [{$or: [{name: {$in: [/test/iu, /test/iu]}}, {surname: {$in: [/test/iu, /test/iu]}}, {email: {$in: [/test/iu, /test/iu]}}]}]
 *
 * @description Example: createOrQuery({
 *      searchFields: ['name', 'surname', 'email'],
 *      searchValues: ['test', 'test'],
 *      sfLength: 3,
 *      svLength: 2,
 * }) => [{$or: [{name: {$in: [/test/iu]}}, {surname: {$in: [/test/iu]}}, {email: {$in: [/test/iu]}}]}]
 */
const createOrQuery = ({searchFields, searchValues, sfLength, svLength}) => {
    const orQuery = [];
    const svRegex = Array(svLength)
        .fill('')
        .map((_, i) => createRegex(searchValues[i]));
    for (let i = 0; i < sfLength; i++) {
        const orQueryItem = {};
        orQueryItem[searchFields[i]] = {$in: svRegex};
        orQuery.push(orQueryItem);
    }
    return orQuery;
};

/**
 * @param searchFields
 * @param searchValues
 * @param or
 * @return {{}}
 * @description Create mongo query for search
 * @description Example: createQuery(['name', 'surname', 'email'], ['test', 'test', 'test'], true) => {$or: [{name: {$in: [/test/iu, /test/iu]}}, {surname: {$in: [/test/iu, /test/iu]}}, {email: {$in: [/test/iu, /test/iu]}}]}
 * @description Example: createQuery(['name', 'surname', 'email'], ['test', 'test', 'test'], false) => {name: {$regex: /test/iu}, surname: {$regex: /test/iu}, email: {$regex: /test/iu}}
 * @description Example: createQuery(['name', 'surname', 'email'], ['test', 'test'], true) => {$or: [{name: {$in: [/test/iu]}}, {surname: {$in: [/test/iu]}}, {email: {$in: [/test/iu]}}]}
 * @description Example: createQuery(['name', 'surname', 'email'], ['test', 'test'], false) => {$or: [{name: {$regex: /test/iu}}, {surname: {$regex: /test/iu}}, {email: {$regex: /test/iu}}]}
 * @description Example: createQuery(['name', 'surname', 'email'], ['test', 'test']) => {$or: [{name: {$regex: /test/iu}}, {surname: {$regex: /test/iu}}, {email: {$regex: /test/iu}}]}
 */
const createQuery = (searchFields, searchValues, or) => {
    const sfLength = searchFields.length;
    const svLength = searchValues.length;
    const searchQuery = {};
    if (sfLength === svLength) {
        if (!or) {
            for (let i = 0; i < sfLength; i++) {
                searchQuery[searchFields[i]] = {$regex: createRegex(searchValues[i])};
            }
        }
        if (or)
            searchQuery.$or = createOrQuery({
                searchFields,
                searchValues,
                sfLength,
                svLength,
            });
    }
    if (sfLength !== svLength)
        searchQuery.$or = createOrQuery({
            searchFields,
            searchValues,
            sfLength,
            svLength,
        });
    return searchQuery;
};

const getSearchedItems = async ({searchFields, searchValues, model, options}) => {
    if (options.pagination && options.page)
        return await pagination(
            model,
            createQuery(searchFields, searchValues, options.or),
            options.page,
            options.select
        );
    return await model.find(createQuery(searchFields, searchValues, options.or)).select(options.select ?? '');
};

module.exports = getSearchedItems;
