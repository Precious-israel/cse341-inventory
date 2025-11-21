const Product = require('../models/product');
const Transaction = require('../models/transaction');
const { ObjectId, Code } = require('mongodb');

const productController = {

  // GET all products
  async getAllProducts(req, res) {
    //#swagger.tags=['products']
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET product by ID
  async getProductById(req, res) {
    //#swagger.tags=['products']
    try {
      const { id } = req.params;
      const item = await Product.findById(id);
      if (!item) return res.status(404).json({ message: 'Product not found' });

      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

 // CREATE new product
async createProduct(req, res) {
  //#swagger.tags = ['products']
  try {

    const productData = {
      name: req.body.name,
      productcode: req.body.productCode,
      category: req.body.category,
      price: req.body.price,
      cost: req.body.cost,
      quantity: req.body.quantity,
      supplier: req.body.supplier,
      reorderlevel: req.body.reorderlevel,
      description: req.body.description
    };

    const now = new Date();
    productData.createdAt = now;
    productData.updateAt = now;

    const id = await Product.create(productData);
    const newProduct = await Product.findById(id);

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

  // UPDATE product
async updateProduct(req, res) {
  //#swagger.tags=['products']
  try {
    const { id } = req.params; // Changed from req.body.id to req.params
    const updateData = {
      name: req.body.name,
      productcode: req.body.productCode,
      category: req.body.category,
      price: req.body.price,
      cost: req.body.cost,
      quantity: req.body.quantity,
      supplier: req.body.supplier,
      reorderlevel: req.body.reorderlevel,
      description: req.body.description,
      updatedAt: new Date()
    };

    const updatedCount = await Product.update(id, updateData);

    if (updatedCount === 0)
      return res.status(404).json({ message: 'Product not found' });

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},
  // DELETE product
  async deleteProduct(req, res) {
    //#swagger.tags=['products']
    try {
      const { id } = req.params;

      const deletedCount = await Product.delete(id);

      if (deletedCount === 0)
        return res.status(404).json({ message: 'Product not found' });

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

module.exports = productController;
