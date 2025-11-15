const express = require('express');
const router = express.Router();

const productRoutes = require('./products');
const transactionRoutes = require('./transactions');

// Prefix routes
router.use('/products', productRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
