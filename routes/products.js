const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const validateMiddleware = require('../middleware/validate'); 

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by ID
router.get('/:id', productController.getProductById);

// CREATE a new product
router.post('/', validateMiddleware, productController.createProduct);

// UPDATE an existing product
router.put('/:id', validateMiddleware, productController.updateProduct);

// DELETE a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
