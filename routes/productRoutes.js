const express = require("express");
const {
  createProduct
} = require("../controller/product/ProductController.js");

const productRouter = express.Router();

//creation order route
productRouter.post(
  "/",
  createProduct
);

module.exports = { productRouter };
