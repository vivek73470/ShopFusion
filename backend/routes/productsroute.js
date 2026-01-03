const express = require('express');
const productController = require('../controllers/productController/productController');

const productsRoute = express.Router();

// Get all products
productsRoute.get('/', productController.getAllProducts);

// Get single product by ID
productsRoute.get('/:id', productController.getProductById);

// Add product
productsRoute.post('/add', productController.createProduct);

// Update product
productsRoute.put('/:id', productController.updateProduct);

// Delete product
productsRoute.delete('/:id', productController.deleteProduct);

module.exports = productsRoute;
