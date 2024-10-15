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
  origin: "https://markz-portfolio.uk", // Your allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  exposedHeaders: ["Access-Control-Allow-Origin"],
};

// Prevent caching of preflight requests
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://markz-portfolio.uk");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.sendStatus(204); // No Content
});

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
