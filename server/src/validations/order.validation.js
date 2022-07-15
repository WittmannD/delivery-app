const Joi = require("joi");
const { SessionCart } = require("./custom.validation");

const createOrder = {
  session: Joi.object().keys({
    cookie: Joi.object(),
    cart: SessionCart.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(32).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    tel: Joi.string()
      .pattern(/^[\+]?[0-9]{3}[ ]?[(]?[0-9]{2}[)]?[ ]?[0-9]{3}[ ]?[0-9]{2}[ ]?[0-9]{2}$/)
      .required(),
    address: Joi.string().min(2).max(128).required(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.number().integer(),
  }),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.number().integer(),
  }),
};

module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
};
