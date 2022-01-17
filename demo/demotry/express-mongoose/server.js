const express = require('express');
const app = express();
var cors = require('cors')
const dotenv = require('dotenv');
const connectDatabase = require('./helpers/database/connectDatabase');
const routers = require('./routers');
const customErrorHandler = require('./middlewares/error/customErrorHandler');
dotenv.config({
    path: './config/env/config.env'
});
app.use(cors())
connectDatabase();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", routers);
app.use(customErrorHandler);
app.listen(PORT, (() => {
    console.log(`Server listening on port ${PORT} : ${process.env.NODE_ENV}`);
}));