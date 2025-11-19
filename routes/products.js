const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const { validateProduct, validateObjectId } = require('../middleware/validate');

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by ID (with ObjectId validation)
router.get('/:id', validateObjectId('id'), productController.getProductById);

// CREATE a new product
router.post('/', validateProduct, productController.createProduct);

// UPDATE an existing product (with both validations)
router.put('/:id', validateObjectId('id'), validateProduct, productController.updateProduct);

// DELETE a product (with ObjectId validation)
router.delete('/:id', validateObjectId('id'), productController.deleteProduct);

module.exports = router;