/* eslint-disable no-undef */
const mongoose = require("mongoose");
const logger = require("../utils/logger.js");

async function connect() {
  const address = process.env.MONGODB_SERVER;
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;

  if (!address || !username || !password) {
    throw Error("necessary configs are missing. Check your environment vars");
  }

  await mongoose.connect(
    `mongodb://${username}:${password}@${address}:27017/`,
    {
      // mongoose automatically does connection pooling and by default max pool size is 100.
      // We want this to be smaller to reduce load on server.
      // https://mongoosejs.com/docs/connections.html#connection_pools
      maxPoolSize: 10,
    }
  );
}

module.exports = { connect };
