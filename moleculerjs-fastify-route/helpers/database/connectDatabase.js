const MongoClient = require('mongodb').MongoClient;

const connectDatabase = async () => {
    const client = new MongoClient(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    try {
        await client.connect()
        console.log("MongoDb Connection Successfully.")
    } catch (error) {
        console.log(error)
    }

}
module.exports = connectDatabase;