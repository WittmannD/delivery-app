const Joi = require("joi");

const createShop = {
  body: Joi.object().keys({
    shopName: Joi.string().required(),
    shopDescription: Joi.string(),
    shopImage: Joi.string(),
  }),
};

const getShops = {
  query: Joi.object().keys({
    contains: Joi.string(),
    orderBy: Joi.object().keys({
      shopName: Joi.string().valid("asc", "desc"),
    }),
    take: Joi.number().integer(),
    skip: Joi.number().integer(),
  }),
};

const getShop = {
  params: Joi.object().keys({
    shopId: Joi.number().integer(),
  }),
};

const deleteShop = {
  params: Joi.object().keys({
    shopId: Joi.number().integer(),
  }),
};

module.exports = {
  createShop,
  getShops,
  getShop,
  deleteShop,
};
