const express = require("express");
const {
  viewQuotations
} = require("../controller/invoice/invoiceController");
const invoiceRouter = express.Router();

invoiceRouter.get(
  "/view-quotations",
  viewQuotations
);

module.exports = { invoiceRouter };
