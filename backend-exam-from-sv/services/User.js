const UserStatistic = require('../models/UserStatistic');

const createStatistic = async userId =>
    await UserStatistic.create({
        user: userId,
    });

module.exports = {
    createStatistic,
};
