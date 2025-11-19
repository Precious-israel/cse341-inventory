const Transaction = require('../models/transaction');
const Product = require('../models/product');
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
      const item = await Transaction.findById(id);

      if (!item)
        return res.status(404).json({ message: 'Transaction not found' });

      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // CREATE transaction
  async createTransaction(req, res) {
    try {
      const data = req.body;

      const productItem = await Product.findById(data.productId);
      if (!productItem)
        return res.status(404).json({ message: 'Product not found' });

      // Calculate new stock
      let newStock;

      if (data.transactionType === 'INBOUND') {
        newStock = productItem.quantity + data.quantity;

      } else if (data.transactionType === 'OUTBOUND') {
        newStock = productItem.quantity - data.quantity;

        if (newStock < 0)
          return res.status(400).json({ message: 'Not enough stock' });
      } else {
        return res
          .status(400)
          .json({ message: 'Invalid transaction type' });
      }

      const now = new Date();

      const transactionData = {
        ...data,
        previousStock: productItem.quantity,
        newStock,
        createdAt: now,
        updatedAt: now
      };

      const id = await Transaction.create(transactionData);

      // Update product stock
      await Product.update(data.productId, {
        quantity: newStock,
        updatedAt: now
      });

      const newTransaction = await Transaction.findById(id);
      res.status(201).json(newTransaction);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE transaction (NEW)
  async deleteTransaction(req, res) {
    try {
      const { id } = req.params;

      // Find transaction
      const existing = await Transaction.findById(id);
      if (!existing)
        return res.status(404).json({ message: 'Transaction not found' });

      // Get related product
      const productItem = await Product.findById(existing.productId);
      if (!productItem)
        return res.status(404).json({ message: 'Related product not found' });

      // Reverse stock effect
      let newStock;
      if (existing.transactionType === "INBOUND") {
        newStock = productItem.quantity - existing.quantity;
        if (newStock < 0)
          return res.status(400).json({ message: "Stock cannot go negative." });

      } else if (existing.transactionType === "OUTBOUND") {
        newStock = productItem.quantity + existing.quantity;
      }

      const now = new Date();

      // Update the product stock
      await Product.update(existing.productId, {
        quantity: newStock,
        updatedAt: now
      });

      // Delete the transaction
      const deletedCount = await Transaction.delete(id);
      if (deletedCount === 0)
        return res.status(404).json({ message: "Failed to delete transaction" });

      res.status(200).json({
        message: "Transaction deleted successfully",
        reversedStock: newStock
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

module.exports = transactionController;
