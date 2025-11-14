const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByProduct
} = require('../controllers/transactions');
const { validateTransaction, validateId } = require('../middleware/validate');


router.get('/', getAllTransactions);


router.get('/product/:productId', validateId, getTransactionsByProduct);


router.get('/:id', validateId, getTransactionById);


router.post('/', validateTransaction, createTransaction);


router.put('/:id', validateId, validateTransaction, updateTransaction);


router.delete('/:id', validateId, deleteTransaction);

module.exports = router;