const mongoose = require("mongoose");
const Config = require("config");

async function connect() {
  const address = "127.0.0.1:27017";
  const username = "devroot";
  const password = "devroot";
  // const encodedPassword = encodeURIComponent(password); // Use encodeURIComponent to ensure special characters are correctly parsed

  // FIXME: specify the database name
  await mongoose.connect(
    `mongodb://${username}:${password}@${address}/`,
    {
      // mongoose automatically does connection pooling and by default max pool size is 100.
      // We want this to be smaller to reduce load on server.
      // https://mongoosejs.com/docs/connections.html#connection_pools
      maxPoolSize: 10,
    }
  );
}

module.exports = { connect };
