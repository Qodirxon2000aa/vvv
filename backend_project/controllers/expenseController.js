const { v4: uuidv4 } = require('uuid');
const Expense = require('../models/expenseModel');

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

const createExpense = async (req, res) => {
  const { nomi, summa, sana } = req.body;
  if (!nomi || !summa || !sana) {
    return res.status(400).json({ message: 'Nomi, summa, and sana are required' });
  }

  try {
    const newExpense = new Expense({
      id: uuidv4(),
      nomi,
      summa,
      sana,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { nomi, summa, sana } = req.body;

  try {
    const expense = await Expense.findOne({ id });
    if (!expense) {
      return res.status(404).json({ message: 'Rasxod topilmadi' });
    }

    expense.nomi = nomi || expense.nomi;
    expense.summa = summa || expense.summa;
    expense.sana = sana || expense.sana;
    await expense.save();

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findOneAndDelete({ id });
    if (!expense) {
      return res.status(404).json({ message: 'Rasxod topilmadi' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};