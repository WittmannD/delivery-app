const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchError = require("../utils/catchError");
const cartService = require("../services/cart.service");
const productService = require("../services/product.service");

const getItems = catchError(async (req, res) => {
  const cart = await cartService.getCartObject(req.session.cart);
  res.status(httpStatus.OK).json(cart);
});

const addItem = catchError(async (req, res) => {
  const product = await productService.getProductByIdAndSelect(
    req.params.productId,
    ["id", "shopId", "productUnitPrice", "productName", "productDescription", "productImage"]
  );

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product with this ID was not found")
  }

  if (
    req.session.cart &&
    req.session.cart.shopId !== null &&
    req.session.cart.shopId !== product.shopId
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Adding products from different shops is not allowed")
  }

  const cart = await cartService.addItem(
    req.session.cart,
    product
  );

  if (cart) {
    req.session.cart = cart.toObject();
  }
  res.status(httpStatus.OK).json(cart.toObject());
});

const removeItem = catchError(async (req, res) => {
  const cart = await cartService.removeItem(
    req.session.cart || {},
    req.params.productId
  );

  if (cart) req.session.cart = cart.toObject();
  res.status(httpStatus.OK).json(cart.toObject());
});

const resetCart = catchError(async (req, res) => {
  const cart = await cartService.getEmptyCart();

  req.session.cart = cart;
  res.status(httpStatus.OK).json(cart);
});

module.exports = { addItem, getItems, removeItem, resetCart };
