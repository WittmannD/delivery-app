const express = require("express");
const cors = require("cors");
const path = require("path");
const httpStatus = require("http-status");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const ApiError = require("./utils/ApiError");
const sessionConfig = require("./config/session.config");
const corsConfig = require("./config/cors.config");
const config = require("./config/config");
const { errorConverter, errorHandler } = require("./middlewares/error");
const router = require("./router");

const app = express();

app.use(cookieParser());
app.use(expressSession(sessionConfig));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsConfig));
app.options("*", cors());

app.use("/api", router);

if (config.env === "production" && config.selfHosted) {
  app.use(express.static(path.resolve(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
