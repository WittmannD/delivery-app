const { Router } = require("express");
const shopRoute = require("./shop.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");

const router = Router();

router.use("/shop", shopRoute);
shopRoute.use("/:shopId/products", productRoute);
router.use("/cart", cartRoute);
router.use("/order", orderRoute);

module.exports = router;
