const getPrismaClient = require("../db/getPrismaClient");

const prisma = getPrismaClient();

const createOrder = async (orderDetails) => {
  return prisma.order.create({
    data: orderDetails,
    include: {
      products: {
        select: {
          orderItemQuantity: true,
          orderItemUnitPrice: true,
          product: true,
        },
      },
    },
  });
};

const getOrderById = async (id) => {
  return prisma.order.findUnique({
    where: { id },
  });
};

const deleteOrderById = async (id) => {
  return prisma.order.delete({
    where: { id },
  });
};

module.exports = {
  createOrder,
  getOrderById,
  deleteOrderById,
};
