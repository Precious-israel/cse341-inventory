const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('productId', 'name productCode')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message
    });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('productId', 'name productCode category');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transaction',
      error: error.message
    });
  }
};

// Create new transaction
const createTransaction = async (req, res) => {
  try {
    const { productId, quantity, transactionType, reason, performedBy, referenceNumber } = req.body;

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Calculate stock changes
    const previousStock = product.quantity;
    let newStock;

    if (transactionType === 'INBOUND') {
      newStock = previousStock + Math.abs(quantity);
    } else {
      newStock = previousStock - Math.abs(quantity);
      if (newStock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock for this transaction'
        });
      }
    }

    // Update product quantity
    product.quantity = newStock;
    await product.save();

    // Create transaction
    const transaction = new Transaction({
      ...req.body,
      previousStock,
      newStock
    });

    const savedTransaction = await transaction.save();
    await savedTransaction.populate('productId', 'name productCode');

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: savedTransaction
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Reference number already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error creating transaction',
      error: error.message
    });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('productId', 'name productCode');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Reference number already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error updating transaction',
      error: error.message
    });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting transaction',
      error: error.message
    });
  }
};

// Get transactions by product ID
const getTransactionsByProduct = async (req, res) => {
  try {
    const transactions = await Transaction.find({ productId: req.params.productId })
      .populate('productId', 'name productCode')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product transactions',
      error: error.message
    });
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByProduct
};