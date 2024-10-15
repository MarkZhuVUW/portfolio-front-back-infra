var express = require("express");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const cors = require("cors");
const logger = require("./utils/logger.js");

var userController = require("./controllers/userControllers");
var commentController = require("./controllers/commentController");

const { connect } = require("./daos/mongodbClient");
const swaggerController = require("./controllers/swaggerController");

var app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: "https://markz-portfolio.uk",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Setup connection pool of mongoose.
connect().then(() => {
  logger.info("Mongodb connection pool created.");

  app.use("/api/users", userController);
  app.use("/api/comments", commentController);

  // setup swagger ui
  swaggerController(app);

  logger.info("server started successfully.");
});

module.exports = app;
