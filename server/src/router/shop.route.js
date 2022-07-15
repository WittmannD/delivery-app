const { Router } = require("express");
const validate = require("../middlewares/validate");

const shopController = require("../controllers/shop.controller");
const shopValidation = require("../validations/shop.validation");
const nonProductionRoute = require("../middlewares/nonProductionRoute");

const router = Router();

router
  .route("/")
  .post(nonProductionRoute(), validate(shopValidation.createShop), shopController.createShop)
  .get(validate(shopValidation.getShops), shopController.getShops);

router
  .route("/:shopId")
  .get(validate(shopValidation.getShop), shopController.getShop)
  .delete(nonProductionRoute(), validate(shopValidation.deleteShop), shopController.deleteShop);

module.exports = router;
