const express = require('express');
const cartController = require('../controllers/cartController/cartController');

const cartRouter = express.Router();

// Get all cart items
cartRouter.get('/', cartController.getAllCartItems);

// Add item to cart
cartRouter.post('/add', cartController.addToCart);

// Delete cart item
cartRouter.delete('/:id', cartController.deleteCartItem);

module.exports = cartRouter;
