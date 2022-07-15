const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const config = require("./config");

module.exports = {
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    secure: config.secure,
  },
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(new PrismaClient(), {
    checkPeriod: 2 * 60 * 1000, // ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};
