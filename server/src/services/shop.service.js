const getPrismaClient = require("../db/getPrismaClient");

const prisma = getPrismaClient();

const createShop = async (shopBody) => {
  return prisma.shop.create({ data: shopBody });
};

const queryShops = async (options, contains) => {
  return prisma.shop.findMany({
    ...options,
    where: {
      shopName: contains,
    },
  });
};

const getShopById = async (id) => {
  return prisma.shop.findUnique({
    where: { id },
  });
};

const deleteShopById = async (id) => {
  return prisma.shop.delete({
    where: { id },
  });
};

module.exports = { createShop, queryShops, getShopById, deleteShopById };
