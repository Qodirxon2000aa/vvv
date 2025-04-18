const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const productRoutes = require('./backend_project/routes/products');
const saleRoutes = require('./backend_project/routes/sales');
const expenseRoutes = require('./backend_project/routes/expenses');
const userRoutes = require('./backend_project/routes/users');
const qarzRoutes = require('./backend_project/routes/qarz');
const connectDB = require('./backend_project/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Connect to MongoDB
connectDB();

// CORS settings
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Routes
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);
app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);
app.use('/qarz', qarzRoutes);

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof mongoose.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Rasm hajmi 2MB dan oshmasligi kerak!' });
    }
    return res.status(400).json({ message: err.message });
  }
  
  res.status(500).json({ message: 'Nimadur xato ketdi!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} allaqachon band.`);
  } else {
    console.log('Server ishga tushishda xato:', err);
  }
});
