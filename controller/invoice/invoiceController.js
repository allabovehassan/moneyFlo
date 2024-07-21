const {
  Invoice
} = require("../../model/invoiceModel");
const messages = require("../../utils/messages");

async function viewQuotations(req, res) {
  try {
    const userId = req.user.id;
    const invoices = await Invoice.find({
      userId
    }).populate("products");

    return res.status(200).send({
      success: true,
      message: "ok",
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error.message)
    });
  }
}
module.exports = { viewQuotations };
