const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  const { barcode } = req.query;

  try {
    if (barcode) {
      const filteredProducts = await Product.find({ barcode: { $regex: `^${barcode}`, $options: 'i' } });
      console.log(`[Backend] Filtrlangan mahsulotlar: `, filteredProducts);
      return res.status(200).json(filteredProducts);
    }

    const products = await Product.find();
    console.log(`[Backend] Barcha mahsulotlar: `, products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const addProduct = async (req, res) => {
  const newProduct = req.body;

  if (
    !newProduct.name ||
    !newProduct.price ||
    !newProduct.sellingPrice ||
    !newProduct.quantity ||
    !newProduct.category ||
    !newProduct.barcode
  ) {
    return res.status(400).json({
      message: "Name, price, sellingPrice, quantity, category va barcode kiritilishi kerak",
    });
  }

  if (
    isNaN(newProduct.price) ||
    isNaN(newProduct.sellingPrice) ||
    isNaN(newProduct.quantity)
  ) {
    return res.status(400).json({
      message: "Price, sellingPrice va quantity raqam bo‘lishi kerak",
    });
  }

  try {
    const existingProduct = await Product.findOne({ barcode: newProduct.barcode });
    if (existingProduct) {
      return res.status(400).json({ message: "Bu barcode allaqachon mavjud" });
    }

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({
      id: newId,
      name: newProduct.name,
      price: Number(newProduct.price),
      sellingPrice: Number(newProduct.sellingPrice),
      quantity: Number(newProduct.quantity),
      category: newProduct.category,
      barcode: newProduct.barcode,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  if (
    !updatedProduct.name ||
    !updatedProduct.price ||
    !updatedProduct.sellingPrice ||
    !updatedProduct.quantity ||
    !updatedProduct.category ||
    !updatedProduct.barcode
  ) {
    return res.status(400).json({
      message: "Name, price, sellingPrice, quantity, category va barcode kiritilishi kerak",
    });
  }

  if (
    isNaN(updatedProduct.price) ||
    isNaN(updatedProduct.sellingPrice) ||
    isNaN(updatedProduct.quantity)
  ) {
    return res.status(400).json({
      message: "Price, sellingPrice va quantity raqam bo‘lishi kerak",
    });
  }

  try {
    const existingProduct = await Product.findOne({
      barcode: updatedProduct.barcode,
      id: { $ne: parseInt(id) },
    });
    if (existingProduct) {
      return res.status(400).json({ message: "Bu barcode allaqachon mavjud" });
    }

    const product = await Product.findOneAndUpdate(
      { id: parseInt(id) },
      {
        name: updatedProduct.name,
        price: Number(updatedProduct.price),
        sellingPrice: Number(updatedProduct.sellingPrice),
        quantity: Number(updatedProduct.quantity),
        category: updatedProduct.category,
        barcode: updatedProduct.barcode,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json({ message: "Mahsulot o‘chirildi", deleted: product });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik yuz berdi' });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};