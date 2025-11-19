const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transactions');
const validateMiddleware = require('../middleware/validate');

// // --- Safety checks ---
// if (!transactionController || typeof transactionController !== 'object') {
//   throw new Error('transactions controller not found or invalid');
// }
// if (!validateMiddleware || typeof validateMiddleware !== 'function') {
//   throw new Error('validateMiddleware not found or invalid');
// }

// GET all transactions
router.get('/', transactionController.getAllTransactions);

// GET a single transaction by ID
router.get('/:id', transactionController.getTransactionById);

// CREATE a new transaction
router.post('/', transactionController.createTransaction);

module.exports = router;
