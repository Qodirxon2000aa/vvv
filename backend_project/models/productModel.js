const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  barcode: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);