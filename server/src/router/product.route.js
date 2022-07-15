const { Router } = require("express");
const nonProductionRoute = require("../middlewares/nonProductionRoute");
const validate = require("../middlewares/validate");

const productController = require("../controllers/product.controller");
const productValidation = require("../validations/product.validation");

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(
    nonProductionRoute(),
    validate(productValidation.createProduct),
    productController.createProduct
  )
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route("/:productId")
  .get(validate(productValidation.getProduct), productController.getProduct)
  .delete(
    nonProductionRoute(),
    validate(productValidation.deleteProduct),
    productController.deleteProduct
  );

module.exports = router;
