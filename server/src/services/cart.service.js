const Cart = require("../models/Cart");

const addItem = async (cartObject, product) => {
  const cart = Cart.create(cartObject || {});
  cart.add(product);
  return cart;
};

const removeItem = async (cartObject, productId) => {
  const cart = Cart.create(cartObject);
  cart.remove(productId);
  return cart;
};

const getCartObject = async (cartObject) => {
  return cartObject || Cart.empty().toObject();
}

const getEmptyCart = async () => {
  return Cart.empty().toObject();
}

module.exports = { addItem, removeItem, getCartObject, getEmptyCart };
