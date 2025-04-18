const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nomi: { type: String, required: true },
  summa: { type: Number, required: true },
  sana: { type: String, required: true },
});

module.exports = mongoose.model('Expense', expenseSchema);