const express = require('express');
const userRouter = require('./userroute');
const productsRoute = require('./productsroute');
const cartRouter = require('./cartroute');
const orderRouter = require('./order.route');
const contactRouter = require('./contactroute');
const uploadRouter = require('./uploadRoutes');

const router = express.Router();

// Mount all routes
router.use('/user', userRouter);
router.use('/products', productsRoute);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter);
router.use('/contact', contactRouter);
router.use('/upload', uploadRouter);

module.exports = router;


