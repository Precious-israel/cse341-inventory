const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');
const validateMiddleware = require('../middleware/validate');

// // --- Safety checks ---
// if (!productController || typeof productController !== 'object') {
//   throw new Error('products controller not found or invalid');
// }
// if (!validateMiddleware || typeof validateMiddleware !== 'function') {
//   throw new Error('validateMiddleware not found or invalid');
// }

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by ID
router.get('/:id', productController.getProductById);

// CREATE a new product
router.post('/', productController.createProduct);

// UPDATE an existing product
router.put('/:id', productController.updateProduct);

// DELETE a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
