const { Router } = require("express");
const validate = require("../middlewares/validate");

const shopController = require("../controllers/shop.controller");
const shopValidation = require("../validations/shop.validation");

const router = Router();
// TODO: Make mutation routes protected. Implement kinda authenticate idk :/

router
  .route("/")
  .post(validate(shopValidation.createShop), shopController.createShop)
  .get(validate(shopValidation.getShops), shopController.getShops);

router
  .route("/:shopId")
  .get(validate(shopValidation.getShop), shopController.getShop)
  .delete(validate(shopValidation.deleteShop), shopController.deleteShop);

module.exports = router;
