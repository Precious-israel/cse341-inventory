const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const { validateProduct, validateObjectId } = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');



// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by ID (with ObjectId validation)
router.get('/:id', validateObjectId('id'), productController.getProductById);

// CREATE a new product
router.post('/', isAuthenticated, validateProduct, productController.createProduct);

// UPDATE an existing product (with both validations)
router.put('/:id',isAuthenticated, validateObjectId('id'), validateProduct, productController.updateProduct);

// DELETE a product (with ObjectId validation)
router.delete('/:id',isAuthenticated, validateObjectId('id'), productController.deleteProduct);

module.exports = router;