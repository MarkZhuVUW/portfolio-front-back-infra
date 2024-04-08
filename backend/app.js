var express = require("express");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger.js");

var userController = require("./controllers/userControllers");
// const { connect } = require("./daos/mongoConnection");
const swaggerController = require("./controllers/swaggerController");

var app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// Setup connection pool of mongoose.
// connect().then(() => {
  app.use("/api/users", userController);

  // setup swagger ui
  swaggerController(app);

  // healthcheck endpoint
  app.use("/api/health", (req, res) => {
    res.status(200).json({ data: "healthy" });
  });

  logger.info("server started successfully.");
// });

module.exports = app;
