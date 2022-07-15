const Joi = require("joi");
const { SessionCart } = require("./custom.validation");

const getItems = {
  query: Joi.object().keys({
    orderId: Joi.number().integer(),
    take: Joi.number().integer(),
    skip: Joi.number().integer(),
  }),
};

const addItem = {
  params: Joi.object().keys({
    productId: Joi.number().integer().required(),
  }),
};

const removeItem = {
  params: Joi.object().keys({
    productId: Joi.number().integer().required(),
  }),
};

const resetCart = {

};

module.exports = {
  addItem,
  getItems,
  removeItem,
  resetCart
};
