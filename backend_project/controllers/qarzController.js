const { v4: uuidv4 } = require('uuid');
const Qarz = require('../models/qarzModel');

const getAllQarz = async (req, res) => {
  try {
    const qarzlar = await Qarz.find();
    res.json(qarzlar);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const createQarz = async (req, res) => {
  const { ism, familiya, nomer, manzil, komment } = req.body;

  if (!ism || !familiya || !nomer || !manzil) {
    return res.status(400).json({ message: 'Ism, familiya, nomer va manzil majburiy!' });
  }

  try {
    const yangiQarz = new Qarz({
      id: uuidv4(),
      ism,
      familiya,
      nomer,
      manzil,
      komment: komment || '',
      sana: new Date().toLocaleDateString('uz-UZ'),
    });

    await yangiQarz.save();
    res.status(201).json(yangiQarz);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const updateQarz = async (req, res) => {
  const { id } = req.params;
  const { ism, familiya, nomer, manzil, komment } = req.body;

  try {
    const qarz = await Qarz.findOne({ id });
    if (!qarz) {
      return res.status(404).json({ message: 'Qarz topilmadi' });
    }

    qarz.ism = ism || qarz.ism;
    qarz.familiya = familiya || qarz.familiya;
    qarz.nomer = nomer || qarz.nomer;
    qarz.manzil = manzil || qarz.manzil;
    qarz.komment = komment || qarz.komment;
    await qarz.save();

    res.json(qarz);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const deleteQarz = async (req, res) => {
  const { id } = req.params;

  try {
    const qarz = await Qarz.findOneAndDelete({ id });
    if (!qarz) {
      return res.status(404).json({ message: 'Qarz topilmadi' });
    }
    res.json(qarz);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

module.exports = {
  getAllQarz,
  createQarz,
  updateQarz,
  deleteQarz,
};