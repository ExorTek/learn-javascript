const BrandStatistic = require('../models/BrandStatistic');
const {messages, statusCodes} = require('../constants');
const getSearchedItems = require('../helpers/search/search');
const Brand = require('../models/Brand');

const createStatistic = async brandId =>
    await BrandStatistic.create({
        brand: brandId,
    });

const updateStatistic = async (brandId, data) =>
    await BrandStatistic.findOneAndUpdate({brand: brandId}, data, {new: true});

const searchBrand = async data => {
    const {fields, values} = data;
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
            pagination: !!data?.page,
            page: data?.page,
        },
    });
    return {
        message: messages.SUCCESS,
        status: statusCodes.OK,
        brands,
    };
};

module.exports = {
    createStatistic,
    updateStatistic,
    searchBrand,
};
