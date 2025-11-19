const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions');
const { validateTransaction, validateObjectId } = require('../middleware/validate');

// GET all transactions
router.get('/', transactionController.getAllTransactions);

// GET a single transaction by ID (with ObjectId validation)
router.get('/:id', validateObjectId('id'), transactionController.getTransactionById);

// CREATE a new transaction
router.post('/', validateTransaction, transactionController.createTransaction);

module.exports = router;