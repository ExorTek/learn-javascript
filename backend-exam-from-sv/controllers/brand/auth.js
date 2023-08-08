const asyncHandler = require('../../helpers/handler/asyncHandler');
const {checkBrandRegisterInput} = require('../../helpers/input');
const Brand = require('../../models/Brand');
const {statusCodes, messages} = require('../../constants');

const {faker} = require('@faker-js/faker');
const CustomError = require('../../helpers/error/CustomError');

const register = asyncHandler(async (req, res, next) => {
    // if (!checkBrandRegisterInput({...req.body}))
    //     return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));
    // const {name, surname, brandName, phone, email} = req.body;
    // const brand = await Brand.find().or([{email: email}, {phone: phone}, {brandName: brandName}]);
    // console.log(brand);

    await Brand.create({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        brandName: faker.company.name(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
    });
    res.send('ok');
});
module.exports = {
    register,
};
