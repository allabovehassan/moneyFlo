const {
  Product
} = require("../../model/productModel");
const {
  Invoice
} = require("../../model/invoiceModel.js");
const { User } = require("../../model/userModel.js");
const messages = require("../../utils/messages.js");
const { default: mongoose } = require("mongoose");
const {
  validateProduct
} = require("./productValidations.js");
const {
  generateInvoice
} = require("../../utils/pdfGenerator.js");

async function createProduct(req, res) {
  try {
    // Validate the array of products
    const { value, error } = validateProduct(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: "Validation Error",
        data: error.details
      });
    }

    // Compute GST for each product
    const products = value.map((product) => ({
      ...product,
      gst: 18 // Compute GST as 18%
    }));

    // Save products to the database using insertMany
    const savedProducts = await Product.insertMany(
      products
    );
    const user = await User.findById(
      new mongoose.Types.ObjectId(req.user.id)
    ).select("name -_id");
    const userName = user ? user.name : "Unknown";

    // Create a new invoice
    const invoice = new Invoice({
      userId: new mongoose.Types.ObjectId(req.user.id),
      products: savedProducts.map((p) => p._id),
      date: new Date()
    });

    // Generate PDF and get the PDF URL
    const { pdfUrl, imageUrl } = await generateInvoice(
      invoice,
      userName,
      savedProducts
    );
    invoice.pdfUrl = pdfUrl;
    invoice.imageUrl = imageUrl;

    // Save the invoice to the database
    await invoice.save();

    return res.status(201).send({
      success: true,
      message:
        "Products created and invoice generated successfully",
      data: {
        invoice,
        pdfUrl,
        imageUrl
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
}

module.exports = { createProduct };
