const transaction = require('../models/transaction');
const product = require('../models/product');
const { ObjectId } = require('mongodb');

const transactionController = {

  // GET all transactions
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll();
      res.status(200).json(transactions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET transaction by ID
  async getTransactionById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById(id);
      if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
      res.status(200).json(transaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // CREATE transaction
  async createTransaction(req, res) {
    try {
      const data = req.body;
      const product = await Product.findById(data.productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      // Calculate new stock
      let newStock;
      if (data.transactionType === 'INBOUND') {
        newStock = product.quantity + data.quantity;
      } else if (data.transactionType === 'OUTBOUND') {
        newStock = product.quantity - data.quantity;
        if (newStock < 0) return res.status(400).json({ message: 'Not enough stock' });
      } else {
        return res.status(400).json({ message: 'Invalid transaction type' });
      }

      const now = new Date();
      const transactionData = {
        ...data,
        previousStock: product.quantity,
        newStock,
        createdAt: now,
        updatedAt: now
      };

      const id = await Transaction.create(transactionData);

      // Update product stock
      await Product.update(data.productId, { quantity: newStock, updatedAt: now });

      const newTransaction = await Transaction.findById(id);
      res.status(201).json(newTransaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

module.exports = transactionController;
