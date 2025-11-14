const Validator = require('validate')
const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = {
  validator,

  // Product validation using validatorjs
  productValidation: (data, callback) => {
    const rules = {
      name: "required",
      productCode: "required",
      quantity: "numeric",
      category: "required",
      supplier: "required",
      cost: "numeric",
      price: "numeric"
    };

    const customMessages = {
      "name.required": "Name is required",
      "productCode.required": "productCode is required",
      "quantity.numeric": "Quantity must be numeric",
      "category.required": "Category is required",
      "supplier.required": "Supplier is required",
      "cost.numeric": "Cost must be numeric",
      "price.numeric": "Price must be numeric"
    };

    validator(data, rules, customMessages, callback);
  },

  // Transaction validation using validatorjs
  transactionValidation: (data, callback) => {
    const rules = {
      productId: "required",
      type: "in:IN,OUT",
      quantity: "numeric"
    };

    const customMessages = {
      "productId.required": "Product ID required",
      "type.in": "Type must be 'IN' or 'OUT'",
      "quantity.numeric": "Quantity must be numeric"
    };

    validator(data, rules, customMessages, callback);
  }
};
