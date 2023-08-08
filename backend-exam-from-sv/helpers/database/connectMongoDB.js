const connectMongoDB = async (mongoose, options, mongoUri) => await mongoose.connect(mongoUri, options);

module.exports = connectMongoDB;
