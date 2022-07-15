const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchError = require("../utils/catchError");
const orderService = require("../services/order.service");
const Cart = require("../models/Cart");

const createOrder = catchError(async (req, res) => {
  const orderCustomerInfo = req.body;
  const orderTotalAmount = req.session.cart.totalAmount;
  const orderDate = new Date();
  const products = req.session.cart.items.map((item) => ({
    orderItemQuantity: item.cartItemQuantity,
    orderItemUnitPrice: item.cartItemUnitPrice,
    product: {
      connect: {
        id: item.product.id,
      },
    },
  }));

  const order = await orderService.createOrder({
    orderDate,
    orderTotalAmount,
    orderCustomerInfo,
    products: { create: products },
  });

  req.session.cart = Cart.empty().toObject();
  res.status(httpStatus.CREATED).json(order);
});

const getOrder = catchError(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Order with this ID was not found"
    );
  }
  res.status(httpStatus.OK).json(order);
});

const deleteOrder = catchError(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { createOrder, getOrder, deleteOrder };
