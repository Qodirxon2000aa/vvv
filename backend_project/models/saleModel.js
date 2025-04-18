const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  sellingPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  saleDate: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);