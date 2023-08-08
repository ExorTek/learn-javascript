/**
 * Connect to MongoDB
 * @param mongoose
 * @param options
 * @param mongoUri
 * @return {Promise<*>}
 */
const connectMongoDB = async ({ mongoose, options, mongoUri }) => await mongoose.connect(mongoUri, options);

module.exports = connectMongoDB;
