const { productValidation, transactionValidation } = require('../helpers/validate');
const { ObjectId } = require('mongodb');

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
};

// Validate MongoDB ObjectId parameter
const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: `${paramName} is required`
      });
    }
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName} format`
      });
    }
    
    next();
  };
};

// Product validation middleware
const validateProduct = (req, res, next) => {
  productValidation(req.body, (errors, isValid) => {
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    next();
  });
};

// Transaction validation middleware
const validateTransaction = (req, res, next) => {
  transactionValidation(req.body, (errors, isValid) => {
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    next();
  });
};

module.exports = {
  validateProduct,
  validateTransaction,
  validateObjectId
};