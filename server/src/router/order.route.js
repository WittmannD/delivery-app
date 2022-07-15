const { Router } = require("express");
const validate = require("../middlewares/validate");

const orderController = require("../controllers/order.controller");
const orderValidation = require("../validations/order.validation");

const router = Router();

router
  .route("/")
  .post(validate(orderValidation.createOrder), orderController.createOrder);

router
  .route("/:shopId")
  .get(validate(orderValidation.getOrder), orderController.getOrder)
  .delete(validate(orderValidation.deleteOrder), orderController.deleteOrder);

module.exports = router;
