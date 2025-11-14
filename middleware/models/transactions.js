const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  transactionCode: {
    type: String,
    required: [true, 'Transaction code is required'],
    trim: true
  },
  transactionType: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['INBOUND', 'OUTBOUND'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    validate: {
      validator: function(value) {
        if (this.transactionType === 'INBOUND') {
          return value > 0;
        } else {
          return value < 0;
        }
      },
      message: 'Quantity must be positive for INBOUND and negative for OUTBOUND'
    }
  },
  previousStock: {
    type: Number,
    required: [true, 'Previous stock is required'],
    min: [0, 'Previous stock cannot be negative']
  },
  newStock: {
    type: Number,
    required: [true, 'New stock is required'],
    min: [0, 'New stock cannot be negative']
  },
  reason: {
    type: String,
    required: [true, 'Reason is required'],
    trim: true
  },
  performedBy: {
    type: String,
    required: [true, 'Performed by is required'],
    trim: true
  },
  referenceNumber: {
    type: String,
    required: [true, 'Reference number is required'],
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
transactionSchema.index({ productId: 1 });
transactionSchema.index({ transactionType: 1 });
transactionSchema.index({ referenceNumber: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);