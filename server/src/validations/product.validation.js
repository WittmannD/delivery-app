const Joi = require("joi");

const createProduct = {
  params: Joi.object().keys({
    shopId: Joi.number().integer(),
  }),
  body: Joi.object().keys({
    productName: Joi.string().required(),
    productUnitPrice: Joi.number().positive().precision(2).required(),
    productDescription: Joi.string(),
    productImage: Joi.string(),
  }),
};

const getProducts = {
  params: Joi.object().keys({
    shopId: Joi.number().integer(),
  }),
  query: Joi.object().keys({
    lte: Joi.number().positive().precision(2),
    gte: Joi.number().positive().precision(2).greater(Joi.ref("lte")),
    contains: Joi.string(),
    orderBy: Joi.object().keys({
      productName: Joi.string().valid("asc", "desc"),
      productUnitPrice: Joi.string().valid("asc", "desc"),
    }),
    take: Joi.number().integer(),
    skip: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    shopId: Joi.number().integer(),
    productId: Joi.number().integer(),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    shopId: Joi.number().integer(),
    productId: Joi.number().integer(),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
};
