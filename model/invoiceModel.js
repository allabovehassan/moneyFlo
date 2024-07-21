const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const invoiceSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    date: {
      type: Date,
      default: Date.now
    },
    pdfUrl: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = { Invoice };
