const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB muvaffaqiyatli ulandi!');
  } catch (error) {
    console.error('❌ MongoDB ulanishda xato:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
