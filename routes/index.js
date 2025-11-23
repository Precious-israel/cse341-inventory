const express = require("express");
const router = express.Router();

const passport = require("passport");

const productRoutes = require("./products");
const transactionRoutes = require("./transactions");
const swaggerRoutes = require("./swagger");

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use("/products", productRoutes);
router.use("/transactions", transactionRoutes);
router.use("/", swaggerRoutes);

module.exports = router;
