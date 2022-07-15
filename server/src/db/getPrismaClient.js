const { PrismaClient } = require("@prisma/client");

let prismaClient;

const getPrismaClient = () => {
  if (process.env.NODE_ENV === `production`) {
    return new PrismaClient();
  }
  prismaClient = prismaClient || new PrismaClient();
  return prismaClient;
};

module.exports = getPrismaClient;
