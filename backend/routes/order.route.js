const express = require('express');
const orderController = require('../controllers/orderController/orderController');
const authenticate = require('../middleware/adminauth.middleware');

const orderRouter = express.Router();

// Get all orders
orderRouter.get('/', authenticate, orderController.getAllOrders);

// Create order
orderRouter.post('/add', authenticate, orderController.createOrder);

// Delete order
orderRouter.delete('/:id', authenticate, orderController.deleteOrder);

module.exports = orderRouter;
