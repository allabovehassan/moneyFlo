const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    gst: {
      type: Number,
      default: 18
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

const Product = model("Product", productSchema);

module.exports = { Product };
