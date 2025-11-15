const product = require('../models/product');
const transaction = require('../models/transaction');
const { ObjectId } = require('mongodb');

const productController = {

  // GET all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET product by ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // CREATE new product
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const now = new Date();
      productData.createdAt = now;
      productData.updatedAt = now;

      const id = await Product.create(productData);
      const newProduct = await Product.findById(id);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // UPDATE product
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body, updatedAt: new Date() };
      const updatedCount = await Product.update(id, updateData);
      if (updatedCount === 0) return res.status(404).json({ message: 'Product not found' });
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      // Optionally delete related transactions
      await Transaction.deleteMany({ productId: new ObjectId(id) });

      const deletedCount = await Product.delete(id);
      if (deletedCount === 0) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = productController;
