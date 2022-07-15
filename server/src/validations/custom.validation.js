const Joi = require("joi");

const SessionCart = Joi.object().keys({
  totalAmount: Joi.number().allow(null).required(),
  totalQuantity: Joi.number().integer().allow(null).required(),
  shopId: Joi.number().allow(null).required(),
  items: Joi.array().items(
    Joi.object().keys({
      id: Joi.number().required(),
      product: Joi.object().keys({
        id: Joi.number().required(),
        shopId: Joi.number().valid(Joi.ref(".....shopId")).required(), // Checks if the item belongs to the selected store
        productUnitPrice: Joi.number().required(),
        productName: Joi.string().required(),
        productDescription: Joi.string().allow(null),
        productImage: Joi.string().allow(null),
      }),
      cartItemUnitPrice: Joi.number().required(),
      cartItemQuantity: Joi.number().max(30).required(),
      cartItemTotalPrice: Joi.number().required(),
    })
  ).max(30).required(),
})

module.exports = { SessionCart }
