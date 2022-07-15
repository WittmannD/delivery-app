const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const vars = process.env;

module.exports = {
  env: vars.NODE_ENV,
  port: vars.PORT,
  clientBaseUrl: vars.CLIENT_BASE_URL,
};
