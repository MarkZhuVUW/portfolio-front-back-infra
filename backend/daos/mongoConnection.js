const mongoose = require("mongoose");
const Config = require("config");
const logger = require("./utils/logger.js");

async function connect() {
  // const address = Config.get('application.mongo.address');
  // const username = Config.get('application.mongo.username');
  // const password = Config.get('application.mongo.password');
  // const encodedPassword = encodeURIComponent(password); // Use encodeURIComponent to ensure special characters are correctly parsed

  // eslint-disable-next-line no-undef
  logger.info(process.env.ME_CONFIG_MONGODB_SERVER || "mongo");
  // FIXME: specify the database name
  await mongoose.connect(
    `mongodb://devroot:devroot@${
      // eslint-disable-next-line no-undef
      process.env.ME_CONFIG_MONGODB_SERVER || "mongo"
    }:27017/`,
    {
      // mongoose automatically does connection pooling and by default max pool size is 100.
      // We want this to be smaller to reduce load on server.
      // https://mongoosejs.com/docs/connections.html#connection_pools
      maxPoolSize: 10,
    }
  );
}

module.exports = { connect };
