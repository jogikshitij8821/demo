const mongoose = require("mongoose");
const logger = require('../../logger');
const config = require("../config");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.apiMongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info(`MongoAtlas Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error("error", error.message);
    }
}
module.exports = { connectDB };