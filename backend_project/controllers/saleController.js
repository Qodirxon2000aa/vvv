const Product = require('../models/productModel');
const Sale = require('../models/saleModel');

const recordSale = async (req, res) => {
  const sale = req.body;

  if (!sale.productId || !sale.quantity) {
    return res.status(400).json({ message: "productId and quantity are required" });
  }

  try {
    const product = await Product.findOne({ id: sale.productId });
    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    if (product.quantity < sale.quantity) {
      return res.status(400).json({ message: "Yetarli zaxira mavjud emas" });
    }

    product.quantity -= sale.quantity;
    await product.save();

    const newSale = new Sale({
      productId: sale.productId,
      quantity: sale.quantity,
      name: sale.name || product.name,
      sellingPrice: sale.sellingPrice || product.sellingPrice,
      price: sale.price || product.price,
      category: sale.category || product.category,
      saleDate: new Date().toISOString(),
    });

    await newSale.save();
    res.status(201).json({ message: `${sale.quantity} ${product.name} sotildi!`, sale: newSale });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

module.exports = {
  recordSale,
  getSales,
};