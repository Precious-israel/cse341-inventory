const express = require("express");
const router = express.Router();

const productRoutes = require("./products");
const transactionRoutes = require("./transactions");
const swaggerRoutes = require("./swagger");

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use("/products", productRoutes);
router.use("/transactions", transactionRoutes);
router.use("/", swaggerRoutes);

module.exports = router;
