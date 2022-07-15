const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const vars = process.env;

module.exports = {
  port: vars.PORT,
  env: vars.NODE_ENV,
  secure: Boolean(vars.SESSION_SECURE),
  sessionSecret: vars.SESSION_SECRET,
  corsOrigin: vars.CORS_ORIGIN,
  selfHosted: Boolean(vars.SELF_HOSTED_CLIENT),
};
