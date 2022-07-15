const httpStatus = require("http-status");
const { pick } = require("lodash");
const ApiError = require("../utils/ApiError");
const catchError = require("../utils/catchError");
const shopService = require("../services/shop.service");

const createShop = catchError(async (req, res) => {
  const shop = await shopService.createShop(req.body);
  res.status(httpStatus.CREATED).json(shop);
});

const getShops = catchError(async (req, res) => {
  const contains = pick(req.query, ["contains"]);
  const options = pick(req.query, ["orderBy", "take", "skip"]);
  const shops = await shopService.queryShops(options, contains);
  res.status(httpStatus.OK).json(shops);
});

const getShop = catchError(async (req, res) => {
  const shop = await shopService.getShopById(req.params.shopId);
  if (!shop) {
    throw new ApiError(httpStatus.NOT_FOUND, "Shop with this ID was not found");
  }
  res.status(httpStatus.OK).json(shop);
});

const deleteShop = catchError(async (req, res) => {
  await shopService.deleteShopById(req.params.shopId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { createShop, getShops, getShop, deleteShop };
