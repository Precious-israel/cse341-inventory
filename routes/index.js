const express = require('express');
const router = express.Router();

// Import route files
const productRoutes = require('./products');
const transactionRoutes = require('./transactions');

// Use routes
router.use('/products', productRoutes);
router.use('/transactions', transactionRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Inventory Management API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;