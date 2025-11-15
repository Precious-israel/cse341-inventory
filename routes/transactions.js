const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions');
const validateMiddleware = require('../middleware/validate'); // optional validation middleware

// GET all transactions
router.get('/', transactionController.getAllTransactions);

// GET a single transaction by ID
router.get('/:id', transactionController.getTransactionById);

// CREATE a new transaction
router.post('/', validateMiddleware, transactionController.createTransaction);

module.exports = router;
