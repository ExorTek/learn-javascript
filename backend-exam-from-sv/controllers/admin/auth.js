const Admin = require('../../models/Admin');
const {messages, statusCodes} = require('../../constants');
const saveAdmin = async (req, res) => {
    const {name, surname, username, password} = req.body;
    const admin = new Admin({
        name,
        surname,
        username,
        password,
    });
    await admin.save();
    res.status(statusCodes.CREATED).json({
        success: true,
        data: admin,
    });
};

module.exports = {
    saveAdmin,
};
