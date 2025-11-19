const express = require("express");
const router = express.Router();

const productRoutes = require("./products");
const transactionRoutes = require("./transactions");
const swaggerRoutes = require("./swagger");

router.use("/products", productRoutes);
router.use("/transactions", transactionRoutes);
router.use("/api-docs", swaggerRoutes);

module.exports = router;
