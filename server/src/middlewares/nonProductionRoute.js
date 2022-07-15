const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const nonProductionRoute = () => (req, res, next) => {
  if (config.env === "production") {
    return next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
  }

  return next();
};

module.exports = nonProductionRoute;
