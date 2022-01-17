const mongoose = require('mongoose');
const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('MongoDB Connection Successfully.');
    }).catch((err) => {
        console.error(err);
    });
};

module.exports = connectDatabase;