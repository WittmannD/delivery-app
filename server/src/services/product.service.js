const getPrismaClient = require("../db/getPrismaClient");

const prisma = getPrismaClient();

const createProduct = async (shopId, productBody) => {
  // return prisma.shop.update({
  //   where: {
  //     id: shopId,
  //   },
  //   data: {
  //     products: {
  //       create: { ...productBody, shopId },
  //     },
  //   },
  // });

  return prisma.product.create({
    data: {
      shopId,
      ...productBody,
    },
  });
};

const queryProducts = async (shopId, options, contains, filter) => {
  return prisma.product.findMany({
    ...options,
    where: {
      shopId,
      productUnitPrice: filter,
      productName: contains,
    },
  });
};

const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

const deleteProductById = async (id) => {
  return prisma.product.delete({
    where: { id },
  });
};

const getProductByIdAndSelect = async (id, selection) => {
  return prisma.product.findUnique({
    where: { id },
    select: Object.fromEntries(selection.map((o) => [o, true]))
  });
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  deleteProductById,
  getProductByIdAndSelect
};
