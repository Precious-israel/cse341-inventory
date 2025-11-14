const { productValidation, transactionValidation, idValidation } = require('../helpers/validate');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.details[0].message
      });
    }
    next();
  };
};

const validateId = (req, res, next) => {
  const { error } = idValidation.validate({ id: req.params.id });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      error: 'ID must be a valid 24-character hex string'
    });
  }
  next();
};

module.exports = {
  validateProduct: validateRequest(productValidation),
  validateTransaction: validateRequest(transactionValidation),
  validateId
};