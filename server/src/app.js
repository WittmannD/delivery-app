const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const ApiError = require("./utils/ApiError");
const sessionConfig = require("./config/session.config");
const corsConfig = require("./config/cors.config");
const { errorConverter, errorHandler } = require("./middlewares/error");
const router = require("./router");

const app = express();

app.use(cookieParser());
app.use(expressSession(sessionConfig));
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors(corsConfig));
app.options("*", cors());

app.use("/api", router);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
