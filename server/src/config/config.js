const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const vars = process.env;

module.exports = {
  env: vars.NODE_ENV,
  port: vars.PORT,
  corsOrigin: vars.CORS_ORIGIN,
};
