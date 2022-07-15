const { Router } = require("express");
const validate = require("../middlewares/validate");
const cartValidation = require("../validations/cart.validation");
const cartController = require("../controllers/cart.controller");

const router = Router();
const cartMutationRouter = Router({ mergeParams: true });

router
  .route("/")
  .get(validate(cartValidation.getItems), cartController.getItems);

router
  .route("/reset")
  .post(validate(cartValidation.resetCart), cartController.resetCart);

cartMutationRouter
  .route("/add")
  .post(validate(cartValidation.addItem), cartController.addItem);

cartMutationRouter
  .route("/remove")
  .post(validate(cartValidation.removeItem), cartController.removeItem);

router.use("/:productId", cartMutationRouter);
module.exports = router;
