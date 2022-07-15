const httpStatus = require("http-status");
const { pick } = require("lodash");
const ApiError = require("../utils/ApiError");
const catchError = require("../utils/catchError");
const productService = require("../services/product.service");

const createProduct = catchError(async (req, res) => {
  const product = await productService.createProduct(
    req.params.shopId,
    req.body
  );
  res.status(httpStatus.CREATED).json(product);
});

const getProducts = catchError(async (req, res) => {
  const shopId = req.params.shopId;
  const filter = pick(req.query, ["gte", "lte"]);
  const contains = pick(req.query, ["contains"]);
  const options = pick(req.query, ["orderBy", "take", "skip"]);
  const products = await productService.queryProducts(
    shopId,
    options,
    contains,
    filter
  );
  res.status(httpStatus.OK).json(products);
});

const getProduct = catchError(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Product with this ID was not found"
    );
  }
  res.status(httpStatus.OK).json(product);
});

const deleteProduct = catchError(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct };
