const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} = require('../controllers/products');
const { validateProduct, validateId } = require('../middleware/validate');


router.get('/', getAllProducts);

router.get('/low-stock', getLowStockProducts);


router.get('/:id', validateId, getProductById);


router.post('/', validateProduct, createProduct);


router.put('/:id', validateId, validateProduct, updateProduct);


router.delete('/:id', validateId, deleteProduct);

module.exports = router;