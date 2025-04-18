const mongoose = require('mongoose');

const qarzSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ism: { type: String, required: true },
  familiya: { type: String, required: true },
  nomer: { type: String, required: true },
  manzil: { type: String, required: true },
  komment: { type: String, default: '' },
  sana: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Qarz', qarzSchema);